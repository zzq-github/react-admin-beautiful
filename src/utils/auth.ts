import { decrypt, encrypt } from "@/utils/jsencrypt";

// 定义 Token 接口
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

const AccessTokenKey = 'ACCESS_TOKEN'
const RefreshTokenKey = 'REFRESH_TOKEN'

// ========== Token 相关 ==========

export function getAccessToken(): string | null {
  return localStorage.getItem(AccessTokenKey)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(RefreshTokenKey)
}

export function setToken(token: TokenInfo): void {
  localStorage.setItem(AccessTokenKey, token.accessToken)
  localStorage.setItem(RefreshTokenKey, token.refreshToken)
}

export function removeToken(): void {
  localStorage.removeItem(AccessTokenKey)
  localStorage.removeItem(RefreshTokenKey)
}

// ========== 账号相关 ==========

const UsernameKey = 'USERNAME'
const PasswordKey = 'PASSWORD'
const RememberMeKey = 'REMEMBER_ME'

export function getUsername(): string | null {
  return localStorage.getItem(UsernameKey)
}

export function setUsername(username: string): void {
  localStorage.setItem(UsernameKey, username)
}

export function removeUsername(): void {
  localStorage.removeItem(UsernameKey)
}

export function getPassword(): string | undefined {
  const password = localStorage.getItem(PasswordKey)
  // encrypt/decrypt 之前定义过可能返回 string | false
  const decrypted = password ? decrypt(password) : undefined
  return decrypted ? decrypted : undefined
}

export function setPassword(password: string): void {
  const encrypted = encrypt(password)
  if (encrypted) {
    localStorage.setItem(PasswordKey, encrypted)
  }
}

export function removePassword(): void {
  localStorage.removeItem(PasswordKey)
}

export function getRememberMe(): boolean {
  return localStorage.getItem(RememberMeKey) === 'true'
}

export function setRememberMe(rememberMe: boolean | string): void {
  localStorage.setItem(RememberMeKey, String(rememberMe))
}

export function removeRememberMe(): void {
  localStorage.removeItem(RememberMeKey)
}

// ========== 租户相关 ==========

const TenantIdKey = 'TENANT_ID'
const TenantNameKey = 'TENANT_NAME'
const VisitTenantIdKey = 'VISIT_TENANT_ID'

export function getTenantName(): string | null {
  return localStorage.getItem(TenantNameKey)
}

export function setTenantName(tenantName: string): void {
  localStorage.setItem(TenantNameKey, tenantName)
}

export function removeTenantName(): void {
  localStorage.removeItem(TenantNameKey)
}

export function getTenantId(): string | null {
  return localStorage.getItem(TenantIdKey)
}

export function setTenantId(tenantId: string | number): void {
  localStorage.setItem(TenantIdKey, String(tenantId))
}

export function removeTenantId(): void {
  localStorage.removeItem(TenantIdKey)
}

export function getVisitTenantId(): string | null {
  return localStorage.getItem(VisitTenantIdKey)
}

export function setVisitTenantId(tenantId: string | number): void {
  localStorage.setItem(VisitTenantIdKey, String(tenantId))
}

export function removeVisitTenantId(): void {
  localStorage.removeItem(VisitTenantIdKey)
}