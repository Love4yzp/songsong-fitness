<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { $profile, updateProfile, $isTrainingDay, $hasCompletedSetup } from '../stores/profile';
import { scenarios } from '../data/scenarios';
import type { DayType } from '../logic/calculator';
import { calculateBMR, calculateTDEE, calculateMacros } from '../logic/calculator';
import { foods, getFoodsByMacro, calcFoodWeight, FOOD_IDS } from '../data/foods';
import FoodPicker from './FoodPicker.vue';
import TheoryBadge from './TheoryBadge.vue';

const profile = useStore($profile);
const isTrainingDay = useStore($isTrainingDay);
const hasSetup = useStore($hasCompletedSetup);

// ── 内联设置表单 ──
const setupWeight = ref(70);
const setupGender = ref<'male' | 'female'>('male');
const setupAge = ref(28);
const setupHeight = ref(170);
const setupScenarioId = ref(3);

const goalScenariosList = computed(() => ({
  cutting: scenarios.filter(s => s.goal === 'cutting'),
  bulking: scenarios.filter(s => s.goal === 'bulking'),
}));

function completeSetup() {
  updateProfile({
    weight: setupWeight.value,
    gender: setupGender.value,
    age: setupAge.value,
    height: setupHeight.value,
    scenarioId: setupScenarioId.value,
  });
}

// ── 体重内联编辑 ──
const editingWeight = ref(false);
const tempWeight = ref(0);

function startEditWeight() {
  tempWeight.value = profile.value.weight;
  editingWeight.value = true;
}

function saveWeight() {
  if (tempWeight.value >= 30 && tempWeight.value <= 200) {
    updateProfile({ weight: tempWeight.value });
  }
  editingWeight.value = false;
}

const currentScenario = computed(() =>
  scenarios.find(s => s.id === profile.value.scenarioId) || scenarios[0]
);

const dayType = computed<DayType>(() => isTrainingDay.value ? 'training' : 'rest');

const dailyMacros = computed(() =>
  calculateMacros(profile.value, currentScenario.value, dayType.value)
);

const currentMeals = computed(() => {
  const s = currentScenario.value;
  const p = profile.value;
  const isTraining = isTrainingDay.value;

  const baseMeals = isTraining ? s.trainingDayMeals : s.restDayMeals;
  const carbTotal = p.weight * (isTraining ? s.carbQuota.training : s.carbQuota.rest);
  const proteinTotal = p.weight * (isTraining ? s.proteinQuota.training : s.proteinQuota.rest);

  return baseMeals.map(m => ({
    ...m,
    carbs: Math.round(carbTotal * m.carbRatio),
    protein: Math.round(proteinTotal * m.proteinRatio),
  }));
});

// Track food overrides per meal index + macro type
const carbFoodOverrides = ref<Record<number, string>>({});
const proteinFoodOverrides = ref<Record<number, string>>({});

const pickerState = ref<{ open: boolean; mealIndex: number; macro: 'carb' | 'protein' }>({
  open: false, mealIndex: -1, macro: 'carb',
});

function openPicker(index: number, macro: 'carb' | 'protein') {
  pickerState.value = { open: true, mealIndex: index, macro };
}

function onFoodSelect(food: import('../data/foods').Food) {
  const { mealIndex, macro } = pickerState.value;
  if (macro === 'carb') {
    carbFoodOverrides.value[mealIndex] = food.id;
  } else {
    proteinFoodOverrides.value[mealIndex] = food.id;
  }
  pickerState.value.open = false;
}

function getCarbFood(index: number) {
  const id = carbFoodOverrides.value[index] || FOOD_IDS.RICE_COOKED_NORMAL;
  return foods.find(f => f.id === id) || foods[0];
}

function getProteinFood(index: number) {
  const id = proteinFoodOverrides.value[index] || FOOD_IDS.CHICKEN_BREAST;
  return foods.find(f => f.id === id) || foods.find(f => f.macro === 'protein') || foods[0];
}

const roleColors: Record<string, string> = {
  'pre-workout': 'text-role-pre bg-role-pre/10 border-role-pre/20',
  'post-workout': 'text-role-post bg-role-post/10 border-role-post/20',
  'normal': 'text-fg-secondary bg-bg-tertiary/30 border-border',
  'snack': 'text-role-snack bg-role-snack/10 border-role-snack/20',
};

const roleLabels: Record<string, string> = {
  'pre-workout': '练前餐',
  'post-workout': '练后餐',
  'normal': '正餐',
  'snack': '加餐',
};
</script>

<template>
  <div>
    <!-- ── 初始设置门槛 ── -->
    <div v-if="!hasSetup" class="max-w-sm mx-auto py-8">
      <h2 class="heading-2 mb-2 text-center">开始你的方案</h2>
      <p class="text-xs text-fg-tertiary text-center mb-6">填入基本信息，系统按松松的配额公式自动拆解三餐。</p>

      <div class="space-y-4">
        <!-- 体重 -->
        <div>
          <label class="form-label">体重 (kg)</label>
          <input
            class="input-field !text-2xl !font-black !py-3"
            type="number"
            v-model.number="setupWeight"
            min="30" max="200" step="0.1"
          />
        </div>

        <!-- 性别/年龄/身高 -->
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="form-label">性别</label>
            <select class="select-field" v-model="setupGender">
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
          <div>
            <label class="form-label">年龄</label>
            <input class="input-field" type="number" v-model.number="setupAge" min="10" max="80" />
          </div>
          <div>
            <label class="form-label">身高 (cm)</label>
            <input class="input-field" type="number" v-model.number="setupHeight" min="100" max="230" />
          </div>
        </div>

        <!-- 场景 -->
        <div>
          <label class="form-label">目标场景</label>
          <select class="select-field" v-model.number="setupScenarioId">
            <optgroup label="减脂">
              <option v-for="s in goalScenariosList.cutting" :key="s.id" :value="s.id">{{ s.timing }}</option>
            </optgroup>
            <optgroup label="增肌">
              <option v-for="s in goalScenariosList.bulking" :key="s.id" :value="s.id">{{ s.timing }}</option>
            </optgroup>
          </select>
        </div>

        <button class="btn-primary w-full" @click="completeSetup">
          生成我的方案
        </button>
      </div>
    </div>

    <!-- ── 仪表盘（已完成设置） ── -->
    <template v-else>
    <!-- ── 吸顶控制台 ── -->
    <div class="sticky top-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-border -mx-4 px-4 pt-3 pb-2 mb-4">
      <div class="flex gap-2 items-stretch">
        <!-- 体重编辑 -->
        <div class="flex-none flex items-center rounded-lg px-2 py-1.5 bg-bg-secondary border border-border">
          <template v-if="editingWeight">
            <input
              class="w-12 text-xs font-black text-fg bg-transparent text-center outline-none"
              type="number" v-model.number="tempWeight" min="30" max="200" step="0.1"
              @blur="saveWeight" @keydown.enter="saveWeight"
            />
            <span class="text-[9px] text-fg-tertiary">kg</span>
          </template>
          <template v-else>
            <span class="text-xs font-black text-fg cursor-pointer" @click="startEditWeight">
              {{ profile.weight }}kg
            </span>
          </template>
        </div>

        <!-- 日类型切换 -->
        <div
          v-if="currentScenario.hasWeightTraining"
          class="flex-none flex items-center rounded-lg px-3 py-1.5 cursor-pointer select-none transition-colors"
          :class="isTrainingDay ? 'bg-role-post/15 text-role-post' : 'bg-bg-tertiary text-fg-secondary'"
          @click="$isTrainingDay.set(!isTrainingDay)"
        >
          <span class="text-xs font-black">{{ isTrainingDay ? '力训日' : '休息日' }}</span>
        </div>

        <!-- 场景选择 -->
        <select
          class="flex-1 min-w-0 text-xs font-bold bg-bg-secondary border border-border rounded-lg px-2 py-1.5 text-fg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent"
          :value="profile.scenarioId"
          @change="updateProfile({ scenarioId: +($event.target as HTMLSelectElement).value })"
        >
          <optgroup label="减脂">
            <option v-for="s in goalScenariosList.cutting" :key="s.id" :value="s.id">{{ s.timing }}</option>
          </optgroup>
          <optgroup label="增肌">
            <option v-for="s in goalScenariosList.bulking" :key="s.id" :value="s.id">{{ s.timing }}</option>
          </optgroup>
        </select>
      </div>

      <!-- 全天配额摘要 -->
      <div class="mt-2 flex items-center justify-center gap-3 text-[10px] font-mono font-bold text-fg-tertiary">
        <span>C <span class="text-macro-carb">{{ dailyMacros.carbs }}g</span></span>
        <span>P <span class="text-macro-protein">{{ dailyMacros.protein }}g</span></span>
        <span>F <span class="text-macro-fat">{{ dailyMacros.fat }}g</span></span>
        <span class="text-fg-secondary">{{ dailyMacros.calories }} kcal</span>
      </div>
    </div>

    <!-- ── 餐单列表 ── -->
    <div class="space-y-3">
    <div v-for="(meal, index) in currentMeals" :key="index" class="rounded-xl border border-border-light overflow-hidden">
      <!-- Meal header: compact single row -->
      <div class="px-4 py-2 flex items-center justify-between bg-bg-tertiary/20">
        <div class="flex items-center gap-2">
          <span
            :class="roleColors[meal.role]"
            class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border"
          >{{ roleLabels[meal.role] }}</span>
          <span class="text-xs font-bold text-fg-strong">{{ meal.name }}</span>
        </div>
        <div class="text-[10px] font-bold text-fg-tertiary font-mono">
          <span class="text-macro-carb">C{{ meal.carbs }}</span>
          <span class="mx-0.5">/</span>
          <span class="text-macro-protein">P{{ meal.protein }}</span>
        </div>
      </div>

      <!-- Carb food row + formula -->
      <div v-if="meal.carbs > 0" class="px-4 py-2 flex items-center justify-between border-t border-border-light">
        <button class="flex items-center gap-1.5 group" @click="openPicker(index, 'carb')">
          <span class="text-sm font-bold text-fg group-hover:text-accent transition-colors">
            {{ getCarbFood(index).name }}
          </span>
          <svg class="w-3 h-3 text-fg-tertiary" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5l3 3 3-3"/></svg>
        </button>
        <div class="text-right">
          <div class="text-sm font-black text-macro-carb font-mono">
            {{ calcFoodWeight(meal.carbs, getCarbFood(index).rate) }}g
          </div>
          <div class="text-[9px] text-fg-tertiary font-mono">
            {{ meal.carbs }}g &divide; {{ getCarbFood(index).rate }}
          </div>
        </div>
      </div>

      <!-- Protein food row + formula -->
      <div v-if="meal.protein > 0" class="px-4 py-2 flex items-center justify-between border-t border-border-light">
        <button class="flex items-center gap-1.5 group" @click="openPicker(index, 'protein')">
          <span class="text-sm font-bold text-fg group-hover:text-accent transition-colors">
            {{ getProteinFood(index).name }}
          </span>
          <svg class="w-3 h-3 text-fg-tertiary" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5l3 3 3-3"/></svg>
        </button>
        <div class="text-right">
          <div class="text-sm font-black text-macro-protein font-mono">
            {{ calcFoodWeight(meal.protein, getProteinFood(index).rate) }}g
          </div>
          <div class="text-[9px] text-fg-tertiary font-mono">
            {{ meal.protein }}g &divide; {{ getProteinFood(index).rate }}
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div v-if="meal.tips" class="px-4 py-1.5 bg-accent/5 text-[10px] text-accent/80 font-medium border-t border-border-light">
        {{ meal.tips }}
      </div>

      <!-- 松松理论金句 -->
      <TheoryBadge :role="meal.role" :goal="currentScenario.goal" />
    </div>

    <!-- Food Picker -->
    <FoodPicker
      v-if="pickerState.open"
      :macro="pickerState.macro"
      @select="onFoodSelect"
      @close="pickerState.open = false"
    />
    </div>
    </template>
  </div>
</template>
