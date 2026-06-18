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

export function isApiResponseLike(response: unknown): response is ApiResponse {
  return Boolean(response && typeof response === 'object' && 'code' in response);
}
