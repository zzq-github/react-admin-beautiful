import React from "react";
import { Badge, Dropdown } from "antd";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appConfig } from "@/config/app";
import HeaderActionButton from "./HeaderActionButton";

const NotificationBell: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "all",
      label: "查看全部通知",
      onClick: () => navigate(appConfig.notifyRoute),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <HeaderActionButton label="通知消息">
        <Badge
          size="small"
          count={0}
          className="inline-flex items-center justify-center leading-none"
        >
          <Bell size={18} className="block" />
        </Badge>
      </HeaderActionButton>
    </Dropdown>
  );
};

export default NotificationBell;
