import request from "@/utils/request";
import { PositionListQueryReq, PositionRespVO, PositionSaveReqVO, PostSimpleRespVO } from "./types";

// 查询岗位列表
export function getPositionListByPage(
  query: PositionListQueryReq,
): Promise<ApiResponse<PageResult<PositionRespVO>>> {
  return request({
    url: "/system/post/page",
    method: "get",
    params: query,
  });
}

//  获取所有岗位精简信息
export function getPositionListAllSimple(): Promise<ApiResponse<PostSimpleRespVO[]>> {
  return request({
    url: "/system/post/list-all-simple",
    method: "get",
  });
}

// 新增岗位
export function addPosition(data:PositionSaveReqVO):Promise<ApiResponse> {
  return request({
    url: "/system/post/create",
    method: "post",
    data: data,
  });
}

// 修改岗位
export function updatePosition(data:PositionSaveReqVO):Promise<ApiResponse> {
  return request({
    url: "/system/post/update",
    method: "put",
    data: data,
  });
}

// 删除岗位
export function deletePosition(postId:number) :Promise<ApiResponse>{
  return request({
    url: "/system/post/delete?id=" + postId,
    method: "delete",
  });
}
