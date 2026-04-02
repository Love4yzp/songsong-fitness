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
export const theoryTips: TheoryTip[] = [];

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
