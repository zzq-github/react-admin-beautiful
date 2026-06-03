import React from "react";
import { Form, Input, Radio, InputNumber, Checkbox, Tree } from "antd";
import { DICT_TYPE, getDictDatas } from "@/utils/dict";

export const renderRoleForm = () => {
  return (
    <>
      <Form.Item
        label="角色名称"
        name="name"
        rules={[{ required: true, message: "请输入角色名称" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        label="角色标识"
        name="code"
        rules={[{ required: true, message: "请输入角色标识" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        label="角色顺序"
        name="sort"
        rules={[{ required: true, message: "请输入角色顺序" }]}
      >
        <InputNumber placeholder="请输入" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="状态"
        name="status"
        rules={[{ required: true, message: "请选择状态" }]}
      >
        <Radio.Group>
          {getDictDatas(DICT_TYPE.COMMON_STATUS).map((item) => (
            <Radio key={item.value} value={parseInt(item.value, 10)}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="备注" name="remark">
        <Input.TextArea placeholder="请输入备注内容" rows={3} />
      </Form.Item>
    </>
  );
};

