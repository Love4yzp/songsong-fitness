# 贡献指南

感谢关注！本站将 [B站@好人松松](https://space.bilibili.com/2078781964) 的健身体系转化为网页。**核心原则：忠实于原作。**

## 贡献方式

- **内容纠错**：发现与松松原始 Excel/视频不一致的内容
- **补充内容**：添加待填的 QA、训练计划等页面
- **Bug 报告**：页面显示异常、链接失效
- **功能建议**：交互体验、搜索、展示优化

## 开发环境

```bash
git clone https://github.com/Love4yzp/songsong-fitness.git
cd songsong-fitness
bun install       # 需要 Node.js ≥ 22 + Bun
bun run dev       # http://localhost:4321
```

## 添加/修改内容

内容页使用 Markdown，存放在 `src/content/` 下。添加新页面只需：

1. 在对应目录创建 `.md` 文件（如 `src/content/qa/eating-out.md`）
2. 填写 frontmatter：

```yaml
---
title: 在外面怎么吃
description: 外食场景的饮食策略
category: eating-out
tags: [外食, 减脂]
publishedAt: 2024-06-01
---
```

3. 编写正文（支持标准 Markdown + HTML callout 组件）
4. 构建验证：`bun run build`

可用的 callout 样式：`callout-tip`（蓝）、`callout-warn`（橙）、`callout-important`（红）。

## 提交规范

**Commit Message**（[Conventional Commits](https://www.conventionalcommits.org/)）：

```
feat: 新功能          fix: 修复 Bug
docs: 内容/文档更新    style: 样式调整
refactor: 重构        chore: 构建/工具
```

**分支命名**：`feature/xxx`、`fix/xxx`、`docs/xxx`

## PR 流程

1. Fork → 创建分支 → 提交更改 → 发起 PR
2. 内容修改需在 PR 描述中注明参考的松松视频或 Excel 位置
3. 确保 `bun run build` 通过

## 代码风格

- Vue：Composition API + `<script setup>` + TypeScript
- 样式：UnoCSS 原子类，复用 `uno.config.ts` 中的 design tokens
- Astro：静态优先，仅交互组件使用 Vue

## 行为准则

参与即表示同意 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。
