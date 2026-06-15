/**
 * 认证相关工具函数
 * 提供 Token 管理、记住密码等通用能力
 */

// ========== Token 相关 ==========

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

// ========== 记住密码相关 ==========

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
 * 获取记住的密码（简单编码，非加密，仅防止明文暴露）
 * 生产环境建议配合后端加密方案
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
    // 非 ASCII 字符可能编码失败，静默处理
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
