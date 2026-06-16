import React, { useMemo } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/layout/components/Logo";
import HeaderActions from "@/layout/components/HeaderActions";
import { useUserStore } from "@/store/useUserStore";
import { buildMenuItems, findSelectedMenuKey } from "@/utils/menu";

interface TopHeaderProps {
  onOpenSettings: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onOpenSettings }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menus = useUserStore((state) => state.menus) ?? [];

  const menuItems = useMemo(() => buildMenuItems(menus), [menus]);
  const selectedKey = useMemo(
    () => findSelectedMenuKey(menus, location.pathname),
    [location.pathname, menus]
  );

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(String(key));
  };

  return (
    <header className="sticky top-0 z-20 bg-theme-header-bg backdrop-blur border-b border-theme-border-secondary">
      <div className="flex h-14 items-center gap-4 px-4">
        <div className="flex-shrink-0">
          <Logo compact />
        </div>

        <Menu
          className="app-top-menu min-w-0 flex-1"
          mode="horizontal"
          items={menuItems}
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={handleClick}
        />

        <HeaderActions onOpenSettings={onOpenSettings} />
      </div>
    </header>
  );
};

export default TopHeader;
