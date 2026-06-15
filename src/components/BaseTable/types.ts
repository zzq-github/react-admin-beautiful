import type { TableProps, TablePaginationConfig } from 'antd';

export interface BaseTableProps<T = any> extends Omit<TableProps<T>, 'pagination'> {
  /** 空数据提示文案 */
  emptyText?: string;
  /** 分页配置，支持 true/false/object */
  pagination?: TablePaginationConfig | boolean;
  /** 选中项变化回调 */
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  /** 是否开启多选，默认 false */
  showSelection?: boolean;
  /** 表格标题或操作栏 */
  header?: React.ReactNode;
}
