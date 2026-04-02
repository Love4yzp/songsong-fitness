# 技术架构文档 (ARCHITECTURE.md)

本文档详细说明了“好人松松健身知识库”的技术架构、设计决策及开发规范，旨在帮助开发者理解项目结构并进行高效扩展。

## 1. 架构概览

本项目是一个基于 **Astro 6** 构建的静态内容驱动站点，旨在将复杂的 Excel 健身套表知识体系转化为易于阅读、搜索和分享的网页。

### 核心设计理念
- **内容优先**：采用 Notion 风格，极简视觉，强调排版和信息层级。
- **数据驱动**：所有核心逻辑（计算公式、食物数据、场景分配）均源自原始 Excel 的结构化解析。
- **极速加载**：利用 Astro 的插件化架构，仅在需要交互的组件（如食物搜索）中引入最小量的 JavaScript。
- **离线友好**：用户输入的身体数据和偏好通过 Nanostores 持久化在本地，无需后端数据库。

### 架构图示
```text
[ 内容源 (Excel/JSON) ] ──> [ src/data (TS Data) ]
                                  │
                                  ▼
[ Astro Pages (SSG) ] <── [ src/logic (Calculators) ] ──> [ Vue Components (Islands) ]
        │                         │                               │
        │                         ▼                               │
        └───────────────> [ src/layouts (Base/Article) ] <────────┘
                                  │
                                  ▼
                        [ 最终静态站点 (dist/) ]
```

---

## 2. 技术栈详解

| 技术 | 作用 | 选择原因 |
| :--- | :--- | :--- |
| **Astro 6** | 核心框架 / SSG | 最佳的内容驱动框架，支持多框架混用，极致的性能。 |
| **Vue 3** | 交互组件 | 逻辑复杂（如食物换算、配额计算）的 UI 块采用 Vue 开发。 |
| **UnoCSS** | 样式系统 | 极速的原子化 CSS 引擎，支持自定义 Design Tokens 和快捷类。 |
| **Nanostores** | 状态管理 | 极轻量（<1KB），原生支持原生 JS/Vue/Astro 共享状态。 |
| **Bun** | 运行时/包管理 | 现代化的开发工具链，速度极快。 |

---

## 3. 项目结构

```text
src/
├── components/       # Vue 交互组件（食物浏览器、计算器等）
├── content/          # (规划中) Markdown 内容集合（QA、教程）
├── data/             # 核心静态数据（foods.ts, scenarios.ts）
├── layouts/          # 页面布局（Base: 全局, Article: 文章页）
├── logic/            # 纯函数业务逻辑（BMR/TDEE 计算公式）
├── pages/            # 路由映射（.astro 页面）
├── stores/           # Nanostores 响应式状态（用户档案、持久化）
└── uno.config.ts     # UnoCSS 配置（Design Tokens, Shortcuts）
```

---

## 4. 内容架构

目前内容主要以 `.astro` 文件形式硬编码，后续将迁移至 **Astro Content Collections**。

### 预设 Schema 设计
```typescript
// src/content/config.ts (示例)
import { defineCollection, z } from 'astro:content';

const qa = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.enum(['stall', 'eating-out', 'medical', 'practical']),
    tags: z.array(z.string()).optional(),
  })
});
```

### 渲染流程
1. **解析**：Astro 读取 `src/content/` 下的 Markdown。
2. **转换**：通过 `getCollection` 获取数据，利用 `render()` 转换为 HTML。
3. **注入**：在 `src/layouts/Article.astro` 中通过 `<slot />` 渲染正文。

---

## 5. 样式系统 (UnoCSS)

项目通过 `uno.config.ts` 定义了一套严格的 **Notion 风格** 视觉规范。

### Design Tokens
- **颜色**：`bg-bg` (白), `text-fg` (深灰), `text-macro-protein` (绿) 等。
- **字体**：系统默认无衬线字体族，强调阅读体验。

### 常用快捷类 (Shortcuts)
- `callout-tip`: 蓝色提示块。
- `callout-warn`: 橙色警告块。
- `card`: Notion 风格的边框卡片。
- `heading-1/2/3`: 预设的标题样式。

示例代码：
```html
<div class="callout-tip">
  <strong>提示：</strong> 练后餐是全天最重要的一顿。
</div>
```

---

## 6. 状态管理 (Nanostores)

用于处理跨组件的响应式数据，特别是用户输入的身体参数。

### 核心 Store: `$profile`
- **位置**：`src/stores/profile.ts`
- **功能**：存储性别、体重、年龄、选定场景。
- **持久化**：通过 `onMount` 自动同步至 `localStorage`。

```typescript
// 使用示例 (Vue)
import { useStore } from '@nanostores/vue';
import { $profile } from '../stores/profile';

const profile = useStore($profile);
console.log(profile.value.weight);
```

---

## 7. 路由设计

- **静态路由**：
  - `/`: 首页
  - `/food`: 食物数据库
  - `/learn`: 体系介绍
  - `/qa`: 常见问题
- **内容路由**：
  - `/learn/philosophy`: 核心理念
  - `/qa/stall`: 体重不动了排查

---

## 8. 数据流

1. **静态数据流**：`src/data/foods.ts` -> Astro Page -> Vue Component Props。
2. **用户数据流**：用户输入 -> `updateProfile()` -> `$profile` (Nanostore) -> 自动触发所有依赖组件的重新计算。
3. **计算流**：`src/logic/calculator.ts` 中的纯函数接收 `$profile` 数据，输出宏量素配额。

---

## 9. 扩展指南

### 添加新食物
在 `src/data/foods.ts` 的 `foods` 数组中添加对象：
```typescript
{ id: 'p20', name: '新食物', macro: 'protein', category: '类别', rate: 0.20 }
```

### 添加新 QA 页面
1. 在 `src/pages/qa/` 下创建 `new-question.astro`。
2. 使用 `<Article>` layout 包裹内容。
3. 在 `src/pages/qa/index.astro` 中添加导航链接。

---

## 10. 部署

### 构建流程
```bash
bun run build
```
该命令会生成 `dist/` 目录，包含纯静态的 HTML/CSS/JS。

### 推荐平台
- **Cloudflare Pages** (首选)：支持自动构建、全球 CDN、免费额度高。
- **Vercel / Netlify**：备选方案。

---

*最后更新：2026-04-02*
