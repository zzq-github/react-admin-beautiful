import request from "@/utils/request";
import {
  DictDataRespVO,
  DictDataSaveReqVO,
  DictDataSimpleRespVO,
  DictTypeRespVO,
  DictTypeSaveReqVO,
  DictTypeSimpleRespVO,
  GetDictDataPageReq,
  getDictTypePageReq,
} from "./types";

// 查询字典数据列表
export function getDictDataByPage(
  query: GetDictDataPageReq,
): Promise<ApiResponse<PageResult<DictDataRespVO>>> {
  return request({
    url: "/system/dict-data/page",
    method: "get",
    params: query,
  });
}

// 查询全部字典数据列表
export function getAllDictDatas(): Promise<
  ApiResponse<DictDataSimpleRespVO[]>
> {
  return request({
    url: "/system/dict-data/list-all-simple",
    method: "get",
  });
}

// 新增字典数据
export function addDictData(data :DictDataSaveReqVO):Promise<ApiResponse> {
  return request({
    url: '/system/dict-data/create',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateDictData(data:DictDataSaveReqVO):Promise<ApiResponse> {
  return request({
    url: '/system/dict-data/update',
    method: 'put',
    data: data
  })
}


// 删除字典数据
export function deleteDictData(dictCode:number):Promise<ApiResponse> {
  return request({
    url: '/system/dict-data/delete?id=' + dictCode,
    method: 'delete'
  })
}

// ---------------  类型  type  -------------

// 查询字典类型列表
export function getDictTypeByPage(
  query: getDictTypePageReq,
): Promise<ApiResponse<PageResult<DictTypeRespVO>>> {
  return request({
    url: "/system/dict-type/page",
    method: "get",
    params: query,
  });
}

// 新增字典类型
export function addDictType(data:DictTypeSaveReqVO):Promise<ApiResponse> {
  return request({
    url: '/system/dict-type/create',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateDictType(data:DictTypeSaveReqVO):Promise<ApiResponse> {
  return request({
    url: '/system/dict-type/update',
    method: 'put',
    data: data
  })
}


// 删除字典类型
export function deleteDictType(dictId:number):Promise<ApiResponse> {
  return request({
    url: '/system/dict-type/delete?id=' + dictId,
    method: 'delete'
  })
}

// 获取字典选择框列表
export function getDictTypeListSimple() : Promise<ApiResponse<DictTypeSimpleRespVO[]>> {
  return request({
    url: '/system/dict-type/list-all-simple',
    method: 'get'
  })
}


