// 站内信分页查询参数
export interface NotifyMessagePageQueryReq extends PageParam {
  userId?: number;
  userType?: number;
  templateCode?: string;
  templateType?: number;
  createTime?: string;
}

// 我的站内信分页查询参数
export interface MyNotifyMessagePageQueryReq extends PageParam {
  readStatus?: boolean;
  createTime?: string;
}

// 站内信响应对象
export interface NotifyMessageRespVO {
  id: number;
  userId: number;
  userType: number;
  templateId: number;
  templateCode: string;
  templateNickname: string;
  templateContent: string;
  templateParams: Record<string, any>;
  readStatus: boolean;
  readTime?: string;
  createTime: string;
}

// 站内信列表响应对象
export interface NotifyMessageSimpleRespVO {
  id: number;
  templateCode: string;
  templateNickname: string;
  templateContent: string;
  readStatus: boolean;
  createTime: string;
}

// 标记站内信为已读请求参数
export interface NotifyMessageReadReqVO {
  ids: number[];
}