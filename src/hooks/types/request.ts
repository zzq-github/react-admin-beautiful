export interface UseRequestOptions<P, T> {
  /** 请求函数 */
  request: (params: P) => Promise<ApiResponse<T>>;
  /** 默认参数 */
  params?: P;
  /** 是否手动触发（默认自动请求） */
  manual?: boolean;
  /** 请求防抖延迟（毫秒） */
  debounceWait?: number;
}
