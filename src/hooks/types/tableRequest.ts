import type { PageResponseLike } from '@/core/types';

export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

export type TableRequestResult<T> =
  | ApiResponse<PageResult<T> | PageResponseLike<T> | T[]>
  | PageResult<T>
  | PageResponseLike<T>
  | T[];

export interface UseTableOptions<P, T> {
  request: (params: P & PageParam) => Promise<TableRequestResult<T>>;
  params?: P;
  defaultPagination?: Partial<PaginationState>;
  manual?: boolean;
}
