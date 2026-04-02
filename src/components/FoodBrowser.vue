<script setup lang="ts">
import { ref, computed } from 'vue';
import { getFoodsByMacro, getFoodsByCategory, calcFoodWeight, type MacroType } from '../data/foods';

const search = ref('');
const activeTab = ref<'carb' | 'protein'>('carb');
const macroNeed = ref(50);

const filtered = computed(() => {
  const allFoods = getFoodsByMacro(activeTab.value);
  if (!search.value) return allFoods;
  const q = search.value.toLowerCase();
  return allFoods.filter(f =>
    f.name.includes(q) || f.category.includes(q) || (f.notes || '').includes(q)
  );
});

const grouped = computed(() => {
  const groups = new Map<string, typeof filtered.value>();
  for (const food of filtered.value) {
    if (!groups.has(food.category)) groups.set(food.category, []);
    groups.get(food.category)!.push(food);
  }
  return groups;
});

const giColor: Record<string, string> = {
  '高': 'text-error bg-error/10',
  '中': 'text-warning bg-warning/10',
  '低': 'text-success bg-success/10',
};
</script>

<template>
  <div class="space-y-6">
    <!-- Search + Controls -->
    <div class="card space-y-4">
      <input
        v-model="search"
        type="text"
        placeholder="搜索食物名称或分类…"
        class="input-field"
      />
      <div class="flex items-center justify-between gap-4 p-3 bg-bg-tertiary/50 rounded-xl">
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold text-fg-secondary">我需要</span>
          <input
            v-model.number="macroNeed"
            type="number" min="1" max="500"
            class="w-16 px-2 py-1 bg-bg-tertiary border border-border rounded-lg text-sm text-center text-accent font-bold focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <span class="text-sm font-bold text-fg-secondary">g {{ activeTab === 'carb' ? '碳水' : '蛋白质' }}</span>
        </div>
        <div class="toggle-group !flex-none">
          <button
            @click="activeTab = 'carb'"
            :class="activeTab === 'carb' ? 'toggle-btn-active' : 'toggle-btn'"
            class="!px-4 !py-1 text-xs"
          >碳水</button>
          <button
            @click="activeTab = 'protein'"
            :class="activeTab === 'protein' ? 'toggle-btn-active' : 'toggle-btn'"
            class="!px-4 !py-1 text-xs"
          >蛋白</button>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="filtered.length === 0" class="text-center py-12 text-fg-tertiary text-sm">
      没有找到匹配的食物
    </div>

    <div v-for="[category, items] in grouped" :key="category" class="space-y-2">
      <h3 class="text-sm font-black text-fg-strong ml-1 flex items-center gap-2">
        {{ category }}
        <span class="text-[10px] font-bold text-fg-tertiary">{{ items.length }} 种</span>
      </h3>
      <div class="bg-bg-secondary rounded-2xl border border-border-light overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-bg-tertiary/30 text-left border-b border-border">
              <th class="px-4 py-3 font-bold text-fg-tertiary text-[10px] uppercase">食物</th>
              <th class="px-4 py-3 font-bold text-fg-tertiary text-[10px] uppercase text-right w-16">营养率</th>
              <th v-if="activeTab === 'carb'" class="px-4 py-3 font-bold text-fg-tertiary text-[10px] uppercase text-center w-14">GI</th>
              <th class="px-4 py-3 font-bold text-fg-tertiary text-[10px] uppercase text-right w-24">
                {{ macroNeed }}g → 吃
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light">
            <tr
              v-for="food in items"
              :key="food.id"
              class="hover:bg-bg-tertiary/20 transition-colors"
            >
              <td class="px-4 py-3">
                <div class="font-bold text-fg">{{ food.name }}</div>
                <div v-if="food.notes" class="text-[10px] text-fg-tertiary mt-0.5 leading-snug">{{ food.notes }}</div>
              </td>
              <td class="px-4 py-3 text-right">
                <span class="font-bold" :class="activeTab === 'carb' ? 'macro-carb' : 'macro-protein'">
                  {{ (food.rate * 100).toFixed(0) }}%
                </span>
              </td>
              <td v-if="activeTab === 'carb'" class="px-4 py-3 text-center">
                <span
                  v-if="food.gi"
                  :class="giColor[food.gi]"
                  class="px-2 py-0.5 rounded text-[10px] font-bold"
                >{{ food.gi }}</span>
                <span v-else class="text-fg-tertiary text-[10px]">—</span>
              </td>
              <td class="px-4 py-3 text-right">
                <span class="font-bold text-fg-strong font-mono">
                  {{ food.rate > 0 ? calcFoodWeight(macroNeed, food.rate) + 'g' : '—' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
