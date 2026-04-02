# AGENTS.md

通用 AI 协作规范（Cursor / Copilot / 其他 AI 工具）。

> **编码规则、颜色系统、数据接口的完整定义见 [`CLAUDE.md`](./CLAUDE.md)**，本文件只做概要索引。

## 项目概要

好人松松健身方法论的结构化内容网站。

- **技术栈**：Astro 6 + Vue 3 + UnoCSS + Nanostores + Bun
- **内容系统**：Astro Content Collections（`src/content.config.ts`，glob loader + Zod）
- **部署**：GitHub Pages（push main → GitHub Actions 自动构建）
- **设计风格**：亮/暗双主题 App Shell，CSS 变量驱动（仿 daisyUI），橙色强调色

## 导航结构

5 个 Tab：**首页 | 方案 | 学习 | 食物 | 更多**

| Tab | 路径 | 内容 |
|-----|------|------|
| 首页 | `/` | 内容枢纽：学习文章、Q&A、训练计划、食物库入口 |
| 方案 | `/plan` | 饮食仪表盘（profile 门槛 + 吸顶控制台 + 高密度餐单） |
| 学习 | `/learn` | 理解体系（4 篇方法论文章） |
| 食物 | `/food` | 食物数据库（113 种）+ 黑名单 |
| 更多 | `/more` | Q&A、训练计划、关于 |

`/calculator` 已合并进 `/plan`，保留为重定向页。

## 关键文件

| 路径 | 作用 |
|------|------|
| `src/styles/global.css` | CSS 变量定义（`:root` 亮色 / `.dark` 暗色）—— 唯一颜色值源 |
| `uno.config.ts` | UnoCSS tokens + shortcuts |
| `src/layouts/Base.astro` | 全局布局（head/header/footer） |
| `src/layouts/AppShell.astro` | 工具页布局（100dvh + 5-Tab） |
| `src/layouts/Article.astro` | 内容页布局 |
| `src/data/scenarios.ts` | 场景配置（`Scenario`, `MealSlot`） |
| `src/data/foods.ts` | 食物数据（`Food`） |
| `src/data/theory.ts` | 理论金句（`TheoryTip`） |
| `src/logic/calculator.ts` | BMR/TDEE/宏量素计算 |
| `src/stores/profile.ts` | 用户档案 Nanostore（含 `$hasCompletedSetup`） |
| `src/components/MealPlanner.vue` | 方案页核心组件 |
| `src/components/TheoryBadge.vue` | 理论金句展示组件 |

## 编码规则速查

详见 `CLAUDE.md` 的编码规范章节。最容易踩坑的三条：

1. **颜色禁止 hardcode** — 只用 CSS 变量 token，禁止 `text-gray-*` / `bg-zinc-*`
2. **亮暗必须同步** — 新增 `--c-*` 变量时 `:root` 和 `.dark` 必须同时写
3. **Food.rate 是 0–1 小数** — 每 100g 中该宏量素的克数，不是百分比

## 内容规则

- **忠实于原作**：不添加、不修改松松的方法论
- 不要删除现有的 `index.astro` 列表页
- Content Collections `draft: true` 不生成页面，用于占位

## 构建验证

```bash
bun run build    # 必须 exit 0
bun run dev      # http://localhost:4321
```
