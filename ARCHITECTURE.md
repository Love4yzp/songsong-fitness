# 技术架构

## 概览

Astro 6 静态站点。内容页由 Markdown（Content Collections）驱动，交互组件（计算器、食物搜索）用 Vue 3 Islands。

```
内容源 (.md)  ──→  Astro Content Collections  ──→  Article 布局  ──→  静态 HTML
数据源 (.ts)  ──→  Vue Islands (client:load)   ──→  Base 布局    ──→  dist/
```

## 技术栈

| 技术 | 用途 |
|------|------|
| Astro 6 | 框架 / SSG / Content Collections |
| Vue 3 | 交互组件（食物搜索、计算器） |
| UnoCSS | 原子化 CSS + Design Tokens |
| Nanostores | 跨框架状态管理（用户档案持久化） |
| Bun | 包管理 + 运行时 |

## 目录结构

```
src/
├── content/              # ★ Markdown 内容（自动渲染为页面）
│   ├── learn/            #   philosophy.md, how-it-works.md, cutting.md, bulking.md
│   ├── qa/               #   stall.md（待补充更多）
│   └── training/         #   （待补充）
├── content.config.ts     # Content Collections Schema（Zod）
├── components/           # Vue 交互组件
│   ├── FoodBrowser.vue   #   食物数据库搜索/筛选
│   ├── FoodPicker.vue    #   食物选择器
│   ├── ProfileSetup.vue  #   用户档案设置
│   └── MealPlanner.vue   #   饮食方案生成
├── data/                 # 静态数据
│   ├── foods.ts          #   100+ 食物营养率
│   └── scenarios.ts      #   15 个场景配置
├── layouts/
│   ├── Base.astro        #   全局布局（导航 + footer + SEO）
│   └── Article.astro     #   文章布局（面包屑 + prose 排版）
├── logic/
│   └── calculator.ts     #   BMR/TDEE/配额纯函数
├── pages/
│   ├── index.astro       #   首页
│   ├── about.astro       #   关于
│   ├── calculator.astro  #   计算器页
│   ├── plan.astro        #   饮食方案页
│   ├── food/index.astro  #   食物数据库页
│   ├── learn/
│   │   ├── index.astro   #   列表页
│   │   └── [slug].astro  #   ★ 动态路由：渲染 content/learn/*.md
│   ├── qa/
│   │   ├── index.astro
│   │   └── [slug].astro  #   ★ 动态路由：渲染 content/qa/*.md
│   └── training/
│       ├── index.astro
│       └── [slug].astro  #   ★ 动态路由：渲染 content/training/*.md
└── stores/
    └── profile.ts        #   Nanostores 用户档案 + localStorage 持久化
```

## 内容系统

### 添加新内容页

在 `src/content/<collection>/` 下创建 `.md` 文件，Astro 自动生成对应 URL：

```
src/content/qa/eating-out.md  →  /qa/eating-out
src/content/learn/xxx.md      →  /learn/xxx
```

### Schema（src/content.config.ts）

每个集合用 Zod 定义 frontmatter 约束。使用 `glob` loader 加载：

```typescript
import { glob } from 'astro/loaders';

const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([...]),
    draft: z.boolean().default(false),
    // ...
  }),
});
```

### 动态路由渲染

`src/pages/learn/[slug].astro` 自动从集合生成页面：

```astro
const { entry } = Astro.props;
const { Content } = await render(entry);
---
<Article title={entry.data.title}>
  <Content />
</Article>
```

## 样式系统

Notion 风格。Design Tokens 定义在 `uno.config.ts`：

- 颜色：`bg-bg`、`text-fg`、`text-macro-protein`
- 快捷类：`callout-tip`、`callout-warn`、`callout-important`、`card`、`heading-1/2/3`

## 部署

GitHub Pages，通过 GitHub Actions 自动部署：

```
push main → .github/workflows/deploy.yml → bun build → upload → GitHub Pages
```

站点地址：https://love4yzp.github.io/songsong-fitness/
