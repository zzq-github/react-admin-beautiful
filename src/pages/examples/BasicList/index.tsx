import React, { useMemo, useState } from "react";
import { Button, Input, Progress, Select, Space, Tag, message } from "antd";
import { Archive, CheckCircle2, Plus, RefreshCw } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";

interface ExampleRecord {
  id: number;
  name: string;
  owner: string;
  category: "console" | "workflow" | "report";
  status: "enabled" | "disabled" | "draft";
  progress: number;
  updatedAt: string;
}

const records: ExampleRecord[] = [
  {
    id: 1,
    name: "Customer Console",
    owner: "Alex",
    category: "console",
    status: "enabled",
    progress: 86,
    updatedAt: "2026-06-01",
  },
  {
    id: 2,
    name: "Operations Desk",
    owner: "Taylor",
    category: "workflow",
    status: "enabled",
    progress: 72,
    updatedAt: "2026-06-08",
  },
  {
    id: 3,
    name: "Billing Center",
    owner: "Morgan",
    category: "console",
    status: "disabled",
    progress: 34,
    updatedAt: "2026-06-12",
  },
  {
    id: 4,
    name: "Release Report",
    owner: "Casey",
    category: "report",
    status: "draft",
    progress: 48,
    updatedAt: "2026-06-13",
  },
  {
    id: 5,
    name: "Approval Flow",
    owner: "Jordan",
    category: "workflow",
    status: "enabled",
    progress: 91,
    updatedAt: "2026-06-14",
  },
  {
    id: 6,
    name: "Data Quality Board",
    owner: "Riley",
    category: "report",
    status: "enabled",
    progress: 64,
    updatedAt: "2026-06-15",
  },
];

const categoryLabels: Record<ExampleRecord["category"], string> = {
  console: "控制台",
  workflow: "工作流",
  report: "报表",
};

const statusOptions = [
  { label: "启用", value: "enabled" },
  { label: "停用", value: "disabled" },
  { label: "草稿", value: "draft" },
];

const getStatusTag = (status: ExampleRecord["status"]) => {
  const statusMap = {
    enabled: { color: "success", label: "启用" },
    disabled: { color: "default", label: "停用" },
    draft: { color: "warning", label: "草稿" },
  };
  const option = statusMap[status];
  return <Tag color={option.color}>{option.label}</Tag>;
};

const BasicList: React.FC = () => {
  const [query, setQuery] = useState<{
    keyword?: string;
    status?: ExampleRecord["status"];
    category?: ExampleRecord["category"];
  }>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const filteredData = useMemo(() => {
    return records.filter((item) => {
      const keyword = query.keyword?.trim().toLowerCase();
      const matchKeyword = keyword
        ? item.name.toLowerCase().includes(keyword) ||
          item.owner.toLowerCase().includes(keyword)
        : true;
      const matchStatus = query.status ? item.status === query.status : true;
      const matchCategory = query.category
        ? item.category === query.category
        : true;
      return matchKeyword && matchStatus && matchCategory;
    });
  }, [query]);

  const enabledCount = records.filter((item) => item.status === "enabled").length;
  const averageProgress = Math.round(
    records.reduce((sum, item) => sum + item.progress, 0) / records.length
  );

  const columns: ColumnsType<ExampleRecord> = [
    {
      title: "项目名称",
      dataIndex: "name",
      render: (name: string, record) => (
        <div>
          <div className="font-medium text-theme-text">{name}</div>
          <div className="text-xs text-theme-text-tertiary">
            #{record.id} · {categoryLabels[record.category]}
          </div>
        </div>
      ),
    },
    {
      title: "负责人",
      dataIndex: "owner",
      width: 160,
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 140,
      render: getStatusTag,
    },
    {
      title: "进度",
      dataIndex: "progress",
      width: 180,
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      width: 160,
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            className="!px-0"
            onClick={() => message.info(`查看 ${record.name}`)}
          >
            查看
          </Button>
          <Button
            type="link"
            danger
            className="!px-0"
            onClick={() => message.warning("这里接入删除接口")}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Basic List"
      subtitle="展示筛选、统计、批量选择、表格操作和主题化内容面板。"
      action={
        <Space>
          <Button icon={<RefreshCw size={14} />} onClick={() => message.info("列表已刷新")}>
            刷新
          </Button>
          <Button type="primary" icon={<Plus size={14} />} onClick={() => message.success("这里打开新增弹窗")}>
            新增项目
          </Button>
        </Space>
      }
    >
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <PagePanel bodyClassName="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-primary-bg text-theme-primary">
              <Archive size={18} />
            </div>
            <div>
              <div className="text-xs text-theme-text-tertiary">项目总数</div>
              <div className="text-xl font-semibold text-theme-text">
                {records.length}
              </div>
            </div>
          </div>
        </PagePanel>
        <PagePanel bodyClassName="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-success-bg text-theme-success">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="text-xs text-theme-text-tertiary">启用项目</div>
              <div className="text-xl font-semibold text-theme-text">
                {enabledCount}
              </div>
            </div>
          </div>
        </PagePanel>
        <PagePanel bodyClassName="p-4">
          <div className="text-xs text-theme-text-tertiary">平均进度</div>
          <Progress percent={averageProgress} size="small" className="mt-2" />
        </PagePanel>
      </div>

      <PagePanel>
        <QueryFilter
          span={8}
          initialValues={query}
          onChange={setQuery}
          onReset={() => setQuery({})}
          onSearch={() => message.success("查询完成")}
          fields={[
            {
              name: "keyword",
              label: "关键词",
              component: <Input allowClear placeholder="项目名称 / 负责人" />,
            },
            {
              name: "status",
              label: "状态",
              component: (
                <Select
                  allowClear
                  placeholder="全部状态"
                  options={statusOptions}
                />
              ),
            },
            {
              name: "category",
              label: "分类",
              component: (
                <Select
                  allowClear
                  placeholder="全部分类"
                  options={[
                    { label: "控制台", value: "console" },
                    { label: "工作流", value: "workflow" },
                    { label: "报表", value: "report" },
                  ]}
                />
              ),
            },
          ]}
          leftActions={
            <span className="text-sm text-theme-text-secondary">
              共 {filteredData.length} 条，已选择 {selectedRowKeys.length} 条
            </span>
          }
        />

        <BaseTable<ExampleRecord>
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          showSelection
          onSelectionChange={(keys) => setSelectedRowKeys(keys)}
        />
      </PagePanel>
    </PageContainer>
  );
};

export default BasicList;
