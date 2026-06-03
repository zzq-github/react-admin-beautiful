import React, { useMemo } from "react";
import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";
import { DictTypeRespVO } from "@/api/system/dict/types";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
export const renderDictTypeColumns = ({ EditAction, DeleteAction }) => {
  const navigate = useNavigate();
  const goToDictData = (dictType: string) => {
    navigate(`/system/dict-management/DictData/${dictType}`);
  };
  return useMemo(
    () => [
      {
        title: "字典编号",
        dataIndex: "id",
      },
      {
        title: "字典名称",
        dataIndex: "name",
        
      },
      {
        title: "字典类型",
        dataIndex: "type",
        render: (_: any, record: DictTypeRespVO) => (
          <a onClick={() => goToDictData(record.type)} className="text-blue-600 hover:underline">{record.type}</a>
        ),
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (_: any, record: DictTypeRespVO) => (
          <span>{getDictDataLabel(DICT_TYPE.COMMON_STATUS, record.status)}</span>
        ),
      },
      {
        title: "备注",
        dataIndex: "remark",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (time: string | number) =>
          dayjs(time).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: DictTypeRespVO) => (
          <div className="flex gap-3">
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => EditAction(record)}
            >
              修改
            </a>

            <Popconfirm
              title="提示"
              description="是否删除该字典类型？"
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
