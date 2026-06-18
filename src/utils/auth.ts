/**
 * 认证相关工具函数。
 * 负责访问令牌、刷新令牌和“记住密码”等本地状态管理。
 */

export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

const AccessTokenKey = 'ACCESS_TOKEN';
const RefreshTokenKey = 'REFRESH_TOKEN';

export function getAccessToken(): string | null {
  return localStorage.getItem(AccessTokenKey);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(RefreshTokenKey);
}

export function setToken(token: TokenInfo): void {
  localStorage.setItem(AccessTokenKey, token.accessToken);
  localStorage.setItem(RefreshTokenKey, token.refreshToken);
}

export function removeToken(): void {
  localStorage.removeItem(AccessTokenKey);
  localStorage.removeItem(RefreshTokenKey);
}

const UsernameKey = 'USERNAME';
const PasswordKey = 'PASSWORD';
const RememberMeKey = 'REMEMBER_ME';

export function getUsername(): string | null {
  return localStorage.getItem(UsernameKey);
}

export function setUsername(username: string): void {
  localStorage.setItem(UsernameKey, username);
}

export function removeUsername(): void {
  localStorage.removeItem(UsernameKey);
}

/**
 * 获取记住的密码。
 * 这里只做 Base64 编码，不能视为安全加密；生产项目建议交给后端或浏览器凭证能力处理。
 */
export function getPassword(): string | undefined {
  const password = localStorage.getItem(PasswordKey);
  if (!password) return undefined;

  try {
    return atob(password);
  } catch {
    return undefined;
  }
}

export function setPassword(password: string): void {
  try {
    localStorage.setItem(PasswordKey, btoa(password));
  } catch {
    // 非 ASCII 字符可能编码失败，保持静默以避免影响登录主流程。
  }
}

export function removePassword(): void {
  localStorage.removeItem(PasswordKey);
}

export function getRememberMe(): boolean {
  return localStorage.getItem(RememberMeKey) === 'true';
}

export function setRememberMe(rememberMe: boolean | string): void {
  localStorage.setItem(RememberMeKey, String(rememberMe));
}

export function removeRememberMe(): void {
  localStorage.removeItem(RememberMeKey);
}
