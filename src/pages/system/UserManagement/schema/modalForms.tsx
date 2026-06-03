import React from "react";
import { Form, Input, Select, Radio, InputNumber, TreeSelect, Row, Col } from "antd";
import { DICT_TYPE, getDictDatas } from "@/utils/dict";
import { PostSimpleRespVO } from "@/api/system/position/types";

// 用户表单
export const renderUserForm = ({ form, isEdit, deptTree, positionList }) => {
  return (
    <>
    <Row gutter={16}>
      <Col span={12}>
      <Form.Item
        label="用户账号"
        name="username"
        rules={[{ required: true, message: "请输入用户账号" }]}
      >
        <Input placeholder="请输入" disabled={isEdit} />
      </Form.Item>
      </Col>
      <Col span={12}>

      {!isEdit && (
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      )}
      </Col>

      <Col span={12}>
      <Form.Item
        label="用户昵称"
        name="nickname"
        rules={[{ required: true, message: "请输入用户昵称" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      </Col>
<Col span={12}>

      <Form.Item
        label="手机号码"
        name="mobile"
        rules={[{ pattern: /^1\d{10}$/, message: "请输入有效的手机号码" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      </Col>
      <Col span={24}>
      <Form.Item label="部门" name="deptId">
        <TreeSelect
          treeData={deptTree}
          placeholder="选择上级菜单"
          treeDefaultExpandAll
          fieldNames={{ label: "name", value: "id", children: "children" }} // 根据实际接口调整
        />
      </Form.Item>
      </Col>
      <Col span={12}>

      <Form.Item label="岗位" name="postIds">
        <Select mode="multiple" placeholder="请选择岗位">
          {positionList.map((item:PostSimpleRespVO) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      </Col>
      <Col span={12}>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ type: "email", message: "请输入有效的邮箱地址" }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      </Col>
     
      <Col span={12}>

      <Form.Item label="性别" name="sex">
        <Radio.Group>
          {getDictDatas(DICT_TYPE.SYSTEM_USER_SEX).map((item) => (
            <Radio key={item.value} value={parseInt(item.value, 10)}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      </Col>
      <Col span={12}>

      <Form.Item label="用户状态" name="status">
        <Radio.Group>
          {getDictDatas(DICT_TYPE.COMMON_STATUS).map((item) => (
            <Radio key={item.value} value={parseInt(item.value, 10)}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      </Col>
      <Col span={24}>

      <Form.Item label="备注" name="remark">
        <Input.TextArea placeholder="请输入备注内容" rows={3} />
      </Form.Item>
      </Col>
      </Row>
    </>
  );
};

// 修改密码表单
export const renderPasswordForm = ({ form }) => {
  return (
    <>
      <Form.Item
        label="新密码"
        name="password"
        rules={[
          { required: true, message: "请输入新密码" },
          { min: 6, message: "密码长度至少6位" },
        ]}
      >
        <Input.Password placeholder="请输入新密码" />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: "请确认密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="请再次输入新密码" />
      </Form.Item>
    </>
  );
};
