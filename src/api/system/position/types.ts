export interface PositionListQueryReq extends PageParam {
  /**
   * @description 岗位编码，模糊匹配
   * @example aispace
   */
  code?: string;
  /**
   * @description 岗位名称，模糊匹配
   */
  name?: string;
  /**
   * @description 展示状态，参见 CommonStatusEnum 枚举类
   * @example 1
   */
  status?: string;
}

export interface PositionRespVO {
  /**
   * Format: int64
   * @description 岗位序号
   * @example 1024
   */
  id: number;
  /**
   * @description 岗位名称
   * @example 小土豆
   */
  name: string;
  /**
   * @description 岗位编码
   * @example aispace
   */
  code: string;
  /**
   * Format: int32
   * @description 显示顺序
   * @example 1024
   */
  sort: number;
  /**
   * Format: int32
   * @description 状态，参见 CommonStatusEnum 枚举类
   * @example 1
   */
  status: number;
  /**
   * @description 备注
   * @example 快乐的备注
   */
  remark?: string;
  /**
   * Format: date-time
   * @description 创建时间
   */
  createTime: number;
}

export interface PositionSaveReqVO {
  /**
   * Format: int64
   * @description 岗位编号
   * @example 1024
   */
  id?: number;
  /**
   * @description 岗位名称
   * @example 小土豆
   */
  name: string;
  /**
   * @description 岗位编码
   * @example aispace
   */
  code: string;
  /**
   * Format: int32
   * @description 显示顺序
   * @example 1024
   */
  sort: number;
  /**
   * Format: int32
   * @description 状态
   * @example 1
   */
  status: number;
  /**
   * @description 备注
   * @example 快乐的备注
   */
  remark?: string;
}

/** @description 管理后台 - 岗位信息的精简 Response VO */
export interface PostSimpleRespVO {
  /**
   * Format: int64
   * @description 岗位序号
   * @example 1024
   */
  id: number;
  /**
   * @description 岗位名称
   * @example 小土豆
   */
  name: string;
}
