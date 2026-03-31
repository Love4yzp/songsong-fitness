// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import UnoCSS from '@unocss/astro';

export default defineConfig({
  integrations: [vue(), UnoCSS({ injectReset: true })],
});
