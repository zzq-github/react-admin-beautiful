import React from "react";
import { Settings } from "lucide-react";
import HeaderActionButton from "./HeaderActionButton";
import NotificationBell from "./NotificationBell";
import UserDropdown from "./UserDropdown";

interface HeaderActionsProps {
  onOpenSettings: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ onOpenSettings }) => {
  return (
    <div className="flex items-center gap-1.5">
      <NotificationBell />
      <HeaderActionButton label="主题设置" onClick={onOpenSettings}>
        <Settings size={18} />
      </HeaderActionButton>
      <UserDropdown />
    </div>
  );
};

export default HeaderActions;
