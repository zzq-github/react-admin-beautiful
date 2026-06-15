import React from 'react';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'virtual:svg-icons-register';
import { ThemeProvider } from '@/theme';
import { appConfig } from '@/config/app';

// 引入样式
import './index.css';
import 'dayjs/locale/zh-cn';

// 引入根组件
import App from './App';

// 设置 dayjs 语言为中文
dayjs.locale('zh-cn');

/**
 * 是否启用 MSW Mock
 * 通过 appConfig 统一读取 VITE_MSW_ENABLE
 */
const MSW_ENABLE = appConfig.mockEnabled;

/**
 * 启动应用
 * 如果启用了 MSW，先启动 Service Worker 再渲染 React
 * 否则直接渲染（连接真实后端）
 */
async function bootstrap() {
  document.title = appConfig.name;

  if (MSW_ENABLE) {
    const { worker } = await import('./mock/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Mock Service Worker 已启动');
  }

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('未找到根节点 root，请检查 index.html 是否配置正确');
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
