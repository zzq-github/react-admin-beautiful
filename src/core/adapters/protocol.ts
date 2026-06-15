export interface ApiProtocol {
  successCode: number;
  unauthorizedCode: number;
  getCode: (response: any) => number;
  getData: <T = any>(response: any) => T;
  getMessage: (response: any, fallback?: string) => string;
  isSuccess: (response: any) => boolean;
  isUnauthorized: (response: any) => boolean;
}

export const apiProtocol: ApiProtocol = {
  successCode: 200,
  unauthorizedCode: 401,
  getCode: (response) => response?.code ?? 200,
  getData: <T = any>(response: any) => response?.data as T,
  getMessage: (response, fallback = '') => response?.msg || response?.message || fallback,
  isSuccess(response) {
    return this.getCode(response) === this.successCode;
  },
  isUnauthorized(response) {
    return this.getCode(response) === this.unauthorizedCode;
  },
};

