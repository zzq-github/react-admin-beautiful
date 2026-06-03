import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useDictStore } from "@/store/useDictStore";
import { getAccessToken } from "@/utils/auth";
import Sidebar from "./Sidebar";
import Header from "./Header";

/**
 * Layout 组件：负责全局数据初始化与布局控制
 */
const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const location = useLocation();

  // --- 路由守卫：未登录时跳转到登录页 ---
  const accessToken = getAccessToken();
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // 从 Store 中获取状态和方法
  const status = useUserStore((state) => state.status);
  const rawMenus = useUserStore((state) => state.rawMenus);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const fetchDictDatas = useDictStore((state) => state.fetchDictDatas);

  // 请求用户信息和权限/字典相关
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // 先获取字典数据，再获取用户信息（确保渲染时字典已可用）
        await fetchDictDatas();
        await fetchUserInfo();
      } catch (error) {
        console.error("Layout 初始化数据请求失败：", error);
      }
    };

    // 在没有菜单数据时才重新获取用户信息
    if (!rawMenus) {
      loadInitialData();
    } 
  }, [fetchDictDatas, fetchUserInfo, rawMenus]);

  /** 渲染加载中状态 */
  const renderLoading = () => (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin" />
    </div>
  );

  /** 渲染错误重试状态 */
  const renderError = () => (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <p className="text-red-500 mb-4 font-medium">
          用户信息加载失败，请检查网络
        </p>
        <button
          onClick={() => fetchUserInfo()}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-sm"
        >
          重试
        </button>
      </div>
    </div>
  );

  // --- 状态分发渲染 ---

  // 如果正在加载且没有缓存的菜单数据，显示加载状态
  if ((status === "idle" || status === "loading") && !rawMenus) {
    return renderLoading();
  }

  if (status === "error") {
    return renderError();
  }

  // 如果有缓存的菜单数据或者已经加载完成，渲染布局
  // 注意：即使 status 不是 "loaded"，只要有缓存的 rawMenus 就可以渲染
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部栏 - 传递控制侧边栏的方法 */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 侧边栏 */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* 主视图区域 */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div className="p-6 min-h-screen" style={{ marginTop: "20px" }}>
          {/* Outlet 渲染子路由对应的页面组件 */}
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
