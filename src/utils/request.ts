import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message, Modal } from 'antd';
import { apiProtocol } from '@/core/adapters/protocol';
import { appConfig } from '@/config/app';
import { getAccessToken, getRefreshToken, setToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';

const ignoredMessages = ['无效的刷新令牌', '刷新令牌已过期'];

export let isRelogin = { show: false };

type RequestCallback = () => void;

let pendingRequests: RequestCallback[] = [];
let isRefreshingToken = false;

const service: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl + appConfig.apiPrefix,
  timeout: 30000,
  withCredentials: false,
});

service.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const skipToken = config.headers?.isToken === false;
    if (getAccessToken() && !skipToken) {
      config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    }

    if (config.method === 'get' && config.params) {
      const query = serializeQuery(config.params);
      if (query) {
        config.url = `${config.url}${config.url?.includes('?') ? '&' : '?'}${query}`;
        config.params = {};
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  async (res: AxiosResponse) => {
    let data = res.data;

    if (res.config.responseType === 'blob' || res.config.responseType === 'arraybuffer') {
      if (res.data?.type !== 'application/json') {
        return res.data;
      }
      data = await new Response(res.data).json();
    }

    const responseData = data as ApiResponse;
    const code = apiProtocol.getCode(responseData);
    const msg = apiProtocol.getMessage(responseData, errorCode[code] || errorCode.default);

    if (ignoredMessages.includes(msg)) {
      return Promise.reject(new Error(msg));
    }

    if (apiProtocol.isUnauthorized(responseData)) {
      return handleUnauthorizedResponse(res);
    }

    if ([500, 501, 901].includes(code)) {
      message.error({ content: msg });
      return Promise.reject(new Error(msg));
    }

    if (!apiProtocol.isSuccess(responseData)) {
      message.error({ content: msg });
      return Promise.reject(new Error(msg));
    }

    return res.data;
  },
  (error) => {
    const errorMsg = normalizeNetworkErrorMessage(error?.message);
    message.error({
      content: errorMsg,
      duration: 5,
    });
    return Promise.reject(error);
  },
);

export function getBaseHeader(): Record<string, string | undefined> {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
  };
}

function serializeQuery(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((propName) => {
    const value = params[propName];
    if (value === null || typeof value === 'undefined') return;

    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.keys(value).forEach((key) => {
        const nestedValue = value[key];
        if (nestedValue === null || typeof nestedValue === 'undefined') return;
        searchParams.append(`${propName}[${key}]`, String(nestedValue));
      });
      return;
    }

    searchParams.append(propName, String(value));
  });

  return searchParams.toString();
}

async function handleUnauthorizedResponse(res: AxiosResponse): Promise<any> {
  if (isRefreshTokenRequest(res.config.url)) {
    return handleAuthorized();
  }

  if (isRefreshingToken) {
    return new Promise((resolve) => {
      pendingRequests.push(() => {
        if (res.config.headers) {
          res.config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        }
        resolve(service(res.config));
      });
    });
  }

  isRefreshingToken = true;

  if (!getRefreshToken()) {
    isRefreshingToken = false;
    return handleAuthorized();
  }

  try {
    const { tokenRefreshService } = await import('@/core/services/tokenRefreshService');
    const refreshTokenRes = await tokenRefreshService.refreshToken();
    setToken(refreshTokenRes.data);
    pendingRequests.forEach((callback) => callback());
    return service(res.config);
  } catch {
    pendingRequests.forEach((callback) => callback());
    return handleAuthorized();
  } finally {
    pendingRequests = [];
    isRefreshingToken = false;
  }
}

function isRefreshTokenRequest(url = ''): boolean {
  return url.includes('/system/auth/refresh-token');
}

function normalizeNetworkErrorMessage(errorMsg = ''): string {
  if (errorMsg === 'Network Error') {
    return '后端接口连接异常';
  }

  if (errorMsg.includes('timeout')) {
    return '系统接口请求超时';
  }

  if (errorMsg.includes('Request failed with status code')) {
    return `系统接口 ${errorMsg.slice(-3)} 异常`;
  }

  return errorMsg || '系统接口未知异常';
}

function handleAuthorized(): Promise<never> {
  if (!isRelogin.show) {
    isRelogin.show = true;
    Modal.confirm({
      title: '提示',
      content: '身份凭证已过期，请重新登录。',
      okText: '重新登录',
      cancelText: '取消',
      onOk() {
        isRelogin.show = false;
        location.href = `${location.origin}/#${appConfig.loginRoute}`;
      },
      onCancel() {
        isRelogin.show = false;
      },
    });
  }

  return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'));
}

export default service;
