export interface UseRequestOptions<P, T> {
  request: (params: P) => Promise<ApiResponse<T>>
  params?: P;
  manual?: boolean;
}