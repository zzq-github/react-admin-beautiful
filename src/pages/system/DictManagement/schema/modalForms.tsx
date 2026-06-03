import React from 'react';
import { Form, Input, Radio } from 'antd';
import { DICT_TYPE, getDictDatas } from '@/utils/dict';

/**
 * 渲染字典类型表单内容
 * @param isEdit 是否为编辑模式
 */
export const renderDictTypeForm = (isEdit: boolean) => {
  return (
    <>
      <Form.Item 
        label="字典名称" 
        name="name" 
        rules={[{ required: true, message: '请输入字典名称' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item
        label="字典类型"
        name="type"
        rules={[{ required: true, message: '请输入字典类型' }]}
      >
        <Input placeholder="请输入" disabled={isEdit} />
      </Form.Item>

      <Form.Item label="状态" name="status">
        <Radio.Group>
          {getDictDatas(DICT_TYPE.COMMON_STATUS).map(item => (
            <Radio key={item.value} value={parseInt(item.value)}>{item.label}</Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item label="备注" name="remark">
        <Input.TextArea placeholder="请输入备注内容" rows={3} />
      </Form.Item>
    </>
  );
};