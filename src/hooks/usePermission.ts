import { useUserStore } from "@/store/useUserStore";

export type PermissionCode = string | string[];
export type PermissionMode = "all" | "any";

export function usePermission() {
  const permissions = useUserStore((state) => state.info?.permissions) || [];
  const roles = useUserStore((state) => state.info?.roles) || [];

  const isSuperAdmin =
    roles.includes("admin") ||
    roles.includes("super_admin") ||
    permissions.includes("*");

  const hasPermission = (permission: string): boolean => {
    if (isSuperAdmin) {
      return true;
    }
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissionList: string[]): boolean => {
    if (isSuperAdmin) {
      return true;
    }
    return permissionList.some((permission) => permissions.includes(permission));
  };

  const hasAllPermissions = (permissionList: string[]): boolean => {
    if (isSuperAdmin) {
      return true;
    }
    return permissionList.every((permission) => permissions.includes(permission));
  };

  const matchPermission = (
    code: PermissionCode,
    mode: PermissionMode = "all",
  ): boolean => {
    if (Array.isArray(code)) {
      return mode === "any" ? hasAnyPermission(code) : hasAllPermissions(code);
    }
    return hasPermission(code);
  };

  const hasRole = (role: string): boolean => roles.includes(role);

  return {
    permissions,
    roles,
    isSuperAdmin,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    matchPermission,
    hasRole,
  };
}
