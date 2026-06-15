import type { AuthPermissionInfoRespVO } from '@/api/login/types';
import type { AdminPermissionInfo } from '@/core/types';
import { normalizeMenus } from './menu';

export function normalizePermissionInfo(info: AuthPermissionInfoRespVO): AdminPermissionInfo {
  return {
    ...info,
    user: info.user,
    roles: info.roles || [],
    permissions: info.permissions || [],
    menus: normalizeMenus(info.menus) || [],
  };
}

