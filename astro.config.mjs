import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

import react from "@astrojs/react"


// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap(), react()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  defaultLocale: 'fr',
  locales: ['fr'],
});
