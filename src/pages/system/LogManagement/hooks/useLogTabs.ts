import { useState } from "react";

type TabType = "operation" | "login";

/**
 * 日志管理标签页自定义 Hook
 * 负责管理操作日志与登录日志标签页的切换状态
 */
export const useLogTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("operation");

  return {
    activeTab,
    setActiveTab,
  };
};
