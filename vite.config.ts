import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import sassDts from "vite-plugin-sass-dts";
import { VitePWA } from "vite-plugin-pwa";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.REACT_APP_BASE_URL": JSON.stringify(
     "https://staging-api.arsonex.market/v1/",
    ),
  },
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: "arsonex",
      project: "frontend",
      telemetry: false,
      authToken: "",
    }),
    sassDts(), // Add the SASS plugin to the plugins array
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "service-worker.js",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
