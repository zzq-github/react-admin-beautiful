import { MenuVO } from "@/api/login/types";

/**
 * 路由配置项
 */
export interface RouteConfig {
  /** 路由路径，例如 "/system/user-management" */
  path: string;
  /** 组件路径，用于动态导入，例如 "system/UserManagement/index" */
  componentPath: string;
  /** 是否保持缓存（对应 keepAlive） */
  keepAlive?: boolean;
  /** 是否始终显示（对应 alwaysShow） */
  alwaysShow?: boolean;
}

/**
 * 构建完整路径
 * @param childPath 子路径（可能相对）
 * @param parentPath 父路径
 * @returns 拼接后的完整路径
 */
export function buildFullPath(childPath: string, parentPath: string): string {
  // 如果子路径为空，直接返回父路径
  if (!childPath) {
    return parentPath;
  }

  // 如果子路径以 '/' 开头，视为绝对路径，直接返回
  if (childPath.startsWith('/')) {
    return childPath;
  }

  // 如果父路径为空，则子路径前面加上 '/'
  if (!parentPath) {
    return `/${childPath}`;
  }

  // 拼接父路径和子路径，确保中间有且仅有一个 '/'
  const parent = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath;
  const child = childPath.startsWith('/') ? childPath.slice(1) : childPath;
  return `${parent}/${child}`;
}

/**
 * 将单个 MenuVO 转换为路由配置
 * @param menuVO 菜单对象
 * @param parentPath 父级路径（可选）
 * @returns 路由配置对象（包含 path 和 componentPath，componentPath 可能为空）
 */
export function convertMenuVOToRouteConfig(
  menuVO: MenuVO,
  parentPath: string = ''
): { path: string; componentPath: string; keepAlive?: boolean; alwaysShow?: boolean } | null {
  // 过滤不可见菜单
  if (!menuVO.visible) {
    return null;
  }

  // 按钮类型（type = 3）不需要路由
  if (menuVO.type === 3) {
    return null;
  }

  // 只有类型为菜单（type = 2）才需要组件，目录（type = 1）不需要组件
  const componentPath = menuVO.type === 2 ? menuVO.component : undefined;

  // 构建完整路径
  const fullPath = buildFullPath(menuVO.path || '', parentPath);

  // 如果没有路径，使用 id 作为 fallback（避免空路径）
  const path = fullPath || `/${menuVO.id}`;

  return {
    path,
    componentPath: componentPath || '', // 目录的 componentPath 为空
    keepAlive: menuVO.keepAlive,
    alwaysShow: menuVO.alwaysShow,
  };
}

/**
 * 批量将 MenuVO 数组转换为路由配置数组
 * @param menus 菜单数组
 * @returns 路由配置数组（仅包含 componentPath 不为空的菜单项）
 */
export function convertMenuVOToRouteConfigs(menus: MenuVO[]): RouteConfig[] {
  const result: RouteConfig[] = [];

  const traverse = (nodes: MenuVO[], currentParentPath: string = '') => {
    for (const node of nodes) {
      // 计算当前节点的完整路径（无论是否生成路由）
      const fullPath = buildFullPath(node.path || '', currentParentPath);
      const path = fullPath || `/${node.id}`;

      // 只有类型为菜单（type = 2）且 component 存在时才生成路由
      if (node.type === 2 && node.component) {
        result.push({
          path,
          componentPath: node.component,
          keepAlive: node.keepAlive,
          alwaysShow: node.alwaysShow,
        });
      }

      // 递归处理子菜单，传递当前路径作为父路径
      if (node.children && node.children.length > 0) {
        traverse(node.children, path);
      }
    }
  };

  traverse(menus);
  return result;
}