import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PageLoading from "@/components/PageLoading";
import { appConfig } from "@/config/app";
import { useDictStore } from "@/store/useDictStore";
import { useUserStore } from "@/store/useUserStore";
import { useTheme } from "@/theme";
import { getAccessToken } from "@/utils/auth";
import LayoutHeader from "./Header";
import SettingsDrawer from "./Header/SettingsDrawer";
import Sidebar from "./Sidebar";

const LayoutContent: React.FC = () => {
  const location = useLocation();

  return (
    <main className="p-3">
      <div key={location.pathname} className="app-page-transition">
        <Outlet />
      </div>
    </main>
  );
};

const Layout: React.FC = () => {
  const accessToken = getAccessToken();
  const status = useUserStore((state) => state.status);
  const menus = useUserStore((state) => state.menus);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const fetchDictDatas = useDictStore((state) => state.fetchDictDatas);
  const { themeConfig } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!accessToken || status !== "idle") {
      return;
    }

    const loadInitialData = async () => {
      try {
        await fetchDictDatas();
        await fetchUserInfo();
      } catch (error) {
        console.error("Layout initial data request failed:", error);
      }
    };

    loadInitialData();
  }, [accessToken, fetchDictDatas, fetchUserInfo, status]);

  if (!accessToken) {
    return <Navigate to={appConfig.loginRoute} replace />;
  }

  if ((status === "idle" || status === "loading") && !menus) {
    return <PageLoading fullscreen label="正在准备工作台" />;
  }

  if (status === "error") {
    return (
      <div className="flex h-screen items-center justify-center bg-theme-bg-base text-center">
        <div>
          <p className="mb-4 font-medium text-theme-error">
            用户信息加载失败，请检查网络。
          </p>
          <button
            type="button"
            onClick={() => fetchUserInfo()}
            className="rounded-md bg-theme-primary px-6 py-2 text-white shadow-sm transition-colors duration-motion-base ease-motion-out hover:bg-theme-primary-hover"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (themeConfig.layoutMode === "top") {
    return (
      <div className="min-h-screen bg-theme-bg-base">
        <LayoutHeader
          mode="top"
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <LayoutContent />
        <SettingsDrawer
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg-base">
      <Sidebar collapsed={collapsed} />
      <div
        className={`transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-60"
        }`}
      >
        <LayoutHeader
          mode="side"
          collapsed={collapsed}
          onToggle={() => setCollapsed((value) => !value)}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <LayoutContent />
      </div>
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default Layout;
