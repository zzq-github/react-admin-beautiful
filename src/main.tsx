import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'virtual:svg-icons-register'; 

// 引入样式
import './index.css';
import 'dayjs/locale/zh-cn';

// 引入根组件
import App from './App';

// 设置 dayjs 语言为中文（配合 Ant Design 使用）
dayjs.locale('zh-cn');

/**
 * 是否启用 MSW Mock
 * 通过环境变量 VITE_MSW_ENABLE 控制，仅在 dev 模式下生效
 */
const MSW_ENABLE = import.meta.env.VITE_MSW_ENABLE === 'true';

/**
 * 启动应用
 * 如果启用了 MSW，先启动 Service Worker 再渲染 React
 * 否则直接渲染（连接真实后端）
 */
async function bootstrap() {
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
        <App />
      </ConfigProvider>
    </React.StrictMode>
  );
}

bootstrap();