import React from "react";
import { Input, Select, DatePicker } from "antd";
import { getDictDatas, DICT_TYPE } from '@/utils/dict'
import type { QueryField } from "@/components/QueryFilter/types";

const { RangePicker } = DatePicker;

// 消息中心查询字段
export const renderNotifyMessageQueryFields = ({}): QueryField[] => [
  {
    name: "templateCode",
    label: "模板编码",
    span: 6,
    component: <Input placeholder="请输入模板编码" />,
  },
  {
    name: "templateNickname",
    label: "模板名称",
    span: 6,
    component: <Input placeholder="请输入模板名称" />,
  },
  {
    name: "readStatus",
    label: "阅读状态",
    span: 6,
    component: (
      <Select placeholder="请选择阅读状态" allowClear>
        <Select.Option value="true">已读</Select.Option>
        <Select.Option value="false">未读</Select.Option>
      </Select>
    ),
  },
  {
    name: "createTime",
    label: "创建时间",
    span: 8,
    component: (
      <RangePicker
        placeholder={["开始时间", "结束时间"]}
        style={{ width: "100%" }}
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
      />
    ),
    transformChangeValue: (value) => {
      if (!value || value.length !== 2) return undefined;
      return value.map((item: any) => item?.format("YYYY-MM-DD HH:mm:ss"));
    },
  },
];