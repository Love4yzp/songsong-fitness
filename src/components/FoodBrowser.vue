<script setup lang="ts">
import { ref, computed } from 'vue';
import { foods, type Food } from '../data/foods';

const search = ref('');
const activeTab = ref<'carb' | 'protein'>('carb');
const macroNeed = ref<number>(60);

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim();
  return foods
    .filter((f) => f.section === activeTab.value)
    .filter(
      (f) =>
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        (f.notes && f.notes.toLowerCase().includes(q)),
    );
});

const grouped = computed(() => {
  const map = new Map<string, Food[]>();
  for (const f of filtered.value) {
    const list = map.get(f.category) || [];
    list.push(f);
    map.set(f.category, list);
  }
  return map;
});

function calcWeight(rate: number): string {
  if (rate <= 0) return '—';
  return Math.round(macroNeed.value / rate) + 'g';
}

const giColor: Record<string, string> = {
  '高': 'bg-tag-red text-red-800',
  '中': 'bg-tag-orange text-orange-800',
  '低': 'bg-tag-green text-green-800',
};
</script>

<template>
  <div>
    <!-- Tabs -->
    <div class="flex gap-1 mb-5 border-b border-gray-200">
      <button
        v-for="tab in (['carb', 'protein'] as const)"
        :key="tab"
        :class="[
          'px-3 py-2 text-sm transition-colors border-b-2 -mb-px',
          activeTab === tab
            ? 'border-fg text-fg font-medium'
            : 'border-transparent text-fg-secondary hover:text-fg',
        ]"
        @click="activeTab = tab"
      >
        {{ tab === 'carb' ? '碳水食物' : '蛋白质食物' }}
      </button>
    </div>

    <!-- Search + Calculator -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="搜索食物名称、分类或备注…"
        class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-500 bg-white"
      />
      <div class="flex items-center gap-2 text-sm text-fg-secondary">
        <span>我需要</span>
        <input
          v-model.number="macroNeed"
          type="number"
          min="1"
          max="500"
          class="w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-center focus:outline-none focus:border-gray-500"
        />
        <span>g {{ activeTab === 'carb' ? '碳水' : '蛋白质' }}</span>
      </div>
    </div>

    <!-- Table -->
    <div v-if="filtered.length === 0" class="text-center py-12 text-fg-tertiary text-sm">
      没有找到匹配的食物
    </div>

    <div v-for="[category, items] in grouped" :key="category" class="mb-6">
      <h3 class="text-xs font-medium text-fg-tertiary uppercase tracking-wide mb-2">
        {{ category }}
      </h3>
      <div class="border border-gray-200 rounded-lg overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-bg-secondary text-left">
              <th class="px-3 py-2 font-medium text-fg-secondary">食物</th>
              <th class="px-3 py-2 font-medium text-fg-secondary w-20 text-right">营养率</th>
              <th v-if="activeTab === 'carb'" class="px-3 py-2 font-medium text-fg-secondary w-14 text-center">GI</th>
              <th class="px-3 py-2 font-medium text-fg-secondary w-24 text-right">
                {{ macroNeed }}g → 吃
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="food in items"
              :key="food.name"
              class="border-t border-gray-100 hover:bg-bg-secondary/50 transition-colors"
            >
              <td class="px-3 py-2">
                <div>{{ food.name }}</div>
                <div v-if="food.notes" class="text-xs text-fg-tertiary mt-0.5 leading-snug">
                  {{ food.notes }}
                </div>
              </td>
              <td class="px-3 py-2 text-right font-mono text-xs">
                {{ food.rate > 0 ? (food.rate * 100).toFixed(0) + '%' : '—' }}
              </td>
              <td v-if="activeTab === 'carb'" class="px-3 py-2 text-center">
                <span
                  v-if="food.gi"
                  :class="['tag-pill text-xs', giColor[food.gi]]"
                >
                  {{ food.gi }}
                </span>
              </td>
              <td class="px-3 py-2 text-right font-mono text-sm font-medium">
                {{ calcWeight(food.rate) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
