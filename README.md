# 松松健身

[![Astro](https://img.shields.io/badge/Astro-6-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-333333?logo=unocss&logoColor=white)](https://unocss.dev)
[![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)](https://bun.sh)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC--BY--SA--4.0-lightgrey)](LICENSE)

> 用配额吃饭，不算卡路里。

把 [B站@好人松松](https://space.bilibili.com/2078781964) 的健身方法论结构化为网页，便于搜索、阅读和分享。

**在线访问** → https://love4yzp.github.io/songsong-fitness/

## 功能

| 模块 | 说明 |
|------|------|
| 饮食方案 | 输入体重 + 选场景 → 吸顶控制台 + 高密度餐单 + 公式穿透 |
| 食物数据库 | 113 种食物营养率，搜索 + 按需换算克数 |
| 知识体系 | 4 篇方法论文章（为什么有效、怎么运作、减脂须知、增肌须知） |
| 训练计划 | 三分化、四分化、居家方案 + 通用原则 |
| 常见问题 | 按症状聚类的 FAQ（体重不动、外食、饥饿感等） |
| 亮/暗主题 | CSS 变量驱动，跟随系统偏好或手动切换 |

## 导航结构

5 个 Tab：**首页** | **方案** | **学习** | **食物** | **更多**

- `/` — 内容枢纽（学习、Q&A、训练、食物库入口）
- `/plan` — 饮食仪表盘（profile 门槛 → 吸顶控制台 → 餐单）
- `/learn` — 理解体系
- `/food` — 食物数据库 + 黑名单
- `/more` — Q&A、训练计划、关于

## 快速开始

```bash
git clone https://github.com/Love4yzp/songsong-fitness.git
cd songsong-fitness
bun install
bun run dev       # http://localhost:4321
bun run build     # 构建到 dist/
```

需要 Node.js >= 22 和 [Bun](https://bun.sh)。

## 项目结构

```
src/
├── content/          # Markdown 内容（learn/, qa/, training/）
├── content.config.ts # Content Collections Schema (Zod)
├── components/       # Vue 交互组件（MealPlanner, FoodBrowser, TheoryBadge 等）
├── data/             # 静态数据（foods.ts, scenarios.ts, theory.ts）
├── layouts/          # 布局模板（Base, AppShell, Article）
├── logic/            # 计算逻辑（calculator.ts）
├── pages/            # 路由（静态页 + [slug] 动态路由）
├── stores/           # Nanostores 状态管理（profile + localStorage）
└── styles/           # CSS 变量（global.css — 亮/暗双主题）
```

AI 协作规范见 [`CLAUDE.md`](CLAUDE.md) 和 [`AGENTS.md`](AGENTS.md)。

## 贡献

欢迎 PR。核心原则：**忠实于原作**，不添加、不修改松松的方法论。

## 许可

[CC BY-SA 4.0](LICENSE)。内容版权归好人松松所有，本站做结构化呈现。

## 致谢

- [好人松松 B站主页](https://space.bilibili.com/2078781964)
- [原始资料（百度网盘）](https://pan.baidu.com/s/1iY73CTNleiiB0wGa0uh8jA?pwd=5s62)
- [配套视频 BV1zu4m1N76R](https://www.bilibili.com/video/BV1zu4m1N76R)

*本站不提供医疗建议。*
