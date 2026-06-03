import React, { useMemo } from "react";
import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";
import { Popconfirm } from "antd";
import { PositionRespVO } from "@/api/system/position/types";
export const renderPositionColumns = ({ EditAction, DeleteAction }) => {
  return useMemo(
    () => [
      {
        title: "岗位编号",
        dataIndex: "id",
      },
      {
        title: "岗位编码",
        dataIndex: "code",
      },
      {
        title: "岗位名称",
        dataIndex: "name",
      },
      {
        title: "岗位排序",
        dataIndex: "sort",
      },
      {
        title: "状态",
        dataIndex: "status",
        // 明确 record 的类型为 DictRecord，这样 record.status 就会有提示
        render: (_: any, record: PositionRespVO) => (
          <span>
            {getDictDataLabel(DICT_TYPE.COMMON_STATUS, record.status)}
          </span>
        ),
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (_: any, record: PositionRespVO) =>
          dayjs(record.createTime).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: PositionRespVO) => (
          <div className="flex gap-3">
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => EditAction(record)}
            >
              修改
            </a>

            <Popconfirm
              title="提示"
              description="是否删除该岗位？"
              onConfirm={() => DeleteAction(record)}
              okText="是"
              cancelText="否"
            >
              <a className="text-red-600 cursor-pointer">删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [EditAction, DeleteAction],
  );
};
