import React, { useMemo } from "react";
import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from "@/utils/dict";
import { Popconfirm, Switch } from "antd";
import { UserRespVO } from "@/api/system/user/types";

export const renderUserColumns = ({ EditAction, DeleteAction, StatusAction, PasswordAction, AssignRoleAction }) => {
  return useMemo(
    () => [
      {
        title: "用户编号",
        dataIndex: "id",
      },
      {
        title: "用户账号",
        dataIndex: "username",
      },
      {
        title: "用户昵称",
        dataIndex: "nickname",
      },
      {
        title: "部门",
        dataIndex: "deptName",
      },
      {
        title: "手机号码",
        dataIndex: "mobile",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "性别",
        dataIndex: "sex",
        render: (_: any, record: UserRespVO) => (
          <span>
            {getDictDataLabel(DICT_TYPE.SYSTEM_USER_SEX, record.sex)}
          </span>
        ),
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (_: any, record: UserRespVO) => (
          <Switch
            checked={record.status === 0}
            onChange={(checked) => {
              StatusAction(record, checked ? 0 : 1);
            }}
          />
        ),
      },
      {
        title: "最后登录",
        dataIndex: "loginDate",
        render: (_: any, record: UserRespVO) =>
          record.loginDate ? dayjs(record.loginDate).format("YYYY-MM-DD HH:mm") : "-",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (_: any, record: UserRespVO) =>
          dayjs(record.createTime).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: UserRespVO) => (
          <div className="flex gap-3">
            <a
              className="text-blue-600 cursor-pointer"
              onClick={() => EditAction(record)}
            >
              修改
            </a>

            <a
              className="text-green-600 cursor-pointer"
              onClick={() => PasswordAction(record)}
            >
              修改密码
            </a>

            <a
              className="text-purple-600 cursor-pointer"
              onClick={() => AssignRoleAction(record)}
            >
              分配角色
            </a>

            <Popconfirm
              title="提示"
              description="是否删除该用户？"
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
    [EditAction, DeleteAction, StatusAction, PasswordAction, AssignRoleAction],
  );
};