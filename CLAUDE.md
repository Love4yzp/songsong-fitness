# CLAUDE.md

## 项目定位

好人松松健身知识的内容网站。把 Excel 套表里的知识体系释放为网页，便于搜索、阅读和分享。

- 仓库：https://github.com/Love4yzp/songsong-fitness
- 在线：https://love4yzp.github.io/songsong-fitness/
- 部署：GitHub Pages（push main 自动触发 GitHub Actions）

## 技术栈

Astro 6 + Vue 3 + UnoCSS + Nanostores + Bun

```bash
bun run dev      # 开发 http://localhost:4321
bun run build    # 构建到 dist/
```

## 内容架构

内容页使用 **Astro Content Collections**（Markdown → 自动渲染）。

```
src/content/
├── learn/    philosophy.md, how-it-works.md, cutting.md, bulking.md
├── qa/       stall.md（待补充 eating-out, hunger, alcohol 等）
└── training/ （待补充 gym-3, gym-4 等）
```

动态路由 `src/pages/{learn,qa,training}/[slug].astro` 自动渲染对应集合中的 `.md` 文件。

Schema 定义在 `src/content.config.ts`，使用 `glob` loader + Zod。

## 导航结构

5 个 Tab：**首页 | 方案 | 学习 | 食物 | 更多**

- `/` — 内容枢纽（学习文章、Q&A、训练计划、食物库入口）
- `/plan` — 饮食仪表盘（profile 门槛 → 吸顶控制台 → 高密度餐单 + 公式穿透）
- `/learn` — 理解体系（4 篇方法论）
- `/food` — 食物数据库 + 黑名单
- `/more` — Q&A、训练计划、关于
- `/calculator` — 重定向到 `/plan`（已合并）

## 设计风格（V2）

**亮/暗双主题 App Shell**：CSS 变量驱动，默认跟随系统偏好，手动可覆盖（`localStorage.theme`）。

- **CSS 变量定义**：`src/styles/global.css`（`:root` 亮色，`.dark` 暗色）
- **UnoCSS tokens**：`uno.config.ts` — 通过 `rgb(var(--c-*))` 引用变量
- **主题初始化**：`src/layouts/Base.astro` 的 inline script，防闪烁
- App Shell 布局：`src/layouts/AppShell.astro`（工具页 100dvh + 5-Tab 导航）
- 全局布局：`src/layouts/Base.astro`（所有页面共用 head/header）
- 文章布局：`src/layouts/Article.astro`（内容页，原生滚动 + 返回栏）
- 快捷类：`callout-tip`（蓝）、`callout-warn`（橙）、`callout-important`（红）、`card`

## 关键原则

1. **忠实于原作**：不添加、不修改松松的方法论，只做结构化呈现
2. **FAQ 按症状聚类**：用户不关心"第 14 问"
3. **减脂/增肌合并同类项**：~60% 内容重叠，差异处用标注区分
4. **归属**：footer 和 about 页标注 B站@好人松松

## 内容来源

所有内容基于好人松松健身 Excel 超级套表（30 Sheet）。

- B站主页：https://space.bilibili.com/2078781964
- 套表网盘：https://pan.baidu.com/s/1iY73CTNleiiB0wGa0uh8jA?pwd=5s62
- 配套视频：https://www.bilibili.com/video/BV1zu4m1N76R

---

## 编码规范

### 1. 颜色系统：CSS 变量 + 语义 token（仿 daisyUI）

**所有颜色走 CSS 变量**，禁止 hardcode。变量定义在 `global.css`，UnoCSS token 在 `uno.config.ts`。

**Token 层级**：
| 类别 | Token | 用途 |
|------|-------|------|
| Surface | `bg`, `bg-secondary`, `bg-tertiary` | 背景色 |
| Text | `fg`, `fg-secondary`, `fg-tertiary`, `fg-strong` | 文字色 |
| Accent | `accent`, `accent-hover` | 强调/按钮 |
| Border | `border`, `border-light` | 边框 |
| Signal | `info`, `success`, `warning`, `error` + 各自 `-bg` | 语义指示 |
| Domain | `macro-carb/protein/fat`, `status-deficit/surplus`, `role-pre/post/snack` | 业务数据 |
| Input | `input-status`, `input-scenario` + 各自 `-border` | 控制台交互色 |

```
✅ text-fg, bg-bg-secondary, border-border, text-info, bg-error/10
✅ rgb(var(--c-fg)) — 在 <style> 块中直接引用变量

❌ text-gray-100, bg-zinc-800, text-red-400, border-white/5
❌ theme('colors.fg.DEFAULT') — Astro <style is:global> 不处理 theme()
```

唯一例外：`text-white`（用于 bg-accent 上的反色文字）。

### 2. 颜色命名规则

- 强调色：只用 `accent`，不要 `brand`
- 信号色：用 `info/success/warning/error`，不要 `blue-400/green-400/red-400`
- 在 `<style is:global>` 中使用 `rgb(var(--c-*))` 而非 UnoCSS `theme()` 函数
- **亮暗双主题必须同步**：新增 CSS 变量时，`:root`（亮色）和 `.dark`（暗色）必须同时定义。只写一套会导致另一个主题下颜色缺失或不可读。

### 3. 数据接口：以 TypeScript 定义为准

修改组件前必须先读对应的数据/store 文件，确认实际接口：

| 文件 | 关键导出 |
|------|---------|
| `src/stores/profile.ts` | `$profile` (atom), `updateProfile()`, `$isTrainingDay`, `toggleDayType()`, `$hasCompletedSetup` |
| `src/data/scenarios.ts` | `scenarios: Scenario[]`（含 `id`, `goal`, `timing`, `carbQuota`, `proteinQuota`, `trainingDayMeals`, `restDayMeals`），`MealSlot`（含 `role: 'pre-workout'\|'post-workout'\|'normal'\|'snack'`） |
| `src/data/foods.ts` | `foods: Food[]`（含 `id`, `name`, `macro`, `rate`, `gi`），`getFoodsByMacro()`, `calcFoodWeight()` |
| `src/data/theory.ts` | `theoryTips: TheoryTip[]`, `getTipsByRole()`, `getTipsForMeal()` |
| `src/logic/calculator.ts` | `calculateBMR()`, `calculateTDEE()`, `calculateMacros()`, `distributeMeals()`, `calculatePortion()`, `Gender`, `DayType`, `Macros` |

**Food 的 `rate` 是每 100g 食物中该宏量素的克数（0-1 小数）。没有 `carb`/`protein`/`fat`/`unit` 字段。**

### 4. 内部链接：必须用 `url()` 包装

```ts
import { url } from '../utils/url';
// ✅
href={url('/plan')}
// ❌
href="/calculator"
```

Vue 组件中用 `import.meta.env.BASE_URL`：
```ts
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
// ✅
:href="`${base}/plan`"
```

### 5. 全局样式：不允许在组件/布局的 `<style is:global>` 中修改 html/body

`html, body` 的全局样式只能在 `src/styles/global.css` 中定义。
组件或布局的 `<style is:global>` 只能用于该组件自己的深层选择器（如 `.prose-content h2`）。

禁止在 AppShell.astro 中写 `html { overflow: hidden; position: fixed; }`，
因为 Astro 全局样式会泄漏到非 App Shell 页面。

### 6. Nanostores 使用

```ts
// ✅ Vue 组件中
import { useStore } from '@nanostores/vue';
import { $profile } from '../stores/profile';
const profile = useStore($profile);

// ❌ 直接导入为 `profile`（不是 reactive 的）
```

### 7. 文件职责边界

- `uno.config.ts`：颜色 token + shortcuts，不写具体组件样式
- `src/styles/global.css`：html/body 基础样式、scrollbar、focus-visible
- `src/layouts/Base.astro`：head/SEO/header/footer，所有页面共用
- `src/layouts/AppShell.astro`：工具页的 App Shell 壳（引用 Base）
- `src/layouts/Article.astro`：内容页布局（引用 Base）
- 组件 `.vue`：只负责自己的交互逻辑，不定义全局样式

### 8. 修改前必须检查

改一个文件前，先确认：
1. 它的 imports 指向的模块确实存在且导出对应的名称
2. 它使用的数据字段在 TypeScript interface 中确实定义了
3. 如果改了 props/emit 接口，同时更新所有调用方

