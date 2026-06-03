export interface GetConfigPageQueryReq extends PageParam {
  /**
   * @description 数据源名称，模糊匹配
   * @example 名称
   */
  name?: string;
  /**
   * @description 参数键名，模糊匹配
   * @example yunai.db.username
   */
  key?: string;
  /**
   * @description 参数类型，参见 SysConfigTypeEnum 枚举
   * @example 1
   */
  type?: number;
  /**
   * @description 创建时间
   * @example [2022-07-01 00:00:00,2022-07-01 23:59:59]
   */
  createTime?: string[];
}

export interface ConfigRespVO {
  /**
   * Format: int64
   * @description 参数配置序号
   * @example 1024
   */
  id: number;
  /**
   * @description 参数分类
   * @example biz
   */
  category: string;
  /**
   * @description 参数名称
   * @example 数据库名
   */
  name: string;
  /**
   * @description 参数键名
   * @example yunai.db.username
   */
  key: string;
  /**
   * @description 参数键值
   * @example 1024
   */
  value: string;
  /**
   * Format: int32
   * @description 参数类型，参见 SysConfigTypeEnum 枚举
   * @example 1
   */
  type: number;
  /**
   * @description 是否可见
   * @example true
   */
  visible: boolean;
  /**
   * @description 备注
   * @example 备注一下很帅气！
   */
  remark?: string;
  /**
   * Format: date-time
   * @description 创建时间
   * @example 时间戳格式
   */
  createTime: number;
}



export interface FileConfigSaveReqVO {
  /**
   * Format: int64
   * @description 编号
   * @example 1
   */
  id?: number;
  /**
   * @description 配置名
   * @example S3 - 阿里云
   */
  name: string;
  /**
   * Format: int32
   * @description 存储器，参见 FileStorageEnum 枚举类
   * @example 1
   */
  storage: number;
  /** @description 存储配置,配置是动态参数，所以使用 Map 接收 */
  config: {
    [key: string]: unknown;
  };
  /**
   * @description 备注
   * @example 我是备注
   */
  remark?: string;
}


