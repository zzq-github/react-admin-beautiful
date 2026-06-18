import type {
  ApiResponse as CoreApiResponse,
  PageParam as CorePageParam,
  PageResult as CorePageResult,
} from '@/core/types';

export {};

declare global {
  type ApiResponse<T = any> = CoreApiResponse<T>;

  type PageParam = CorePageParam;

  type PageResult<T = any> = CorePageResult<T>;

  interface QueryFieldItem {
    name: string;
    label: string;
    span?: number;
    component: React.ReactNode;
    transformChangeValue?: (value: any) => any;
  }
}
