import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * MSW Service Worker 实例
 * 在浏览器环境下拦截网络请求并返回 mock 数据
 */
export const worker = setupWorker(...handlers)