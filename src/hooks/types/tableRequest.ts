import type { PageResponseLike } from '@/core/types';
import type { RequestContext } from './request';

export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

/**
 * 表格请求可能直接返回标准分页、后端分页近似结构，或被 ApiResponse 包一层。
 * useTableRequest 会统一交给 normalizePageResult 转成 { list, total }。
 */
export type TableRequestResult<T> =
  | ApiResponse<PageResult<T> | PageResponseLike<T> | T[]>
  | PageResult<T>
  | PageResponseLike<T>
  | T[];

export interface UseTableOptions<P, T> {
  request: (params: P & PageParam, context?: RequestContext) => Promise<TableRequestResult<T>>;
  params?: P;
  defaultPagination?: Partial<PaginationState>;
  manual?: boolean;
}
