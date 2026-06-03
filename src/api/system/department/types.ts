export interface DeptQuery {
  /**
   * @description 部门名称，模糊匹配
   */
  name?: string;
  /**
   * @description 展示状态，参见 CommonStatusEnum 枚举类
   * @example 1
   */
  status?: string;
}

export interface DeptRespVO {
  /**
   * Format: int64
   * @description 部门编号
   * @example 1024
   */
  id: number;
  /**
   * @description 部门名称
   */
  name: string;
  /**
   * Format: int64
   * @description 父部门 ID
   * @example 1024
   */
  parentId?: number;
  /**
   * Format: int32
   * @description 显示顺序
   * @example 1024
   */
  sort: number;
  /**
   * Format: int64
   * @description 负责人的用户编号
   * @example 2048
   */
  leaderUserId?: number;
  /**
   * @description 联系电话
   * @example 15601691000
   */
  phone?: string;
  /**
   * @description 邮箱
   * @example aispace@iocoder.cn
   */
  email?: string;
  /**
   * Format: int32
   * @description 状态,见 CommonStatusEnum 枚举
   * @example 1
   */
  status: number;
  /**
   * Format: date-time
   * @description 创建时间
   */
  createTime: number;
}

export interface DeptSaveReqVO {
  /**
   * Format: int64
   * @description 部门编号
   * @example 1024
   */
  id?: number;
  /**
   * @description 部门名称
   * @example 芋道
   */
  name: string;
  /**
   * Format: int64
   * @description 父部门 ID
   * @example 1024
   */
  parentId?: number;
  /**
   * Format: int32
   * @description 显示顺序
   * @example 1024
   */
  sort: number;
  /**
   * Format: int64
   * @description 负责人的用户编号
   * @example 2048
   */
  leaderUserId?: number;
  /**
   * @description 联系电话
   * @example 15601691000
   */
  phone?: string;
  /**
   * @description 邮箱
   * @example aispace@iocoder.cn
   */
  email?: string;
  /**
   * Format: int32
   * @description 状态,见 CommonStatusEnum 枚举
   * @example 1
   */
  status: number;
}

/** @description 管理后台 - 部门精简信息 Response VO */
export interface DeptSimpleRespVO {
  /**
   * Format: int64
   * @description 部门编号
   * @example 1024
   */
  id: number;
  /**
   * @description 部门名称
   * @example 芋道
   */
  name: string;
  /**
   * Format: int64
   * @description 父部门 ID
   * @example 1024
   */
  parentId: number;
}
