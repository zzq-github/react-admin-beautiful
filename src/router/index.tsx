import React, { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/layout/Layout';
import PageLoading from '@/components/PageLoading';
import { appConfig } from '@/config/app';
import { useDynamicRoutes } from './DynamicRoutes';
import { extraRoutes } from './extraRoutes';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/LoginPage'));
const NotifyMessage = lazy(() => import('@/pages/user/NotifyMessage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// 静态页面和动态页面共用同一个轻量 fallback，避免首屏出现多套加载样式。
const pageFallback = <PageLoading label="页面加载中..." />;

const Router: React.FC = () => {
  const [dynamicRouteElements, isLoading] = useDynamicRoutes();

  // 动态菜单恢复前命中未知路由时先展示加载态，避免刷新深层页面时闪到 404。
  const renderLoading = () => <PageLoading fullscreen label="路由加载中..." />;

  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<PageLoading fullscreen label="应用加载中..." />}>
        <Routes>
          <Route
            path={appConfig.loginRoute}
            element={
              <Suspense fallback={pageFallback}>
                <Login />
              </Suspense>
            }
          />

          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={appConfig.defaultRoute} replace />} />
            <Route
              path="dashboard"
              element={
                <Suspense fallback={pageFallback}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path={appConfig.notifyRoute}
              element={
                <Suspense fallback={pageFallback}>
                  <NotifyMessage />
                </Suspense>
              }
            />
            {extraRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            {dynamicRouteElements}
          </Route>

          <Route
            path="*"
            element={
              isLoading ? (
                renderLoading()
              ) : (
                <Suspense fallback={pageFallback}>
                  <NotFoundPage />
                </Suspense>
              )
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default Router;
