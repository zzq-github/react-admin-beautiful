// 全局类型定义
export {};
declare global {
  /**
   * 通用 API 响应结构
   */
  interface ApiResponse<T = any> {
    code: number;
    data: T;
    msg: string;
  }

  /**
   * 分页请求参数
   */
  interface PageParam {
    pageSize: number;
    pageNo: number;
  }

  /**
   * 分页数据返回
   */
  interface PageResult<T> {
    list: T[];
    total: number;
  }

  /**
   * 查询字段配置项
   */
  interface QueryFieldItem {
    name: string;
    label: string;
    span?: number;
    component: React.ReactNode;
    transformChangeValue?: (value: any) => any;
  }
}
