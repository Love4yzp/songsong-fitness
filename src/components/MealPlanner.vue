<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { $profile, updateProfile, $isTrainingDay } from '../stores/profile';
import { scenarios } from '../data/scenarios';
import type { DayType } from '../logic/calculator';
import { calculateBMR, calculateTDEE, calculateMacros } from '../logic/calculator';
import { foods, getFoodsByMacro, calcFoodWeight, FOOD_IDS } from '../data/foods';
import FoodPicker from './FoodPicker.vue';

const profile = useStore($profile);
const isTrainingDay = useStore($isTrainingDay);

const currentScenario = computed(() =>
  scenarios.find(s => s.id === profile.value.scenarioId) || scenarios[0]
);

// ── 吸顶控制台数据 ──
const goalScenarios = computed(() => ({
  cutting: scenarios.filter(s => s.goal === 'cutting'),
  bulking: scenarios.filter(s => s.goal === 'bulking'),
}));

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
    <!-- ── 吸顶控制台 ── -->
    <div class="sticky top-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-border -mx-4 px-4 pt-3 pb-2 mb-4">
      <div class="flex gap-2 items-stretch">
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
            <option v-for="s in goalScenarios.cutting" :key="s.id" :value="s.id">{{ s.timing }}</option>
          </optgroup>
          <optgroup label="增肌">
            <option v-for="s in goalScenarios.bulking" :key="s.id" :value="s.id">{{ s.timing }}</option>
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
    <div class="space-y-4">
    <div v-for="(meal, index) in currentMeals" :key="index" class="card !p-0 overflow-hidden">
      <!-- Meal header -->
      <div class="px-5 py-3 flex items-center justify-between border-b border-border-light bg-bg-tertiary/20">
        <div class="flex items-center gap-2.5">
          <span
            :class="roleColors[meal.role]"
            class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
          >{{ roleLabels[meal.role] }}</span>
          <span class="text-xs font-bold text-fg-strong">{{ meal.name }}</span>
        </div>
        <div class="text-[10px] font-bold text-fg-tertiary">
          C {{ meal.carbs }}g / P {{ meal.protein }}g
        </div>
      </div>

      <!-- Carb food -->
      <div v-if="meal.carbs > 0" class="px-5 py-3 flex items-center justify-between border-b border-border-light">
        <button class="flex items-center gap-2 group" @click="openPicker(index, 'carb')">
          <span class="text-sm font-bold text-fg group-hover:text-accent transition-colors">
            {{ getCarbFood(index).name }}
          </span>
          <svg class="w-3 h-3 text-fg-tertiary" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5l3 3 3-3"/></svg>
        </button>
        <span class="text-sm font-bold text-macro-carb font-mono">
          {{ calcFoodWeight(meal.carbs, getCarbFood(index).rate) }}g
        </span>
      </div>

      <!-- Protein food -->
      <div v-if="meal.protein > 0" class="px-5 py-3 flex items-center justify-between">
        <button class="flex items-center gap-2 group" @click="openPicker(index, 'protein')">
          <span class="text-sm font-bold text-fg group-hover:text-accent transition-colors">
            {{ getProteinFood(index).name }}
          </span>
          <svg class="w-3 h-3 text-fg-tertiary" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5l3 3 3-3"/></svg>
        </button>
        <span class="text-sm font-bold text-macro-protein font-mono">
          {{ calcFoodWeight(meal.protein, getProteinFood(index).rate) }}g
        </span>
      </div>

      <!-- Tips -->
      <div v-if="meal.tips" class="px-5 py-2 bg-accent/5 text-[10px] text-accent/80 font-medium border-t border-border-light">
        {{ meal.tips }}
      </div>
    </div>

    <!-- Food Picker -->
    <FoodPicker
      v-if="pickerState.open"
      :macro="pickerState.macro"
      @select="onFoodSelect"
      @close="pickerState.open = false"
    />
    </div>
  </div>
</template>
