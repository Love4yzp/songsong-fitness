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

## 设计风格

**Notion 风格**：白底、大量留白、字体即设计。颜色极度克制。

- Design tokens：`uno.config.ts`
- 全局布局：`src/layouts/Base.astro`
- 文章布局：`src/layouts/Article.astro`
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

## 待完成

- [ ] QA 子页面（eating-out, hunger, alcohol, medical, myths, practical）
- [ ] 训练计划详情页（gym-3, gym-4-shoulder, gym-4-arms, home）
- [ ] 有氧参考页 `/aerobic`
- [ ] 移动端导航优化
- [ ] 社交分享图（OG Image）
