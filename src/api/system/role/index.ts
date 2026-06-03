import request from "@/utils/request";
import { RoleListQueryReq, RoleRespVO, RoleSaveReqVO } from "./types";

// FIX: Add ApiResponse and PageResult interfaces to resolve missing type errors.
interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}
interface PageResult<T = any> {
  list: T[];
  total: number;
}

// 查询角色列表
export function getRolePage(
  query: RoleListQueryReq,
): Promise<ApiResponse<PageResult<RoleRespVO>>> {
  return request({
    url: "/system/role/page",
    method: "get",
    params: query,
  });
}

// 获取简单角色列表
export function getRoleListAllSimple(): Promise<ApiResponse<RoleRespVO[]>> {
  return request({
    url: "/system/role/list-all-simple",
    method: "get",
  });
}
// 新增角色
export function addRole(data: RoleSaveReqVO): Promise<ApiResponse> {
  return request({
    url: "/system/role/create",
    method: "post",
    data: data,
  });
}

// 修改角色
export function updateRole(data: RoleSaveReqVO): Promise<ApiResponse> {
  return request({
    url: "/system/role/update",
    method: "put",
    data: data,
  });
}

// 删除角色
export function deleteRole(roleId: number): Promise<ApiResponse> {
  return request({
    url: "/system/role/delete?id=" + roleId,
    method: "delete",
  });
}