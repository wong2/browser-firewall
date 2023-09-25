import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { crx } from "@crxjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import manifest from "./manifest.config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [tsconfigPaths(), preact(), crx({ manifest })],
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    server: {
      strictPort: true,
      port: 5174,
      hmr: {
        clientPort: 5174,
      },
    },
  };
});
