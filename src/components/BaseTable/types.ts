import type React from "react";
import type { TableProps, TablePaginationConfig } from "antd";

export interface BaseTableProps<T = any> extends Omit<TableProps<T>, "pagination"> {
  emptyText?: string;
  pagination?: TablePaginationConfig | boolean;
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  showSelection?: boolean;
  header?: React.ReactNode;
  showToolbar?: boolean;
  toolbarTitle?: React.ReactNode;
  toolbarDescription?: React.ReactNode;
  toolbarExtra?: React.ReactNode;
  toolbarActions?: React.ReactNode;
  showRefresh?: boolean;
  refreshLoading?: boolean;
  onRefresh?: () => void;
  showDensity?: boolean;
  showColumnSetting?: boolean;
}
