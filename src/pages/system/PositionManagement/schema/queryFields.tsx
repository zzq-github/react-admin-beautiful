import React from "react";
import { Input,  Select } from "antd";
import { getDictDatas, DICT_TYPE } from '@/utils/dict'


// 字典查询字段
export const renderPositionQueryFields = ({}): QueryFieldItem[] => [
  {
    name: "code",
    label: "岗位编码",
    span: 6,
    component: <Input placeholder="请输入岗位编码" />,
  },
  {
    name: "name",
    label: "岗位名称",
    span: 6,
    component: <Input placeholder="请输入岗位名称" />,
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

