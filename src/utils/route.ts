import type { AdminMenu } from '@/core/types';

export interface RouteConfig {
  path: string;
  componentPath: string;
  keepAlive?: boolean;
  alwaysShow?: boolean;
}

export function buildFullPath(childPath: string, parentPath = ''): string {
  if (!childPath) {
    return normalizeRoutePath(parentPath);
  }

  if (childPath.startsWith('/')) {
    return normalizeRoutePath(childPath);
  }

  if (!parentPath) {
    return normalizeRoutePath(`/${childPath}`);
  }

  const parent = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath;
  const child = childPath.startsWith('/') ? childPath.slice(1) : childPath;
  return normalizeRoutePath(`${parent}/${child}`);
}

export function convertMenuVOToRouteConfig(menu: AdminMenu, parentPath = ''): RouteConfig | null {
  if (menu.visible === false || menu.type !== 'menu' || !menu.component) {
    return null;
  }

  return {
    path: getMenuRoutePath(menu, parentPath),
    componentPath: menu.component,
    keepAlive: menu.keepAlive,
    alwaysShow: menu.alwaysShow,
  };
}

export function convertMenuVOToRouteConfigs(menus: AdminMenu[]): RouteConfig[] {
  const result: RouteConfig[] = [];

  const traverse = (nodes: AdminMenu[], parentPath = '') => {
    nodes.forEach((node) => {
      if (node.visible === false) return;

      const currentPath = getMenuRoutePath(node, parentPath);
      const routeConfig = convertMenuVOToRouteConfig(node, parentPath);
      if (routeConfig) {
        result.push(routeConfig);
      }

      if (node.children?.length) {
        traverse(node.children, currentPath);
      }
    });
  };

  traverse(unwrapRootMenu(menus));
  return result;
}

function getMenuRoutePath(menu: AdminMenu, parentPath: string): string {
  return buildFullPath(menu.path || '', parentPath) || `/${menu.id}`;
}

function unwrapRootMenu(menus: AdminMenu[]): AdminMenu[] {
  if (menus.length === 1 && menus[0].path === '/' && menus[0].type === 'catalog') {
    return menus[0].children?.length ? menus[0].children : menus;
  }

  return menus;
}

function normalizeRoutePath(path: string): string {
  if (!path) return '';

  const normalized = path.replace(/\/+/g, '/');
  if (normalized.length > 1 && normalized.endsWith('/')) {
    return normalized.slice(0, -1);
  }

  return normalized;
}
