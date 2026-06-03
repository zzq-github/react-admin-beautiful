
import type { TableProps, TablePaginationConfig } from 'antd';
export interface BaseTableProps<T = any> extends Omit<TableProps<T>, 'pagination'> {
  emptyText?: string;
  // 重新定义 pagination 以便支持原有逻辑中的 true/false/object
  pagination?: TablePaginationConfig | boolean;
  // 新增：选中项变化时的回调，供父组件批量操作使用
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  // 新增：是否开启多选，默认为 false
  showSelection?: boolean;
}
