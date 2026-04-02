// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import UnoCSS from '@unocss/astro';
import rehypeRaw from 'rehype-raw';
import rehypeBaseUrl from './src/utils/rehype-base-url.ts';

const base = '/songsong-fitness';

export default defineConfig({
  site: 'https://love4yzp.github.io',
  base,
  integrations: [vue(), UnoCSS({ injectReset: true })],
  markdown: {
    rehypePlugins: [rehypeRaw, [rehypeBaseUrl, { base }]],
  },
});
