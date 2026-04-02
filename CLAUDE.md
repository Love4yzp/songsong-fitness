# CLAUDE.md

## 这是什么

好人松松健身知识的内容网站（非工具站）。把 Excel 套表里的知识体系释放为网页，便于搜索、阅读和分享。

方案计算工具在独立项目 `/Users/spencer/Seeed/dev/fitness-app/` 中，本站不做任何计算/交互方案。

## 技术栈

- **Astro 6** — 静态站点生成，内容驱动
- **Vue 3** — 食物数据库等需要交互的组件
- **UnoCSS** — 原子化 CSS + design tokens（`uno.config.ts`）
- **Bun** — 包管理和运行时

```bash
bun run dev      # 开发
bun run build    # 构建到 dist/
```

## 设计风格

**Notion 风格**：白底、大量留白、字体即设计、内容块（callout/table/quote）是一等公民。颜色极度克制。

- Design tokens 定义在 `uno.config.ts`
- 全局布局：`src/layouts/Base.astro`（导航 + footer）
- 文章布局：`src/layouts/Article.astro`（面包屑 + prose 样式）
- 快捷类：`callout-tip`（蓝）、`callout-warn`（橙）、`callout-important`（红）、`card`、`heading-1/2/3`

## 信息架构

按用户意图组织，不按 Excel Sheet 结构：

```
/                       首页（理念声明 + 导航）
/learn/                 理解体系
  philosophy            为什么有效（四条核心理念）
  how-it-works          怎么运作（配额→食物两层模型）
  cutting               减脂须知
  bulking               增肌须知
/food/                  食物数据库（Vue 交互：搜索 + 换算 + 排除清单）
/training/              训练计划
  gym-3                 三分化（待填内容）
  gym-4-shoulder        四分化肩单练（待填）
  gym-4-arms            四分化手臂单练（待填）
  home                  居家（待填）
/qa/                    常见问题（按症状聚类）
  stall                 体重不动了（已完成）
  eating-out            在外面怎么吃（待填）
  hunger                觉得饿（待填）
  alcohol               喝酒（待填）
  medical               特殊体质（待填）
  myths                 常见误区（待填）
  practical             实操细节（待填）
/about                  关于（好人松松归属 + 本站说明）
```

## 内容来源

所有内容基于好人松松健身 Excel 超级套表（30 Sheet），逐 cell 解析数据在 `/private/tmp/fitness-data/`：

| 文件 | 内容 |
|------|------|
| `content-analysis.json` | 完整 cell 内容（文本 + 公式 + 说明文字） |
| `qa_sheets.json` | 减脂 26 问 + 增肌 18 问的全文 |
| `food_database.json` | 108 种食物的营养率数据 |
| `scenarios_structured.json` | 15 个场景的结构化数据 |
| `exercise_sheet_20-24*.json` | 训练计划原始数据 |
| `deep-structure.json` | Sheet 结构元数据 |

设计理念提炼文档：`/Users/spencer/Seeed/docs/ai-yzp/01_Projects/fitness/好人松松体系-设计理念.md`

## 关键原则

1. **忠实于原作**：不添加、不修改松松的方法论，只做结构化呈现
2. **FAQ 按症状聚类**：不按编号列表，用户不关心"第 14 问"
3. **减脂/增肌合并同类项**：~60% 内容重叠，差异处用标注区分
4. **食物页是唯一需要交互的页面**：其余全是内容页
5. **归属**：footer 和 about 页标注 B站@好人松松，链接到视频和社群

## 待完成

- [ ] QA 子页面（eating-out, hunger, alcohol, medical, myths, practical）
- [ ] 训练计划详情页（gym-3, gym-4-shoulder, gym-4-arms, home）
- [ ] 有氧参考页 `/aerobic`
- [ ] 移动端导航优化
- [ ] OG meta + 社交分享图
- [ ] 部署（Cloudflare Pages）
