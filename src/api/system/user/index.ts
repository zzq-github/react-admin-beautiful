import request from "@/utils/request";
import { UserImportRespVO, userListQueryReq, UserRespVO, UserSaveReqVO, UserSimpleRespVO, UserUpdatePasswordReqVO, UserUpdateStatusReqVO } from "./types";

// 查询用户列表
export function getUserByPage(
  query: userListQueryReq,
): Promise<ApiResponse<PageResult<UserRespVO>>> {
  return request({
    url: "/system/user/page",
    method: "get",
    params: query,
  });
}

// 获取用户精简信息列表
export function getUsersSimpleList(): Promise<ApiResponse<UserSimpleRespVO[]>> {
  return request({
    url: "/system/user/list-all-simple",
    method: "get",
  });
}

//  创建用户
export function createUser(data: UserSaveReqVO): Promise<ApiResponse<Boolean>> {
  return request({
    url: "/system/user/create",
    method: "post",
    data: data,
  });
}

//  修改用户
export function updateUser(data: UserSaveReqVO): Promise<ApiResponse<UserImportRespVO>> {
  return request({
    url: "/system/user/update",
    method: "put",
    data: data,
  });
}

// 获得用户详情
export function getUser(id: number): Promise<ApiResponse<UserRespVO>> {
  return request({
    url: "/system/user/get",
    method: "get",
    params: { id },
  });
}

// 用户更新状态
export function updateUserStatus(data : UserUpdateStatusReqVO): Promise<ApiResponse<Boolean>> {
  return request({
    url: "/system/user/update-status",
    method: "put",
    data,
  });
}

// 修改用户密码
export function updateUserPassword(data:UserUpdatePasswordReqVO): Promise<ApiResponse<Boolean>> {
  return request({
    url: "/system/user/update-password",
    method: "put",
    data: data,
  });
}


// 删除用户
export function deleteUser(id: number): Promise<ApiResponse<Boolean>> {
  return request({
    url: "/system/user/delete",
    method: "delete",
    params: { id },
  });
}


// 批量删除用户
export function deleteUserList(ids: number[]): Promise<ApiResponse<Boolean>> {
  return request({
    url: "/system/user/delete-list",
    method: "delete",
    data: ids,
  });
}