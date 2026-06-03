import React from "react";
import { Form, Input, Radio, InputNumber } from "antd";
import { DICT_TYPE, getDictDatas } from "@/utils/dict";

export const renderPositionForm = () => {
  return (
    <>
      <Form.Item
        label="岗位名称"
        name="name"
        rules={[{ required: true, message: "请输入岗位名称" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item
        label="岗位编码"
        name="code"
        rules={[{ required: true, message: "请输入岗位编码" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>


      <Form.Item
        label="岗位排序"
        name="sort"
        rules={[{ required: true, message: "请输入岗位排序" }]}
      >
        <InputNumber placeholder="请输入" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="岗位状态" name="status">
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