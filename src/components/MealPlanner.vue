<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { $profile, $isTrainingDay } from '../stores/profile';
import { scenarios } from '../data/scenarios';
import { foods, calcFoodWeight, getFoodsByMacro, FOOD_IDS } from '../data/foods';
import type { Food } from '../data/foods';
import { calculateBMR, calculateMacros, distributeMeals } from '../logic/calculator';
import type { DayType } from '../logic/calculator';
import { computed, ref } from 'vue';
import FoodPicker from './FoodPicker.vue';

const profile = useStore($profile);
const isTraining = useStore($isTrainingDay);

const scenario = computed(() =>
  scenarios.find(s => s.id === profile.value.scenarioId) || scenarios[2]
);

const dayType = computed<DayType>(() =>
  isTraining.value && scenario.value.hasWeightTraining ? 'training' : 'rest'
);

const macros = computed(() =>
  calculateMacros(profile.value, scenario.value, dayType.value)
);

const meals = computed(() =>
  distributeMeals(macros.value, scenario.value, dayType.value)
);

// ─── 食物选择 state ───
interface MealFoods {
  carb: Food;
  protein: Food;
}

// 使用命名常量而非硬编码 ID
const defaultCarb = foods.find(f => f.id === FOOD_IDS.RICE_COOKED_NORMAL) ?? foods[0];
const defaultProtein = foods.find(f => f.id === FOOD_IDS.CHICKEN_BREAST) ?? foods.find(f => f.macro === 'protein')!;

const mealFoodSelections = ref<Map<number, MealFoods>>(new Map());

function getMealFoods(index: number): MealFoods {
  return mealFoodSelections.value.get(index) || { carb: defaultCarb, protein: defaultProtein };
}

function setMealFood(mealIndex: number, macro: 'carb' | 'protein', food: Food) {
  const current = getMealFoods(mealIndex);
  const updated = { ...current, [macro]: food };
  const newMap = new Map(mealFoodSelections.value);
  newMap.set(mealIndex, updated);
  mealFoodSelections.value = newMap;
}

// ─── 食物选择弹窗 ───
const showPicker = ref(false);
const pickerMealIndex = ref(0);
const pickerMacro = ref<'carb' | 'protein'>('carb');

function openPicker(mealIndex: number, macro: 'carb' | 'protein') {
  pickerMealIndex.value = mealIndex;
  pickerMacro.value = macro;
  showPicker.value = true;
}

function selectFood(food: Food) {
  setMealFood(pickerMealIndex.value, pickerMacro.value, food);
  showPicker.value = false;
}

function roleBadgeClass(role: string) {
  switch (role) {
    case 'pre-workout': return 'badge-pre';
    case 'post-workout': return 'badge-post';
    case 'snack': return 'badge-snack';
    default: return '';
  }
}

function roleBadgeText(role: string) {
  switch (role) {
    case 'pre-workout': return '练前';
    case 'post-workout': return '练后';
    case 'snack': return '加餐';
    default: return '';
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-5">
      <div class="flex items-center gap-2">
        <h2 class="heading-3">{{ scenario.timing }}</h2>
        <span :class="scenario.goal === 'cutting' ? 'badge-cutting' : 'badge-bulking'">
          {{ scenario.goal === 'cutting' ? '减脂' : '增肌' }}
        </span>
      </div>
      <p class="muted-text mt-1">
        {{ dayType === 'training' ? '力训日' : '休息日' }} ·
        {{ macros.calories }} kcal ·
        碳{{ macros.carbs }}g / 蛋{{ macros.protein }}g / 脂{{ macros.fat }}g
      </p>
    </div>

    <!-- 各餐卡片 — 并列 grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(meal, i) in meals"
        :key="i"
        class="tool-card flex flex-col"
      >
        <!-- 餐次头部 -->
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm font-bold text-fg">{{ meal.name }}</span>
          <span v-if="roleBadgeText(meal.role)" :class="roleBadgeClass(meal.role)">
            {{ roleBadgeText(meal.role) }}
          </span>
        </div>

        <!-- 碳水食物 -->
        <div v-if="meal.carbs > 0" class="food-row mb-1.5" @click="openPicker(i, 'carb')">
          <div class="min-w-0">
            <span class="text-sm font-medium text-fg truncate block">{{ getMealFoods(i).carb.name }}</span>
            <span class="text-xs text-fg-tertiary">{{ meal.carbs }}g 碳水</span>
          </div>
          <span class="text-base font-bold text-fg whitespace-nowrap ml-2">{{ calcFoodWeight(meal.carbs, getMealFoods(i).carb.rate) }}g</span>
        </div>

        <!-- 蛋白质食物 -->
        <div v-if="meal.protein > 0" class="food-row mb-1.5" @click="openPicker(i, 'protein')">
          <div class="min-w-0">
            <span class="text-sm font-medium text-fg truncate block">{{ getMealFoods(i).protein.name }}</span>
            <span class="text-xs text-fg-tertiary">{{ meal.protein }}g 蛋白</span>
          </div>
          <span class="text-base font-bold text-fg whitespace-nowrap ml-2">{{ calcFoodWeight(meal.protein, getMealFoods(i).protein.rate) }}g</span>
        </div>

        <!-- 撑满空间 + 脂肪提示 -->
        <div class="mt-auto pt-2">
          <p class="text-xs text-fg-tertiary italic">脂肪：炒菜油 + 蛋奶</p>
        </div>

        <div v-if="meal.tips" class="text-xs text-accent bg-accent-soft px-3 py-2 rounded-md mt-2">
          {{ meal.tips }}
        </div>
      </div>
    </div>

    <!-- 食物选择弹窗 -->
    <Teleport to="body">
      <FoodPicker
        v-if="showPicker"
        :macro="pickerMacro"
        @select="selectFood"
        @close="showPicker = false"
      />
    </Teleport>
  </div>
</template>
