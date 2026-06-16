import React, { useEffect, useState } from "react";
import { Table, Empty, Card } from "antd";
import type { TablePaginationConfig } from "antd";
import type { BaseTableProps } from "./types";

const DEFAULT_PAGE_SIZE = 10;

/**
 * 通用表格组件
 * 封装 Ant Design Table，统一分页、空状态、多选等能力
 */
const BaseTable = <T extends Record<string, any>>({
  rowKey = "id",
  columns = [],
  dataSource = [],
  loading = false,
  pagination = true,
  size,
  bordered = false,
  scroll,
  emptyText = "暂无数据",
  onChange,
  showSelection = false,
  onSelectionChange,
  header,
  ...rest
}: BaseTableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    setSelectedRowKeys([]);
    onSelectionChange?.([], []);
  }, [dataSource]);

  const rowSelection = showSelection
    ? {
        selectedRowKeys,
        onChange: (keys: React.Key[], rows: T[]) => {
          setSelectedRowKeys(keys);
          onSelectionChange?.(keys, rows);
        },
      }
    : undefined;

  const resolvedPagination: TablePaginationConfig | false =
    pagination === false
      ? false
      : {
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number) => `共 ${total} 条`,
          ...(typeof pagination === "object" ? pagination : {}),
        };

  const tableElement = (
    <Table<T>
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      size={size}
      bordered={bordered}
      scroll={scroll}
      pagination={resolvedPagination}
      locale={{
        emptyText: <Empty description={emptyText} />,
      }}
      onChange={onChange}
      rowSelection={rowSelection}
      {...rest}
    />
  );

  // 如果有 header，用 Card 包裹
  if (header) {
    return (
      <Card
        title={header}
        size="small"
        className="shadow-sm"
      >
        {tableElement}
      </Card>
    );
  }

  return tableElement;
};

export default BaseTable;
