import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";

import { useMemo } from "react";
import { Popconfirm } from "antd";
import SvgIcon from "@/components/SvgIcon";
import { DeptRespVO } from "@/api/system/department/types";

export const DepartmentColumns = ({ EditAction, DeleteAction }) => {
  return useMemo(
    () => [
      { title: "部门名称", dataIndex: "name" },
      { title: "排序", dataIndex: "sort" },
      {
        title: "状态",
        dataIndex: "status",
        render: (_: any, record: DeptRespVO) => (
          <span>
            {getDictDataLabel(DICT_TYPE.COMMON_STATUS, record.status)}
          </span>
        ),
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (_: any, record: DeptRespVO) =>
          dayjs(record.createTime).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: DeptRespVO) => (
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
