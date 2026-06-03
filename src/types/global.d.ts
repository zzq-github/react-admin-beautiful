// src/types/global.d.ts
export {};
declare global {
  interface ApiResponse<T = any> {
    code: number;
    data: T;
    msg: string;
  }

  interface PageParam {
    pageSize: number;
    pageNo: number;
  }
  // 分页数据公共返回
  interface PageResult<T> {
    // 列表数据，泛型表示单条数据类型，实际为数组
    list: T[]; // 数据
    total: number; // 总量
  }

  interface CommonResultLong {
    /** Format: int32 */
    code?: number;
    msg?: string;
    /** Format: int64 */
    data?: number;
  }

  interface QueryFieldItem {
    name: string;
    label: string;
    span?: number;
    component: React.ReactNode;
    transformChangeValue?: (value: any) => any;
  }
}
