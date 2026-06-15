import React, { useMemo, useState } from "react";
import { Button, Input, Select, Space, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import PageContainer from "@/components/PageContainer";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";

interface ExampleRecord {
  id: number;
  name: string;
  owner: string;
  status: "enabled" | "disabled";
  updatedAt: string;
}

const records: ExampleRecord[] = [
  {
    id: 1,
    name: "Customer Console",
    owner: "Alex",
    status: "enabled",
    updatedAt: "2026-06-01",
  },
  {
    id: 2,
    name: "Operations Desk",
    owner: "Taylor",
    status: "enabled",
    updatedAt: "2026-06-08",
  },
  {
    id: 3,
    name: "Billing Center",
    owner: "Morgan",
    status: "disabled",
    updatedAt: "2026-06-12",
  },
];

const BasicList: React.FC = () => {
  const [query, setQuery] = useState<{ keyword?: string; status?: string }>({});

  const filteredData = useMemo(() => {
    return records.filter((item) => {
      const keyword = query.keyword?.trim().toLowerCase();
      const matchKeyword = keyword
        ? item.name.toLowerCase().includes(keyword) ||
          item.owner.toLowerCase().includes(keyword)
        : true;
      const matchStatus = query.status ? item.status === query.status : true;
      return matchKeyword && matchStatus;
    });
  }, [query]);

  const columns: ColumnsType<ExampleRecord> = [
    {
      title: "项目名称",
      dataIndex: "name",
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
      render: (status: ExampleRecord["status"]) =>
        status === "enabled" ? (
          <Tag color="success">启用</Tag>
        ) : (
          <Tag>停用</Tag>
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
      subtitle="展示 PageContainer、QueryFilter 和 BaseTable 的最小组合。"
      action={
        <Button type="primary" onClick={() => message.success("这里打开新增弹窗")}>
          新增
        </Button>
      }
    >
      <div className="rounded-lg border border-theme-border bg-theme-bg p-4">
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
                  options={[
                    { label: "启用", value: "enabled" },
                    { label: "停用", value: "disabled" },
                  ]}
                />
              ),
            },
          ]}
          leftActions={
            <span className="text-sm text-theme-text-secondary">
              共 {filteredData.length} 条
            </span>
          }
        />

        <BaseTable<ExampleRecord>
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={false}
        />
      </div>
    </PageContainer>
  );
};

export default BasicList;
