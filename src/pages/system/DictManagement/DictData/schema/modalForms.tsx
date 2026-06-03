import React from "react";
import { Form, Input, Radio, Select, InputNumber } from "antd";
import { DICT_TYPE, getDictDatas } from "@/utils/dict";
import { getStatusColor } from "../helpers/getColorTypeOptions";

export const renderDictDataForm = () => {
  return (
    <>
      <Form.Item
        label="字典类型"
        name="dictType"
        rules={[{ required: true, message: "请输入字典类型" }]}
      >
        <Input placeholder="请输入" disabled />
      </Form.Item>

      <Form.Item
        label="数据标签"
        name="label"
        rules={[{ required: true, message: "请输入数据标签" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item
        label="数据键值"
        name="value"
        rules={[{ required: true, message: "请输入数据键值" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item
        label="显示排序"
        name="sort"
        rules={[{ required: true, message: "请输入显示排序" }]}
      >
        <InputNumber placeholder="请输入" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="状态" name="status">
        <Radio.Group>
          {getDictDatas(DICT_TYPE.COMMON_STATUS).map((item) => (
            <Radio key={item.value} value={parseInt(item.value, 10)}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="颜色类型"
        name="colorType"
      >
        <Select placeholder="请选择状态" allowClear>
          {getStatusColor().map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}（{item.value}）
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="CSS Class"
        name="cssClass"
      >
        <Input placeholder="请输入 CSS 类名" />
      </Form.Item>

      <Form.Item label="备注" name="remark">
        <Input.TextArea placeholder="请输入备注内容" rows={3} />
      </Form.Item>
    </>
  );
};