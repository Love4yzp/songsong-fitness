# AGENTS.md

本文件记录项目中 AI Agent 的协作规范，供 AI 辅助开发时参考。

## 项目上下文

- **仓库**：https://github.com/Love4yzp/songsong-fitness
- **技术栈**：Astro 6 + Vue 3 + UnoCSS + Nanostores + Bun
- **内容系统**：Astro Content Collections（`src/content.config.ts`，glob loader + Zod schema）
- **部署**：GitHub Pages via GitHub Actions（push main 自动触发）
- **设计风格**：Notion 风格（白底、留白、字体即设计、颜色极度克制）

## 关键文件索引

| 路径 | 作用 |
|------|------|
| `src/content.config.ts` | Content Collections schema 定义 |
| `src/content/{learn,qa,training}/` | Markdown 内容源 |
| `src/pages/**/[slug].astro` | 动态路由，自动渲染 Markdown |
| `src/layouts/Base.astro` | 全局布局（导航 + footer + SEO meta） |
| `src/layouts/Article.astro` | 文章布局（面包屑 + prose 排版 + pangu） |
| `src/data/foods.ts` | 食物营养率数据 |
| `src/data/scenarios.ts` | 场景配置数据 |
| `src/logic/calculator.ts` | BMR/TDEE/配额计算纯函数 |
| `src/stores/profile.ts` | 用户档案状态 + localStorage 持久化 |
| `uno.config.ts` | Design Tokens + UnoCSS 快捷类 |
| `astro.config.mjs` | Astro 配置（site, base, integrations） |
| `.github/workflows/deploy.yml` | CI/CD：自动构建 + 部署 GitHub Pages |

## 内容操作

### 添加内容页

在 `src/content/<collection>/` 下创建 `.md` 文件：

```markdown
---
title: 页面标题
description: 简短描述
category: slug-name
tags: [标签1, 标签2]
publishedAt: 2024-01-01
---

正文内容（Markdown + HTML callout）
```

集合定义在 `src/content.config.ts`，新增 category 值需同步更新 schema 的 enum。

### 可用 callout 组件

```html
<div class="callout-tip">蓝色提示</div>
<div class="callout-warn">橙色警告</div>
<div class="callout-important">红色重要</div>
```

### 添加食物数据

编辑 `src/data/foods.ts`，在对应类别数组中添加条目。

## 代码规范

- **Vue**：Composition API + `<script setup>` + TypeScript
- **样式**：UnoCSS 原子类，复用 `uno.config.ts` 中的 shortcuts
- **Astro**：静态优先，仅交互组件用 Vue（`client:load`）
- **提交**：Conventional Commits（`feat:`, `fix:`, `docs:`, `refactor:`）

## 构建与验证

```bash
bun run build    # 构建，应输出 13+ 页，exit 0
bun run dev      # 本地开发预览
```

构建成功的标志：`[build] Complete!`，无 error 级别输出。

## 外部链接（单一来源）

| 名称 | URL |
|------|-----|
| 好人松松 B站 | https://space.bilibili.com/2078781964 |
| Excel 套表网盘 | https://pan.baidu.com/s/1iY73CTNleiiB0wGa0uh8jA?pwd=5s62 |
| 配套视频 | https://www.bilibili.com/video/BV1zu4m1N76R |
| 训练视频 | https://www.bilibili.com/video/BV1Hk4y187jF |
| 解剖视频 | https://www.bilibili.com/video/BV1mM6JY6Ei9 |
| 在线站点 | https://love4yzp.github.io/songsong-fitness/ |

修改链接时以此表为准，同步更新所有引用位置。

## 注意事项

1. **忠实于原作**：不添加、不修改松松的方法论
2. **不要删除现有的 index.astro 列表页**：它们是手工维护的导航
3. **Content Collections 的 draft: true**：不会生成页面，用于占位
4. **astro.config.mjs 的 base**：设为 `/songsong-fitness`，所有内部链接无需前缀（Astro 自动处理）
