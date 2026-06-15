/**
 * 认证相关类型定义
 */

/** 登录请求参数 */
export interface LoginParams {
  username: string;
  password: string;
  captchaVerification?: string;
  socialType?: number;
  socialCode?: string;
  socialState?: string;
}

/** 登录响应数据 */
export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  userId: number;
  expiresTime: number;
}

/** 权限信息响应 */
export interface PermissionInfo {
  user: UserInfo;
  roles: string[];
  permissions: string[];
  menus: MenuItem;
}

/** 用户信息 */
export interface UserInfo {
  id: number;
  nickname: string;
  avatar: string;
  deptId: number;
  username: string;
  email?: string;
}

/**
 * 菜单项类型
 * type 1 - 目录, 2 - 菜单, 3 - 按钮
 */
export interface MenuItem {
  id: number;
  parentId: number;
  name: string;
  path?: string;
  component?: string;
  componentName?: string;
  icon?: string;
  visible: boolean;
  keepAlive: boolean;
  alwaysShow?: boolean;
  children?: MenuItem[];
  type: 1 | 2 | 3;
}

// ===== 兼容旧类型名（渐进迁移用，后续可删除） =====
/** @deprecated 使用 LoginParams 替代 */
export type AuthLoginReqVO = LoginParams;
/** @deprecated 使用 LoginResult 替代 */
export type CommonResultAuthLoginRespVO = LoginResult;
/** @deprecated 使用 PermissionInfo 替代 */
export type AuthPermissionInfoRespVO = PermissionInfo;
/** @deprecated 使用 UserInfo 替代 */
export type UserVO = UserInfo;
/** @deprecated 使用 MenuItem 替代 */
export type MenuVO = MenuItem;
