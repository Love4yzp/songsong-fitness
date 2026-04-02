<script setup lang="ts">
import { ref, computed } from 'vue';
import { getFoodsByMacro, type Food } from '../data/foods';

const props = defineProps<{
  macro: 'carb' | 'protein';
}>();

const emit = defineEmits<{
  select: [food: Food];
  close: [];
}>();

const search = ref('');
const allFoods = computed(() => getFoodsByMacro(props.macro));

const filtered = computed(() => {
  if (!search.value) return allFoods.value;
  const q = search.value.toLowerCase();
  return allFoods.value.filter(f =>
    f.name.includes(q) || f.category.includes(q) || (f.notes || '').includes(q)
  );
});
</script>

<template>
  <div class="fixed inset-0 bg-black/40 z-100 flex items-end justify-center" @click.self="emit('close')">
    <div class="bg-white rounded-t-2xl w-full max-w-2xl max-h-[70dvh] flex flex-col">
      <!-- Header -->
      <div class="flex gap-2 p-4 border-b border-gray-200">
        <input
          v-model="search"
          type="text"
          :placeholder="macro === 'carb' ? '搜索碳水食物...' : '搜索蛋白质食物...'"
          class="flex-1 input-field"
          autofocus
        />
        <button
          class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-fg-secondary hover:text-fg text-lg"
          @click="emit('close')"
        >&times;</button>
      </div>
      <!-- List -->
      <div class="overflow-y-auto p-3">
        <div
          v-for="food in filtered"
          :key="food.id"
          class="food-row"
          @click="emit('select', food)"
        >
          <div>
            <span class="text-sm font-medium text-fg">{{ food.name }}</span>
            <span class="text-xs text-fg-tertiary ml-2">{{ food.category }}</span>
          </div>
          <span class="text-sm font-bold" :class="macro === 'carb' ? 'macro-carb' : 'macro-protein'">
            {{ (food.rate * 100).toFixed(0) }}%
          </span>
        </div>
        <div v-if="filtered.length === 0" class="text-center py-8 text-fg-tertiary text-sm">
          没有找到匹配的食物
        </div>
      </div>
    </div>
  </div>
</template>
