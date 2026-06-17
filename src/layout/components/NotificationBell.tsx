import React from "react";
import { Badge } from "antd";
import { Bell } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { appConfig } from "@/config/app";
import HeaderActionButton from "./HeaderActionButton";

const NotificationBell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === appConfig.notifyRoute;

  return (
    <HeaderActionButton
      label="通知消息"
      onClick={() => navigate(appConfig.notifyRoute)}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "bg-theme-primary-bg text-theme-primary hover:bg-theme-primary-bg hover:text-theme-primary"
          : undefined
      }
    >
      <Badge
        size="small"
        count={0}
        className="inline-flex items-center justify-center leading-none"
      >
        <Bell size={18} className="block" />
      </Badge>
    </HeaderActionButton>
  );
};

export default NotificationBell;
