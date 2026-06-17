import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { ReactInjectorVitePlugin } from "yunji-tagger";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const enableTagger = env.VITE_TAGGER_ENABLE === "true";
  const apiPrefix = env.VITE_API_PREFIX || "/api";
  const proxyTarget = env.VITE_PROXY_TARGET || "http://localhost:8080";

  return {
    base: "./",
    plugins: [
      react(),
      enableTagger && ReactInjectorVitePlugin(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 3030,
      proxy: {
        [apiPrefix]: {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
