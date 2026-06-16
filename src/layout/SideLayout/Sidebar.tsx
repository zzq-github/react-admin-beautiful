import React, { useEffect, useMemo, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import Logo from "@/layout/components/Logo";
import {
  buildMenuItems,
  findOpenMenuKeys,
  findSelectedMenuKey,
} from "@/utils/menu";

interface SideSidebarProps {
  collapsed: boolean;
}

const SideSidebar: React.FC<SideSidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menus = useUserStore((state) => state.menus) ?? [];
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menuItems = useMemo(() => buildMenuItems(menus), [menus]);
  const selectedKey = useMemo(
    () => findSelectedMenuKey(menus, location.pathname),
    [location.pathname, menus]
  );

  useEffect(() => {
    if (collapsed) {
      return;
    }

    setOpenKeys((prev) => {
      const activeOpenKeys = findOpenMenuKeys(menus, selectedKey);
      return Array.from(new Set([...prev, ...activeOpenKeys]));
    });
  }, [collapsed, menus, selectedKey]);

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(String(key));
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-20 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      } bg-theme-sidebar-bg border-r border-theme-sidebar-border`}
    >
      <Logo collapsed={collapsed} />

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <Menu
          className="app-sidebar-menu"
          mode="inline"
          inlineCollapsed={collapsed}
          items={menuItems}
          selectedKeys={selectedKey ? [selectedKey] : []}
          openKeys={collapsed ? undefined : openKeys}
          onOpenChange={setOpenKeys}
          onClick={handleClick}
        />
      </nav>
    </aside>
  );
};

export default SideSidebar;
