/**
 * 理论知识碎片 — 松松方法论金句
 * 数据来源：src/content/learn/*.md
 *
 * 类型骨架由契约提交定义，数据由 Gemini Agent 填充
 */

import type { MealSlot, GoalType } from './scenarios';

export interface TheoryTip {
  id: string;
  /** 关联的餐次角色，null 表示通用 */
  role: MealSlot['role'] | null;
  /** 关联的目标类型，null 表示通用 */
  goal: GoalType | null;
  /** 关联的宏量素类型，null 表示通用 */
  macro: 'carb' | 'protein' | 'fat' | null;
  /** 金句文本（纯文本） */
  text: string;
  /** 来源 markdown 文件的 slug */
  source: string;
}

/** Gemini Agent 在此填充数据 */
export const theoryTips: TheoryTip[] = [
  {
    id: 'philosophy-1',
    role: 'normal',
    goal: null,
    macro: 'fat',
    text: '脂肪不用算，减脂推荐模式是早饭吃蛋黄牛奶，正餐吃大众带油瘦肉炒菜。',
    source: 'philosophy',
  },
  {
    id: 'philosophy-2',
    role: 'normal',
    goal: null,
    macro: null,
    text: '排除法比列清单更有效，只定义不能碰的高脂肉和糖油混合物，剩下的随便吃。',
    source: 'philosophy',
  },
  {
    id: 'philosophy-3',
    role: null,
    goal: null,
    macro: null,
    text: '秤只用一周来建立对食物重量的直觉，之后就不用再称了。',
    source: 'philosophy',
  },
  {
    id: 'philosophy-4',
    role: null,
    goal: null,
    macro: null,
    text: '减脂看2周趋势，增肌看1个月趋势，两三天的体重波动通常与脂肪无关。',
    source: 'philosophy',
  },
  {
    id: 'philosophy-5',
    role: null,
    goal: null,
    macro: null,
    text: '刻意不提供自动分配比例，是为了让你在手填配额的过程中理解热量原理。',
    source: 'philosophy',
  },
  {
    id: 'how-it-works-1',
    role: null,
    goal: null,
    macro: null,
    text: '食物重量(g) = 需要的宏量素(g) ÷ 营养率，建立直觉后就无需称重。',
    source: 'how-it-works',
  },
  {
    id: 'how-it-works-2',
    role: null,
    goal: null,
    macro: null,
    text: '同类食物互相等价，只要碳水或蛋白克数相同，换什么食物都行。',
    source: 'how-it-works',
  },
  {
    id: 'how-it-works-3',
    role: 'post-workout',
    goal: null,
    macro: null,
    text: '练后餐是全天最大的一顿，训练时间决定了哪顿是练后餐。',
    source: 'how-it-works',
  },
  {
    id: 'how-it-works-4',
    role: 'pre-workout',
    goal: null,
    macro: 'carb',
    text: '练前加餐只需吃碳水，吃个五六分饱即可。',
    source: 'how-it-works',
  },
  {
    id: 'how-it-works-5',
    role: 'post-workout',
    goal: null,
    macro: null,
    text: '练后餐先吃碳水和蛋白，尽量少吃蔬菜以避免压制胰岛素。',
    source: 'how-it-works',
  },
  {
    id: 'how-it-works-6',
    role: 'normal',
    goal: null,
    macro: 'carb',
    text: '一般餐先吃蔬菜后吃碳水，利用压制胰岛素来帮助减脂。',
    source: 'how-it-works',
  },
  {
    id: 'how-it-works-7',
    role: 'snack',
    goal: null,
    macro: null,
    text: '零食或夜宵配额很小，如果不饿可以不吃。',
    source: 'how-it-works',
  },
  {
    id: 'cutting-1',
    role: null,
    goal: 'cutting',
    macro: null,
    text: '减脂终点不是越瘦越好，男性BMI 22-23、女性BMI 20-21就该转增肌了。',
    source: 'cutting',
  },
  {
    id: 'cutting-2',
    role: null,
    goal: 'cutting',
    macro: null,
    text: '理论上2周减重2%是正常的减脂速度，不要看单日的体重波动。',
    source: 'cutting',
  },
  {
    id: 'cutting-3',
    role: null,
    goal: 'cutting',
    macro: null,
    text: '减脂应吃热量等于平衡热量乘以0.64，这预留了20%的误差余地。',
    source: 'cutting',
  },
  {
    id: 'cutting-4',
    role: null,
    goal: 'cutting',
    macro: null,
    text: '减脂期力训不是必须的，但每周3-5次力训能有效减少肌肉流失。',
    source: 'cutting',
  },
  {
    id: 'cutting-5',
    role: null,
    goal: 'cutting',
    macro: null,
    text: '有氧不是必须的，它是饿了时的安全阀，消耗100大卡就能多吃100大卡。',
    source: 'cutting',
  },
  {
    id: 'bulking-1',
    role: null,
    goal: 'bulking',
    macro: null,
    text: '增肌必须有稳定力训，没有力训的增肌只是在长胖。',
    source: 'bulking',
  },
  {
    id: 'bulking-2',
    role: null,
    goal: 'bulking',
    macro: null,
    text: '肌肉合成速度远慢于脂肪分解，平均每天能合成10g肌肉已经很高效了。',
    source: 'bulking',
  },
  {
    id: 'bulking-3',
    role: null,
    goal: 'bulking',
    macro: null,
    text: '增肌期增速不宜过快，男性每月≤1kg，女性每月≤0.5kg。',
    source: 'bulking',
  },
  {
    id: 'bulking-4',
    role: null,
    goal: 'bulking',
    macro: null,
    text: '增肌期一般不建议做有氧，因为热量盈余本就不大，有氧会削减盈余。',
    source: 'bulking',
  },
  {
    id: 'bulking-5',
    role: null,
    goal: 'bulking',
    macro: null,
    text: '增肌体重只要有上行趋势即可，看1个月的趋势而非每天。',
    source: 'bulking',
  },
];

/** 按餐次角色筛选（null role 的 tip 视为通用，总是返回） */
export function getTipsByRole(role: MealSlot['role']): TheoryTip[] {
  return theoryTips.filter(t => t.role === role || t.role === null);
}

/** 按目标 + 餐次角色筛选 */
export function getTipsForMeal(goal: GoalType, role: MealSlot['role']): TheoryTip[] {
  return theoryTips.filter(t =>
    (t.role === role || t.role === null) &&
    (t.goal === goal || t.goal === null)
  );
}
