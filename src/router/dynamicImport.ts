/**
 * 动态导入工具
 * 基于 Vite 的 import.meta.glob 实现页面组件的懒加载
 * 根据组件路径自动匹配物理文件
 */

/**
 * 预扫描 pages 目录下所有的页面入口文件
 * Vite 的类型定义：Record<string, () => Promise<any>>
 */
const allModules = import.meta.glob("../pages/**/*.{jsx,tsx}");

/**
 * 统一的动态导入函数
 * 根据组件路径导入对应的页面组件
 * @param componentPath 组件路径（例如 "AISpace/index" 或 "system/user-management"）
 * @returns Promise<T> 组件模块
 */
export function dynamicImport<T = any>(componentPath: string): Promise<T> {
  // 清理路径：去除可能的末尾斜杠或后缀
  const purePath = componentPath.replace(/\.(jsx|tsx)$/, "");

  // 待尝试的物理路径优先级
  const candidatePaths = [
    `../pages/${purePath}.tsx`,
    `../pages/${purePath}.jsx`,
    `../pages/${purePath}/index.tsx`,
    `../pages/${purePath}/index.jsx`,
  ];

  let importFn: (() => Promise<{ default: React.ComponentType<any> }>) | undefined;

  for (const p of candidatePaths) {
    if (allModules[p]) {
      importFn = allModules[p] as () => Promise<{ default: React.ComponentType<any> }>;
      break;
    }
  }

  if (!importFn) {
    const errorMsg = `无法找到组件模块: ${componentPath}。请确认以下路径之一是否存在:\n${candidatePaths.join("\n")}`;
    console.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }

  return importFn() as Promise<T>;
}
