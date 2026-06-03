import React from "react";
import { Form, Input, Radio, Select, InputNumber, Row, Col, TreeSelect } from "antd";
import { DICT_TYPE, getDictDatas } from "@/utils/dict";

export const renderEditDepartmentForm = ({
  userListData,
  departmentTree
}) => {
  return (
    <>
      <Row gutter={[16, 0]}>
        {/* 上级部门 - 24格全宽 */}
        <Col span={24}>
          <Form.Item
            label="上级部门"
            name="parentId"
          >
            <TreeSelect
              treeData={departmentTree}
              placeholder="选择上级部门"
              allowClear
              treeDefaultExpandAll
              // AntD TreeSelect 默认支持 label/value 结构，如果字段名不同需使用 fieldNames 属性
              fieldNames={{ label: "name", value: "id", children: "children" }}
            />
          </Form.Item>
        </Col>

        {/* 部门名称 */}
        <Col span={12}>
          <Form.Item
            label="部门名称"
            name="name"
            rules={[{ required: true, message: "请输入部门名称" }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
        </Col>

        {/* 显示排序 */}
        <Col span={12}>
          <Form.Item label="显示排序" name="sort"
            rules={[{ required: true, message: "请填入显示排序" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* 负责人 */}
        <Col span={12}>
          <Form.Item label="负责人" name="leaderUserId">
            <Select
              placeholder="请选择负责人"
              allowClear
              style={{ width: "100%" }}
            >
              {userListData.map((item) => (
                <Select.Option key={item.id} value={parseInt(item.id)}>
                  {item.nickname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* 联系电话 */}
        <Col span={12}>
          <Form.Item
            label="联系电话"
            name="phone"
            rules={[{ max: 11, message: "手机号长度不能超过11位" }]}
          >
            <Input placeholder="请输入联系电话" maxLength={11} />
          </Form.Item>
        </Col>

        {/* 邮箱 */}
        <Col span={12}>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: "email", message: "请输入有效的邮箱地址" }]}
          >
            <Input placeholder="请输入邮箱" maxLength={50} />
          </Form.Item>
        </Col>

        {/* 部门状态 */}
        <Col span={12}>
          <Form.Item label="部门状态" name="status"
            rules={[{ required: true, message: "请选择部门状态" }]}
          >
            <Radio.Group>
              {getDictDatas(DICT_TYPE.COMMON_STATUS).map((dict) => (
                <Radio key={dict.value} value={parseInt(dict.value)}>
                  {dict.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
