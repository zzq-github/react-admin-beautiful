import React, { useState } from 'react';
import SideSidebar from './Sidebar';
import SideHeader from './Header';
import SettingsDrawer from '@/layout/components/SettingsDrawer';
import LayoutContent from '@/layout/components/LayoutContent';

const SideLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-theme-bg-base">
      <SideSidebar collapsed={collapsed} />
      <div
        className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'}`}
      >
        <SideHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <LayoutContent />
      </div>
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default SideLayout;
