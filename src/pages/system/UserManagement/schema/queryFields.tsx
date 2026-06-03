import React from "react";
import { Input, Select } from "antd";
import { getDictDatas, DICT_TYPE } from "@/utils/dict";
import { QueryField } from "@/components/QueryFilter/types";
import { PostSimpleRespVO } from "@/api/system/position/types";

// 字典查询字段
export const renderUserQueryFields = ({
positionList
}): QueryField[] => [
  {
    name: "username",
    label: "用户账号",
    span: 6,
    component: <Input placeholder="请输入用户账号" />,
  },
  {
    name: "mobile",
    label: "手机号码",
    span: 6,
    component: <Input placeholder="请输入手机号码" />,
  },
  {
    name: "status",
    label: "状态",
    span: 6,
    component: (
      <Select placeholder="请选择状态" allowClear>
        {getDictDatas(DICT_TYPE.COMMON_STATUS).map((dict) => (
          <Select.Option key={String(dict.value)} value={dict.value}>
            {dict.label}
          </Select.Option>
        ))}
      </Select>
    ),
  },
];