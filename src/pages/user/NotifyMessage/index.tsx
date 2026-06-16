import React, { useCallback } from "react";
import { Button, message } from "antd";
import { CheckCircle2 } from "lucide-react";
import { renderNotifyMessageColumns } from "./schema/tableColumns";
import { renderNotifyMessageQueryFields } from "./schema/queryFields";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import {
  getMyNotifyMessagePage,
  updateAllNotifyMessageRead,
  updateNotifyMessageRead,
} from "@/api/system/notifyMessage";
import { NotifyMessageRespVO } from "@/api/system/notifyMessage/types";

const NotifyMessageManagement: React.FC = () => {
  const query = useQueryFilter({});

  const table = useTableRequest({
    request: getMyNotifyMessagePage,
    params: query.getParams(),
  });

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

  const handleMarkAllAsRead = useCallback(() => {
    updateAllNotifyMessageRead().then(() => {
      message.success("全部标记为已读成功");
      table.reload();
    });
  }, [table]);

  return (
    <PageContainer
      title="消息中心"
      subtitle="查看和管理站内消息，支持单条或批量标记已读。"
      action={
        <Button icon={<CheckCircle2 size={14} />} onClick={handleMarkAllAsRead}>
          全部标记为已读
        </Button>
      }
    >
      <PagePanel>
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
            <span className="text-sm text-theme-text-secondary">
              共 {table.pagination?.total || 0} 条消息
            </span>
          }
        />

        <div className="overflow-x-auto">
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
              className: `cursor-pointer hover:bg-theme-hover ${
                !record.readStatus ? "bg-theme-info-bg" : ""
              }`,
            })}
          />
        </div>
      </PagePanel>
    </PageContainer>
  );
};

export default NotifyMessageManagement;
