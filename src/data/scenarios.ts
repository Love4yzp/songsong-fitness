/**
 * 15 种饮食场景配置
 * 数据来源：B站@好人松松 健身方法论
 *
 * 每个场景定义了：
 * 1. 目标类型（减脂/增肌）
 * 2. 训练时间点
 * 3. 力训日餐序和宏量素分配比例
 * 4. 休息日餐序和宏量素分配比例
 */

export type GoalType = 'cutting' | 'bulking';

export interface MealSlot {
  /** 餐次名称 */
  name: string;
  /** 餐次角色：练前/练后/一般 */
  role: 'pre-workout' | 'post-workout' | 'normal' | 'snack';
  /** 碳水分配比例（占全天总碳水的比例） */
  carbRatio: number;
  /** 蛋白质分配比例 */
  proteinRatio: number;
  /** 饮食要点 */
  tips?: string;
}

export interface Scenario {
  id: number;
  name: string;
  goal: GoalType;
  /** 训练时间描述 */
  timing: string;
  /** 力训日餐序 */
  trainingDayMeals: MealSlot[];
  /** 休息日餐序 */
  restDayMeals: MealSlot[];
  /** 碳水配额推荐（g/kg体重） */
  carbQuota: { training: number; rest: number };
  /** 蛋白质配额推荐（g/kg体重） */
  proteinQuota: { training: number; rest: number };
  /** 是否有力训 */
  hasWeightTraining: boolean;
}

/**
 * 减脂场景的默认宏量素配额
 * 碳水：力训日 3g/kg，休息日 2g/kg
 * 蛋白质：力训日 2g/kg，休息日 2g/kg
 */
const CUTTING_QUOTAS = {
  carbQuota: { training: 3, rest: 2 },
  proteinQuota: { training: 2, rest: 2 },
};

/**
 * 增肌场景的默认宏量素配额
 * 碳水：力训日 5g/kg，休息日 3g/kg
 * 蛋白质：力训日 2g/kg，休息日 2g/kg
 */
const BULKING_QUOTAS = {
  carbQuota: { training: 5, rest: 3 },
  proteinQuota: { training: 2, rest: 2 },
};

export const scenarios: Scenario[] = [
  // ═══════════════════ 减脂 8 个场景 ═══════════════════

  {
    id: 1,
    name: '减脂-早饭后练（早起版）',
    goal: 'cutting',
    timing: '早饭后练（早起版）',
    hasWeightTraining: true,
    ...CUTTING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭（练前餐）', role: 'pre-workout', carbRatio: 0.20, proteinRatio: 0.15, tips: '垫肚子用，不要太饱' },
      { name: '练后餐', role: 'post-workout', carbRatio: 0.35, proteinRatio: 0.35, tips: '全天最大一顿，练完半小时内吃' },
      { name: '午饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.25, tips: '练后餐刚吃不久，可晚些吃或少吃' },
      { name: '晚饭', role: 'normal', carbRatio: 0.15, proteinRatio: 0.15 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.10, proteinRatio: 0.10, tips: '不吃也行，配额挪到其他餐' },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 2,
    name: '减脂-早饭后练（晚起版）',
    goal: 'cutting',
    timing: '早饭后练（晚起版）',
    hasWeightTraining: true,
    ...CUTTING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭（练前餐）', role: 'pre-workout', carbRatio: 0.20, proteinRatio: 0.15 },
      { name: '午饭（练后餐）', role: 'post-workout', carbRatio: 0.35, proteinRatio: 0.35, tips: '全天最大一顿' },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.25 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 3,
    name: '减脂-午饭前练',
    goal: 'cutting',
    timing: '午饭前练',
    hasWeightTraining: true,
    ...CUTTING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '练前餐', role: 'pre-workout', carbRatio: 0.10, proteinRatio: 0, tips: '垫碳水即可，蛋白不用吃' },
      { name: '午饭（练后餐）', role: 'post-workout', carbRatio: 0.35, proteinRatio: 0.40, tips: '全天最大一顿，练完半小时内吃' },
      { name: '晚饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.15, proteinRatio: 0.15 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 4,
    name: '减脂-午饭后练',
    goal: 'cutting',
    timing: '午饭后练',
    hasWeightTraining: true,
    ...CUTTING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.15, proteinRatio: 0.20 },
      { name: '午饭（练前餐）', role: 'pre-workout', carbRatio: 0.30, proteinRatio: 0.25, tips: '练前正餐，可正常吃' },
      { name: '练后餐', role: 'post-workout', carbRatio: 0.25, proteinRatio: 0.30, tips: '练完补充碳水+蛋白' },
      { name: '晚饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.15 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.10, proteinRatio: 0.10 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 5,
    name: '减脂-晚饭前练',
    goal: 'cutting',
    timing: '晚饭前练',
    hasWeightTraining: true,
    ...CUTTING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '午饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.25 },
      { name: '练前餐', role: 'pre-workout', carbRatio: 0.10, proteinRatio: 0, tips: '垫碳水' },
      { name: '晚饭（练后餐）', role: 'post-workout', carbRatio: 0.35, proteinRatio: 0.35, tips: '全天最大一顿' },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.15, proteinRatio: 0.20 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 6,
    name: '减脂-晚饭后练',
    goal: 'cutting',
    timing: '晚饭后练',
    hasWeightTraining: true,
    ...CUTTING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '午饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.25 },
      { name: '晚饭（练前餐）', role: 'pre-workout', carbRatio: 0.25, proteinRatio: 0.20 },
      { name: '练后餐', role: 'post-workout', carbRatio: 0.25, proteinRatio: 0.25, tips: '练完补充' },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.10, proteinRatio: 0.10 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 7,
    name: '减脂-夜里练',
    goal: 'cutting',
    timing: '夜里练',
    hasWeightTraining: true,
    ...CUTTING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '午饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '晚饭（练前餐）', role: 'pre-workout', carbRatio: 0.25, proteinRatio: 0.20 },
      { name: '练后餐/夜宵', role: 'post-workout', carbRatio: 0.30, proteinRatio: 0.35, tips: '练完吃，不影响减脂' },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 8,
    name: '减脂-无力训者',
    goal: 'cutting',
    timing: '无力训',
    hasWeightTraining: false,
    carbQuota: { training: 2, rest: 2 },
    proteinQuota: { training: 1.5, rest: 1.5 },
    trainingDayMeals: [], // 无力训日
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.35, proteinRatio: 0.35 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.15, proteinRatio: 0.15 },
    ],
  },

  // ═══════════════════ 增肌 7 个场景 ═══════════════════

  {
    id: 9,
    name: '增肌-早饭后练（早起版）',
    goal: 'bulking',
    timing: '早饭后练（早起版）',
    hasWeightTraining: true,
    ...BULKING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭（练前餐）', role: 'pre-workout', carbRatio: 0.15, proteinRatio: 0.15 },
      { name: '练后餐', role: 'post-workout', carbRatio: 0.30, proteinRatio: 0.30, tips: '全天最大一顿' },
      { name: '午饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '晚饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.15, proteinRatio: 0.15 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 10,
    name: '增肌-早饭后练（晚起版）',
    goal: 'bulking',
    timing: '早饭后练（晚起版）',
    hasWeightTraining: true,
    ...BULKING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭（练前餐）', role: 'pre-workout', carbRatio: 0.20, proteinRatio: 0.15 },
      { name: '午饭（练后餐）', role: 'post-workout', carbRatio: 0.30, proteinRatio: 0.35, tips: '全天最大一顿' },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.25, proteinRatio: 0.25 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 11,
    name: '增肌-午饭前练',
    goal: 'bulking',
    timing: '午饭前练',
    hasWeightTraining: true,
    ...BULKING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '练前餐', role: 'pre-workout', carbRatio: 0.10, proteinRatio: 0 },
      { name: '午饭（练后餐）', role: 'post-workout', carbRatio: 0.30, proteinRatio: 0.35, tips: '全天最大一顿' },
      { name: '晚饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 12,
    name: '增肌-午饭后练',
    goal: 'bulking',
    timing: '午饭后练',
    hasWeightTraining: true,
    ...BULKING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.15, proteinRatio: 0.20 },
      { name: '午饭（练前餐）', role: 'pre-workout', carbRatio: 0.25, proteinRatio: 0.20 },
      { name: '练后餐', role: 'post-workout', carbRatio: 0.25, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.15 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.15, proteinRatio: 0.15 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 13,
    name: '增肌-晚饭前练',
    goal: 'bulking',
    timing: '晚饭前练',
    hasWeightTraining: true,
    ...BULKING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '午饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '练前餐', role: 'pre-workout', carbRatio: 0.10, proteinRatio: 0 },
      { name: '晚饭（练后餐）', role: 'post-workout', carbRatio: 0.30, proteinRatio: 0.35, tips: '全天最大一顿' },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.25 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 14,
    name: '增肌-晚饭后练',
    goal: 'bulking',
    timing: '晚饭后练',
    hasWeightTraining: true,
    ...BULKING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '午饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '晚饭（练前餐）', role: 'pre-workout', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '练后餐', role: 'post-workout', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.15, proteinRatio: 0.15 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
  {
    id: 15,
    name: '增肌-夜里练',
    goal: 'bulking',
    timing: '夜里练',
    hasWeightTraining: true,
    ...BULKING_QUOTAS,
    trainingDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '午饭', role: 'normal', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '晚饭（练前餐）', role: 'pre-workout', carbRatio: 0.20, proteinRatio: 0.20 },
      { name: '练后餐/夜宵', role: 'post-workout', carbRatio: 0.40, proteinRatio: 0.40 },
    ],
    restDayMeals: [
      { name: '早饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '午饭', role: 'normal', carbRatio: 0.30, proteinRatio: 0.30 },
      { name: '晚饭', role: 'normal', carbRatio: 0.25, proteinRatio: 0.25 },
      { name: '零食/夜宵', role: 'snack', carbRatio: 0.20, proteinRatio: 0.20 },
    ],
  },
];

export function getScenario(id: number): Scenario | undefined {
  return scenarios.find(s => s.id === id);
}

export function getScenariosByGoal(goal: GoalType): Scenario[] {
  return scenarios.filter(s => s.goal === goal);
}
