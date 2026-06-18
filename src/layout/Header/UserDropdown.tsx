import React from "react";
import { Avatar, Dropdown } from "antd";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { removeToken } from "@/utils/auth";
import { authService } from "@/core/services/authService";
import { appConfig } from "@/config/app";

const UserDropdown: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.info?.user);
  const resetUser = useUserStore((state) => state.resetUser);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Local state still needs to be cleared even if the server logout fails.
    }
    removeToken();
    resetUser();
    navigate(appConfig.loginRoute, { replace: true });
  };

  const items = [
    {
      key: "settings",
      label: "个人设置",
      icon: <Settings size={14} />,
      onClick: () => {},
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: "退出登录",
      icon: <LogOut size={14} />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <button
        type="button"
        className="group inline-flex h-8 items-center gap-2 rounded-md px-1.5 text-theme-text-secondary transition-all duration-motion-base ease-motion-out hover:bg-theme-hover hover:text-theme-text active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary-border focus-visible:ring-offset-2 focus-visible:ring-offset-theme-header-bg"
      >
        <Avatar
          size={24}
          src={user?.avatar}
          icon={!user?.avatar && <User size={14} />}
          className="bg-theme-primary transition-transform duration-motion-base ease-motion-out group-hover:scale-105"
        />
        <span className="hidden max-w-24 truncate text-sm font-medium sm:inline">
          {user?.nickname || "Admin"}
        </span>
      </button>
    </Dropdown>
  );
};

export default UserDropdown;
