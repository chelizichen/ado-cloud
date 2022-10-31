import path from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { config } from "./src/config";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: "/src/client/main.ts",
      template: "/index.html",
      inject: {
        data: {
          title: config.title,
          injectScript: config.injectScript,
        },
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: `http://localhost:3001`,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    outDir: "dist/app",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/client"),
    },
  },
});
