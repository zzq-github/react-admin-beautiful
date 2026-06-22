/**
 * 后端错误码到默认提示文案的映射。
 * 真实后端扩展业务错误码时，优先补这里；接口返回 msg/message 时会覆盖这里的默认文案。
 */
const errorCode: Record<number | string, string> = {
  400: '请求参数不正确',
  401: '认证失败，无法访问系统资源',
  403: '当前操作没有权限',
  404: '访问资源不存在',
  409: '数据冲突，请刷新后重试',
  429: '请求过于频繁，请稍后重试',
  500: '系统服务异常',
  501: '功能暂未实现',
  901: '演示模式，禁止写操作',
  default: '系统未知错误，请反馈给管理员',
};

export type ErrorCode = typeof errorCode;
export type ErrorCodeKey = keyof ErrorCode;

export default errorCode;
