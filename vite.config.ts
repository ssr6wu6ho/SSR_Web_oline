import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer(),],
    },
  },
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
