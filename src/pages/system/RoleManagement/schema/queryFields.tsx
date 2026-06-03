import React from "react";
import { Input, Select, DatePicker } from "antd";
import { getDictDatas, DICT_TYPE } from '@/utils/dict';

const { RangePicker } = DatePicker;

export const renderRoleQueryFields = (): QueryFieldItem[] => [
  {
    name: "name",
    label: "角色名称",
    span: 6,
    component: <Input placeholder="请输入角色名称" />,
  },
  {
    name: "code",
    label: "角色标识",
    span: 6,
    component: <Input placeholder="请输入权限字符" />,
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
  {
    name: "createTime",
    label: "创建时间",
    span: 6,
    component: <RangePicker format="YYYY-MM-DD" />,
    transformChangeValue: (value: any) => {
      if (value) {
        return [
          value[0].format("YYYY-MM-DD 00:00:00"),
          value[1].format("YYYY-MM-DD 23:59:59"),
        ];
      }
      return value;
    },
  },
];