import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  getTenantId,
  setToken,
  getVisitTenantId,
} from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { getTenantEnable } from "@/utils/ruoyi";
import { refreshToken } from "@/api/login";
import { ApiEncrypt } from "@/utils/encrypt";
import { message, Modal } from "antd";

// 需要忽略的提示
const ignoreMsgs: string[] = ["无效的刷新令牌", "刷新令牌已过期"];

// 是否显示重新登录
export let isRelogin = { show: false };
// 请求队列回调类型
type RequestCallback = () => void;
let requestList: RequestCallback[] = [];
// 是否正在刷新中
let isRefreshToken = false;

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_BASE_API as string) + "/admin-api/",
  timeout: 30000,
  withCredentials: false,
});

// 设置默认请求头
service.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    const isToken = config.headers?.isToken === false;
    if (getAccessToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getAccessToken();
    }

    // 设置租户
    if (getTenantEnable()) {
      const tenantId = getTenantId();
      if (tenantId) {
        config.headers["tenant-id"] = tenantId;
      }
      const visitTenantId = getVisitTenantId();
      if (config.headers.Authorization && visitTenantId) {
        config.headers["visit-tenant-id"] = visitTenantId;
      }
    }

    // get请求映射params参数
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

    // 是否 API 加密
    if (config.headers?.isEncrypt) {
      try {
        if (config.data) {
          config.data = ApiEncrypt.encryptRequest(config.data);
          config.headers[ApiEncrypt.getEncryptHeader()] = "true";
        }
      } catch (error) {
        console.error("请求数据加密失败:", error);
        throw error;
      }
    }
    return config;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  },
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

    // 检查是否需要解密响应数据
    const encryptHeader = ApiEncrypt.getEncryptHeader();
    const isEncryptResponse =
      res.headers[encryptHeader] === "true" ||
      res.headers[encryptHeader.toLowerCase()] === "true";

    if (isEncryptResponse && typeof data === "string") {
      try {
        data = ApiEncrypt.decryptResponse(data);
        res.data = data;
      } catch (error: any) {
        console.error("响应数据解密失败:", error);
        throw new Error("响应数据解密失败: " + error.message);
      }
    }

    // 使用全局定义的 ApiResponse 结构
    const responseData = data as ApiResponse;
    const code = responseData.code || 200;
    const msg = responseData.msg || errorCode[code] || errorCode["default"];

    if (ignoreMsgs.indexOf(msg) !== -1) {
      return Promise.reject(msg);
    } else if (code === 401) {
      if (!isRefreshToken) {
        isRefreshToken = true;
        if (!getRefreshToken()) {
          return handleAuthorized();
        }
        try {
          const refreshTokenRes = await refreshToken();
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
    } else if (code !== 200) {
      if (msg !== "无效的刷新令牌") {
        message.error({ content: msg });
      }
      return Promise.reject("error");
    } else {
      return res.data; // 返回 ApiResponse 结构中的 data 部分，或者整个 data，取决于你的业务习惯
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
  },
);

/**
 * 获取基础请求头
 */
export function getBaseHeader(): Record<string, string | undefined> {
  const headers: Record<string, string | undefined> = {
    Authorization: "Bearer " + getAccessToken(),
    "tenant-id": getTenantId() as string,
  };
  const visitTenantId = getVisitTenantId();
  if (getAccessToken() && visitTenantId) {
    headers["visit-tenant-id"] = visitTenantId;
  }
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
        location.href = `${location.origin}/#/login`;
      },
      onCancel() {
        isRelogin.show = false;
      },
    });
  }
  return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
}

export default service;
