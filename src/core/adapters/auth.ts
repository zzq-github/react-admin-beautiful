import type { AdminMenu, AdminPermissionInfo, BackendPermissionInfo } from '@/core/types';
import { normalizeMenus } from './menu';

/**
 * 把后端权限接口转换为模板内部权限模型。
 *
 * 这里是用户信息、角色、按钮权限、菜单权限的收口点：
 * - 后端直接返回 permissions 时会原样使用。
 * - 菜单树里的 permission 也会递归提取，作为页面权限和按钮权限的兜底来源。
 * - 页面、布局、权限组件只消费 AdminPermissionInfo，不直接依赖后端原始结构。
 */
export function normalizePermissionInfo(info: BackendPermissionInfo): AdminPermissionInfo {
  const menus = normalizeMenus(info.menus) || [];
  const explicitPermissions = Array.isArray(info.permissions) ? info.permissions : [];
  const menuPermissions = extractMenuPermissions(menus);

  return {
    ...info,
    user: info.user,
    roles: Array.isArray(info.roles) ? info.roles : [],
    permissions: Array.from(new Set([...explicitPermissions, ...menuPermissions])),
    menus,
  };
}

/**
 * 从菜单树中提取 permission。
 *
 * 注意这里不只提取 button 节点：部分后端会把页面访问权限挂在菜单节点上，
 * 如果忽略菜单节点，刷新后或只返回菜单权限时页面级 403 会失效。
 */
function extractMenuPermissions(menus: AdminMenu | AdminMenu[]): string[] {
  const result: string[] = [];
  const menuList = Array.isArray(menus) ? menus : [menus];

  const walk = (items: AdminMenu[]) => {
    items.forEach((item) => {
      if (item.permission) {
        result.push(item.permission);
      }

      if (item.children?.length) {
        walk(item.children);
      }
    });
  };

  walk(menuList);
  return result;
}
