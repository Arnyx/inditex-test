/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/core.scss" as *;`,
        includePaths: [path.resolve(__dirname, "src/styles")],
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    include: ["**/__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/setupTests.ts",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/config/theme.ts",
        "eslint.config.js",
        "vite.config.ts",
        "src/__tests__/**/*",
        "**/*.d.ts",
        "**/mocks.ts",
      ],
    },
  },
});
