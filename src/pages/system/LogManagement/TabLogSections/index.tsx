import React, { useState } from "react";
// 注意：在 TSX 中引用其他组件时，通常省略扩展名或使用 .tsx
import LoginLogSection from "./LoginLogSection";
import OperationLogSection from "./OperationLogSection";

// 定义 Tab 的类型，增强代码健壮性
type TabType = "operation" | "login";

const TabLogSections: React.FC = () => {
  // 使用泛型限定 state 的类型
  const [activeTab, setActiveTab] = useState<TabType>("operation");

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab("operation")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "operation"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            操作日志
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "login"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            登录日志
          </button>
        </nav>
      </div>
            
      {/* 内容区域 */}
      <div className="p-6">
        {activeTab === "login" && <LoginLogSection />}
        {activeTab === "operation" && <OperationLogSection />}
      </div>
    </div>
  );
};

export default TabLogSections;