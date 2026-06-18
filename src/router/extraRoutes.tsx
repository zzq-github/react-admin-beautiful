import React, { lazy, Suspense } from 'react';
import PageLoading from '@/components/PageLoading';

const DictData = lazy(() => import('@/pages/system/DictManagement/DictData'));

export interface ExtraRouteConfig {
  path: string;
  element: React.ReactElement;
}

const withPageLoading = (element: React.ReactElement) => (
  <Suspense fallback={<PageLoading label="页面加载中..." />}>{element}</Suspense>
);

export const extraRoutes: ExtraRouteConfig[] = [
  {
    path: 'system-demo/dict-management/dict-data/:dictType',
    element: withPageLoading(<DictData />),
  },
];

export const extraRoutePaths = extraRoutes.map((route) => route.path);
