import { defineConfig, presetUno, presetTypography } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  theme: {
    colors: {
      bg: {
        DEFAULT: '#ffffff',
        secondary: '#f7f7f5',
        tertiary: '#f0f0ee',
      },
      fg: {
        DEFAULT: '#37352f',
        secondary: '#6b6b6b',
        tertiary: '#9b9a97',
      },
      accent: {
        DEFAULT: '#2eaadc',
        soft: '#2eaadc18',
      },
      border: {
        DEFAULT: '#e0e0de',
        light: '#f0f0ee',
      },
      tag: {
        red: '#fbe4e4',
        orange: '#f6e9d9',
        yellow: '#fbf3db',
        green: '#ddedea',
        blue: '#d3e5ef',
        purple: '#e8deee',
      },
      // 宏量素颜色
      macro: {
        carb: '#e67700',
        protein: '#2b8a3e',
        fat: '#d6336c',
      },
      // 状态颜色
      status: {
        deficit: '#2b8a3e',
        surplus: '#e67700',
      },
      // 餐次角色
      role: {
        pre: '#f59f00',
        post: '#20c997',
        snack: '#868e96',
      },
    },
    fontFamily: {
      sans: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      mono: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
    },
  },
  darkMode: 'class',
  shortcuts: {
    // ── 布局 ──
    'container': 'max-w-3xl mx-auto px-6',
    'container-wide': 'max-w-5xl mx-auto px-6',
    'container-tool': 'max-w-2xl mx-auto px-6',

    // ── 排版 ──
    'heading-1': 'text-4xl font-bold text-fg dark:text-gray-100 tracking-tight',
    'heading-2': 'text-2xl font-semibold text-fg dark:text-gray-100 tracking-tight',
    'heading-3': 'text-lg font-semibold text-fg dark:text-gray-100',
    'body-text': 'text-base text-fg dark:text-gray-100 leading-relaxed',
    'muted-text': 'text-sm text-fg-secondary dark:text-gray-400',

    // ── 内容块 ──
    'callout': 'px-4 py-3 rounded-md bg-bg-secondary dark:bg-gray-800/80 border-l-3',
    'callout-warn': 'callout border-l-orange-400 bg-tag-orange dark:bg-orange-900/30',
    'callout-tip': 'callout border-l-blue-400 bg-tag-blue dark:bg-blue-900/30',
    'callout-important': 'callout border-l-red-400 bg-tag-red dark:bg-red-900/30',
    'card': 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200/80 dark:border-gray-700/80 p-5 hover:shadow-sm transition-all',
    'tag-pill': 'inline-block text-xs px-2 py-0.5 rounded-full',
    'nav-link': 'text-fg-secondary dark:text-gray-400 hover:text-fg dark:hover:text-gray-100 transition-colors text-sm',

    // ── 表单控件 ──
    'input-field': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-fg dark:text-gray-100 focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 transition-colors',
    'select-field': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-fg dark:text-gray-100 focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 transition-colors appearance-none',
    'form-label': 'block text-xs font-medium text-fg-secondary dark:text-gray-400 mb-1',

    // ── 数据展示 ──
    'stat-card': 'bg-bg-secondary dark:bg-gray-800 rounded-lg p-4 text-center',
    'stat-value': 'text-2xl font-bold text-fg dark:text-gray-100',
    'stat-label': 'text-xs text-fg-tertiary dark:text-gray-500 mt-1',

    // ── 工具卡片 ──
    'tool-card': 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200/80 dark:border-gray-700/80 p-5',
    'tool-card-title': 'text-sm font-semibold text-fg dark:text-gray-100 mb-3',

    // ── 切换按钮组 ──
    'toggle-group': 'flex bg-bg-secondary dark:bg-gray-800 rounded-lg p-1 gap-1',
    'toggle-btn': 'flex-1 px-3 py-1.5 text-sm font-medium rounded-md text-fg-secondary dark:text-gray-400 cursor-pointer transition-all text-center',
    'toggle-btn-active': 'toggle-btn bg-white dark:bg-gray-700 text-fg dark:text-gray-100 shadow-sm',

    // ── 角色/目标标签 ──
    'badge-pre': 'tag-pill bg-role-pre/15 text-role-pre',
    'badge-post': 'tag-pill bg-role-post/15 text-role-post',
    'badge-snack': 'tag-pill bg-role-snack/15 text-role-snack',
    'badge-cutting': 'tag-pill bg-status-deficit/10 text-status-deficit',
    'badge-bulking': 'tag-pill bg-status-surplus/10 text-status-surplus',

    // ── 食物行 ──
    'food-row': 'flex justify-between items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-bg-secondary dark:hover:bg-gray-800 transition-colors',

    // ── 按钮 ──
    'btn-primary': 'inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-fg dark:bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-fg/90 dark:hover:bg-gray-600 transition-colors',
    'btn-secondary': 'inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-fg-secondary dark:text-gray-400 hover:text-fg dark:hover:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 transition-colors',

    // ── 宏量素颜色 ──
    'macro-carb': 'text-macro-carb',
    'macro-protein': 'text-macro-protein',
    'macro-fat': 'text-macro-fat',
  },
});
