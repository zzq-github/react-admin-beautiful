export interface OperateLogQueryReq extends PageParam {
  userIp?: string;
  username?: string;
  status?: string;
  createTime?: string;
}

export interface OperateLogRespVO {
  id: number;

  traceId: string;

  userId: number;

  userName: string;

  userType: number;

  type: string;

  subType: string;

  bizId: number;

  action?: string;

  extra?: string;

  requestMethod: string;

  requestUrl: string;

  userIp: string;

  userAgent: string;

  createTime: number;
  transMap?: {
    [key: string]: Record<string, never>;
  };
}
