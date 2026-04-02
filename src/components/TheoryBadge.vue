<script setup lang="ts">
import { computed } from 'vue';
import type { MealSlot, GoalType } from '../data/scenarios';
import { getTipsForMeal } from '../data/theory';

const props = defineProps<{
  role: MealSlot['role'];
  goal: GoalType;
}>();

const tip = computed(() => {
  const tips = getTipsForMeal(props.goal, props.role);
  if (tips.length === 0) return null;
  // 基于 role+goal 的稳定选择（不用 Math.random，避免 hydration mismatch）
  const index = (props.role.length + props.goal.length) % tips.length;
  return tips[index];
});
</script>

<template>
  <div v-if="tip" class="mt-2 py-2 px-3 bg-accent/5 border-l-2 border-accent/30 rounded-r-lg">
    <p class="text-[11px] leading-relaxed text-fg-secondary m-0">
      {{ tip.text }}
    </p>
    <span class="text-[9px] text-fg-tertiary">— 松松理论</span>
  </div>
</template>
