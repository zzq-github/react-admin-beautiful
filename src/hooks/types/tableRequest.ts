/** 分页状态结构 */
export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

/** Hook 的配置项 */
export interface UseTableOptions<P, T> {
  /** 请求函数，支持分页参数和自定义参数 */
  request: (params: P & { pageNo: number; pageSize: number }) => Promise<ApiResponse<T> | T[] | any>;
  /** 默认查询参数 */
  params?: P;
  /** 默认分页配置 */
  defaultPagination?: Partial<PaginationState>;
  /** 是否手动触发（默认自动请求） */
  manual?: boolean;
}
