import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageLoading from "@/components/PageLoading";
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
    <PageLoading fullscreen label="正在准备工作台" />
  );

  const renderError = () => (
    <div className="flex h-screen items-center justify-center bg-theme-bg-base text-center">
      <div>
        <p className="mb-4 font-medium text-theme-error">
          用户信息加载失败，请检查网络
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
