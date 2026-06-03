import request from "@/utils/request";
import { DeptQuery, DeptRespVO, DeptSaveReqVO, DeptSimpleRespVO } from "./types";

// 查询部门列表
export function getDepartmentList(
  query: DeptQuery,
): Promise<ApiResponse<DeptRespVO[]>> {
  return request({
    url: "/system/dept/list",
    method: "get",
    params: query,
  });
}

// 获取部门精简信息列表
export function getListSimpleDepartments(): Promise<ApiResponse<DeptSimpleRespVO[]>> {
  return request({
    url: '/system/dept/list-all-simple',
    method: 'get'
  })
}

// 新增部门
export function addDepartment(data:DeptSaveReqVO) {
  return request({
    url: '/system/dept/create',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDepartment(data:DeptSaveReqVO) {
  return request({
    url: '/system/dept/update',
    method: 'put',
    data: data
  })
}

// 删除部门
export function deleteDepartment(id:number) {
  return request({
    url: '/system/dept/delete?id=' + id,
    method: 'delete'
  })
}