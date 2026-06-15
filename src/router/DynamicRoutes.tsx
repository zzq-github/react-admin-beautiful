import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { getAccessToken } from "@/utils/auth";
import { convertMenuVOToRouteConfigs } from "@/utils/route";
import { dynamicImport } from "./dynamicImport";

/**
 * 动态路由钩子
 * 根据用户菜单动态生成路由配置
 * @returns 包含路由元素和加载状态的元组 [routeElements, isLoading]
 */
export const useDynamicRoutes = (): [React.ReactElement[], boolean] => {
  const rawMenus = useUserStore((state) => state.rawMenus);
  const [routeElements, setRouteElements] = useState<React.ReactElement[]>([]);
  // 初始状态：已登录但无 rawMenus 时为 true（等待加载），未登录时为 false
  const [isLoading, setIsLoading] = useState(() => !!getAccessToken());

  useEffect(() => {
    // 如果没有菜单数据
    if (!rawMenus) {
      setRouteElements([]);
      // 已登录但无 rawMenus → 仍在加载中；未登录 → 不需要加载
      setIsLoading(!!getAccessToken());
      return;
    }

    // 转换菜单为路由配置（支持单个树或数组）
    const menuArray = rawMenus ? (Array.isArray(rawMenus) ? rawMenus : [rawMenus]) : [];
    const routeConfigs = convertMenuVOToRouteConfigs(menuArray);

    // 生成路由元素（过滤掉已有静态路由的 path，避免重复）
    const staticPaths = ['dashboard'];
    const elements = routeConfigs
      .filter((config) => !staticPaths.includes(config.path.replace(/^\//, '')))
      .map((config) => {
      // 动态导入组件
      const LazyComponent = lazy(() =>
        dynamicImport(config.componentPath).catch((error) => {
          // 返回一个简单的错误组件
          return Promise.resolve({
            default: () => (
              <div className="p-4 text-theme-error">
                组件加载失败: {config.componentPath}
              </div>
            ),
          });
        })
      );

      // 处理路径：去除开头的斜杠，生成相对路径（与现有路由逻辑保持一致）
      const routePath = config.path.replace(/^\//, "");

      return (
        <Route
          key={config.path}
          path={routePath}
          element={
            <Suspense fallback={<div>Loading...</div>}>
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

// /**
//  * 动态路由组件（兼容旧版本）
//  * 根据用户菜单动态生成路由配置
//  * @deprecated 请直接使用 useDynamicRoutes 钩子
//  */
// const DynamicRoutes: React.FC = () => {
//   const routeElements = useDynamicRoutes();
//   return <>{routeElements}</>;
// };

// export default DynamicRoutes;
