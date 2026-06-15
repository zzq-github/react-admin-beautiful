import { useUserStore } from '@/store/useUserStore';

/**
 * 权限判断 Hook
 * 提供路由级和按钮级的权限判断
 */
export function usePermission() {
  const permissions = useUserStore((state) => state.info?.permissions) || [];
  const roles = useUserStore((state) => state.info?.roles) || [];

  /**
   * 判断是否拥有指定权限
   * @param permission 权限标识，如 "system:user:create"
   */
  const hasPermission = (permission: string): boolean => {
    // 如果是超级管理员（角色中包含 "admin"），直接放行
    if (roles.includes('admin') || roles.includes('super_admin')) {
      return true;
    }
    return permissions.includes(permission);
  };

  /**
   * 判断是否拥有任意一个权限
   * @param permissionList 权限标识数组
   */
  const hasAnyPermission = (permissionList: string[]): boolean => {
    if (roles.includes('admin') || roles.includes('super_admin')) {
      return true;
    }
    return permissionList.some((p) => permissions.includes(p));
  };

  /**
   * 判断是否拥有指定角色
   * @param role 角色标识
   */
  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  return {
    permissions,
    roles,
    hasPermission,
    hasAnyPermission,
    hasRole,
  };
}
