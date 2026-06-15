import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/useUserStore';
import Logo from '@/layout/components/Logo';
import { convertMenuVOToRouteConfigs } from '@/utils/route';
import { dynamicImport } from '@/router/dynamicImport';
import type { MenuItem } from '@/layout/Sidebar/types';

interface SideSidebarProps {
  collapsed: boolean;
}

const SideSidebar: React.FC<SideSidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menus, rawMenus } = useUserStore();

  // 展开的菜单组 key 集合
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  // 预加载
  const routeConfigs = useMemo(() => {
    if (!rawMenus) return [];
    const menuArray = Array.isArray(rawMenus) ? rawMenus : [rawMenus];
    return convertMenuVOToRouteConfigs(menuArray);
  }, [rawMenus]);

  const prefetch = useCallback(
    (path: string) => {
      const config = routeConfigs.find((c) => c.path === path);
      if (config?.componentPath) {
        dynamicImport(config.componentPath).catch(() => {});
      }
    },
    [routeConfigs]
  );

  /** 切换菜单组的展开/折叠 */
  const toggleExpand = useCallback((id: string | number) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(String(id))) {
        next.delete(String(id));
      } else {
        next.add(String(id));
      }
      return next;
    });
  }, []);

  /** 判断菜单项或其子项是否处于激活状态 */
  const isActive = useCallback((path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  }, [location.pathname]);

  /** 判断菜单组下是否有激活的子项 */
  const isGroupActive = useCallback((item: MenuItem): boolean => {
    if (isActive(item.path)) return true;
    if (item.children) {
      return item.children.some((child) => isGroupActive(child));
    }
    return false;
  }, [isActive]);

  // 自动展开包含当前激活路由的菜单组
  React.useEffect(() => {
    if (!menus) return;
    const activeKeys = new Set<string>();
    const findActive = (items: MenuItem[]) => {
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          if (isGroupActive(item)) {
            activeKeys.add(String(item.id));
          }
          findActive(item.children);
        }
      }
    };
    findActive(menus);
    if (activeKeys.size > 0) {
      setExpandedKeys((prev) => {
        const next = new Set(prev);
        for (const key of activeKeys) {
          next.add(key);
        }
        return next;
      });
    }
  }, [location.pathname, menus, isGroupActive]);

  const displayMenus = useMemo(() => (menus && menus.length > 0) ? menus : [], [menus]);

  // ========== 子菜单弹出面板（收起模式下使用） ==========
  const CollapsedSubmenuPopup: React.FC<{ item: MenuItem }> = ({ item }) => (
    <div className="py-1 min-w-[140px]">
      <div className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
        "text-theme-text-tertiary"
      }`}>
        {item.label}
      </div>
      {item.children?.map((child) => {
        const childActive = isActive(child.path);
        return (
          <button
            key={String(child.id)}
            onClick={() => navigate(child.path)}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-2 ${
              childActive
                ? 'bg-theme-sidebar-active text-theme-sidebar-text-active font-medium'
                : 'text-theme-sidebar-text hover:bg-theme-sidebar-hover hover:text-theme-text'
            }`}
          >
            {child.icon && React.isValidElement(child.icon) && (
              <span className="flex-shrink-0 w-4 h-4 inline-flex items-center justify-center">
                {child.icon}
              </span>
            )}
            <span>{child.label}</span>
          </button>
        );
      })}
    </div>
  );

  // ========== 菜单项组件 ==========
  const MenuItemNode: React.FC<{ item: MenuItem; level: number }> = ({
    item,
    level,
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.path);
    const isExpanded = expandedKeys.has(String(item.id));
    const groupActive = hasChildren ? isGroupActive(item) : active;

    // ---------- 收起模式 ----------
    if (collapsed) {
      const iconEl = (
        <div
          className={`w-full flex items-center justify-center h-10 rounded-lg transition-colors cursor-pointer ${
            groupActive
              ? 'bg-theme-sidebar-active text-theme-sidebar-text-active'
              : 'text-theme-sidebar-text hover:bg-theme-sidebar-hover hover:text-theme-text'
          }`}
        >
          {item.icon && React.isValidElement(item.icon) ? (
            <span className="w-5 h-5 inline-flex items-center justify-center">
              {item.icon}
            </span>
          ) : (
            <span className="w-5 h-5 inline-flex items-center justify-center text-xs font-medium">
              {item.label.charAt(0)}
            </span>
          )}
        </div>
      );

      // 有子菜单：悬浮弹出子菜单列表
      if (hasChildren) {
        return (
          <Popover
            content={<CollapsedSubmenuPopup item={item} />}
            placement="rightTop"
            trigger="hover"
            mouseEnterDelay={0.1}
            overlayClassName="sidebar-collapsed-popover"
          >
            {iconEl}
          </Popover>
        );
      }

      // 无子菜单：只显示 Tooltip
      return (
        <Tooltip title={item.label} placement="right" mouseEnterDelay={0.2}>
          <div onClick={() => navigate(item.path)}>{iconEl}</div>
        </Tooltip>
      );
    }

    // ---------- 展开模式 ----------
    return (
      <div>
        <button
          onMouseEnter={() => prefetch(item.path)}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              navigate(item.path);
            }
          }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
            groupActive
              ? 'bg-theme-sidebar-active text-theme-sidebar-text-active font-medium'
              : 'text-theme-sidebar-text hover:bg-theme-sidebar-hover hover:text-theme-text'
          } ${level > 0 ? 'ml-2' : ''}`}
        >
          {item.icon ? (
            <span className={`flex-shrink-0 w-[18px] h-[18px] inline-flex items-center justify-center ${groupActive ? 'text-theme-sidebar-text-active' : ''}`}>
              {React.isValidElement(item.icon) ? item.icon : null}
            </span>
          ) : (
            <span className="flex-shrink-0 w-[18px] h-[18px]" />
          )}
          <span className="truncate flex-1 text-left">{item.label}</span>
          {/* 展开折叠箭头 */}
          {hasChildren && (
            <span className={`flex-shrink-0 text-[10px] transition-transform duration-200 ${
              "text-theme-text-tertiary"
            } ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
              <DownOutlined />
            </span>
          )}
        </button>

        {/* 子菜单：可折叠展开 */}
        {hasChildren && isExpanded && (
          <div className="mt-0.5 space-y-0.5 ml-4 border-l border-theme-sidebar-border pl-2 overflow-hidden">
            {item.children!.map((child: MenuItem) => (
              <MenuItemNode key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-20 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      } bg-theme-sidebar-bg border-r border-theme-sidebar-border`}
    >
      <Logo collapsed={collapsed} />

      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {displayMenus.map((item: MenuItem) => (
          <MenuItemNode key={item.id} item={item} level={0} />
        ))}
      </nav>
    </aside>
  );
};

export default SideSidebar;
