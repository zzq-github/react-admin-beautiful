import { MenuVO } from "@/api/login/types";
import { MenuItem } from "@/layout/Sidebar/types";
import { buildFullPath } from "@/utils/route";
import SvgIcon from "@/components/SvgIcon";
import React from "react";

/**
 * 图标名称到 SVG 图标类名的映射表
 * 用于将后端返回的图标字符串转换为对应的 SvgIcon 组件
 */
const iconMap: Record<string, string> = {
  // 系统相关图标
  "system": "system",
  "home": "home",
  "dashboard": "dashboard",
  "user": "user",
  "users": "peoples",
  "shield": "shield",
  "menu": "menu",
  "building": "building",
  "briefcase": "briefcase",
  "book": "book",
  "sliders": "slider",
  "bell": "bell",
  "file-text": "file-text",
  "globe": "globe",
  "server": "server",
  "bar-chart": "chart",
  "cpu": "cpu",
  "eye": "eye",
  "network": "network",
  "database": "database",
  "key": "key",
  "folder-tree": "tree",
  "list-tree": "tree",
  "file-code": "code",
  "message-square": "message",
  "mail": "email",
  "search": "search",
  "download": "download",
  "upload": "upload",
  "edit": "edit",
  "trash": "trash",
  "plus": "plus",
  "minus": "minus",
  "check": "check",
  "x": "x",
  "chevron-right": "chevron-right",
  "chevron-down": "chevron-down",
  "more-vertical": "more-vertical",
  "external-link": "external-link",
  "link": "link",
  "lock": "lock",
  "unlock": "unlock",
  "eye-off": "eye-off",
  "star": "star",
  "heart": "heart",
  "flag": "flag",
  "zap": "zap",
  "cloud": "cloud",
  "terminal": "terminal",
  "code": "code",
  "git-branch": "git-branch",
  "git-pull-request": "git-pull-request",
  "git-commit": "git-commit",
  "git-merge": "git-merge",
  "git-compare": "git-compare",
  "git-branch-plus": "git-branch-plus",
  "git-pull-request-closed": "git-pull-request-closed",
  "git-fork": "git-fork",
  
  // 默认图标（当找不到匹配时使用）
  "default": "dashboard",
};

/**
 * 将后端 MenuVO 转换为前端 MenuItem
 * @param menuVO 后端菜单对象
 * @param parentPath 父级菜单的路径（用于拼接子菜单路径）
 * @returns 转换后的前端菜单项
 */
export function convertMenuVOToMenuItem(menuVO: MenuVO, parentPath: string = ""): MenuItem | null {
  // 过滤掉 visible: false 的菜单项
  if (!menuVO.visible) {
    return null;
  }

  // 获取图标组件
  let iconComponent: React.ReactElement | undefined;
  if (menuVO.icon) {
    const iconClass = menuVO.icon || "dashboard";
    iconComponent = React.createElement(SvgIcon, { iconClass, className: "w-4 h-4" });
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
    label: menuVO.name,
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
export function convertMenuVOToMenuItems(menuVO: MenuVO | MenuVO[] | null): MenuItem[] {
  if (!menuVO) {
    return [];
  }

  const menus = Array.isArray(menuVO) ? menuVO : [menuVO];
  
  return menus
    .map(menu => convertMenuVOToMenuItem(menu))
    .filter((item): item is MenuItem => item !== null);
}

