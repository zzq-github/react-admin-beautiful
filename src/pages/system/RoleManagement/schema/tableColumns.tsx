import React, { useMemo } from "react";
import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";
import { Popconfirm } from "antd";
import { RoleRespVO } from "@/api/system/role/types";

export const renderRoleColumns = ({
  EditAction,
  DeleteAction,
  handleEditMenuPermission,
  handleEditDataPermission,
}: {
  EditAction: (record: RoleRespVO) => void;
  DeleteAction: (record: RoleRespVO) => void;
  handleEditMenuPermission: (record: RoleRespVO) => void;
  handleEditDataPermission: (record: RoleRespVO) => void;
}) => {
  return useMemo(
    () => [
      {
        title: "角色编号",
        dataIndex: "id",
        width: 120,
      },
      {
        title: "角色名称",
        dataIndex: "name",
        width: 150,
        ellipsis: true,
      },
      {
        title: "角色标识",
        dataIndex: "code",
        width: 150,
        ellipsis: true,
      },
      {
        title: "角色类型",
        dataIndex: "type",
        width: 80,
        render: (_: any, record: RoleRespVO) => (
          <span>
            {getDictDataLabel(DICT_TYPE.SYSTEM_ROLE_TYPE, record.type)}
          </span>
        ),
      },
      {
        title: "显示顺序",
        dataIndex: "sort",
        width: 100,
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (_: any, record: RoleRespVO) => (
          <span>
            {getDictDataLabel(DICT_TYPE.COMMON_STATUS, record.status)}
          </span>
        ),
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (_: any, record: RoleRespVO) =>
          dayjs(record.createTime).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: RoleRespVO) => (
          <div className="flex gap-3">
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => EditAction(record)}
            >
              修改
            </a>
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => handleEditMenuPermission(record)}
            >
              菜单权限
            </a>
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => handleEditDataPermission(record)}
            >
              数据权限
            </a>
            <Popconfirm
              title="提示"
              description="是否删除该角色？"
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
    [EditAction, DeleteAction]
  );
};
