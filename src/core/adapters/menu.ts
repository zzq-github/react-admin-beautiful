import type { AdminMenu, AdminMenuType, BackendMenu, BackendMenuType } from '@/core/types';

const backendMenuTypeMap: Record<1 | 2 | 3, AdminMenuType> = {
  1: 'catalog',
  2: 'menu',
  3: 'button',
};

/**
 * 把单个后端菜单节点整理成模板内部菜单。
 *
 * 常见差异都在这里处理：title/name、数字 type、visible 默认值、children 递归转换。
 * 布局、动态路由和权限逻辑都应该读取转换后的 AdminMenu。
 */
export function normalizeMenu(menu: BackendMenu | AdminMenu): AdminMenu {
  const title = menu.title ?? menu.name ?? '';

  return {
    ...menu,
    title,
    path: menu.path || '',
    visible: menu.visible !== false,
    keepAlive: menu.keepAlive ?? false,
    type: normalizeMenuType(menu.type),
    children: menu.children?.map(normalizeMenu),
  };
}

/**
 * 兼容后端返回单个根节点或数组两种形式。
 */
export function normalizeMenus(
  menus: BackendMenu | BackendMenu[] | AdminMenu | AdminMenu[] | null | undefined,
): AdminMenu | AdminMenu[] | null {
  if (!menus) return null;

  if (Array.isArray(menus)) {
    return menus.map(normalizeMenu);
  }

  return normalizeMenu(menus);
}

/**
 * 后端常见菜单类型是 1/2/3，模板内部使用可读字符串。
 */
export function normalizeMenuType(type: BackendMenuType | undefined): AdminMenuType {
  if (type === 'catalog' || type === 'menu' || type === 'button') {
    return type;
  }

  return backendMenuTypeMap[type as 1 | 2 | 3] ?? 'menu';
}
