import request from '@/utils/request';
import type { ExampleProjectPageReq, ExampleProjectResp, ExampleProjectSaveReq } from './types';

export function getExampleProjectPage(
  params: ExampleProjectPageReq,
): Promise<ApiResponse<PageResult<ExampleProjectResp>>> {
  return request({
    url: '/examples/project/page',
    method: 'get',
    params,
  });
}

export function createExampleProject(data: ExampleProjectSaveReq): Promise<ApiResponse<boolean>> {
  return request({
    url: '/examples/project/create',
    method: 'post',
    data,
  });
}

export function updateExampleProject(data: ExampleProjectSaveReq): Promise<ApiResponse<boolean>> {
  return request({
    url: '/examples/project/update',
    method: 'put',
    data,
  });
}

export function deleteExampleProject(id: number): Promise<ApiResponse<boolean>> {
  return request({
    url: '/examples/project/delete',
    method: 'delete',
    params: { id },
  });
}

export function deleteExampleProjectList(ids: number[]): Promise<ApiResponse<boolean>> {
  return request({
    url: '/examples/project/delete-list',
    method: 'delete',
    data: ids,
  });
}
