import request from "@/utils/request";
import { MenuListQueryReq, MenuRespVO, MenuSaveVO } from "./types";

// 查询菜单列表
export function getListMenu(
  query: MenuListQueryReq,
): Promise<ApiResponse<MenuRespVO[]>> {
  return request({
    url: "/system/menu/list",
    method: "get",
    params: query,
  });
}

// 查询菜单详细
export function getMenuById(id: number): Promise<ApiResponse> {
  return request({
    url: "/system/menu/get?id=" + id,
    method: "get",
  });
}

// 新增菜单
export function addMenu(data: MenuSaveVO): Promise<ApiResponse> {
  return request({
    url: "/system/menu/create",
    method: "post",
    data: data,
  });
}

// 修改菜单
export function updateMenu(data: MenuSaveVO): Promise<ApiResponse> {
  return request({
    url: "/system/menu/update",
    method: "put",
    data: data,
  });
}

// 删除菜单
export function deleteMenu(id: number): Promise<ApiResponse> {
  return request({
    url: "/system/menu/delete?id=" + id,
    method: "delete",
  });
}
