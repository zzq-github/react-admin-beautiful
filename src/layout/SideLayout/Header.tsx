import React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import HeaderActionButton from "@/layout/components/HeaderActionButton";
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

export default SideHeader;
