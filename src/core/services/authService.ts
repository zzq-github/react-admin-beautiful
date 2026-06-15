import {
  getInfo,
  login,
  logout,
  refreshToken,
} from "@/api/login";
import type { AuthLoginReqVO, CommonResultAuthLoginRespVO } from "@/api/login/types";
import type { AdminPermissionInfo } from "@/core/types";
import { normalizePermissionInfo } from "@/core/adapters/auth";

export const authService = {
  login(params: AuthLoginReqVO): Promise<ApiResponse<CommonResultAuthLoginRespVO>> {
    return login(params);
  },

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

