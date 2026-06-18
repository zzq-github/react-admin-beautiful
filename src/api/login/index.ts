import request from '@/utils/request';
import { getRefreshToken } from '@/utils/auth';
import { AuthLoginReqVO, AuthPermissionInfoRespVO, CommonResultAuthLoginRespVO } from './types';

export function login(params: AuthLoginReqVO): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: '/system/auth/login',
    method: 'post',
    data: params,
    headers: {
      isEncrypt: false,
    },
  });
}

export function getInfo(): Promise<ApiResponse<AuthPermissionInfoRespVO>> {
  return request({
    url: '/system/auth/get-permission-info',
    method: 'get',
  });
}

export function logout(): Promise<ApiResponse<boolean>> {
  return request({
    url: '/system/auth/logout',
    method: 'post',
  });
}

export function socialAuthRedirect(type: number, redirectUri: string): Promise<string> {
  return request({
    url: `/system/auth/social-auth-redirect?type=${type}&redirectUri=${encodeURIComponent(redirectUri)}`,
    method: 'get',
  });
}

export function socialLogin(
  type: number,
  code: string,
  state: string,
): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: '/system/auth/social-login',
    method: 'post',
    data: { type, code, state },
  });
}

export function sendSmsCode(mobile: string, scene: number): Promise<ApiResponse<boolean>> {
  return request({
    url: '/system/auth/send-sms-code',
    method: 'post',
    data: { mobile, scene },
  });
}

export function smsLogin(
  mobile: string,
  code: string,
): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: '/system/auth/sms-login',
    method: 'post',
    data: { mobile, code },
  });
}

export function refreshToken(): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
  return request({
    url: `/system/auth/refresh-token?refreshToken=${getRefreshToken()}`,
    method: 'post',
  });
}
