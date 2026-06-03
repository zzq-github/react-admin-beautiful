export interface PermissionAssignRoleMenuReqVO {
  /**
   * Format: int64
   * @description 角色编号
   * @example 1
   */
  roleId: number;
  /**
   * @description 菜单编号列表
   * @example 1,3,5
   */
  menuIds?: number[];
}

export interface PermissionAssignRoleDataScopeReqVO {
  /**
   * Format: int64
   * @description 角色编号
   * @example 1
   */
  roleId: number;
  /**
   * Format: int32
   * @description 数据范围，参见 DataScopeEnum 枚举类
   * @example 1
   */
  dataScope: number;
  /**
   * @description 部门编号列表，只有范围类型为 DEPT_CUSTOM 时，该字段才需要
   * @example 1,3,5
   */
  dataScopeDeptIds?: number[];
}

export interface PermissionAssignUserRoleReqVO {
  /**
   * Format: int64
   * @description 用户编号
   * @example 1
   */
  userId: number;
  /**
   * @description 角色编号列表
   * @example 1,3,5
   */
  roleIds?: number[];
}
