import React, { useState } from "react";
import { Button, Form, Progress, Space, Tag, message } from "antd";
import {
  Bell,
  CheckCircle2,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import SchemaForm from "@/components/SchemaForm";
import type { SchemaFormItem } from "@/components/SchemaForm/types";

interface DemoFormValues {
  name: string;
  code: string;
  owner: string;
  type: string;
  status: boolean;
  visibility: string[];
  mfaEnabled: boolean;
  auditLog: boolean;
  sessionTimeout: number;
  notifyChannels: string[];
  alertLevel: string;
  description: string;
}

const initialValues: DemoFormValues = {
  name: "Customer Console",
  code: "customer_console",
  owner: "Alex",
  type: "console",
  status: true,
  visibility: ["admin", "operator"],
  mfaEnabled: true,
  auditLog: true,
  sessionTimeout: 30,
  notifyChannels: ["inbox", "email"],
  alertLevel: "warning",
  description: "面向运营团队的客户数据与订单配置工作台。",
};

const formItems: SchemaFormItem[] = [
  {
    group: "基础信息",
    groupDescription: "定义应用的名称、编码、负责人和启用状态。",
    name: "name",
    label: "应用名称",
    type: "input",
    rules: [{ required: true, message: "请输入应用名称" }],
    componentProps: {
      placeholder: "例如 Customer Console",
    },
  },
  {
    group: "基础信息",
    name: "code",
    label: "应用编码",
    type: "input",
    rules: [{ required: true, message: "请输入应用编码" }],
    extra: "建议使用小写字母、数字和下划线。",
    componentProps: {
      placeholder: "例如 customer_console",
    },
  },
  {
    group: "基础信息",
    name: "owner",
    label: "负责人",
    type: "input",
    rules: [{ required: true, message: "请输入负责人" }],
  },
  {
    group: "基础信息",
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
    group: "基础信息",
    name: "status",
    label: "启用状态",
    type: "switch",
    componentProps: {
      checkedChildren: "启用",
      unCheckedChildren: "停用",
    },
  },
  {
    group: "权限与安全",
    groupDescription: "配置可见范围、登录校验和审计能力。",
    name: "visibility",
    label: "可见范围",
    type: "checkbox",
    span: 24,
    rules: [{ required: true, message: "请选择可见范围" }],
    options: [
      { label: "管理员", value: "admin" },
      { label: "运营", value: "operator" },
      { label: "财务", value: "finance" },
      { label: "普通用户", value: "user" },
    ],
  },
  {
    group: "权限与安全",
    name: "mfaEnabled",
    label: "二次验证",
    type: "switch",
    componentProps: {
      checkedChildren: "开启",
      unCheckedChildren: "关闭",
    },
  },
  {
    group: "权限与安全",
    name: "auditLog",
    label: "操作审计",
    type: "switch",
    componentProps: {
      checkedChildren: "记录",
      unCheckedChildren: "关闭",
    },
  },
  {
    group: "权限与安全",
    name: "sessionTimeout",
    label: "会话超时",
    type: "number",
    rules: [{ required: true, message: "请输入会话超时时间" }],
    componentProps: {
      min: 5,
      max: 240,
      addonAfter: "分钟",
    },
  },
  {
    group: "通知策略",
    groupDescription: "配置重要事件的触达渠道和告警等级。",
    name: "notifyChannels",
    label: "通知渠道",
    type: "checkbox",
    span: 24,
    options: [
      { label: "站内信", value: "inbox" },
      { label: "邮件", value: "email" },
      { label: "短信", value: "sms" },
      { label: "Webhook", value: "webhook" },
    ],
  },
  {
    group: "通知策略",
    name: "alertLevel",
    label: "告警等级",
    type: "select",
    options: [
      { label: "仅错误", value: "error" },
      { label: "警告及以上", value: "warning" },
      { label: "全部事件", value: "all" },
    ],
  },
  {
    group: "通知策略",
    name: "description",
    label: "应用说明",
    type: "textarea",
    span: 24,
    componentProps: {
      rows: 4,
      placeholder: "补充说明这个应用的用途、负责人和上线范围。",
    },
  },
];

const typeLabels: Record<string, string> = {
  console: "控制台",
  workflow: "工作流",
  report: "报表",
};

const alertLabels: Record<string, string> = {
  error: "仅错误",
  warning: "警告及以上",
  all: "全部事件",
};

const FormDemo: React.FC = () => {
  const [form] = Form.useForm<DemoFormValues>();
  const [saving, setSaving] = useState(false);
  const [previewValues, setPreviewValues] =
    useState<DemoFormValues>(initialValues);

  const enabledSecurityCount = [
    previewValues.mfaEnabled,
    previewValues.auditLog,
    previewValues.sessionTimeout <= 60,
  ].filter(Boolean).length;
  const completion = Math.round(
    ((previewValues.visibility?.length ? 1 : 0) +
      (previewValues.notifyChannels?.length ? 1 : 0) +
      enabledSecurityCount) /
      5 *
      100
  );

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setSaving(true);
    await new Promise((resolve) => {
      window.setTimeout(resolve, 500);
    });
    setPreviewValues(values);
    setSaving(false);
    message.success("配置已保存");
  };

  const handleReset = () => {
    form.resetFields();
    setPreviewValues(initialValues);
    message.info("已恢复默认配置");
  };

  return (
    <PageContainer
      title="Form Demo"
      subtitle="用一个真实的应用配置场景展示 SchemaForm 的分组、校验、联动预览和提交状态。"
      headerMeta={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-primary-border bg-theme-primary-bg px-2.5 py-1 text-xs font-medium text-theme-primary">
          <Settings size={13} />
          Schema Driven
        </span>
      }
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <PagePanel
          title="应用配置"
          description="通过配置描述表单结构，让新增、编辑、审核类页面保持统一写法。"
          bodyClassName="p-5"
        >
          <SchemaForm
            form={form}
            items={formItems}
            column={2}
            initialValues={initialValues}
            onValuesChange={(_, allValues) => {
              setPreviewValues({ ...initialValues, ...allValues });
            }}
          >
            <div className="form-action-bar">
              <Space wrap>
                <Button icon={<RotateCcw size={14} />} onClick={handleReset}>
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<Save size={14} />}
                  loading={saving}
                  onClick={handleSubmit}
                >
                  保存配置
                </Button>
              </Space>
            </div>
          </SchemaForm>
        </PagePanel>

        <div className="space-y-4">
          <PagePanel
            title="配置预览"
            description="表单修改会即时同步到这里。"
            bodyClassName="p-4"
          >
            <div className="rounded-xl border border-theme-border-secondary bg-theme-bg p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-theme-primary text-base font-semibold text-white">
                  {(previewValues.name || "A").slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-semibold text-theme-text">
                    {previewValues.name || "未命名应用"}
                  </div>
                  <div className="mt-1 truncate text-xs text-theme-text-tertiary">
                    {previewValues.code || "app_code"}
                  </div>
                </div>
                <Tag color={previewValues.status ? "success" : "default"}>
                  {previewValues.status ? "启用" : "停用"}
                </Tag>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-theme-bg-container p-3">
                  <div className="text-xs text-theme-text-tertiary">类型</div>
                  <div className="mt-1 font-medium text-theme-text">
                    {typeLabels[previewValues.type] || "-"}
                  </div>
                </div>
                <div className="rounded-lg bg-theme-bg-container p-3">
                  <div className="text-xs text-theme-text-tertiary">负责人</div>
                  <div className="mt-1 font-medium text-theme-text">
                    {previewValues.owner || "-"}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-theme-text-secondary">配置完整度</span>
                  <span className="font-medium text-theme-text">{completion}%</span>
                </div>
                <Progress
                  percent={completion}
                  showInfo={false}
                  strokeColor="var(--color-primary)"
                  trailColor="var(--color-fill-secondary)"
                />
              </div>
            </div>
          </PagePanel>

          <PagePanel title="能力摘要" description="适合复制到真实业务表单。">
            <div className="space-y-3">
              <div className="form-summary-item">
                <ShieldCheck size={16} className="text-theme-success" />
                <div>
                  <div className="font-medium text-theme-text">安全策略</div>
                  <div className="text-xs text-theme-text-secondary">
                    MFA {previewValues.mfaEnabled ? "已开启" : "未开启"}，
                    审计 {previewValues.auditLog ? "已记录" : "未记录"}
                  </div>
                </div>
              </div>

              <div className="form-summary-item">
                <Bell size={16} className="text-theme-primary" />
                <div>
                  <div className="font-medium text-theme-text">通知策略</div>
                  <div className="text-xs text-theme-text-secondary">
                    {previewValues.notifyChannels?.length || 0} 个渠道，
                    {alertLabels[previewValues.alertLevel] || "未配置"}
                  </div>
                </div>
              </div>

              <div className="form-summary-item">
                <CheckCircle2 size={16} className="text-theme-info" />
                <div>
                  <div className="font-medium text-theme-text">可见范围</div>
                  <div className="text-xs text-theme-text-secondary">
                    {(previewValues.visibility || []).length} 个角色可访问
                  </div>
                </div>
              </div>
            </div>
          </PagePanel>
        </div>
      </div>
    </PageContainer>
  );
};

export default FormDemo;
