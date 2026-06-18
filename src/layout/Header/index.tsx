import React, { useMemo } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { buildMenuItems, findSelectedMenuKey } from "@/utils/menu";
import HeaderActionButton from "./ActionButton";
import HeaderActions from "./Actions";
import Logo from "./Logo";

interface LayoutHeaderProps {
  mode: "side" | "top";
  collapsed?: boolean;
  onToggle?: () => void;
  onOpenSettings: () => void;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  mode,
  collapsed = false,
  onToggle,
  onOpenSettings,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menus = useUserStore((state) => state.menus) ?? [];

  const menuItems = useMemo(() => buildMenuItems(menus), [menus]);
  const selectedKey = useMemo(
    () => findSelectedMenuKey(menus, location.pathname),
    [location.pathname, menus],
  );

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(String(key));
  };

  if (mode === "top") {
    return (
      <header className="sticky top-0 z-20 border-b border-theme-border-secondary bg-theme-header-bg backdrop-blur">
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
  }

  return (
    <header className="sticky top-0 z-10 border-b border-theme-border-secondary bg-theme-header-bg backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4">
        <HeaderActionButton
          label={collapsed ? "展开菜单" : "折叠菜单"}
          onClick={onToggle}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </HeaderActionButton>

        <HeaderActions onOpenSettings={onOpenSettings} />
      </div>
    </header>
  );
};

export default LayoutHeader;
