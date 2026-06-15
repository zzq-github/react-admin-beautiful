import type { MenuItem as BackendMenuItem } from '@/api/login/types';
import type { AdminMenu, AdminMenuType } from '@/core/types';

const typeMap: Record<number, AdminMenuType> = {
  1: 'catalog',
  2: 'menu',
  3: 'button',
};

export function normalizeMenu(menu: BackendMenuItem): AdminMenu {
  return {
    ...menu,
    title: menu.name,
    path: menu.path || '',
    component: menu.component,
    icon: menu.icon,
    visible: menu.visible,
    keepAlive: menu.keepAlive,
    alwaysShow: menu.alwaysShow,
    type: typeMap[menu.type] || 'menu',
    children: menu.children?.map(normalizeMenu),
  };
}

export function normalizeMenus(
  menus: BackendMenuItem | BackendMenuItem[] | AdminMenu | AdminMenu[] | null
): AdminMenu | AdminMenu[] | null {
  if (!menus) return null;
  if (Array.isArray(menus)) {
    return menus.map((menu) => {
      if (typeof menu.type === 'string') return menu as AdminMenu;
      return normalizeMenu(menu as BackendMenuItem);
    });
  }
  if (typeof menus.type === 'string') return menus as AdminMenu;
  return normalizeMenu(menus as BackendMenuItem);
}

