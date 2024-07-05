import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import sassDts from "vite-plugin-sass-dts";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.REACT_APP_BASE_URL": JSON.stringify(
      "https://dev-api.arsonex.market/v1/",
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
      srcDir: "src",
      filename: 'serviceWorker.js',
      strategies: "injectManifest",
      injectManifest: {
        maximumFileSizeToCacheInBytes: 3000000,
      }
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
