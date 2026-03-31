export interface Food {
  name: string;
  category: string;
  section: 'carb' | 'protein' | 'fat';
  rate: number; // grams of macro per 100g food
  gi?: '高' | '中' | '低';
  notes?: string;
}

export const foods: Food[] = [
  // ── 碳水：米类主食 ──
  { name: '生米', category: '米类主食', section: 'carb', rate: 0.75, gi: '高', notes: '大米、糙米、糯米、小米等不分品种碳水率近似' },
  { name: '米饭（很软）', category: '米类主食', section: 'carb', rate: 0.25, gi: '高', notes: '只有自己做饭才可能这么软' },
  { name: '米饭（一般）', category: '米类主食', section: 'carb', rate: 0.30, gi: '高', notes: '外食的一般米饭，标准外卖盒约 100-120g 碳水/盒' },
  { name: '米饭（偏硬）', category: '米类主食', section: 'carb', rate: 0.35, gi: '高', notes: '外食偏硬米饭' },
  { name: '米粥（稀）', category: '米类主食', section: 'carb', rate: 0.10, gi: '高' },
  { name: '米粥（一般）', category: '米类主食', section: 'carb', rate: 0.13, gi: '高' },
  { name: '米线（熟）', category: '米类主食', section: 'carb', rate: 0.33, gi: '高', notes: '饱腹感很低，外食一般不低于 100g 碳水/份' },
  { name: '肠粉（熟）', category: '米类主食', section: 'carb', rate: 0.20, gi: '高' },
  { name: '粽子', category: '米类主食', section: 'carb', rate: 0.50, gi: '高', notes: '可吃白粽、豆沙粽，不吃肉粽' },

  // ── 碳水：麦类主食 ──
  { name: '切片面包', category: '麦类主食', section: 'carb', rate: 0.50, gi: '高', notes: '普通切片面包脂肪率<8%，花式面包脂肪率>10% 属糖油混合物' },
  { name: '馒头', category: '麦类主食', section: 'carb', rate: 0.50, gi: '高' },
  { name: '面条（熟）', category: '麦类主食', section: 'carb', rate: 0.23, gi: '高', notes: '饱腹感很低，一份碳水 80-160g' },
  { name: '凉面/米线', category: '麦类主食', section: 'carb', rate: 0.33, gi: '高' },
  { name: '生鲜面（未下锅）', category: '麦类主食', section: 'carb', rate: 0.50, gi: '高' },
  { name: '干面（未下锅）', category: '麦类主食', section: 'carb', rate: 0.70, gi: '高' },
  { name: '卷饼/烙饼/馕', category: '麦类主食', section: 'carb', rate: 0.50, gi: '高' },
  { name: '意大利面（熟）', category: '麦类主食', section: 'carb', rate: 0.23, gi: '低', notes: '低 GI，减脂推荐' },
  { name: '全麦面包', category: '麦类主食', section: 'carb', rate: 0.40, gi: '中' },

  // ── 碳水：薯类/其他淀粉 ──
  { name: '红薯', category: '薯类淀粉', section: 'carb', rate: 0.20, gi: '中', notes: '这些不是蔬菜，是碳水主食' },
  { name: '土豆', category: '薯类淀粉', section: 'carb', rate: 0.18, gi: '高' },
  { name: '玉米', category: '薯类淀粉', section: 'carb', rate: 0.18, gi: '中' },
  { name: '山药', category: '薯类淀粉', section: 'carb', rate: 0.13, gi: '中' },
  { name: '芋头', category: '薯类淀粉', section: 'carb', rate: 0.13, gi: '中' },
  { name: '燕麦片（干）', category: '薯类淀粉', section: 'carb', rate: 0.60, gi: '低', notes: '指干重，非加水后重量；纯燕麦片才是低 GI' },
  { name: '燕麦麸皮（干）', category: '薯类淀粉', section: 'carb', rate: 0.40, gi: '低' },

  // ── 碳水：水果 ──
  { name: '苹果', category: '水果', section: 'carb', rate: 0.13, gi: '低', notes: '约 20-30g 碳水/个' },
  { name: '橙子', category: '水果', section: 'carb', rate: 0.11, gi: '低', notes: '约 20-30g 碳水/个' },
  { name: '香蕉', category: '水果', section: 'carb', rate: 0.22, gi: '高', notes: '约 20-30g 碳水/根' },
  { name: '梨子', category: '水果', section: 'carb', rate: 0.14, gi: '低' },
  { name: '蓝莓', category: '水果', section: 'carb', rate: 0.14, gi: '低', notes: '约 15g 碳水/盒' },
  { name: '猕猴桃', category: '水果', section: 'carb', rate: 0.14, gi: '低' },
  { name: '柚子', category: '水果', section: 'carb', rate: 0.10, gi: '低' },
  { name: '桃子', category: '水果', section: 'carb', rate: 0.10, gi: '低' },
  { name: '葡萄', category: '水果', section: 'carb', rate: 0.10, gi: '中' },
  { name: '菠萝', category: '水果', section: 'carb', rate: 0.10, gi: '中' },
  { name: '西瓜', category: '水果', section: 'carb', rate: 0.07, gi: '高' },
  { name: '蜜瓜', category: '水果', section: 'carb', rate: 0.07, gi: '高' },
  { name: '草莓', category: '水果', section: 'carb', rate: 0.07, gi: '低' },

  // ── 碳水：便携/方便 ──
  { name: '八宝粥（罐装）', category: '便携碳水', section: 'carb', rate: 0.15, gi: '高', notes: '约 30g 碳水/罐' },
  { name: '年糕', category: '便携碳水', section: 'carb', rate: 0.50, gi: '高' },
  { name: '麻薯', category: '便携碳水', section: 'carb', rate: 0.65, gi: '高', notes: '约 10g 碳水/个' },
  { name: '蛋白棒', category: '便携碳水', section: 'carb', rate: 0.30, gi: '中', notes: '看包装营养表，各品牌差异大' },

  // ── 蛋白质 ──
  { name: '鸡胸肉（熟）', category: '禽类', section: 'protein', rate: 0.30, notes: '去皮，蒸/煮/烤' },
  { name: '鸡腿肉（去皮熟）', category: '禽类', section: 'protein', rate: 0.25, notes: '小鸡腿约 15g 蛋白，全鸡腿约 40g' },
  { name: '鸭腿（去皮熟）', category: '禽类', section: 'protein', rate: 0.20, notes: '全鸭腿约 20g 蛋白' },
  { name: '猪/牛/羊瘦肉（熟）', category: '畜类', section: 'protein', rate: 0.25, notes: '必须无白色脂肪层' },
  { name: '鱼虾贝（熟）', category: '海鲜', section: 'protein', rate: 0.20 },
  { name: '鱼虾（生）', category: '海鲜', section: 'protein', rate: 0.15 },
  { name: '内脏（肝肾肚血心）', category: '内脏', section: 'protein', rate: 0.20, notes: '约等于瘦肉；脑/舌较肥，肠=五花肉级别' },
  { name: '鸡蛋（全蛋）', category: '蛋奶', section: 'protein', rate: 0, notes: '每个约 6g 蛋白 + 5g 脂肪，蛋白质计按个数' },
  { name: '蛋白（只蛋白）', category: '蛋奶', section: 'protein', rate: 0, notes: '每个约 4g 蛋白，几乎零脂肪' },
  { name: '牛奶（全脂/脱脂）', category: '蛋奶', section: 'protein', rate: 0.03, notes: '每 250ml 约 8g 蛋白' },
  { name: '希腊酸奶', category: '蛋奶', section: 'protein', rate: 0.07, notes: '看包装，各品牌差异大' },
  { name: '豆腐（嫩/老）', category: '豆类', section: 'protein', rate: 0.07, notes: '嫩豆腐 5%，老豆腐 8%' },
  { name: '蛋白粉', category: '补剂', section: 'protein', rate: 0.75, notes: '10g 粉 ≈ 30g 熟瘦肉的蛋白质' },
  { name: '内蒙牛肉干', category: '补剂', section: 'protein', rate: 0.40, notes: '注意碳水率不超过 10%，10g 干 ≈ 20g 熟瘦肉' },
];

export const categories = [...new Set(foods.map((f) => f.category))];

export const carbFoods = foods.filter((f) => f.section === 'carb');
export const proteinFoods = foods.filter((f) => f.section === 'protein');
