import React from "react";
import { DatePicker, Input,  Select } from "antd";
import { getDictDatas, DICT_TYPE } from '@/utils/dict'
const { RangePicker } = DatePicker;


// 字典查询字段
export const renderParameterSettingsQueryFields = ({}): QueryFieldItem[] => [
  {
    name: "name",
    label: "参数名称",
    span: 6,
    component: <Input placeholder="请输入参数名称" />,
  },
  {
    name: "key",
    label: "参数键名",
    span: 6,
    component: <Input placeholder="请输入参数键名" />,
  },
  {
    name: "type",
    label: "系统内置",
    span: 6,
    component: (
      <Select placeholder="请选择" allowClear>
        {getDictDatas(DICT_TYPE.INFRA_CONFIG_TYPE).map((dict) => (
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
      component: <RangePicker format="YYYY-MM-DD" />,
      span: 12,
      transformChangeValue: (value) => {
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

