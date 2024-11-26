import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  defaultLocale: 'fr',
  locales: ['fr'],
});
