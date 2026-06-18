import request from '@/utils/request';
import { RoleListQueryReq, RoleRespVO, RoleSaveReqVO } from './types';

export function getRolePage(query: RoleListQueryReq): Promise<ApiResponse<PageResult<RoleRespVO>>> {
  return request({
    url: '/system/role/page',
    method: 'get',
    params: query,
  });
}

export function getRoleListAllSimple(): Promise<ApiResponse<RoleRespVO[]>> {
  return request({
    url: '/system/role/list-all-simple',
    method: 'get',
  });
}

export function addRole(data: RoleSaveReqVO): Promise<ApiResponse> {
  return request({
    url: '/system/role/create',
    method: 'post',
    data,
  });
}

export function updateRole(data: RoleSaveReqVO): Promise<ApiResponse> {
  return request({
    url: '/system/role/update',
    method: 'put',
    data,
  });
}

export function deleteRole(roleId: number): Promise<ApiResponse> {
  return request({
    url: `/system/role/delete?id=${roleId}`,
    method: 'delete',
  });
}
