import type { AdminMenu, AdminMenuType, BackendMenu, BackendMenuType } from '@/core/types';

const backendMenuTypeMap: Record<1 | 2 | 3, AdminMenuType> = {
  1: 'catalog',
  2: 'menu',
  3: 'button',
};

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

export function normalizeMenus(
  menus: BackendMenu | BackendMenu[] | AdminMenu | AdminMenu[] | null | undefined,
): AdminMenu | AdminMenu[] | null {
  if (!menus) return null;

  if (Array.isArray(menus)) {
    return menus.map(normalizeMenu);
  }

  return normalizeMenu(menus);
}

export function normalizeMenuType(type: BackendMenuType | undefined): AdminMenuType {
  if (type === 'catalog' || type === 'menu' || type === 'button') {
    return type;
  }

  return backendMenuTypeMap[type as 1 | 2 | 3] ?? 'menu';
}
