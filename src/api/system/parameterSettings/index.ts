import request from "@/utils/request";
import {
  ConfigRespVO,
  FileConfigSaveReqVO,
  GetConfigPageQueryReq,
} from "./types";

// 查询参数列表
export function getConfigListByPage(
  query: GetConfigPageQueryReq,
): Promise<ApiResponse<PageResult<ConfigRespVO>>> {
  return request({
    url: "/infra/config/page",
    method: "get",
    params: query,
  });
}

// 新增参数配置
export function addConfig(data: FileConfigSaveReqVO): Promise<ApiResponse> {
  return request({
    url: "/infra/config/create",
    method: "post",
    data: data,
  });
}

// 修改参数配置
export function updateConfig(data: FileConfigSaveReqVO): Promise<ApiResponse> {
  return request({
    url: "/infra/config/update",
    method: "put",
    data: data,
  });
}

// 删除参数配置
export function deleteConfig(configId: number): Promise<ApiResponse> {
  return request({
    url: "/infra/config/delete?id=" + configId,
    method: "delete",
  });
}
