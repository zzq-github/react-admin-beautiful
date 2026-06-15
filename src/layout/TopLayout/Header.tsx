import React, { useCallback } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/layout/components/Logo";
import HeaderActions from "@/layout/components/HeaderActions";
import { useUserStore } from "@/store/useUserStore";
import type { MenuItem } from "@/layout/Sidebar/types";

interface TopHeaderProps {
  onOpenSettings: () => void;
}

const pathMatches = (menuPath: string, pathname: string) => {
  return pathname === menuPath || pathname.startsWith(`${menuPath}/`);
};

const isGroupActive = (item: MenuItem, pathname: string): boolean => {
  if (pathMatches(item.path, pathname)) {
    return true;
  }

  return item.children?.some((child) => isGroupActive(child, pathname)) ?? false;
};

const toDropdownItems = (items: MenuItem[]): MenuProps["items"] => {
  return items.map((item) => ({
    key: item.path,
    label: item.label,
    children: item.children?.length ? toDropdownItems(item.children) : undefined,
  }));
};

const TopHeader: React.FC<TopHeaderProps> = ({ onOpenSettings }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menus = useUserStore((state) => state.menus) ?? [];

  const handleMenuClick = useCallback<NonNullable<MenuProps["onClick"]>>(
    ({ key }) => {
      navigate(String(key));
    },
    [navigate]
  );

  return (
    <header className="sticky top-0 z-20 bg-theme-header-bg backdrop-blur border-b border-theme-border-secondary">
      <div className="flex h-14 items-center gap-4 px-4">
        <div className="flex-shrink-0">
          <Logo compact />
        </div>

        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {menus.map((item) => {
            const active = isGroupActive(item, location.pathname);
            const baseClass = [
              "inline-flex h-9 shrink-0 items-center gap-1 rounded-lg px-3 text-sm transition-colors",
              active
                ? "bg-theme-primary-bg text-theme-primary font-medium"
                : "text-theme-text-secondary hover:bg-theme-hover hover:text-theme-text",
            ].join(" ");

            if (item.children?.length) {
              return (
                <Dropdown
                  key={String(item.id)}
                  menu={{
                    items: toDropdownItems(item.children),
                    onClick: handleMenuClick,
                  }}
                  trigger={["hover", "click"]}
                >
                  <button type="button" className={baseClass}>
                    {item.icon && React.isValidElement(item.icon) && (
                      <span className="inline-flex h-4 w-4 items-center justify-center">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                    <DownOutlined className="text-[10px]" />
                  </button>
                </Dropdown>
              );
            }

            return (
              <button
                type="button"
                key={String(item.id)}
                onClick={() => navigate(item.path)}
                className={baseClass}
              >
                {item.icon && React.isValidElement(item.icon) && (
                  <span className="inline-flex h-4 w-4 items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <HeaderActions onOpenSettings={onOpenSettings} />
      </div>
    </header>
  );
};

export default TopHeader;
