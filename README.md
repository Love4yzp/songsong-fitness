# 松松健身

[![Astro](https://img.shields.io/badge/Astro-6-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-333333?logo=unocss&logoColor=white)](https://unocss.dev)
[![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)](https://bun.sh)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC--BY--SA--4.0-lightgrey)](LICENSE)

> 用配额吃饭，不算卡路里。

把 [B站@好人松松](https://space.bilibili.com/2078781964) 的健身 Excel 套表知识体系转化为网页，便于搜索、阅读和分享。

**在线访问** → https://love4yzp.github.io/songsong-fitness/

## 功能

| 模块 | 说明 |
|------|------|
| 饮食计算器 | 输入体重 + 选场景 → 自动算出碳水/蛋白/脂肪目标 |
| 饮食方案 | 每餐吃什么、吃多少克，点击换食物 |
| 食物数据库 | 100+ 种食物营养率，搜索 + 换算 |
| 知识体系 | 减脂/增肌的核心逻辑（Markdown 内容，自动渲染） |
| 训练计划 | 三分化、四分化等方案 |
| 常见问题 | 按症状聚类的 FAQ |

## 快速开始

```bash
git clone https://github.com/Love4yzp/songsong-fitness.git
cd songsong-fitness
bun install
bun run dev       # http://localhost:4321
bun run build     # 构建到 dist/
```

需要 Node.js ≥ 22 和 [Bun](https://bun.sh)。

## 项目结构

```
src/
├── content/         # Markdown 内容（learn/, qa/, training/）
├── content.config.ts # Content Collections Schema
├── components/      # Vue 交互组件
├── data/            # 静态数据（foods.ts, scenarios.ts）
├── layouts/         # 布局模板（Base, Article）
├── logic/           # 计算逻辑（calculator.ts）
├── pages/           # 路由（静态页 + [slug] 动态路由）
└── stores/          # Nanostores 状态管理
```

内容页使用 **Astro Content Collections**：在 `src/content/` 下添加 `.md` 文件即可自动生成页面。详见 [ARCHITECTURE.md](ARCHITECTURE.md)。

## 贡献

欢迎 PR。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

核心原则：**忠实于原作**，不添加、不修改松松的方法论。

## 许可

[CC BY-SA 4.0](LICENSE)。内容版权归好人松松所有，本站做结构化呈现。

## 致谢

- [好人松松 B站主页](https://space.bilibili.com/2078781964)
- [健身超级套表（百度网盘）](https://pan.baidu.com/s/1iY73CTNleiiB0wGa0uh8jA?pwd=5s62)
- [配套视频 BV1zu4m1N76R](https://www.bilibili.com/video/BV1zu4m1N76R)

*本站不提供医疗建议。*
