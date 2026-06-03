import request from "@/utils/request";
import { getRefreshToken } from "@/utils/auth";
import { AuthLoginReqVO, AuthPermissionInfoRespVO, CommonResultAuthLoginRespVO } from "./types";

/**
 * 登录方法
 */
export function login(
  params: AuthLoginReqVO,
): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: "/system/auth/login",
    method: "post",
    data: params,
    headers: {
      isEncrypt: false,
    },
  });
}

/**
 * 获取用户详细信息 (权限、角色、用户信息)
 */
export function getInfo():  Promise<ApiResponse<AuthPermissionInfoRespVO>> {
  return request({
    url: "/system/auth/get-permission-info",
    method: "get",
  });
}

/**
 * 退出方法
 */
export function logout(): Promise<ApiResponse<boolean>> {
  return request({
    url: "/system/auth/logout",
    method: "post",
  });
}

/**
 * 社交授权的跳转
 */
export function socialAuthRedirect(
  type: number,
  redirectUri: string,
): Promise<string> {
  return request({
    url: `/system/auth/social-auth-redirect?type=${type}&redirectUri=${encodeURIComponent(redirectUri)}`,
    method: "get",
  });
}

/**
 * 社交快捷登录，使用 code 授权码
 */
export function socialLogin(
  type: number,
  code: string,
  state: string,
):  Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: "/system/auth/social-login",
    method: "post",
    data: { type, code, state },
  });
}

/**
 * 获取发送验证码
 */
export function sendSmsCode(
  mobile: string,
  scene: number,
): Promise<ApiResponse<boolean>> {
  return request({
    url: "/system/auth/send-sms-code",
    method: "post",
    data: { mobile, scene },
  });
}

/**
 * 短信验证码登录
 */
export function smsLogin(
  mobile: string,
  code: string,
):  Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: "/system/auth/sms-login",
    method: "post",
    data: { mobile, code },
  });
}

/**
 * 刷新访问令牌
 */
export function refreshToken():  Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: "/system/auth/refresh-token?refreshToken=" + getRefreshToken(),
    method: "post",
  });
}

