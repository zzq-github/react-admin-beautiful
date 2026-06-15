import React, { useState } from "react";
import SettingsDrawer from "@/layout/components/SettingsDrawer";
import LayoutContent from "@/layout/components/LayoutContent";
import TopHeader from "./Header";

const TopLayout: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-theme-bg-base">
      <TopHeader onOpenSettings={() => setSettingsOpen(true)} />
      <LayoutContent />
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default TopLayout;
