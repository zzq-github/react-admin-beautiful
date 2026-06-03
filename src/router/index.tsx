import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/layout/Layout";
import Login from "@/pages/LoginPage";
import { useDynamicRoutes } from "./DynamicRoutes";
import NotifyMessage from "@/pages/user/NotifyMessage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Loader } from "lucide-react";

const Router: React.FC = () => {
  const [dynamicRouteElements, isLoading] = useDynamicRoutes();
  
  // 渲染加载状态
  const renderLoading = () => (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin" />
    </div>
  );

  return (
    <HashRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* 1. 登录页 */}
          <Route path="/login" element={<Login />} />
          
          {/* 2. 业务路由 */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/system/user-management" replace />} />
            <Route path="/user/notify-message" element={<NotifyMessage />} />

            {/* 动态路由 */}
            {dynamicRouteElements}
          </Route>

          {/* 3. 全局 404 页面 - 在动态路由加载期间显示loading */}
          <Route
            path="*"
            element={isLoading ? renderLoading() : <NotFoundPage />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default Router;
