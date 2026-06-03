import React, { useMemo } from "react";
import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";
import { Popconfirm } from "antd";
import { ConfigRespVO } from "@/api/system/parameterSettings/types";
export const renderParameterSettingsColumns = ({ EditAction, DeleteAction }) => {
  return useMemo(
    () => [
      {
        title: "参数主键",
        dataIndex: "id",
      },
      {
        title: "参数分类",
        dataIndex: "category",
      },
      {
        title: "参数名称",
        dataIndex: "name",
      },
      {
        title: "参数键名",
        dataIndex: "key",
      },
      {
        title: "参数键值",
        dataIndex: "value",
      },
      {
        title: "系统内置",
        dataIndex: "type",
        render: (_: any, record: ConfigRespVO) => (
          <span>
            {getDictDataLabel(DICT_TYPE.INFRA_CONFIG_TYPE, record.type)}
          </span>
        ),
      },
      {
        title: "是否可见",
        dataIndex: "visible",
        render: (_: any, record: ConfigRespVO) => (
          <span>
           {record.visible ? '是' : '否'}
          </span>
        ),
      },
      {
        title: "备注",
        dataIndex: "remark",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (_: any, record: ConfigRespVO) =>
          dayjs(record.createTime).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "操作",
        key: "action",
        width: 90,
        render: (_: any, record: ConfigRespVO) => (
          <div className="flex gap-3">
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => EditAction(record)}
            >
              修改
            </a>
            <Popconfirm
              title="提示"
              description="是否删除该参数？"
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
