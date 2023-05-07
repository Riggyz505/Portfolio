import { defineConfig } from 'astro/config';
import css from "rollup-plugin-import-css";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['open-props'],
    }
  },
});