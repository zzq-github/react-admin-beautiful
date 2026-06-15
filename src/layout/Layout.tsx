import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useDictStore } from "@/store/useDictStore";
import { getAccessToken } from "@/utils/auth";
import { appConfig } from "@/config/app";
import { useTheme } from "@/theme";
import SideLayout from "./SideLayout";
import TopLayout from "./TopLayout";

const Layout: React.FC = () => {
  const accessToken = getAccessToken();
  const status = useUserStore((state) => state.status);
  const menus = useUserStore((state) => state.menus);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const fetchDictDatas = useDictStore((state) => state.fetchDictDatas);
  const { themeConfig } = useTheme();

  useEffect(() => {
    if (!accessToken || status !== "idle") {
      return;
    }

    const loadInitialData = async () => {
      try {
        await fetchDictDatas();
        await fetchUserInfo();
      } catch (error) {
        console.error("Layout 初始化数据请求失败：", error);
      }
    };

    loadInitialData();
  }, [accessToken, fetchDictDatas, fetchUserInfo, status]);

  const renderLoading = () => (
    <div className="flex items-center justify-center h-screen bg-theme-bg-base">
      <Loader className="animate-spin text-theme-primary" size={32} />
    </div>
  );

  const renderError = () => (
    <div className="flex items-center justify-center h-screen bg-theme-bg-base text-center">
      <div>
        <p className="text-theme-error mb-4 font-medium">
          用户信息加载失败，请检查网络
        </p>
        <button
          type="button"
          onClick={() => fetchUserInfo()}
          className="px-6 py-2 bg-theme-primary hover:bg-theme-primary-hover text-white rounded-md transition-colors shadow-sm"
        >
          重试
        </button>
      </div>
    </div>
  );

  if (!accessToken) {
    return <Navigate to={appConfig.loginRoute} replace />;
  }

  if ((status === "idle" || status === "loading") && !menus) {
    return renderLoading();
  }

  if (status === "error") {
    return renderError();
  }

  return themeConfig.layoutMode === "top" ? <TopLayout /> : <SideLayout />;
};

export default Layout;
