import type { AdminPermissionInfo, BackendPermissionInfo } from '@/core/types';
import { normalizeMenus } from './menu';

export function normalizePermissionInfo(info: BackendPermissionInfo): AdminPermissionInfo {
  return {
    ...info,
    user: info.user,
    roles: Array.isArray(info.roles) ? info.roles : [],
    permissions: Array.isArray(info.permissions) ? info.permissions : [],
    menus: normalizeMenus(info.menus) || [],
  };
}
