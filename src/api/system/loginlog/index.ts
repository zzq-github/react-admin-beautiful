import request from "@/utils/request";
import { LoginLogQueryReq, LoginLogRespVO } from "./types";


// 查询登录日志列表
export function getLoginLogByPage(query: LoginLogQueryReq) 
: Promise<ApiResponse<PageResult<LoginLogRespVO>>>{
  return request({
    url: "/system/login-log/page",
    method: "get",
    params: query,
  });
}

// 导出登录日志
export function exportLoginLog(query: LoginLogQueryReq) {
  return request({
    url: "/system/login-log/export-excel",
    method: "get",
    params: query,
    responseType: "blob",
  });
}
