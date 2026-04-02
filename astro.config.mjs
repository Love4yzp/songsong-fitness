// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import UnoCSS from '@unocss/astro';

export default defineConfig({
  site: 'https://love4yzp.github.io',
  base: '/songsong-fitness',
  integrations: [vue(), UnoCSS({ injectReset: true })],
});
