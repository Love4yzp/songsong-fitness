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
      tag: {
        red: '#fbe4e4',
        orange: '#f6e9d9',
        yellow: '#fbf3db',
        green: '#ddedea',
        blue: '#d3e5ef',
        purple: '#e8deee',
      },
    },
    fontFamily: {
      sans: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
      mono: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
    },
  },
  shortcuts: {
    'container': 'max-w-3xl mx-auto px-6',
    'container-wide': 'max-w-5xl mx-auto px-6',
    'heading-1': 'text-4xl font-bold text-fg tracking-tight',
    'heading-2': 'text-2xl font-semibold text-fg tracking-tight',
    'heading-3': 'text-lg font-semibold text-fg',
    'body-text': 'text-base text-fg leading-relaxed',
    'muted-text': 'text-sm text-fg-secondary',
    'callout': 'px-4 py-3 rounded-md bg-bg-secondary border-l-3',
    'callout-warn': 'callout border-l-orange-400 bg-tag-orange',
    'callout-tip': 'callout border-l-blue-400 bg-tag-blue',
    'callout-important': 'callout border-l-red-400 bg-tag-red',
    'card': 'bg-white rounded-lg border border-gray-200/80 p-5 hover:shadow-sm transition-shadow',
    'tag-pill': 'inline-block text-xs px-2 py-0.5 rounded-full',
    'nav-link': 'text-fg-secondary hover:text-fg transition-colors text-sm',
  },
});
