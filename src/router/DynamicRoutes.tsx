import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import PageLoading from '@/components/PageLoading';
import PageState from '@/components/PageState';
import { useUserStore } from '@/store/useUserStore';
import { getAccessToken } from '@/utils/auth';
import { convertMenuVOToRouteConfigs } from '@/utils/route';
import { dynamicImport } from './dynamicImport';
import { extraRoutePaths } from './extraRoutes';

export const useDynamicRoutes = (): [React.ReactElement[], boolean] => {
  const rawMenus = useUserStore((state) => state.rawMenus);
  const [routeElements, setRouteElements] = useState<React.ReactElement[]>([]);
  const [isLoading, setIsLoading] = useState(() => !!getAccessToken());

  useEffect(() => {
    if (!rawMenus) {
      setRouteElements([]);
      setIsLoading(!!getAccessToken());
      return;
    }

    const menuArray = Array.isArray(rawMenus) ? rawMenus : [rawMenus];
    const routeConfigs = convertMenuVOToRouteConfigs(menuArray);
    const staticPaths = new Set(['dashboard', ...extraRoutePaths]);

    const elements = routeConfigs
      .filter((config) => !staticPaths.has(config.path.replace(/^\//, '')))
      .map((config) => {
        const LazyComponent = lazy(() =>
          dynamicImport(config.componentPath).catch(() =>
            Promise.resolve({
              default: () => (
                <PageState
                  type="error"
                  title="组件加载失败"
                  description={`未找到页面组件：${config.componentPath}`}
                />
              ),
            }),
          ),
        );

        return (
          <Route
            key={config.path}
            path={config.path.replace(/^\//, '')}
            element={
              <Suspense fallback={<PageLoading label="页面加载中..." />}>
                <LazyComponent />
              </Suspense>
            }
          />
        );
      });

    setRouteElements(elements);
    setIsLoading(false);
  }, [rawMenus]);

  return [routeElements, isLoading];
};
