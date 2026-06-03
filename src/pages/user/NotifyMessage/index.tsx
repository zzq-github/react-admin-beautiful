import React, { useCallback } from "react";
import { renderNotifyMessageColumns } from "./schema/tableColumns";
import { renderNotifyMessageQueryFields } from "./schema/queryFields";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import PageHeader from "@/components/PageHeader";
import { getMyNotifyMessagePage, updateNotifyMessageRead, updateAllNotifyMessageRead } from "@/api/system/notifyMessage";
import { NotifyMessageRespVO } from "@/api/system/notifyMessage/types";
import { message } from "antd";

const NotifyMessageManagement: React.FC = () => {
  const query = useQueryFilter({});

  /** * 表格请求 Hook
   */
  const table = useTableRequest({
    request: getMyNotifyMessagePage,
    params: query.getParams(),
  });

  // 标记单条消息为已读
  const handleMarkAsRead = useCallback((record: NotifyMessageRespVO) => {
    if (record.readStatus) {
      message.info("该消息已是已读状态");
      return;
    }
    updateNotifyMessageRead({ ids: [record.id] }).then(() => {
      message.success("标记为已读成功");
      table.reload();
    });
  }, [table]);

  // 标记所有消息为已读
  const handleMarkAllAsRead = useCallback(() => {
    updateAllNotifyMessageRead().then(() => {
      message.success("全部标记为已读成功");
      table.reload();
    });
  }, [table]);

  return (
    <div className="space-y-6">
      {/* 页面标题区 */}
      <PageHeader
        title="消息中心"
        description="查看和管理您的站内信消息"
        buttons={[
          {
            label: "全部标记为已读",
            icon: "database" as const,
            type: "green" as const,
            clickFunc: handleMarkAllAsRead,
          },
        ]}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
          <QueryFilter
            fields={renderNotifyMessageQueryFields({})}
            onChange={query.onChange}
            onSearch={() => {
              table.reload(query.getParams());
            }}
            onReset={() => {
              query.reset();
              table.reload(query.getParams());
            }}
            leftActions={
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">共 {table.pagination?.total || 0} 条消息</span>
              </div>
            }
          />
        </div>

        <div className="overflow-x-auto mt-4">
          <BaseTable
            columns={renderNotifyMessageColumns()}
            dataSource={table.data}
            loading={table.loading}
            pagination={table.pagination}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => {
                if (!record.readStatus) {
                  handleMarkAsRead(record);
                }
              },
              className: `cursor-pointer hover:bg-gray-50 ${!record.readStatus ? "bg-blue-50" : ""}`,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default NotifyMessageManagement;