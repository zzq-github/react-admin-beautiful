import { getInfo, login, logout, refreshToken } from '@/api/login';
import type { AuthLoginReqVO, CommonResultAuthLoginRespVO } from '@/api/login/types';
import type { AdminPermissionInfo } from '@/core/types';
import { normalizePermissionInfo } from '@/core/adapters/auth';

/**
 * 认证服务门面。
 *
 * 页面和 store 只调用 authService，不直接调用 src/api/login。
 * 后续如果替换成其他后端、OAuth、SSO 或多租户登录，优先改这一层。
 */
export const authService = {
  login(params: AuthLoginReqVO): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
    return login(params);
  },

  /**
   * 获取当前用户、角色、权限和菜单，并转换成模板内部标准模型。
   */
  async getPermissionInfo(): Promise<AdminPermissionInfo> {
    const response = await getInfo();
    return normalizePermissionInfo(response.data);
  },

  logout(): Promise<ApiResponse<boolean>> {
    return logout();
  },

  refreshToken(): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
    return refreshToken();
  },
};
