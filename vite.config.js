import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { ReactInjectorVitePlugin } from "yunji-tagger";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function manualChunks(id) {
  const normalizedId = id.replace(/\\/g, "/");

  if (!normalizedId.includes("/node_modules/")) {
    return undefined;
  }

  if (
    normalizedId.includes("/node_modules/react/") ||
    normalizedId.includes("/node_modules/react-dom/") ||
    normalizedId.includes("/node_modules/react-router-dom/") ||
    normalizedId.includes("/node_modules/@remix-run/router/") ||
    normalizedId.includes("/node_modules/scheduler/")
  ) {
    return "vendor-react";
  }

  if (
    normalizedId.includes("/node_modules/@ant-design/icons") ||
    normalizedId.includes("/node_modules/@ant-design/icons-svg") ||
    normalizedId.includes("/node_modules/lucide-react/")
  ) {
    return "vendor-icons";
  }

  if (normalizedId.includes("/node_modules/antd/")) {
    if (
      normalizedId.includes("/node_modules/antd/es/form") ||
      normalizedId.includes("/node_modules/antd/es/input") ||
      normalizedId.includes("/node_modules/antd/es/input-number") ||
      normalizedId.includes("/node_modules/antd/es/select") ||
      normalizedId.includes("/node_modules/antd/es/checkbox") ||
      normalizedId.includes("/node_modules/antd/es/radio") ||
      normalizedId.includes("/node_modules/antd/es/date-picker") ||
      normalizedId.includes("/node_modules/antd/es/time-picker") ||
      normalizedId.includes("/node_modules/antd/es/upload")
    ) {
      return "vendor-antd-form";
    }

    if (
      normalizedId.includes("/node_modules/antd/es/table") ||
      normalizedId.includes("/node_modules/antd/es/pagination") ||
      normalizedId.includes("/node_modules/antd/es/tree") ||
      normalizedId.includes("/node_modules/antd/es/empty") ||
      normalizedId.includes("/node_modules/antd/es/tag") ||
      normalizedId.includes("/node_modules/antd/es/badge") ||
      normalizedId.includes("/node_modules/antd/es/card") ||
      normalizedId.includes("/node_modules/antd/es/statistic") ||
      normalizedId.includes("/node_modules/antd/es/list")
    ) {
      return "vendor-antd-data";
    }

    if (
      normalizedId.includes("/node_modules/antd/es/modal") ||
      normalizedId.includes("/node_modules/antd/es/drawer") ||
      normalizedId.includes("/node_modules/antd/es/dropdown") ||
      normalizedId.includes("/node_modules/antd/es/popover") ||
      normalizedId.includes("/node_modules/antd/es/tooltip") ||
      normalizedId.includes("/node_modules/antd/es/message") ||
      normalizedId.includes("/node_modules/antd/es/notification")
    ) {
      return "vendor-antd-feedback";
    }

    return "vendor-antd-core";
  }

  if (normalizedId.includes("/node_modules/@ant-design/")) {
    return "vendor-antd-core";
  }

  if (
    normalizedId.includes("/node_modules/rc-") ||
    normalizedId.includes("/node_modules/@rc-component/")
  ) {
    return "vendor-rc";
  }

  if (
    normalizedId.includes("/node_modules/recharts/") ||
    normalizedId.includes("/node_modules/d3-") ||
    normalizedId.includes("/node_modules/d3/")
  ) {
    return "vendor-charts";
  }

  if (
    normalizedId.includes("/node_modules/msw/") ||
    normalizedId.includes("/node_modules/@mswjs/") ||
    normalizedId.includes("/node_modules/@open-draft/") ||
    normalizedId.includes("/node_modules/graphql/")
  ) {
    return "vendor-mock";
  }

  return "vendor";
}

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
    build: {
      rollupOptions: {
        output: {
          manualChunks,
        },
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          warn(warning);
        },
      },
    },
  };
});
