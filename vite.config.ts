/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Whack-a-mole/", 
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    css: true,
  },
});