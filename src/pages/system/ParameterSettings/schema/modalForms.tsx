import React from "react";
import { Form, Input, Radio, InputNumber } from "antd";

export const renderParameterSettingsForm = () => {
  return (
    <>
      <Form.Item
        label="参数分类"
        name="category"
        rules={[{ required: true, message: "请输入参数分类" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item
        label="参数名称"
        name="name"
        rules={[{ required: true, message: "请输入参数名称" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item
        label="参数键名"
        name="key"
        rules={[{ required: true, message: "请输入参数键名" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        label="参数键值"
        name="value"
        rules={[{ required: true, message: "请输入参数键值" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item label="是否可见" name="visible">
        <Radio.Group>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="备注" name="remark">
        <Input.TextArea placeholder="请输入备注内容" rows={3} />
      </Form.Item>
    </>
  );
};
