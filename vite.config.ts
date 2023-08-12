import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import vitePluginSass from "vite-plugin-sass";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: "arsonex",
      project: "frontend",
    }),
    vitePluginSass(), // Add the SASS plugin to the plugins array
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});