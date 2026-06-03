
export interface LoginLogRespVO {
  id: number;
  logType: number;
  userId?: number;
  userType: number;
  traceId?: string;
  username: string;
  result: number;
  userIp: string;
  userAgent?: string;
  createTime: number;
}

export interface LoginLogQueryReq extends PageParam {
  userIp?: string;
  username?: string;
  status?: string;
  createTime?: string;
}