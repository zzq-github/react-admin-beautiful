import React from "react";
import { Button, Form, Space, Tag, message } from "antd";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
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
    name: "code",
    label: "应用编码",
    type: "input",
    rules: [{ required: true, message: "请输入应用编码" }],
    componentProps: {
      placeholder: "例如 customer_console",
    },
  },
  {
    name: "type",
    label: "应用类型",
    type: "select",
    rules: [{ required: true, message: "请选择应用类型" }],
    options: [
      { label: "控制台", value: "console" },
      { label: "工作流", value: "workflow" },
      { label: "报表", value: "report" },
    ],
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
    name: "releaseDate",
    label: "上线日期",
    type: "date",
  },
  {
    name: "visibility",
    label: "可见范围",
    type: "checkbox",
    span: 24,
    options: [
      { label: "管理员", value: "admin" },
      { label: "运营", value: "operator" },
      { label: "财务", value: "finance" },
      { label: "普通用户", value: "user" },
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
    await form.validateFields();
    message.success("提交成功，实际项目中可在这里调用保存接口");
  };

  return (
    <PageContainer
      title="Form Demo"
      subtitle="展示 SchemaForm 的配置化表单、默认值、校验和提交操作。"
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <PagePanel title="应用配置" description="用配置描述常见表单项，减少重复 JSX。">
        <SchemaForm
          form={form}
          items={formItems}
          column={2}
          initialValues={{
            name: "Customer Console",
            code: "customer_console",
            owner: "Alex",
            type: "console",
            status: "enabled",
            priority: "medium",
            visibility: ["admin", "operator"],
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
        </PagePanel>

        <PagePanel title="表单能力" description="模板内置的基础表单组织方式。">
          <div className="space-y-4 text-sm text-theme-text-secondary">
            <div className="rounded-lg border border-theme-border-secondary bg-theme-bg-elevated p-3">
              <div className="mb-2 font-medium text-theme-text">适用场景</div>
              <div className="flex flex-wrap gap-2">
                <Tag color="processing">新增</Tag>
                <Tag color="success">编辑</Tag>
                <Tag color="warning">审核</Tag>
                <Tag>配置</Tag>
              </div>
            </div>
            <p>
              `SchemaForm` 适合字段较稳定的业务表单。复杂交互可以通过
              `render` 扩展单个字段，也可以直接使用 Ant Design Form。
            </p>
            <p>
              表单按钮区建议固定在底部，和弹窗表单保持一致的操作顺序。
            </p>
          </div>
        </PagePanel>
      </div>
    </PageContainer>
  );
};

export default FormDemo;
