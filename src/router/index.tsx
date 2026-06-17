import React, { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";
import Login from "@/pages/LoginPage";
import NotifyMessage from "@/pages/user/NotifyMessage";
import NotFoundPage from "@/pages/NotFoundPage";
import PageLoading from "@/components/PageLoading";
import { appConfig } from "@/config/app";
import { useDynamicRoutes } from "./DynamicRoutes";

const Dashboard = lazy(() => import("@/pages/Dashboard"));

const Router: React.FC = () => {
  const [dynamicRouteElements, isLoading] = useDynamicRoutes();

  const renderLoading = () => <PageLoading fullscreen label="路由加载中" />;

  return (
    <HashRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Suspense fallback={<PageLoading fullscreen label="应用加载中" />}>
        <Routes>
          <Route path={appConfig.loginRoute} element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<Navigate to={appConfig.defaultRoute} replace />}
            />
            <Route
              path="dashboard"
              element={
                <Suspense fallback={<PageLoading label="页面加载中" />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route path={appConfig.notifyRoute} element={<NotifyMessage />} />
            {dynamicRouteElements}
          </Route>

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
