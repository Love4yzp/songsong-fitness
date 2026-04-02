# AGENTS.md

通用 AI 协作规范（Cursor / Copilot / 其他 AI 工具）。详细规则见 `CLAUDE.md`。

## 项目概要

好人松松健身知识内容网站，将 Excel 套表结构化为网页。

- **技术栈**：Astro 6 + Vue 3 + UnoCSS + Nanostores + Bun
- **内容系统**：Astro Content Collections（`src/content.config.ts`，glob loader + Zod）
- **部署**：GitHub Pages（push main → GitHub Actions 自动构建）
- **设计风格**：亮/暗双主题 App Shell，CSS 变量驱动（仿 daisyUI），橙色强调色

## 导航结构

5 个 Tab：**首页 | 方案 | 学习 | 食物 | 更多**

| Tab | 路径 | 内容 |
|-----|------|------|
| 首页 | `/` | 内容枢纽：学习文章、Q&A、训练计划、食物库入口 |
| 方案 | `/plan` | 饮食仪表盘（含 profile 门槛 + 吸顶控制台 + 高密度餐单） |
| 学习 | `/learn` | 理解体系（4 篇方法论文章） |
| 食物 | `/food` | 食物数据库（113 种） + 黑名单 |
| 更多 | `/more` | Q&A、训练计划、关于 |

`/calculator` 已合并进 `/plan`，保留为重定向页。

## 关键文件

| 路径 | 作用 |
|------|------|
| `src/styles/global.css` | CSS 变量定义（`:root` 亮色 / `.dark` 暗色）—— 唯一颜色值源 |
| `uno.config.ts` | UnoCSS tokens + shortcuts —— 通过 `rgb(var(--c-*))` 引用变量 |
| `src/layouts/Base.astro` | 全局布局（head/header/footer） |
| `src/layouts/AppShell.astro` | 工具页布局（100dvh + 5-Tab 导航） |
| `src/layouts/Article.astro` | 内容页布局（原生滚动 + 返回栏） |
| `src/content.config.ts` | Content Collections schema |
| `src/content/{learn,qa,training}/` | Markdown 内容源 |
| `src/pages/**/[slug].astro` | 动态路由 |
| `src/data/foods.ts` | 食物数据（`Food` 含 `id, name, macro, rate, gi`） |
| `src/data/scenarios.ts` | 场景配置（`Scenario`, `MealSlot`） |
| `src/data/theory.ts` | 理论金句（`TheoryTip`, `getTipsForMeal()`） |
| `src/logic/calculator.ts` | BMR/TDEE/宏量素计算纯函数 |
| `src/stores/profile.ts` | 用户档案 Nanostore + localStorage（含 `$hasCompletedSetup`） |
| `src/components/MealPlanner.vue` | 方案页核心：profile 门槛 + 吸顶控制台 + 餐单 |
| `src/components/TheoryBadge.vue` | 松松理论金句展示组件 |
| `astro.config.mjs` | Astro 配置（base: `/songsong-fitness`） |

## 编码规则

1. **颜色全部走 CSS 变量**（仿 daisyUI）：UnoCSS 用 `text-fg`, `bg-info/10` 等 token；`<style>` 块用 `rgb(var(--c-fg))`。禁止 `text-gray-*`, `bg-zinc-*`, `text-red-400`。唯一例外：`text-white`。
2. **亮暗双主题必须同步**：新增 CSS 变量时，`:root`（亮色）和 `.dark`（暗色）必须同时定义，不能只写一套。
3. **语义命名**：强调色 `accent`（非 `brand`），信号色 `info/success/warning/error`（非 `blue-400/red-400`）。
4. **内部链接**：Astro 中用 `url()` 包装，Vue 中用 `import.meta.env.BASE_URL`。
5. **全局样式**：html/body 只改 `src/styles/global.css`，组件 `<style is:global>` 只用于自己的深层选择器。
6. **Nanostores**：Vue 中必须 `useStore($xxx)`，不要直接导入 atom。
7. **Vue**：Composition API + `<script setup>` + TypeScript。
8. **Astro**：静态优先，仅交互组件用 Vue（`client:load`）。
9. **提交**：Conventional Commits（`feat:`, `fix:`, `docs:`, `refactor:`）。
10. **Food.rate**：每 100g 中该宏量素的克数（0–1 小数）。没有 `carb/protein/fat/unit` 字段。
11. **修改前检查**：确认 import 存在、字段在 interface 中定义、改了接口要同步调用方。

## 内容规则

- **忠实于原作**：不添加、不修改松松的方法论
- 不要删除现有的 `index.astro` 列表页
- Content Collections `draft: true` 不生成页面，用于占位
- callout 类：`callout-tip`（蓝）、`callout-warn`（橙）、`callout-important`（红）

## 构建验证

```bash
bun run build    # 必须 exit 0，无 error 输出
bun run dev      # 本地开发 http://localhost:4321
```
