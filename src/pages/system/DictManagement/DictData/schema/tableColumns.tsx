import React, { useMemo } from "react";
import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";
import { DictDataRespVO } from "@/api/system/dict/types";
import { Popconfirm } from "antd";
export const renderDictTypeColumns = ({ EditAction, DeleteAction }) => {
  return useMemo(
    () => [
      {
        title: "字典编码",
        dataIndex: "id",
      },
      {
        title: "字典标签",
        dataIndex: "label",
      },
      {
        title: "字典键值",
        dataIndex: "value",
      },
         {
        title: "字典排序",
        dataIndex: "sort",
      },
      {
        title: "状态",
        dataIndex: "status",
        // 明确 record 的类型为 DictRecord，这样 record.status 就会有提示
        render: (_: any, record: DictDataRespVO) => (
          <span>{getDictDataLabel(DICT_TYPE.COMMON_STATUS, record.status)}</span>
        ),
      },
         {
        title: "颜色类型",
        dataIndex: "colorType",
      },
         {
        title: "CSS Class",
        dataIndex: "cssClass",
      },
      {
        title: "备注",
        dataIndex: "remark",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (_: any, record: DictDataRespVO) =>
          dayjs(record.createTime).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: DictDataRespVO) => (
          <div className="flex gap-3">
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => EditAction(record)}
            >
              修改
            </a>

            <Popconfirm
              title="提示"
              description="是否删除该字典数据？"
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
