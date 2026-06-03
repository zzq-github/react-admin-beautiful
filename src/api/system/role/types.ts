// FIX: Add PageParam interface to resolve missing type error.
interface PageParam {
  pageSize: number;
  pageNo: number;
}

export interface RoleListQueryReq extends PageParam {
  name?: string;
  code?: string;
  status?: string;
  createTime?: string[];
}

export interface RoleRespVO {
  id: number;
  name: string;
  code: string;
  sort: number;
  status: number;
  type: number;
  remark?: string;
  dataScope: number;
  dataScopeDeptIds?: number[];
  createTime: number;
}

export interface RoleSaveReqVO {
  id?: number;
  name: string;
  code: string;
  sort: number;
  status: number;
  remark?: string;
}