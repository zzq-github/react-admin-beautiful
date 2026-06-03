import request from "@/utils/request";
import { OperateLogQueryReq, OperateLogRespVO } from "./types";

/**
 * 查询操作日志列表
 * @param query 查询参数
 */
export function getOperateLogByPage(
  query: OperateLogQueryReq,
): Promise<ApiResponse<PageResult<OperateLogRespVO>>> {
  return request({
    url: "/system/operate-log/page",
    method: "get",
    params: query,
  });
}

/**
 * 导出操作日志
 * @param query 查询参数
 */
export function exportOperateLog(query: OperateLogQueryReq) {
  return request({
    url: "/system/operate-log/export-excel",
    method: "get",
    params: query,
    responseType: "blob",
  });
}
