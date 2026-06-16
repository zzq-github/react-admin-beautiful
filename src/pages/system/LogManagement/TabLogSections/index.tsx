import React, { useState } from "react";
import PagePanel from "@/components/PagePanel";
import LoginLogSection from "./LoginLogSection";
import OperationLogSection from "./OperationLogSection";

type TabType = "operation" | "login";

const tabs: Array<{ key: TabType; label: string }> = [
  { key: "operation", label: "操作日志" },
  { key: "login", label: "登录日志" },
];

const TabLogSections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("operation");

  return (
    <PagePanel bodyClassName="p-0">
      <div className="border-b border-theme-border-secondary px-4">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-theme-primary text-theme-primary"
                  : "border-transparent text-theme-text-secondary hover:text-theme-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4">
        {activeTab === "login" && <LoginLogSection />}
        {activeTab === "operation" && <OperationLogSection />}
      </div>
    </PagePanel>
  );
};

export default TabLogSections;
