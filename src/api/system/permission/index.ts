import request from "@/utils/request";
import { MenuRespVO } from "../menu/types";
import {
  PermissionAssignRoleDataScopeReqVO,
  PermissionAssignRoleMenuReqVO,
  PermissionAssignUserRoleReqVO,
} from "./types";

// 查询角色拥有的菜单数组
export function listRoleMenus(roleId: number): Promise<ApiResponse<number[]>> {
  return request({
    url: "/system/permission/list-role-menus?roleId=" + roleId,
    method: "get",
  });
}

// 赋予角色菜单
export function assignRoleMenu(
  data: PermissionAssignRoleMenuReqVO,
): Promise<ApiResponse> {
  return request({
    url: "/system/permission/assign-role-menu",
    method: "post",
    data: data,
  });
}

// 查询用户拥有的角色数组
export function listUserRoles(userId:number) {
  return request({
    url: '/system/permission/list-user-roles?userId=' + userId,
    method: 'get'
  })
}

// 赋予用户角色
export function assignUserRole(
  data: PermissionAssignUserRoleReqVO,
): Promise<ApiResponse> {
  return request({
    url: "/system/permission/assign-user-role",
    method: "post",
    data: data,
  });
}

// 赋予角色数据权限
export function assignRoleDataScope(
  data: PermissionAssignRoleDataScopeReqVO,
): Promise<ApiResponse> {
  return request({
    url: "/system/permission/assign-role-data-scope",
    method: "post",
    data: data,
  });
}
