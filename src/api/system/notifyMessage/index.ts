import request from "@/utils/request";
import {
  NotifyMessagePageQueryReq,
  MyNotifyMessagePageQueryReq,
  NotifyMessageRespVO,
  NotifyMessageSimpleRespVO,
  NotifyMessageReadReqVO,
} from "./types";

// 获得站内信分页
export function getNotifyMessagePage(
  query: NotifyMessagePageQueryReq,
): Promise<ApiResponse<PageResult<NotifyMessageRespVO>>> {
  return request({
    url: "/system/notify-message/page",
    method: "get",
    params: query,
  });
}

// 获得我的站内信分页
export function getMyNotifyMessagePage(
  query: MyNotifyMessagePageQueryReq,
): Promise<ApiResponse<PageResult<NotifyMessageRespVO>>> {
  return request({
    url: "/system/notify-message/my-page",
    method: "get",
    params: query,
  });
}

// 获得站内信详情
export function getNotifyMessage(
  id: number,
): Promise<ApiResponse<NotifyMessageRespVO>> {
  return request({
    url: "/system/notify-message/get",
    method: "get",
    params: { id },
  });
}

// 获取当前用户的最新站内信列表，默认 10 条
export function getUnreadNotifyMessageList(
  size: number = 10,
): Promise<ApiResponse<NotifyMessageSimpleRespVO[]>> {
  return request({
    url: "/system/notify-message/get-unread-list",
    method: "get",
    params: { size },
  });
}

// 获得当前用户的未读站内信数量
export function getUnreadNotifyMessageCount(): Promise<ApiResponse<number>> {
  return request({
    url: "/system/notify-message/get-unread-count",
    method: "get",
  });
}

// 标记站内信为已读
export function updateNotifyMessageRead(
  data: NotifyMessageReadReqVO,
): Promise<ApiResponse<boolean>> {
  return request({
    url: "/system/notify-message/update-read",
    method: "put",
    data,
  });
}

// 标记所有站内信为已读
export function updateAllNotifyMessageRead(): Promise<ApiResponse<boolean>> {
  return request({
    url: "/system/notify-message/update-all-read",
    method: "put",
  });
}