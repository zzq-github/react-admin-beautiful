import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getAccessToken, getRefreshToken, setToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { message, Modal } from "antd";
import { apiProtocol } from "@/core/adapters/protocol";
import { appConfig } from "@/config/app";

// 需要忽略的提示
const ignoreMsgs: string[] = ["无效的刷新令牌", "刷新令牌已过期"];

// 是否显示重新登录
export let isRelogin = { show: false };
// 请求队列回调类型
type RequestCallback = () => void;
let requestList: RequestCallback[] = [];
// 是否正在刷新中
let isRefreshToken = false;

/**
 * API 基础配置
 * 通过 appConfig 统一读取 VITE_BASE_API 和 VITE_API_PREFIX
 */
const API_BASE_URL = appConfig.apiBaseUrl;
const API_PREFIX = appConfig.apiPrefix;

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: API_BASE_URL + API_PREFIX,
  timeout: 30000,
  withCredentials: false,
});

// 设置默认请求头
service.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 注入 Token
    const isToken = config.headers?.isToken === false;
    if (getAccessToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getAccessToken();
    }

    // GET 请求 params 序列化
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        const part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              let params = propName + "[" + key + "]";
              const subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    return config;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  async (res: AxiosResponse) => {
    let data = res.data;

    // 处理二进制数据
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      if (res.data.type !== "application/json") {
        return res.data;
      }
      data = await new Response(res.data).json();
    }

    // 使用全局定义的 ApiResponse 结构
    const responseData = data as ApiResponse;
    const code = apiProtocol.getCode(responseData);
    const msg = apiProtocol.getMessage(responseData, errorCode[code] || errorCode["default"]);

    if (ignoreMsgs.indexOf(msg) !== -1) {
      return Promise.reject(msg);
    } else if (apiProtocol.isUnauthorized(responseData)) {
      if (!isRefreshToken) {
        isRefreshToken = true;
        if (!getRefreshToken()) {
          return handleAuthorized();
        }
        try {
          const { tokenRefreshService } = await import("@/core/services/tokenRefreshService");
          const refreshTokenRes = await tokenRefreshService.refreshToken();
          setToken(refreshTokenRes.data);
          requestList.forEach((cb) => cb());
          return service(res.config);
        } catch (e) {
          requestList.forEach((cb) => cb());
          return handleAuthorized();
        } finally {
          requestList = [];
          isRefreshToken = false;
        }
      } else {
        return new Promise((resolve) => {
          requestList.push(() => {
            if (res.config.headers) {
              res.config.headers["Authorization"] =
                "Bearer " + getAccessToken();
            }
            resolve(service(res.config));
          });
        });
      }
    } else if ([500, 501, 901].includes(code)) {
      message.error({ content: msg });
      return Promise.reject(new Error(msg));
    } else if (!apiProtocol.isSuccess(responseData)) {
      if (msg !== "无效的刷新令牌") {
        message.error({ content: msg });
      }
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  (error: any) => {
    console.log("err" + error);
    let { message: errorMsg } = error;
    if (errorMsg === "Network Error") {
      errorMsg = "后端接口连接异常";
    } else if (errorMsg.includes("timeout")) {
      errorMsg = "系统接口请求超时";
    } else if (errorMsg.includes("Request failed with status code")) {
      errorMsg = "系统接口" + errorMsg.substr(errorMsg.length - 3) + "异常";
    }
    message.error({
      content: errorMsg,
      duration: 5,
    });
    return Promise.reject(error);
  }
);

/**
 * 获取基础请求头
 */
export function getBaseHeader(): Record<string, string | undefined> {
  const headers: Record<string, string | undefined> = {
    Authorization: "Bearer " + getAccessToken(),
  };
  return headers;
}

/**
 * 处理未授权（401）
 */
function handleAuthorized(): Promise<never> {
  if (!isRelogin.show) {
    isRelogin.show = true;
    Modal.confirm({
      title: "提示",
      content: "身份凭证过期，请重新登录!",
      okText: "重新登录",
      cancelText: "取消",
      onOk() {
        isRelogin.show = false;
        location.href = `${location.origin}/#${appConfig.loginRoute}`;
      },
      onCancel() {
        isRelogin.show = false;
      },
    });
  }
  return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
}

export default service;
