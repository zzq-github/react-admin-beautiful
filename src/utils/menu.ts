import React from 'react';
import type { MenuProps } from 'antd';
import type { AdminMenu } from '@/core/types';
import MenuIcon from '@/components/MenuIcon';
import type { MenuItem } from '@/layout/Sidebar/types';
import { buildFullPath } from '@/utils/route';

export type AntdMenuItem = NonNullable<MenuProps['items']>[number];

interface BuildMenuItemsOptions {
  maxIconLevel?: number;
}

export function convertMenuVOToMenuItem(menu: AdminMenu, parentPath = ''): MenuItem | null {
  if (menu.visible === false || menu.type === 'button') {
    return null;
  }

  const path = getMenuFullPath(menu, parentPath);
  const children = menu.children
    ?.map((child) => convertMenuVOToMenuItem(child, path))
    .filter((item): item is MenuItem => item !== null);

  return {
    id: menu.id,
    label: menu.title,
    path,
    icon: createMenuIcon(menu.icon),
    children: children?.length ? children : undefined,
  };
}

export function convertMenuVOToMenuItems(menus: AdminMenu | AdminMenu[] | null): MenuItem[] {
  if (!menus) return [];

  return unwrapRootMenu(Array.isArray(menus) ? menus : [menus])
    .map((menu) => convertMenuVOToMenuItem(menu))
    .filter((item): item is MenuItem => item !== null);
}

export function buildMenuItems(
  menus: MenuItem[],
  options: BuildMenuItemsOptions = {},
  level = 0,
): MenuProps['items'] {
  const { maxIconLevel = Number.POSITIVE_INFINITY } = options;

  return menus.map((item) => ({
    key: item.path,
    icon:
      level <= maxIconLevel && item.icon && React.isValidElement(item.icon) ? item.icon : undefined,
    label: item.label,
    children: item.children?.length ? buildMenuItems(item.children, options, level + 1) : undefined,
  }));
}

export function findSelectedMenuKey(menus: MenuItem[], pathname: string): string | undefined {
  let selectedKey: string | undefined;
  let selectedLength = -1;

  walkMenuItems(menus, (item) => {
    const normalizedPath = normalizePath(item.path);

    if (pathMatches(normalizedPath, pathname) && normalizedPath.length > selectedLength) {
      selectedKey = item.path;
      selectedLength = normalizedPath.length;
    }
  });

  return selectedKey;
}

export function findOpenMenuKeys(menus: MenuItem[], selectedKey?: string): string[] {
  if (!selectedKey) return [];

  const walk = (items: MenuItem[], parents: string[]): string[] | null => {
    for (const item of items) {
      if (item.path === selectedKey) {
        return parents;
      }

      if (item.children?.length) {
        const found = walk(item.children, [...parents, item.path]);
        if (found) return found;
      }
    }

    return null;
  };

  return walk(menus, []) ?? [];
}

function createMenuIcon(icon?: string): React.ReactElement | undefined {
  if (!icon) return undefined;

  return React.createElement(MenuIcon, {
    name: icon,
    className: 'menu-line-icon',
  });
}

function getMenuFullPath(menu: AdminMenu, parentPath: string): string {
  return buildFullPath(menu.path || '', parentPath) || `/${menu.id}`;
}

function unwrapRootMenu(menus: AdminMenu[]): AdminMenu[] {
  if (menus.length === 1 && menus[0].path === '/' && menus[0].type === 'catalog') {
    return menus[0].children?.length ? menus[0].children : menus;
  }

  return menus;
}

function walkMenuItems(menus: MenuItem[], visitor: (item: MenuItem) => void): void {
  menus.forEach((item) => {
    visitor(item);
    if (item.children?.length) {
      walkMenuItems(item.children, visitor);
    }
  });
}

function normalizePath(path: string): string {
  if (!path) return '/';
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}

function pathMatches(menuPath: string, pathname: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(menuPath);
  return current === target || current.startsWith(`${target}/`);
}
