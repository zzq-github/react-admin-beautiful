import React, { useEffect } from "react";
import { Form, Button, Row, Col, Space } from "antd";
import type { FormProps } from "antd/es/form";
import type { QueryFilterProps } from "./types";

const QueryFilter: React.FC<QueryFilterProps> = ({
  fields = [],
  onSearch,
  onReset,
  onChange,
  initialValues = {},
  span = 6,
  leftActions,
}) => {
  const [form] = Form.useForm();

  // 监听 initialValues 变化，同步到 UI
  // 当父组件（如 useQueryFilter）改变初始值时，这里负责填入表单
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    // ... 原有的数据转换逻辑 ...
    const assignObj: any = {};
    fields.forEach((field) => {
      if (field.transformChangeValue) {
        assignObj[field.name] = field.transformChangeValue(values[field.name]);
      }
    });
    // 注意：这里最好合并 initialValues，防止字段丢失（视业务需求而定）
    onChange?.(Object.assign({}, initialValues, values, assignObj));
    onSearch?.();
  };

  // ✅ 关键点 2：UI 的重置
  const handleReset = () => {
    // 1. UI 层：将表单重置回 initialValues 状态
    // 如果你想完全清空（变成空白），使用 form.resetFields()
    // 如果你想重置回当前的 initialValues，这也是 form.resetFields() 的默认行为
    form.resetFields(); 
    
    // 2. 数据层：通知父组件触发重置逻辑
    onReset?.();
  };

  const onValuesChange: FormProps["onValuesChange"] = (
    changedValues,
    allValues,
  ) => {
    // 实时同步变更给外部
    onChange?.(allValues);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      // 注意：虽然有 useEffect，但这个 prop 依然保留，用于第一次渲染
      initialValues={initialValues} 
      onValuesChange={onValuesChange}
      onFinish={handleFinish}
    >
      <Row gutter={24}>
        {fields.map((item) => (
          <Col span={item.span || span} key={item.name}>
            <Form.Item name={item.name} label={item.label} rules={item.rules}>
              {item.component}
            </Form.Item>
          </Col>
        ))}

        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Space>{leftActions}</Space>

            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              {/* 这里调用修改后的 handleReset */}
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default QueryFilter;