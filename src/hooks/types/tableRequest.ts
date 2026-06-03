// types.ts

/** 分页状态结构 */
export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

/** Hook 的配置项 */
export interface UseTableOptions<P, T> {
  // 请求函数，支持分页参数和自定义参数
  request: (params: P & { pageNo: number; pageSize: number }) => Promise<ApiResponse<T> | T[] | any>;
  params?: P;
  defaultPagination?: Partial<PaginationState>;
  manual?: boolean;
}