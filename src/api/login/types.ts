import type { AdminUser, BackendMenu, BackendPermissionInfo } from '@/core/types';

export interface LoginParams {
  username: string;
  password: string;
  captchaVerification?: string;
  socialType?: number;
  socialCode?: string;
  socialState?: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  userId: number;
  expiresTime: number;
}

export type PermissionInfo = BackendPermissionInfo;
export type UserInfo = AdminUser;
export type MenuItem = BackendMenu;

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
