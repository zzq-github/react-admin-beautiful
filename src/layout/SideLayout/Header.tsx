import React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import HeaderActions from "@/layout/components/HeaderActions";

interface SideHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  onOpenSettings: () => void;
}

const SideHeader: React.FC<SideHeaderProps> = ({
  collapsed,
  onToggle,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-10 bg-theme-header-bg backdrop-blur border-b border-theme-border-secondary">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "展开菜单" : "折叠菜单"}
            className="p-1.5 rounded-lg transition-colors text-theme-text-secondary hover:bg-theme-hover hover:text-theme-text"
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <HeaderActions onOpenSettings={onOpenSettings} />
      </div>
    </header>
  );
};

export default SideHeader;
