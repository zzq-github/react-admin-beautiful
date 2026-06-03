/**
 * 接口响应状态码错误信息映射
 */
const errorCode = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  'default': '系统未知错误，请反馈给管理员'
} as const;

// 导出类型，方便在其他地方引用
export type ErrorCode = typeof errorCode;
export type ErrorCodeKey = keyof ErrorCode;

export default errorCode;