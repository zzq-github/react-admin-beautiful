import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

// --- 1. 定义数据结构接口 ---
import type { MenuItem } from "./types";
import { dynamicImport } from "@/router/dynamicImport";
import { convertMenuVOToRouteConfigs } from "@/utils/route";
interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 获取用户信息和菜单数据
  const { menus, rawMenus, status, fetchUserInfo } = useUserStore();

  // 组件挂载时获取用户信息（如果尚未获取）
  useEffect(() => {
    if (status === "idle") {
      fetchUserInfo();
    }
  }, [status, fetchUserInfo]);

  // 根据 rawMenus 计算动态路由配置
  const routeConfigs = React.useMemo(() => {
    if (!rawMenus) return [];
    const menuArray = Array.isArray(rawMenus) ? rawMenus : [rawMenus];
    return convertMenuVOToRouteConfigs(menuArray);
  }, [rawMenus]);

  // 预加载函数：手动触发动态 import
  const prefetch = (path: string) => {
    // 从 routeConfigs 中查找组件路径
    const config = routeConfigs.find((c) => c.path === path);
    if (config && config.componentPath) {
      dynamicImport(config.componentPath).catch(() => {});
    }
  };

  /**
   * 获取菜单项的第一个可导航子路径
   * 如果菜单项有子菜单，则递归查找第一个子菜单的路径
   */
  const getFirstChildPath = (item: MenuItem): string => {
    if (item.children && item.children.length > 0) {
      return getFirstChildPath(item.children[0]);
    }
    return item.path;
  };

  // 检查路径是否激活
  const isActive = (path: string): boolean => location.pathname.includes(path);

  // 决定使用哪个菜单数据源
  // 优先级：动态菜单 > 静态菜单
  const displayMenus = React.useMemo(() => {
    // 只使用动态菜单，如果没有动态菜单则返回空数组
    return menus && menus.length > 0 ? menus : [];
  }, [menus]);
  console.log(displayMenus);

  // 递归菜单组件
  const MenuItemNode = React.useCallback(
    ({ item, level = 0 }: { item: MenuItem; level?: number }) => {
      const hasChildren = item.children && item.children.length > 0;

      // 计算缩进样式：层级大于0时添加左边距
      // const indentStyle = level > 0 ? { marginLeft: `${level * 1.5}rem` } : {};

      return (
        <div>
          {/* 主菜单按钮 */}
          <button
            // JS 静默下载
            onMouseEnter={() => prefetch(item.path)}
            onClick={() =>
              navigate(hasChildren ? getFirstChildPath(item) : item.path)
            }
            className={
              isActive(item.path)
                ? "nav-item-active w-full"
                : "nav-item w-full hover:shadow-sm"
            }
            // style={indentStyle}
          >
            {/* 只有当 item.icon 存在时才渲染组件 */}
            {item.icon ? (
              React.isValidElement(item.icon) ? (
                <div
                  className={`inline-flex items-center justify-center w-[18px] h-[18px] ${isActive(item.path) ? "text-blue-600" : "text-gray-600"}`}
                >
                  {item.icon}
                </div>
              ) : (
                React.createElement(item.icon as React.ComponentType<any>, {
                  size: 18,
                  className: isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-600",
                })
              )
            ) : (
              // 如果没有图标，可以渲染一个占位符或者干脆不渲染
              <div className="w-[18px] h-[18px]" />
            )}
            <span className="font-medium">{item.label}</span>
          </button>

          {/* 子菜单渲染 */}
          {hasChildren && (
            <div
              className={`ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-2`}
            >
              {item.children!.map((child: MenuItem) => (
                <MenuItemNode key={child.id} item={child} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      );
    },
    [prefetch, navigate, isActive, getFirstChildPath],
  );

  // 处理加载状态
  const isLoading = status === "loading";
  const hasError = status === "error";
  const hasDynamicMenus = menus && menus.length > 0;
  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 pb-8 bg-white shadow-sm border-r border-gray-100 transition-all duration-300 z-20 ${
        sidebarOpen ? "w-72" : "w-0 overflow-hidden"
      }`}
    >
      <div className="p-4 h-full overflow-y-auto" style={{ marginTop: "30px" }}>
        {/* 加载状态指示器 */}
        {isLoading && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-blue-700">加载菜单中...</span>
            </div>
          </div>
        )}

        {/* 错误状态指示器 */}
        {hasError && !hasDynamicMenus && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-center">
              <span className="text-sm text-yellow-700">动态菜单加载失败</span>
            </div>
          </div>
        )}

        {/* 递归菜单组件 */}
        <nav className="space-y-2">
          {displayMenus.map((item: MenuItem) => (
            <MenuItemNode key={item.id} item={item} level={0} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
