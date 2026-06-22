import type { ApiResponse } from '@/core/types';

export interface ApiProtocol {
  successCode: number;
  unauthorizedCode: number;
  getCode: (response: unknown) => number;
  getData: <T = any>(response: ApiResponse<T> | T) => T;
  getMessage: (response: unknown, fallback?: string) => string;
  isSuccess: (response: unknown) => boolean;
  isUnauthorized: (response: unknown) => boolean;
}

/**
 * 全局后端响应协议。
 *
 * 如果你的后端不是 { code, data, msg }，优先改这里：
 * - successCode / unauthorizedCode：成功码和未登录码。
 * - getData：真实业务数据所在字段。
 * - getMessage：错误提示字段。
 *
 * request、service、hooks 都通过这个协议读取响应，避免在多个地方写重复判断。
 */
export const apiProtocol: ApiProtocol = {
  successCode: 200,
  unauthorizedCode: 401,
  getCode: (response) => {
    if (isApiResponseLike(response)) {
      return Number(response.code ?? 200);
    }

    return 200;
  },
  getData: <T = any>(response: ApiResponse<T> | T): T => {
    if (isApiResponseLike(response) && 'data' in response) {
      return response.data as T;
    }

    return response as T;
  },
  getMessage: (response, fallback = '') => {
    if (!isApiResponseLike(response)) return fallback;
    return String(response.msg || response.message || fallback);
  },
  isSuccess(response) {
    return this.getCode(response) === this.successCode;
  },
  isUnauthorized(response) {
    return this.getCode(response) === this.unauthorizedCode;
  },
};

/**
 * 判断一个对象是否像后端统一响应。
 * 普通数组、Blob、自定义对象会交给调用方或 adapter 继续处理。
 */
export function isApiResponseLike(response: unknown): response is ApiResponse {
  return Boolean(response && typeof response === 'object' && 'code' in response);
}
