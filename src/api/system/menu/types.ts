export interface MenuListQueryReq {
  name?: string;
  status?: string;
}

export interface MenuRespVO {
  id: number;
  name: string;
  permission?: string;
  type: number;
  sort: number;
  parentId: number;
  path?: string;
  icon?: string;
  component?: string;
  componentName?: string;
  status: number;
  visible?: boolean;
  keepAlive?: boolean;
  alwaysShow?: boolean;
  createTime: number;
}

export interface MenuSaveVO {
  /**
   * @description 菜单编号
   */
  id?: number;
  /**
   * @description 菜单名称
   */
  name: string;
  /**
   * @description 权限标识,仅菜单类型为按钮时，才需要传递
   * @example sys:menu:add
   */
  permission?: string;
  /**
   * Format: int32
   * @description 类型，参见 MenuTypeEnum 枚举类
   * @example 1
   */
  type: number;
  /**
   * Format: int32
   * @description 显示顺序
   * @example 1024
   */
  sort: number;
  /**
   * Format: int64
   * @description 父菜单 ID
   * @example 1024
   */
  parentId: number;
  /**
   * @description 路由地址,仅菜单类型为菜单或者目录时，才需要传
   * @example post
   */
  path?: string;
  /**
   * @description 菜单图标,仅菜单类型为菜单或者目录时，才需要传
   * @example /menu/list
   */
  icon?: string;
  /**
   * @description 组件路径,仅菜单类型为菜单时，才需要传
   * @example system/post/index
   */
  component?: string;
  /**
   * @description 组件名
   * @example SystemUser
   */
  componentName?: string;
  /**
   * Format: int32
   * @description 状态,见 CommonStatusEnum 枚举
   * @example 1
   */
  status: number;
  /**
   * @description 是否可见
   * @example false
   */
  visible?: boolean;
  /**
   * @description 是否缓存
   * @example false
   */
  keepAlive?: boolean;
  /**
   * @description 是否总是显示
   * @example false
   */
  alwaysShow?: boolean;
}
