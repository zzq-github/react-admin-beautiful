import type React from 'react';

const pageModules = import.meta.glob([
  '../pages/**/index.{jsx,tsx}',
  '../pages/*.{jsx,tsx}',
  '!../pages/Dashboard/index.{jsx,tsx}',
  '!../pages/LoginPage/index.{jsx,tsx}',
  '!../pages/NotFoundPage/index.{jsx,tsx}',
  '!../pages/user/NotifyMessage/index.{jsx,tsx}',
]);

export function dynamicImport<T = any>(componentPath: string): Promise<T> {
  const purePath = componentPath.replace(/\.(jsx|tsx)$/, '');
  const candidatePaths = [
    `../pages/${purePath}.tsx`,
    `../pages/${purePath}.jsx`,
    `../pages/${purePath}/index.tsx`,
    `../pages/${purePath}/index.jsx`,
  ];

  const importFn = candidatePaths.map((path) => pageModules[path]).find(Boolean) as
    | (() => Promise<{ default: React.ComponentType<any> }>)
    | undefined;

  if (!importFn) {
    return Promise.reject(
      new Error(
        `无法找到页面组件：${componentPath}。请确认以下路径之一存在：\n${candidatePaths.join('\n')}`,
      ),
    );
  }

  return importFn() as Promise<T>;
}
