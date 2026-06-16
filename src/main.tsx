import React from "react";
import ReactDOM from "react-dom/client";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { ThemeProvider } from "@/theme";
import { appConfig } from "@/config/app";

import "./index.css";
import "dayjs/locale/zh-cn";

import App from "./App";

dayjs.locale("zh-cn");

const MSW_ENABLE = appConfig.mockEnabled;
const mockServiceWorkerUrl = `${import.meta.env.BASE_URL}mockServiceWorker.js`;

async function bootstrap() {
  document.title = appConfig.name;

  if (MSW_ENABLE) {
    const { worker } = await import("./mock/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: mockServiceWorkerUrl,
      },
    });
    console.log("[MSW] Mock Service Worker 已启动");
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("未找到根节点 root，请检查 index.html 是否配置正确");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ConfigProvider>
    </React.StrictMode>
  );
}

bootstrap();
