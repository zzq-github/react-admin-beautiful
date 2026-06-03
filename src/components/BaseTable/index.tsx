import React, { useEffect, useState } from "react";
import { Table, Empty } from "antd";
// 导入 Ant Design 的原始类型，确保 API 对齐
import type { TablePaginationConfig } from "antd";
import type { BaseTableProps } from "./types";

const DEFAULT_PAGE_SIZE = 10;

/**
 * 使用泛型 T 继承自 Record<string, any> 以保证兼容性
 * 继承 TableProps<T> 可以直接透传所有 AntD Table 支持的属性
 */

const BaseTable = <T extends Record<string, any>>({
  rowKey = "id",
  columns = [],
  dataSource = [],
  loading = false,
  pagination = true,
  size = "middle",
  bordered = false,
  scroll,
  emptyText = "暂无数据",
  onChange,
  showSelection = false, // 默认不开启
  onSelectionChange,
  ...rest
}: BaseTableProps<T>) => {
  // 1. 内部维护选中状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  useEffect(() => {
    setSelectedRowKeys([]);
    onSelectionChange?.([], []);
  }, [dataSource]); // 只要数据源变了（通常翻页、搜索都会触发数据源变化），就重置
  
  // 2. 只有开启 showSelection 时才启用 rowSelection
  const rowSelection = showSelection
    ? {
        selectedRowKeys,
        onChange: (keys: React.Key[], rows: T[]) => {
          setSelectedRowKeys(keys);
          // 将选中的数据同步给父组件
          onSelectionChange?.(keys, rows);
        },
      }
    : undefined;
  // 处理分页逻辑
  const resolvedPagination: TablePaginationConfig | false =
    pagination === false
      ? false
      : {
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number) => `共 ${total} 条`,
          // 如果 pagination 是对象，则展开它的属性（例如自定义当前页、每页条数）
          ...(typeof pagination === "object" ? pagination : {}),
        };

  return (
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
};

export default BaseTable;
