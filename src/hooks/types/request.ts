/**
 * Hook 传给 API 函数的运行上下文。
 * 当前主要用于透传 AbortSignal，让 axios/fetch 可以在组件卸载或新请求发起时取消旧请求。
 */
export interface RequestContext {
  signal?: AbortSignal;
}

export interface UseRequestOptions<P, T> {
  request: (params: P, context?: RequestContext) => Promise<ApiResponse<T> | T>;
  params?: P;
  manual?: boolean;
  debounceWait?: number;
}
