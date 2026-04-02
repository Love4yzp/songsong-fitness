/**
 * 核心计算引擎
 * 公式来源：Mifflin-St Jeor 方程 + 好人松松减脂/增肌体系
 */

import type { MealSlot, Scenario } from '../data/scenarios';
import type { Food } from '../data/foods';
import { calcFoodWeight } from '../data/foods';

export type Gender = 'male' | 'female';
export type DayType = 'training' | 'rest';

export interface UserProfile {
  gender: Gender;
  age: number;
  height: number; // cm
  weight: number; // kg
}

export interface Macros {
  protein: number; // g
  carbs: number;   // g
  fat: number;     // g
  calories: number; // kcal
}

export interface MealPlan {
  name: string;
  role: MealSlot['role'];
  carbs: number;    // g
  protein: number;  // g
  tips?: string;
}

export interface FoodPortion {
  food: Food;
  grams: number;
  macroGrams: number; // 该食物提供的宏量素克数
}

// ─── BMR ────────────────────────────────

/**
 * Mifflin-St Jeor 方程
 * 男：9.99 × 体重(kg) + 6.25 × 身高(cm) - 4.92 × 年龄 + 5
 * 女：9.99 × 体重(kg) + 6.25 × 身高(cm) - 4.92 × 年龄 - 161
 */
export function calculateBMR(profile: UserProfile): number {
  const { gender, height, weight, age } = profile;
  const base = 9.99 * weight + 6.25 * height - 4.92 * age;
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

// ─── TDEE ───────────────────────────────

/**
 * 无运动日总消耗 = BMR ÷ 0.7
 * 基础代谢约占无运动日总消耗的 70%（食物热效应 + 日常活动消耗占 30%）
 */
export function calculateTDEE(bmr: number): number {
  return Math.round(bmr / 0.7);
}

// ─── 宏量素 ─────────────────────────────

/**
 * 计算全天宏量素目标
 * - 碳水和蛋白质按配额（g/kg体重）× 体重
 * - 脂肪固定：男性 60g（>120kg 加到 70g），女性 50g
 * - 热量 = 碳水×4 + 蛋白质×4 + 脂肪×9
 */
export function calculateMacros(
  profile: UserProfile,
  scenario: Scenario,
  dayType: DayType,
): Macros {
  const { weight, gender } = profile;
  const quotas = dayType === 'training' ? {
    carb: scenario.carbQuota.training,
    protein: scenario.proteinQuota.training,
  } : {
    carb: scenario.carbQuota.rest,
    protein: scenario.proteinQuota.rest,
  };

  const carbs = Math.round(quotas.carb * weight);
  const protein = Math.round(quotas.protein * weight);
  const fat = gender === 'male' ? (weight > 120 ? 70 : 60) : 50;
  const calories = carbs * 4 + protein * 4 + fat * 9;

  return { protein, carbs, fat, calories };
}

/**
 * 使用自定义配额计算宏量素
 */
export function calculateMacrosCustom(
  profile: UserProfile,
  carbQuota: number,
  proteinQuota: number,
): Macros {
  const { weight, gender } = profile;
  const carbs = Math.round(carbQuota * weight);
  const protein = Math.round(proteinQuota * weight);
  const fat = gender === 'male' ? (weight > 120 ? 70 : 60) : 50;
  const calories = carbs * 4 + protein * 4 + fat * 9;
  return { protein, carbs, fat, calories };
}

// ─── 餐次分配 ───────────────────────────

/**
 * 把全天宏量素分配到各餐
 */
export function distributeMeals(
  macros: Macros,
  scenario: Scenario,
  dayType: DayType,
): MealPlan[] {
  const meals = dayType === 'training'
    ? scenario.trainingDayMeals
    : scenario.restDayMeals;

  return meals.map(slot => ({
    name: slot.name,
    role: slot.role,
    carbs: Math.round(macros.carbs * slot.carbRatio),
    protein: Math.round(macros.protein * slot.proteinRatio),
    tips: slot.tips,
  }));
}

// ─── 食物重量计算 ────────────────────────

/**
 * 为一餐计算选定食物的克数
 * @param macroGrams 该餐需要的宏量素克数
 * @param food 选定的食物
 */
export function calculatePortion(macroGrams: number, food: Food): FoodPortion {
  const grams = calcFoodWeight(macroGrams, food.rate);
  return {
    food,
    grams,
    macroGrams,
  };
}

// ─── 热量差 ─────────────────────────────

/**
 * 计算热量差（正值=盈余，负值=缺口）
 */
export function calculateCalorieDelta(tdee: number, macros: Macros): number {
  return macros.calories - tdee;
}

/**
 * 预估每周减重/增重速度（kg/week）
 * 7700 kcal ≈ 1kg 体脂
 */
export function estimateWeeklyChange(dailyDelta: number): number {
  return (dailyDelta * 7) / 7700;
}
