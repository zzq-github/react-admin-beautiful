import { AdminMenu } from "@/core/types";
import { MenuItem } from "@/layout/Sidebar/types";
import { buildFullPath } from "@/utils/route";
import MenuIcon from "@/components/MenuIcon";
import React from "react";
import type { MenuProps } from "antd";

/**
 * 将后端 MenuVO 转换为前端 MenuItem
 * @param menuVO 后端菜单对象
 * @param parentPath 父级菜单的路径（用于拼接子菜单路径）
 * @returns 转换后的前端菜单项
 */
export function convertMenuVOToMenuItem(menuVO: AdminMenu, parentPath: string = ""): MenuItem | null {
  // 过滤掉 visible: false 的菜单项
  if (!menuVO.visible) {
    return null;
  }

  // 获取图标组件
  let iconComponent: React.ReactElement | undefined;
  if (menuVO.icon) {
    iconComponent = React.createElement(MenuIcon, {
      name: menuVO.icon,
      className: "menu-line-icon",
    });
  }

  // 构建当前菜单的完整路径
  const rawPath = menuVO.path || '';
  let fullPath = buildFullPath(rawPath, parentPath);
  // 如果拼接后路径为空，使用 id 作为 fallback
  if (!fullPath) {
    fullPath = `/${menuVO.id}`;
  }

  // 递归转换子菜单，传递当前路径作为父路径
  let children: MenuItem[] | undefined;
  if (menuVO.children && menuVO.children.length > 0) {
    children = menuVO.children
      .map(child => convertMenuVOToMenuItem(child, fullPath))
      .filter((item): item is MenuItem => item !== null);
    
    // 如果过滤后子菜单为空，则设置为 undefined
    if (children.length === 0) {
      children = undefined;
    }
  }

  return {
    id: menuVO.id,
    label: menuVO.title,
    path: fullPath,
    icon: iconComponent,
    children,
  };
}

/**
 * 将 MenuVO 树转换为 MenuItem 数组
 * @param menuVO 后端菜单树（可能是单个根节点或数组）
 * @returns 转换后的菜单项数组
 */
export function convertMenuVOToMenuItems(menuVO: AdminMenu | AdminMenu[] | null): MenuItem[] {
  if (!menuVO) {
    return [];
  }

  let menus = Array.isArray(menuVO) ? menuVO : [menuVO];

  // 自动解包：如果唯一根节点是 path='/' 的容器目录，直接取其子菜单
  if (menus.length === 1 && menus[0].path === '/' && menus[0].type === 'catalog' && menus[0].children?.length) {
    menus = menus[0].children;
  }
  
  return menus
    .map(menu => convertMenuVOToMenuItem(menu))
    .filter((item): item is MenuItem => item !== null);
}

export type AntdMenuItem = NonNullable<MenuProps["items"]>[number];

export function buildMenuItems(menus: MenuItem[]): MenuProps["items"] {
  return menus.map((item) => ({
    key: item.path,
    icon: item.icon && React.isValidElement(item.icon) ? item.icon : undefined,
    label: item.label,
    children: item.children?.length ? buildMenuItems(item.children) : undefined,
  }));
}

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function pathMatches(menuPath: string, pathname: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(menuPath);
  return current === target || current.startsWith(`${target}/`);
}

export function findSelectedMenuKey(
  menus: MenuItem[],
  pathname: string
): string | undefined {
  let selectedKey: string | undefined;
  let selectedLength = -1;

  const walk = (items: MenuItem[]) => {
    for (const item of items) {
      const normalizedPath = normalizePath(item.path);

      if (pathMatches(normalizedPath, pathname) && normalizedPath.length > selectedLength) {
        selectedKey = item.path;
        selectedLength = normalizedPath.length;
      }

      if (item.children?.length) {
        walk(item.children);
      }
    }
  };

  walk(menus);
  return selectedKey;
}

export function findOpenMenuKeys(
  menus: MenuItem[],
  selectedKey?: string
): string[] {
  if (!selectedKey) return [];

  const walk = (items: MenuItem[], parents: string[]): string[] | null => {
    for (const item of items) {
      if (item.path === selectedKey) {
        return parents;
      }

      if (item.children?.length) {
        const found = walk(item.children, [...parents, item.path]);
        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  return walk(menus, []) ?? [];
}

