/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is deployed to GitHub Pages under /<repo-name>/.
// Set BASE_PATH=/ when deploying to a custom domain or the user root site.
const base = process.env.BASE_PATH ?? "/linear-algebra-lab/";

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
