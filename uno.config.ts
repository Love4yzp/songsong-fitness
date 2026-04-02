import { defineConfig, presetUno, presetTypography } from 'unocss';

// Helper: reference a CSS custom property as rgb() with alpha support
// Usage in UnoCSS: bg-bg/50 → background: rgb(var(--c-bg) / 0.5)
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  theme: {
    colors: {
      bg: {
        DEFAULT: c('bg'),
        secondary: c('bg-2'),
        tertiary: c('bg-3'),
      },
      fg: {
        DEFAULT: c('fg'),
        secondary: c('fg-2'),
        tertiary: c('fg-3'),
        strong: c('fg-strong'),
      },
      accent: {
        DEFAULT: c('accent'),
        hover: c('accent-hover'),
      },
      border: {
        DEFAULT: c('border'),
        light: c('border-light'),
      },
      // ── Signals ──
      info: {
        DEFAULT: c('info'),
        bg: c('info-bg'),
      },
      success: {
        DEFAULT: c('success'),
        bg: c('success-bg'),
      },
      warning: {
        DEFAULT: c('warning'),
        bg: c('warning-bg'),
      },
      error: {
        DEFAULT: c('error'),
        bg: c('error-bg'),
      },
      // ── Domain ──
      macro: {
        carb: c('macro-carb'),
        protein: c('macro-protein'),
        fat: c('macro-fat'),
      },
      status: {
        deficit: c('status-deficit'),
        surplus: c('status-surplus'),
      },
      role: {
        pre: c('role-pre'),
        post: c('role-post'),
        snack: c('role-snack'),
      },
      // ── Input (Task 1 inserts below) ──
      input: {
        status: c('input-status'),
        scenario: c('input-scenario'),
      },
    },
    fontFamily: {
      sans: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      mono: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
    },
  },
  shortcuts: {
    // ── 布局 ──
    'container': 'max-w-3xl mx-auto px-6',
    'container-wide': 'max-w-5xl mx-auto px-6',
    'container-tool': 'max-w-2xl mx-auto px-6',

    // ── App Shell ──
    'app-shell': 'h-[100dvh] flex flex-col overflow-hidden bg-bg text-fg',
    'app-content': 'flex-1 overflow-y-auto pb-20 md:pb-6',
    'bottom-tabs': 'md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg/95 backdrop-blur-sm border-t border-border flex items-center justify-around pb-[env(safe-area-inset-bottom)] z-50',
    'tab-item': 'flex flex-col items-center justify-center gap-1 text-[10px] text-fg-tertiary transition-colors flex-1',
    'tab-item-active': 'tab-item text-accent font-medium',
    'sidebar': 'hidden md:flex flex-col w-20 bg-bg border-r border-border py-6 items-center gap-6 fixed left-0 top-0 bottom-0 z-50',
    'sidebar-item': 'flex flex-col items-center gap-1.5 text-[10px] text-fg-tertiary hover:text-fg transition-colors',
    'sidebar-item-active': 'sidebar-item text-accent font-medium',

    // ── 排版 ──
    'heading-1': 'text-4xl font-bold text-fg-strong tracking-tight',
    'heading-2': 'text-2xl font-semibold text-fg-strong tracking-tight',
    'heading-3': 'text-lg font-semibold text-fg-strong',
    'body-text': 'text-base text-fg leading-relaxed',
    'muted-text': 'text-sm text-fg-secondary',

    // ── 内容块 ──
    'callout': 'px-4 py-3 rounded-md bg-bg-secondary border-l-3',
    'callout-warn': 'callout border-l-warning bg-warning-bg',
    'callout-tip': 'callout border-l-info bg-info-bg',
    'callout-important': 'callout border-l-error bg-error-bg',
    'card': 'bg-bg-secondary rounded-2xl border border-border-light p-5',
    'tag-pill': 'inline-block text-xs px-2 py-0.5 rounded-full',
    'nav-link': 'text-fg-secondary hover:text-accent transition-colors text-sm font-medium',

    // ── 表单控件 ──
    'input-field': 'w-full px-4 py-3 border border-border rounded-xl text-base bg-bg-secondary text-fg focus:outline-none focus:ring-1 focus:ring-accent transition-colors',
    'select-field': 'w-full px-4 py-3 border border-border rounded-xl text-base bg-bg-secondary text-fg focus:outline-none focus:ring-1 focus:ring-accent transition-colors appearance-none',
    'form-label': 'block text-sm font-medium text-fg-secondary mb-1.5',

    // ── 控制台交互 ──
    'console-status': 'bg-input-status border border-[rgb(var(--c-input-status-border))] rounded-lg px-3 py-2 cursor-pointer transition-colors',
    'console-scenario': 'bg-input-scenario border border-[rgb(var(--c-input-scenario-border))] rounded-lg px-3 py-2 cursor-pointer transition-colors',

    // ── 数据展示 ──
    'stat-card': 'bg-bg-secondary rounded-2xl p-4 text-center',
    'stat-value': 'text-2xl font-bold text-fg-strong',
    'stat-label': 'text-xs text-fg-tertiary mt-1',

    // ── 工具卡片 ──
    'tool-card': 'bg-bg-secondary rounded-2xl border border-border p-5',
    'tool-card-title': 'text-sm font-semibold text-fg-strong mb-3',

    // ── 切换按钮组 ──
    'toggle-group': 'flex bg-bg-tertiary rounded-xl p-1 gap-1',
    'toggle-btn': 'flex-1 px-3 py-2 text-sm font-medium rounded-lg text-fg-secondary cursor-pointer transition-all text-center active:scale-95',
    'toggle-btn-active': 'toggle-btn bg-bg-secondary text-fg-strong shadow-sm',

    // ── 角色/目标标签 ──
    'badge-pre': 'tag-pill bg-role-pre/15 text-role-pre',
    'badge-post': 'tag-pill bg-role-post/15 text-role-post',
    'badge-snack': 'tag-pill bg-role-snack/15 text-role-snack',
    'badge-cutting': 'tag-pill bg-status-deficit/20 text-status-deficit',
    'badge-bulking': 'tag-pill bg-status-surplus/20 text-status-surplus',

    // ── 食物行 ──
    'food-row': 'flex justify-between items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-bg-tertiary transition-colors active:scale-[0.98]',

    // ── 按钮 ──
    'btn-primary': 'inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-accent text-white rounded-xl text-base font-bold hover:bg-accent-hover transition-colors active:scale-95',
    'btn-secondary': 'inline-flex items-center justify-center gap-1.5 px-5 py-3 border border-border rounded-xl text-base text-fg-secondary hover:text-fg hover:border-fg-tertiary transition-colors active:scale-95',

    // ── 宏量素颜色 ──
    'macro-carb': 'text-macro-carb',
    'macro-protein': 'text-macro-protein',
    'macro-fat': 'text-macro-fat',

    // ── Console (Task 3 inserts below) ──
  },
});
