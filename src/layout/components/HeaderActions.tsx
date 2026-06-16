import React from "react";
import { Settings } from "lucide-react";
import NotificationBell from "./NotificationBell";
import UserDropdown from "./UserDropdown";

interface HeaderActionsProps {
  onOpenSettings: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ onOpenSettings }) => {
  return (
    <div className="flex items-center gap-2">
      <NotificationBell />
      <button
        type="button"
        aria-label="主题设置"
        onClick={onOpenSettings}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-theme-text-secondary hover:text-theme-text hover:bg-theme-hover transition-colors"
      >
        <Settings size={18} />
      </button>
      <UserDropdown />
    </div>
  );
};

export default HeaderActions;
