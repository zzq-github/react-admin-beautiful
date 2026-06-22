import type { AdminMenu } from '@/core/types';

export interface RouteConfig {
  path: string;
  componentPath: string;
  permission?: string;
  keepAlive?: boolean;
  alwaysShow?: boolean;
}

/**
 * 拼接父子菜单路径，并把重复斜杠和尾部斜杠规整掉。
 * 后端菜单经常混用 '/system'、'user'、'/user'，这里统一成 React Router 可消费的路径。
 */
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

/**
 * 把一个菜单节点转换为动态路由配置。
 * 只有 type=menu 且配置了 component 的节点才会生成页面路由，目录和按钮节点会被忽略。
 */
export function convertMenuVOToRouteConfig(menu: AdminMenu, parentPath = ''): RouteConfig | null {
  if (menu.visible === false || menu.type !== 'menu' || !menu.component) {
    return null;
  }

  return {
    path: getMenuRoutePath(menu, parentPath),
    componentPath: menu.component,
    permission: menu.permission,
    keepAlive: menu.keepAlive,
    alwaysShow: menu.alwaysShow,
  };
}

/**
 * 深度遍历菜单树，生成所有动态页面路由。
 * 目录节点不会生成路由，但会参与子节点路径拼接。
 */
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
