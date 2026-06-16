import React from "react";
import PageContainer from "@/components/PageContainer";
import TabLogSections from "./TabLogSections";

const LogManagement: React.FC = () => {
  return (
    <PageContainer
      title="日志管理"
      subtitle="查看系统操作日志和用户登录日志，辅助审计与排查。"
    >
      <TabLogSections />
    </PageContainer>
  );
};

export default LogManagement;
