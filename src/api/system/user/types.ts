export interface userListQueryReq extends PageParam {
  username?: string;
  mobile?: string;
  status?: string;
  createTime?: string;
  deptId?: string;
  roleId?: string;
}

export interface UserRespVO {
  id: number;
  username: string;
  nickname: string;
  remark?: string;
  deptId?: number;
  deptName?: string;
  postIds?: number[];
  email?: string;
  mobile?: string;
  sex?: number;
  avatar?: string;
  status: number;
  loginIp: string;
  loginDate: string;
  createTime: number;
}

export interface UserSimpleRespVO {
  id: number;
  nickname: string;
  deptId?: number;
  deptName?: string;
}

/**
 * 用户保存/更新请求对象
 */
export interface UserSaveReqVO {
  /**
   * 用户编号
   * Format: int64
   * @example 1024
   */
  id?: number;

  /**
   * 用户账号
   * @example energy
   */
  username: string;

  /**
   * 用户昵称
   * @example 芋艿
   */
  nickname: string;

  /**
   * 备注
   * @example 我是一个用户
   */
  remark?: string;

  /**
   * 部门编号
   * Format: int64
   * @example 1
   */
  deptId?: number;

  /**
   * 岗位编号数组
   * @example [1, 2]
   */
  postIds?: number[];

  /**
   * 用户邮箱
   * Format: email
   * @example energy@iocoder.cn
   */
  email?: string;

  /**
   * 手机号码
   * @example 15601691300
   */
  mobile?: string;

  /**
   * 用户性别，参见 SexEnum 枚举类
   * Format: int32
   * @example 1
   */
  sex?: number;

  /**
   * 用户头像
   * @example https://www.iocoder.cn/xxx.png
   */
  avatar?: string;

  /**
   * 密码
   * @example 123456
   */
  password: string;
}

// 更新用户状态
export interface UserUpdateStatusReqVO {
  /**
   * Format: int64
   * @description 用户编号
   * @example 1024
   */
  id: number;
  /**
   * Format: int32
   * @description 状态，见 CommonStatusEnum 枚举
   * @example 1
   */
  status: number;
}

/** @description 管理后台 - 用户更新密码 Request VO */
export interface UserUpdatePasswordReqVO {
  /**
   * Format: int64
   * @description 用户编号
   * @example 1024
   */
  id: number;
  /**
   * @description 密码
   * @example 123456
   */
  password: string;
}

/** @description 管理后台 - 用户导入 Response VO */
export interface UserImportRespVO {
  /** @description 创建成功的用户名数组 */
  createUsernames: string[];
  /** @description 更新成功的用户名数组 */
  updateUsernames: string[];
  /** @description 导入失败的用户集合，key 为用户名，value 为失败原因 */
  failureUsernames: {
    [key: string]: string;
  };
}
