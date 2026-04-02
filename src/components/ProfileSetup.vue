<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { $profile, updateProfile, $isTrainingDay, toggleDayType } from '../stores/profile';
import { scenarios } from '../data/scenarios';
import { calculateBMR, calculateTDEE, calculateMacros, calculateCalorieDelta, estimateWeeklyChange } from '../logic/calculator';
import type { DayType } from '../logic/calculator';
import { computed } from 'vue';

const profile = useStore($profile);
const isTraining = useStore($isTrainingDay);

const currentScenario = computed(() =>
  scenarios.find(s => s.id === profile.value.scenarioId) || scenarios[2]
);

const bmr = computed(() => calculateBMR(profile.value));
const tdee = computed(() => calculateTDEE(bmr.value));
const dayType = computed<DayType>(() => isTraining.value ? 'training' : 'rest');

const macros = computed(() =>
  calculateMacros(profile.value, currentScenario.value, dayType.value)
);

const calorieDelta = computed(() => calculateCalorieDelta(tdee.value, macros.value));
const weeklyChange = computed(() => estimateWeeklyChange(calorieDelta.value));

const goalScenarios = computed(() => ({
  cutting: scenarios.filter(s => s.goal === 'cutting'),
  bulking: scenarios.filter(s => s.goal === 'bulking'),
}));
</script>

<template>
  <div class="space-y-5">
    <!-- 个人数据 -->
    <div class="tool-card">
      <div class="tool-card-title">个人数据</div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="form-label">性别</label>
          <select
            class="select-field"
            :value="profile.gender"
            @change="updateProfile({ gender: ($event.target as HTMLSelectElement).value as 'male' | 'female' })"
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <div>
          <label class="form-label">年龄</label>
          <input
            class="input-field"
            type="number"
            :value="profile.age"
            min="10"
            max="80"
            @input="updateProfile({ age: +($event.target as HTMLInputElement).value })"
          />
        </div>
        <div>
          <label class="form-label">身高 (cm)</label>
          <input
            class="input-field"
            type="number"
            :value="profile.height"
            min="100"
            max="230"
            @input="updateProfile({ height: +($event.target as HTMLInputElement).value })"
          />
        </div>
        <div>
          <label class="form-label">体重 (kg)</label>
          <input
            class="input-field"
            type="number"
            :value="profile.weight"
            min="30"
            max="200"
            step="0.1"
            @input="updateProfile({ weight: +($event.target as HTMLInputElement).value })"
          />
        </div>
      </div>
    </div>

    <!-- BMR / TDEE -->
    <div class="tool-card">
      <div class="tool-card-title">基础数据</div>
      <div class="grid grid-cols-2 gap-4">
        <div class="stat-card">
          <div class="stat-value">{{ bmr }}</div>
          <div class="stat-label">基础代谢 (kcal)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ tdee }}</div>
          <div class="stat-label">无运动日总消耗</div>
        </div>
      </div>
    </div>

    <!-- 场景选择 -->
    <div class="tool-card">
      <div class="tool-card-title">场景</div>
      <select
        class="select-field"
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

      <!-- 力训日/休息日切换 -->
      <div v-if="currentScenario.hasWeightTraining" class="toggle-group mt-3">
        <button
          :class="isTraining ? 'toggle-btn-active' : 'toggle-btn'"
          @click="!isTraining && toggleDayType()"
        >力训日</button>
        <button
          :class="!isTraining ? 'toggle-btn-active' : 'toggle-btn'"
          @click="isTraining && toggleDayType()"
        >休息日</button>
      </div>
    </div>

    <!-- 今日宏量素目标 -->
    <div class="tool-card">
      <div class="tool-card-title">
        {{ isTraining && currentScenario.hasWeightTraining ? '力训日' : '休息日' }}宏量素目标
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div class="stat-card">
          <div class="stat-value macro-carb">{{ macros.carbs }}g</div>
          <div class="stat-label">碳水</div>
        </div>
        <div class="stat-card">
          <div class="stat-value macro-protein">{{ macros.protein }}g</div>
          <div class="stat-label">蛋白质</div>
        </div>
        <div class="stat-card">
          <div class="stat-value macro-fat">{{ macros.fat }}g</div>
          <div class="stat-label">脂肪</div>
        </div>
      </div>
      <div class="flex justify-between items-baseline pt-3 border-t border-gray-200/80 mt-3">
        <span class="text-xl font-bold text-fg">{{ macros.calories }} kcal</span>
        <span class="text-sm font-semibold" :class="calorieDelta < 0 ? 'text-status-deficit' : 'text-status-surplus'">
          {{ calorieDelta > 0 ? '+' : '' }}{{ calorieDelta }} kcal
          <span class="text-xs font-normal text-fg-tertiary ml-1">
            (≈{{ weeklyChange > 0 ? '+' : '' }}{{ weeklyChange.toFixed(2) }} kg/周)
          </span>
        </span>
      </div>
    </div>

    <!-- CTA -->
    <a href="/plan" class="btn-primary w-full text-center no-underline block py-3">
      查看今日饮食方案 →
    </a>
  </div>
</template>
