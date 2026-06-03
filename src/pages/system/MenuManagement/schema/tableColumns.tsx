import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";
import { MenuRespVO } from "@/api/system/menu/types";
import { useMemo } from "react";
import { Popconfirm } from "antd";
import SvgIcon from "@/components/SvgIcon";

export const MenuColumns = ({ EditAction, DeleteAction }) => {
  return useMemo(
    () => [
      { title: "菜单名称", dataIndex: "name" },
      { title: "图标", dataIndex: "icon" ,
        render: (_: any, record: MenuRespVO) => (
          record.icon?<SvgIcon iconClass={record.icon} className="w-4 h-4" /> : ''
        )
      },
      { title: "排序", dataIndex: "sort" },
      { title: "权限标识", dataIndex: "permission" },
      { title: "组件路径", dataIndex: "component" },
      {
        title: "组件名称",
        dataIndex: "componentName",
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (_: any, record: MenuRespVO) => (
          <span>
            {getDictDataLabel(DICT_TYPE.COMMON_STATUS, record.status)}
          </span>
        ),
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: MenuRespVO) => (
          <div className="flex gap-3">
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => EditAction(record)}
            >
              修改
            </a>

            <Popconfirm
              title="提示"
              description="是否删除该菜单？"
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
