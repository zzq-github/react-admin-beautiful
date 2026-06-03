// ---------------------- data  ----------------------
// 获取字典数据分页请求参数
export interface GetDictDataPageReq extends PageParam {
  label?: string;
  dictType?: string;
  status?: string;
}

// 字典数据响应参数
export interface DictDataRespVO {
  id: number;
  sort: number;
  label: string;
  value: string;
  dictType: string;
  status: number;
  colorType?: string;
  cssClass?: string;
  remark?: string;
  createTime: number;
}
// 字典数据简要响应参数
export interface DictDataSimpleRespVO {
  dictType: string;
  value: string;
  label: string;
  colorType?: string;
  cssClass?: string;
}

/** 管理后台 - 字典数据创建/修改 Request VO */
export interface DictDataSaveReqVO {
  id?: number;
  sort: number;
  label: string;
  value: string;
  dictType: string;
  status: number;
  colorType?: string;
  cssClass?: string;
  remark?: string;
}

// ---------------------- type  ----------------------
// 获取字典类型分页请求参数
export interface getDictTypePageReq extends PageParam {
  name?: string;
  type?: string;
  status?: string;
  createTime?: string;
}

// 字典类型响应参数
export interface DictTypeRespVO {
  id: number;
  name: string;
  type: string;
  status: number;
  remark?: string;
  createTime: number;
}

// 字典类型保存请求参数
export interface DictTypeSaveReqVO {
  id?: number;
  name: string;
  type: string;
  status: number;
  remark?: string;
}

// 字典类型简要响应参数
export interface DictTypeSimpleRespVO {
  id: number;
  name: string;
  type: string;
}
