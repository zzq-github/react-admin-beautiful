import React from "react";
import { Divider, Drawer } from "antd";
import { AlignLeft, LayoutGrid, Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme";

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const getOptionClass = (active: boolean) =>
  [
    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
    active
      ? "bg-theme-primary-bg text-theme-primary"
      : "text-theme-text-secondary hover:bg-theme-hover",
  ].join(" ");

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, onClose }) => {
  const { themeConfig, setThemeConfig } = useTheme();

  return (
    <Drawer
      title="主题设置"
      placement="right"
      width={300}
      open={open}
      onClose={onClose}
    >
      <div className="mb-6">
        <h4 className="text-sm font-medium text-theme-text mb-3">显示模式</h4>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setThemeConfig({ darkMode: false })}
            className={getOptionClass(!themeConfig.darkMode)}
          >
            <Sun size={16} />
            亮色
          </button>
          <button
            type="button"
            onClick={() => setThemeConfig({ darkMode: true })}
            className={getOptionClass(themeConfig.darkMode)}
          >
            <Moon size={16} />
            暗色
          </button>
        </div>
      </div>

      <Divider className="!my-4" />

      <div className="mb-6">
        <h4 className="text-sm font-medium text-theme-text mb-3">布局模式</h4>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setThemeConfig({ layoutMode: "side" })}
            className={getOptionClass(themeConfig.layoutMode === "side")}
          >
            <AlignLeft size={16} />
            侧边栏
          </button>
          <button
            type="button"
            onClick={() => setThemeConfig({ layoutMode: "top" })}
            className={getOptionClass(themeConfig.layoutMode === "top")}
          >
            <LayoutGrid size={16} />
            顶部栏
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default SettingsDrawer;
