import { useLogTabs } from "./useLogTabs";

/**
 * 日志管理页面聚合 Hook
 * 组合标签页状态等子 Hook，提供统一的接口
 */
export const useLogManagement = () => {
  const tabs = useLogTabs();

  return {
    ...tabs,
  };
};
