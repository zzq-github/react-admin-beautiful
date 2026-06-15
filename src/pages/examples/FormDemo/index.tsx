import React from "react";
import { Button, Card, Form, Space, message } from "antd";
import PageContainer from "@/components/PageContainer";
import SchemaForm from "@/components/SchemaForm";
import type { SchemaFormItem } from "@/components/SchemaForm/types";

const formItems: SchemaFormItem[] = [
  {
    name: "name",
    label: "应用名称",
    type: "input",
    rules: [{ required: true, message: "请输入应用名称" }],
    componentProps: {
      placeholder: "例如 Customer Console",
    },
  },
  {
    name: "owner",
    label: "负责人",
    type: "input",
    rules: [{ required: true, message: "请输入负责人" }],
  },
  {
    name: "status",
    label: "状态",
    type: "select",
    rules: [{ required: true, message: "请选择状态" }],
    options: [
      { label: "启用", value: "enabled" },
      { label: "停用", value: "disabled" },
    ],
  },
  {
    name: "priority",
    label: "优先级",
    type: "radio",
    options: [
      { label: "低", value: "low" },
      { label: "中", value: "medium" },
      { label: "高", value: "high" },
    ],
  },
  {
    name: "description",
    label: "描述",
    type: "textarea",
    span: 24,
    componentProps: {
      rows: 4,
      placeholder: "补充说明这个应用的用途",
    },
  },
];

const FormDemo: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log("[FormDemo] submit values:", values);
    message.success("提交成功，请在控制台查看表单数据");
  };

  return (
    <PageContainer
      title="Form Demo"
      subtitle="展示 SchemaForm 的配置化表单写法。"
    >
      <Card className="shadow-sm">
        <SchemaForm
          form={form}
          items={formItems}
          column={2}
          initialValues={{
            status: "enabled",
            priority: "medium",
          }}
        >
          <div className="flex justify-end border-t border-theme-border pt-4">
            <Space>
              <Button onClick={() => form.resetFields()}>重置</Button>
              <Button type="primary" onClick={handleSubmit}>
                提交
              </Button>
            </Space>
          </div>
        </SchemaForm>
      </Card>
    </PageContainer>
  );
};

export default FormDemo;
