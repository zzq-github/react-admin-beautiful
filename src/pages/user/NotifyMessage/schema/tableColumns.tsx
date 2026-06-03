import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Tag } from "antd";
import { NotifyMessageRespVO } from "@/api/system/notifyMessage/types";

export const renderNotifyMessageColumns = () => {
  return useMemo(
    () => [
      {
        title: "消息ID",
        dataIndex: "id",
        width: 80,
      },
      {
        title: "模板编码",
        dataIndex: "templateCode",
        width: 120,
      },
      {
        title: "模板名称",
        dataIndex: "templateNickname",
        width: 150,
      },
      {
        title: "消息内容",
        dataIndex: "templateContent",
        ellipsis: true,
        render: (text: string) => (
          <div className="max-w-xs truncate" title={text}>
            {text}
          </div>
        ),
      },
      {
        title: "阅读状态",
        dataIndex: "readStatus",
        width: 100,
        render: (readStatus: boolean) => (
          <Tag color={readStatus ? "green" : "orange"}>
            {readStatus ? "已读" : "未读"}
          </Tag>
        ),
      },
      {
        title: "阅读时间",
        dataIndex: "readTime",
        width: 160,
        render: (readTime: string) =>
          readTime ? dayjs(readTime).format("YYYY-MM-DD HH:mm") : "-",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        width: 160,
        render: (createTime: string) =>
          dayjs(createTime).format("YYYY-MM-DD HH:mm"),
      },
    ],
    []
  );
};