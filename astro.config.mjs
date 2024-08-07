import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap(), db()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});
