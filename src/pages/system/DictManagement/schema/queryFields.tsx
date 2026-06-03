import React from "react";
import { Input, DatePicker, Select } from "antd";
import { getDictDatas, DICT_TYPE } from '@/utils/dict'

const { RangePicker } = DatePicker;

// 字典查询字段
export const renderDictTypeQueryFields = (): QueryFieldItem[] => [
  {
    name: "name",
    label: "字典名称",
    span: 6,
    component: <Input placeholder="请输入字典名称" />,
  },
  {
    name: "type",
    label: "字典类型",
    span: 6,
    component: <Input placeholder="请输入字典类型" />,
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
      } else {
        return value;
      }
    },
  },
];

