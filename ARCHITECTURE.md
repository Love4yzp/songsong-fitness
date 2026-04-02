# 技术架构

## 概览

Astro 6 静态站点。内容页由 Markdown（Content Collections）驱动，交互组件（饮食仪表盘、食物搜索）用 Vue 3 Islands。

```
内容源 (.md)  ──→  Astro Content Collections  ──→  Article 布局  ──→  静态 HTML
数据源 (.ts)  ──→  Vue Islands (client:load)   ──→  AppShell 布局 ──→  dist/
```

## 技术栈

| 技术 | 用途 |
|------|------|
| Astro 6 | 框架 / SSG / Content Collections |
| Vue 3 | 交互组件（MealPlanner、FoodBrowser、TheoryBadge） |
| UnoCSS | 原子化 CSS + Design Tokens |
| Nanostores | 跨框架状态管理（用户档案 + localStorage 持久化） |
| Bun | 包管理 + 运行时 |

## 目录结构

```
src/
├── content/              # Markdown 内容（自动渲染为页面）
│   ├── learn/            #   4 篇方法论（philosophy, how-it-works, cutting, bulking）
│   ├── qa/               #   常见问题（stall + 6 个 draft 占位）
│   └── training/         #   训练计划（4 个 draft 占位）
├── content.config.ts     # Content Collections Schema（Zod）
├── components/           # Vue 交互组件
│   ├── MealPlanner.vue   #   饮食仪表盘（profile 门槛 + 吸顶控制台 + 餐单）
│   ├── FoodBrowser.vue   #   食物数据库搜索/筛选
│   ├── FoodPicker.vue    #   食物选择器（弹窗）
│   ├── TheoryBadge.vue   #   松松理论金句展示
│   └── ProfileSetup.vue  #   用户档案设置（旧版入口，/calculator 已重定向到 /plan）
├── data/                 # 静态数据
│   ├── foods.ts          #   113 种食物营养率
│   ├── scenarios.ts      #   15 个场景配置（MealSlot, Scenario）
│   └── theory.ts         #   理论金句（TheoryTip）
├── layouts/
│   ├── Base.astro        #   全局布局（导航 + footer + SEO + 主题切换）
│   ├── AppShell.astro    #   工具页 App Shell（100dvh + 5-Tab 导航 + 主题切换）
│   └── Article.astro     #   文章布局（返回栏 + prose 排版）
├── logic/
│   └── calculator.ts     #   BMR/TDEE/配额/餐次分配纯函数
├── pages/
│   ├── index.astro       #   首页（内容枢纽）
│   ├── about.astro       #   关于
│   ├── calculator.astro  #   重定向到 /plan
│   ├── plan.astro        #   饮食方案页（MealPlanner）
│   ├── more.astro        #   更多（Q&A、训练、关于）
│   ├── food/index.astro  #   食物数据库页
│   ├── learn/
│   │   ├── index.astro   #   列表页（动态，getCollection）
│   │   └── [slug].astro  #   动态路由：渲染 content/learn/*.md
│   ├── qa/
│   │   ├── index.astro   #   列表页（动态，getCollection）
│   │   └── [slug].astro  #   动态路由：渲染 content/qa/*.md
│   └── training/
│       ├── index.astro   #   列表页（动态，getCollection）+ 通用原则
│       └── [slug].astro  #   动态路由：渲染 content/training/*.md
├── stores/
│   └── profile.ts        #   Nanostores 用户档案 + $hasCompletedSetup + $isTrainingDay
└── styles/
    └── global.css        #   CSS 变量（:root 亮色 / .dark 暗色）
```

## 内容系统

### 添加新内容页

在 `src/content/<collection>/` 下创建 `.md` 文件，Astro 自动生成对应 URL：

```
src/content/qa/eating-out.md  →  /qa/eating-out
src/content/learn/xxx.md      →  /learn/xxx
```

设置 `draft: true` 的文件不会生成页面，也不会出现在 index 列表中。

### Index 页动态生成

所有 index 页使用 `getCollection()` 动态获取已发布内容，不硬编码链接：

```astro
const entries = (await getCollection('qa'))
  .filter(e => !e.data.draft);
```

## 样式系统

亮/暗双主题 App Shell。Design Tokens 定义在 `global.css`（CSS 变量）和 `uno.config.ts`（UnoCSS token）。

- 颜色 token：`bg-bg`、`text-fg`、`text-macro-protein`、`bg-input-status`
- 快捷类：`callout-tip`、`callout-warn`、`card`、`heading-1/2/3`、`console-status`
- 详细规则见 [`CLAUDE.md`](CLAUDE.md) 编码规范章节

## 部署

GitHub Pages，通过 GitHub Actions 自动部署：

```
push main → .github/workflows/deploy.yml → bun build → GitHub Pages
```

站点地址：https://love4yzp.github.io/songsong-fitness/
