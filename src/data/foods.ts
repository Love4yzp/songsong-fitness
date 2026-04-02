/**
 * 食物营养数据库
 * 数据来源：B站@好人松松 健身Excel超级套表
 * rate = 每100g食物中该宏量素的克数（碳水率/蛋白率）
 */

export type MacroType = 'carb' | 'protein' | 'fat';
export type GI = '高' | '中' | '低' | '';

export interface Food {
  id: string;
  name: string;
  macro: MacroType;
  category: string;
  rate: number; // g macro per 100g food
  gi: GI;
  notes?: string;
}

// 常用食物 ID 常量 - 避免在组件中硬编码
export const FOOD_IDS = {
  // 碳水类
  RICE_COOKED_NORMAL: 'c03',     // 米饭（一般）- 最常用的碳水
  RICE_RAW: 'c01',               // 生米
  BREAD_SLICE: 'c10',            // 切片面包
  // 蛋白质类
  CHICKEN_BREAST: 'p01',         // 鸡胸肉 - 最常用的蛋白质
  EGG_WHOLE: 'p10',              // 鸡蛋（全蛋）
  PROTEIN_POWDER: 'p18',         // 蛋白粉
} as const;

export const foods: Food[] = [
  // ═══════════════════════════════════════
  // 碳水类食物
  // ═══════════════════════════════════════

  // 米类主食
  { id: 'c01', name: '生米', macro: 'carb', category: '米类主食', rate: 0.75, gi: '高', notes: '大米、糙米、糯米、小米等碳水率近似' },
  { id: 'c02', name: '米饭（很软）', macro: 'carb', category: '米类主食', rate: 0.25, gi: '高', notes: '只有自己做饭才可能这么软' },
  { id: 'c03', name: '米饭（一般）', macro: 'carb', category: '米类主食', rate: 0.30, gi: '高', notes: '外食一般米饭，标准外卖盒100-120g碳水/盒' },
  { id: 'c04', name: '米饭（偏硬）', macro: 'carb', category: '米类主食', rate: 0.35, gi: '高' },
  { id: 'c05', name: '米粥（稀）', macro: 'carb', category: '米类主食', rate: 0.10, gi: '高' },
  { id: 'c06', name: '米粥（一般）', macro: 'carb', category: '米类主食', rate: 0.13, gi: '高' },
  { id: 'c07', name: '米线（熟）', macro: 'carb', category: '米类主食', rate: 0.33, gi: '高', notes: '饱腹感很低，外食一般不低于100g碳水/份' },
  { id: 'c08', name: '肠粉（熟）', macro: 'carb', category: '米类主食', rate: 0.20, gi: '高', notes: '一般50-70g碳水/份' },
  { id: 'c09', name: '粽子', macro: 'carb', category: '米类主食', rate: 0.50, gi: '高', notes: '可吃白粽、豆沙粽，不吃肉粽' },

  // 麦类主食
  { id: 'c10', name: '切片面包', macro: 'carb', category: '麦类主食', rate: 0.50, gi: '高', notes: '脂肪率<8%才算碳水食物，花式面包>10%是糖油混合物' },
  { id: 'c11', name: '馒头/花卷/馍/馕', macro: 'carb', category: '麦类主食', rate: 0.50, gi: '高' },
  { id: 'c12', name: '挂面（生）', macro: 'carb', category: '麦类主食', rate: 0.75, gi: '中', notes: '少有的中等GI碳水，不建议练后餐' },
  { id: 'c13', name: '意面（生）', macro: 'carb', category: '麦类主食', rate: 0.75, gi: '中' },
  { id: 'c14', name: '面条（熟/湿面）', macro: 'carb', category: '麦类主食', rate: 0.30, gi: '高' },
  { id: 'c15', name: '饺子皮/馄饨皮', macro: 'carb', category: '麦类主食', rate: 0.50, gi: '高' },
  { id: 'c16', name: '烧饼/手抓饼', macro: 'carb', category: '麦类主食', rate: 0.45, gi: '高', notes: '含油较多，注意脂肪配额' },
  { id: 'c17', name: '麦片/燕麦片（干）', macro: 'carb', category: '麦类主食', rate: 0.60, gi: '中', notes: '纯燕麦片，非即食甜味麦片' },
  { id: 'c18', name: '全麦面包', macro: 'carb', category: '麦类主食', rate: 0.40, gi: '中' },

  // 薯类主食
  { id: 'c19', name: '红薯/紫薯', macro: 'carb', category: '薯类主食', rate: 0.20, gi: '中', notes: '这是碳水主食，不是蔬菜！' },
  { id: 'c20', name: '土豆', macro: 'carb', category: '薯类主食', rate: 0.18, gi: '高', notes: '这是碳水主食，不是蔬菜！' },
  { id: 'c21', name: '山药', macro: 'carb', category: '薯类主食', rate: 0.13, gi: '中' },
  { id: 'c22', name: '芋头', macro: 'carb', category: '薯类主食', rate: 0.13, gi: '中' },

  // 杂粮
  { id: 'c23', name: '玉米（鲜）', macro: 'carb', category: '杂粮', rate: 0.18, gi: '高', notes: '这是碳水主食，不是蔬菜！' },
  { id: 'c24', name: '玉米（干）', macro: 'carb', category: '杂粮', rate: 0.65, gi: '高' },

  // 豆类（碳水）
  { id: 'c25', name: '红豆/绿豆/芸豆（干）', macro: 'carb', category: '豆类', rate: 0.55, gi: '中' },

  // 水果（算碳水）
  { id: 'c26', name: '苹果', macro: 'carb', category: '水果', rate: 0.13, gi: '低' },
  { id: 'c27', name: '香蕉', macro: 'carb', category: '水果', rate: 0.22, gi: '高', notes: '小香蕉~20g碳水，大香蕉~30g碳水' },
  { id: 'c28', name: '橙子/柑橘', macro: 'carb', category: '水果', rate: 0.10, gi: '低' },
  { id: 'c29', name: '葡萄', macro: 'carb', category: '水果', rate: 0.17, gi: '中' },
  { id: 'c30', name: '西瓜', macro: 'carb', category: '水果', rate: 0.06, gi: '高', notes: '碳水率低但GI高' },
  { id: 'c31', name: '芒果', macro: 'carb', category: '水果', rate: 0.15, gi: '中' },
  { id: 'c32', name: '梨', macro: 'carb', category: '水果', rate: 0.13, gi: '低' },
  { id: 'c33', name: '桃/油桃', macro: 'carb', category: '水果', rate: 0.12, gi: '低' },
  { id: 'c34', name: '草莓', macro: 'carb', category: '水果', rate: 0.07, gi: '低' },
  { id: 'c35', name: '蓝莓', macro: 'carb', category: '水果', rate: 0.14, gi: '低' },
  { id: 'c36', name: '猕猴桃', macro: 'carb', category: '水果', rate: 0.14, gi: '低' },
  { id: 'c37', name: '火龙果', macro: 'carb', category: '水果', rate: 0.13, gi: '中' },
  { id: 'c38', name: '荔枝', macro: 'carb', category: '水果', rate: 0.16, gi: '高' },
  { id: 'c39', name: '樱桃/车厘子', macro: 'carb', category: '水果', rate: 0.13, gi: '低' },
  { id: 'c40', name: '哈密瓜', macro: 'carb', category: '水果', rate: 0.08, gi: '高' },
  { id: 'c41', name: '柚子', macro: 'carb', category: '水果', rate: 0.10, gi: '低' },
  { id: 'c42', name: '菠萝', macro: 'carb', category: '水果', rate: 0.10, gi: '中' },

  // 便携快碳
  { id: 'c43', name: '八宝粥（罐装）', macro: 'carb', category: '便携', rate: 0.15, gi: '高', notes: '约30g碳水/罐' },
  { id: 'c44', name: '年糕', macro: 'carb', category: '便携', rate: 0.50, gi: '高' },
  { id: 'c45', name: '麻薯', macro: 'carb', category: '便携', rate: 0.65, gi: '高', notes: '约10g碳水/个' },
  { id: 'c46', name: '蛋白棒（碳水部分）', macro: 'carb', category: '便携', rate: 0.30, gi: '高' },

  // ═══════════════════════════════════════
  // 蛋白质类食物
  // ═══════════════════════════════════════

  // 禽肉
  { id: 'p01', name: '鸡胸肉', macro: 'protein', category: '禽肉', rate: 0.23, gi: '', notes: '最经济的蛋白质来源' },
  { id: 'p02', name: '鸡腿肉（去皮）', macro: 'protein', category: '禽肉', rate: 0.19, gi: '' },
  { id: 'p03', name: '鸭肉（去皮）', macro: 'protein', category: '禽肉', rate: 0.16, gi: '' },

  // 畜肉（瘦肉）
  { id: 'p04', name: '瘦猪肉', macro: 'protein', category: '畜肉', rate: 0.20, gi: '', notes: '无白色脂肪层的猪肉' },
  { id: 'p05', name: '瘦牛肉', macro: 'protein', category: '畜肉', rate: 0.20, gi: '' },
  { id: 'p06', name: '瘦羊肉', macro: 'protein', category: '畜肉', rate: 0.19, gi: '' },

  // 水产
  { id: 'p07', name: '鱼肉（一般）', macro: 'protein', category: '水产', rate: 0.18, gi: '' },
  { id: 'p08', name: '虾仁', macro: 'protein', category: '水产', rate: 0.20, gi: '' },
  { id: 'p09', name: '贝类', macro: 'protein', category: '水产', rate: 0.12, gi: '' },

  // 蛋奶
  { id: 'p10', name: '鸡蛋（全蛋）', macro: 'protein', category: '蛋奶', rate: 0.13, gi: '', notes: '一个蛋约6g蛋白+5g脂肪，宽油炒蛋脂肪可达20g' },
  { id: 'p11', name: '鸡蛋白', macro: 'protein', category: '蛋奶', rate: 0.11, gi: '', notes: '一个蛋白约4g蛋白，几乎零脂肪' },
  { id: 'p12', name: '牛奶', macro: 'protein', category: '蛋奶', rate: 0.03, gi: '', notes: '250ml约8g蛋白' },
  { id: 'p13', name: '酸奶（无糖）', macro: 'protein', category: '蛋奶', rate: 0.04, gi: '' },
  { id: 'p14', name: '豆腐', macro: 'protein', category: '豆制品', rate: 0.08, gi: '' },
  { id: 'p15', name: '豆浆（无糖）', macro: 'protein', category: '豆制品', rate: 0.03, gi: '' },

  // 内脏
  { id: 'p16', name: '猪/鸡肝', macro: 'protein', category: '内脏', rate: 0.19, gi: '' },
  { id: 'p17', name: '猪肚/牛肚', macro: 'protein', category: '内脏', rate: 0.15, gi: '' },

  // 补剂
  { id: 'p18', name: '蛋白粉（一勺）', macro: 'protein', category: '补剂', rate: 0.80, gi: '', notes: '一勺约30g粉=24g蛋白' },
  { id: 'p19', name: '牛肉干', macro: 'protein', category: '便携', rate: 0.45, gi: '', notes: '内蒙牛肉干，非休闲零食' },
];

/** 按宏量素类型筛选 */
export function getFoodsByMacro(macro: MacroType): Food[] {
  return foods.filter(f => f.macro === macro);
}

/** 按类别分组 */
export function getFoodsByCategory(macro: MacroType): Map<string, Food[]> {
  const map = new Map<string, Food[]>();
  for (const f of foods) {
    if (f.macro !== macro) continue;
    const list = map.get(f.category) || [];
    list.push(f);
    map.set(f.category, list);
  }
  return map;
}

/**
 * 计算食物重量
 * @param macroGrams 需要的宏量素克数
 * @param rate 食物的营养率（每100g含多少g该宏量素）
 * @returns 食物重量（克）
 */
export function calcFoodWeight(macroGrams: number, rate: number): number {
  if (rate <= 0) return 0;
  return Math.round(macroGrams / rate);
}
