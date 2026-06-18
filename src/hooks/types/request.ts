export interface UseRequestOptions<P, T> {
  request: (params: P) => Promise<ApiResponse<T> | T>;
  params?: P;
  manual?: boolean;
  debounceWait?: number;
}
