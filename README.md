# 松松健身 (Songsong Fitness)

[![Astro](https://img.shields.io/badge/Astro-6.1.2-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Vue](https://img.shields.io/badge/Vue-3.5.31-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-66.6.7-333333?logo=unocss&logoColor=white)](https://unocss.dev)
[![Bun](https://img.shields.io/badge/Bun-1.x-000000?logo=bun&logoColor=white)](https://bun.sh)
[![License](https://img.shields.io/badge/License-CC--BY--SA--4.0-lightgrey)](https://creativecommons.org/licenses/by-sa/4.0/)

> **用配额吃饭，不算卡路里。**

## 📖 项目简介

**松松健身** 是一个基于 B站@好人松松 健身知识体系的开源内容网站。本项目旨在将松松老师复杂的 Excel 套表知识体系转化为易于搜索、阅读和分享的网页版，帮助健身爱好者更科学地管理饮食与训练。

核心理念：**配额制饮食**。通过将食物转化为简单的“配额”单位，摆脱繁琐的卡路里计算，实现可持续的饮食管理。

## ✨ 功能特性

- 🥗 **饮食计算器**：根据个人身体数据，一键生成减脂/增肌配额方案。
- 🍱 **饮食方案**：提供结构化的全天饮食建议，覆盖多种生活场景。
- 🍎 **食物数据库**：内置 100+ 种常见食物的营养率数据，支持搜索与换算。
- 🧠 **知识体系**：系统化呈现减脂、增肌的核心逻辑与底层原理。
- 🏋️ **训练计划**：包含三分化、四分化等多种进阶训练方案。
- ❓ **常见问题**：按症状聚类的 FAQ，解决体重不动、外食、饥饿等实操难题。

## 🌐 在线预览

[https://fitness.seeed.cc](https://fitness.seeed.cc) (待部署)

## 🛠️ 技术栈

- **Astro 6** - 现代化的静态站点生成器，极致的性能体验。
- **Vue 3** - 用于食物搜索、计算器等交互性组件。
- **UnoCSS** - 原子化 CSS 引擎，极致的开发效率。
- **Nanostores** - 轻量级状态管理，支持跨框架通信。
- **Bun** - 极速的 JavaScript 运行时与包管理器。

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/your-username/fitness-site.git
cd fitness-site
```

### 2. 安装依赖
```bash
bun install
```

### 3. 本地开发
```bash
bun run dev
```
访问 `http://localhost:4321` 查看效果。

### 4. 构建生产版本
```bash
bun run build
```
构建产物将生成在 `dist/` 目录。

## 📂 项目结构

```text
/
├── public/              # 静态资源（图片、图标等）
├── src/
│   ├── components/      # Vue/Astro 交互组件
│   ├── content/         # Markdown 内容源（食物、QA、训练等）
│   ├── data/            # 结构化数据（食物营养率、场景数据）
│   ├── layouts/         # 页面布局模板
│   ├── logic/           # 核心计算逻辑
│   ├── pages/           # 路由页面
│   ├── stores/          # 状态管理 (Nanostores)
│   └── styles/          # 全局样式
├── uno.config.ts        # UnoCSS 配置文件
├── astro.config.mjs     # Astro 配置文件
└── package.json         # 项目依赖与脚本
```

## 🤝 内容贡献

本项目内容严格遵循 **好人松松** 的健身体系。如果你发现内容有误或希望补充新的 FAQ，欢迎提交 Pull Request。

- **修改内容**：主要在 `src/content/` 下的 Markdown 文件中进行。
- **修改数据**：食物数据位于 `src/data/foods.ts`。

## 📄 许可协议

本项目代码采用 MIT 协议，内容部分遵循 [CC BY-SA 4.0 (署名-相同方式共享 4.0 国际)](https://creativecommons.org/licenses/by-sa/4.0/deed.zh) 协议。

## 🙏 致谢

特别感谢 **B站@好人松松** 提供的健身知识体系与 Excel 工具支持。

- [好人松松的 B站主页](https://space.bilibili.com/179739)
- [好人松松的健身超级套表](https://www.bilibili.com/video/BV1uJ411m7vJ)

---
*声明：本站仅作为知识分享，不提供医疗建议。开始任何健身计划前请咨询专业人士。*
