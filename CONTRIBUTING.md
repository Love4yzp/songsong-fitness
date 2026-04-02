# 贡献指南 (Contributing Guide)

感谢你对“好人松松健身知识库”项目的关注！我们非常欢迎社区成员参与进来，共同完善这个健身知识体系。

## 1. 欢迎

本站是一个非营利性的内容展示网站，旨在将 B 站 UP 主 **@好人松松** 的健身 Excel 套表体系转化为易于搜索、阅读和分享的网页。

**核心原则：忠实于原作。** 我们不添加、不修改松松的方法论，只做结构化呈现。

## 2. 如何贡献

你可以通过以下方式参与贡献：

- **报告问题 (Bug Report)**：发现页面显示异常、链接失效或功能错误。
- **提交功能建议 (Feature Request)**：对网站的交互体验、搜索功能或展示方式提出建议。
- **改进内容 (Content Update)**：修正错别字、补充缺失的松松体系内容或优化排版。
- **代码贡献 (Code Contribution)**：直接参与前端开发，优化性能或实现新功能。

## 3. 内容编辑指南

内容准确性对健身知识至关重要。

- **Markdown 格式**：所有内容页均使用标准 Markdown 编写。
- **图片规范**：
  - 尽量使用矢量图 (SVG) 或高压缩率的 WebP。
  - 图片应存放在 `public/images/` 目录下。
- **来源标注**：
  - 任何内容的修改或新增必须符合松松的体系。
  - 提交 PR 时请在描述中注明参考的松松视频标题或 Excel 表格位置。
- **排版风格**：遵循 Notion 风格，保持简洁，使用项目定义的 Callout 组件（如 `callout-tip`）。

## 4. 开发环境设置

本项目基于 Astro 6 和 Vue 3 构建。

- **Node.js**：版本 >= 22
- **包管理器**：[Bun](https://bun.sh/) (推荐) 或 npm/pnpm

### 本地启动步骤：

```bash
# 克隆仓库
git clone https://github.com/your-username/fitness-site.git
cd fitness-site

# 安装依赖
bun install

# 启动开发服务器
bun run dev
```

## 5. 提交规范

### Commit Message 格式

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档或内容更新
- `style`: 样式调整（不影响逻辑）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：`docs: 修正减脂 26 问中关于酒精摄入的描述`

### 分支命名

- 功能开发：`feature/your-feature-name`
- 修复问题：`fix/issue-number-or-description`
- 内容更新：`docs/content-update-name`

## 6. Pull Request 流程

1. **Fork** 本仓库到你的账号。
2. **Create** 你的特性分支 (`git checkout -b feature/AmazingFeature`)。
3. **Commit** 你的更改 (`git commit -m 'feat: Add some AmazingFeature'`)。
4. **Push** 到分支 (`git push origin feature/AmazingFeature`)。
5. **Open** 一个 Pull Request。

## 7. 代码风格

- **UnoCSS**：使用原子化 CSS，尽量复用 `uno.config.ts` 中定义的 design tokens。避免编写冗余的 CSS 文件。
- **Vue 组件**：
  - 使用 **Composition API** 和 `<script setup>`。
  - 遵循 TypeScript 类型定义。
  - 保持组件职责单一。
- **Astro**：优先使用静态组件，仅在需要交互时引入 Vue。

## 8. 行为准则

参与本项目请遵守我们的 [行为准则 (CODE_OF_CONDUCT.md)](./CODE_OF_CONDUCT.md)。

---

再次感谢你的贡献！如果有任何疑问，请随时通过 Issue 与我们联系。
