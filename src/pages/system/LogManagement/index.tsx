import React from 'react';
import TabLogSections from "./TabLogSections";

/**
 * 日志管理模块
 */
const LogManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">日志管理</h1>
          <p className="text-gray-600 mt-1">管理系统操作日志和用户登录日志</p>
        </div>
      </div>

      {/* 标签页 */}
      <TabLogSections />
    </div>
  );
};

export default LogManagement;