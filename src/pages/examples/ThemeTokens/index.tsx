import React from "react";
import { Alert, Button, Progress, Space, Switch, Tag } from "antd";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Palette,
} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { useTheme } from "@/theme";
import { appTheme } from "@/theme/appTheme";

type ColorGroup = {
  name: string;
  description: string;
  icon: React.ReactNode;
  textClass: string;
  bgClass: string;
  borderClass: string;
  tokens: Array<{
    label: string;
    cssVar: string;
    value: string;
    swatchClass: string;
  }>;
};

const colorGroups: ColorGroup[] = [
  {
    name: "Primary",
    description: "品牌主色、主要按钮、选中态",
    icon: <Palette size={18} />,
    textClass: "text-theme-primary",
    bgClass: "bg-theme-primary-bg",
    borderClass: "border-theme-primary-border",
    tokens: [
      {
        label: "base",
        cssVar: "--color-primary",
        value: appTheme.colorPrimary,
        swatchClass: "bg-theme-primary",
      },
      {
        label: "hover",
        cssVar: "--color-primary-hover",
        value: appTheme.colorPrimaryHover,
        swatchClass: "bg-theme-primary-hover",
      },
      {
        label: "active",
        cssVar: "--color-primary-active",
        value: appTheme.colorPrimaryActive,
        swatchClass: "bg-theme-primary-active",
      },
      {
        label: "bg",
        cssVar: "--color-primary-bg",
        value: appTheme.colorPrimaryBg,
        swatchClass: "bg-theme-primary-bg",
      },
      {
        label: "border",
        cssVar: "--color-primary-border",
        value: appTheme.colorPrimaryBorder,
        swatchClass: "bg-theme-primary-border",
      },
    ],
  },
  {
    name: "Success",
    description: "成功、启用、完成状态",
    icon: <CheckCircle2 size={18} />,
    textClass: "text-theme-success",
    bgClass: "bg-theme-success-bg",
    borderClass: "border-theme-success-border",
    tokens: [
      {
        label: "base",
        cssVar: "--color-success",
        value: appTheme.colorSuccess,
        swatchClass: "bg-theme-success",
      },
      {
        label: "hover",
        cssVar: "--color-success-hover",
        value: appTheme.colorSuccessHover,
        swatchClass: "bg-theme-success-hover",
      },
      {
        label: "active",
        cssVar: "--color-success-active",
        value: appTheme.colorSuccessActive,
        swatchClass: "bg-theme-success-active",
      },
      {
        label: "bg",
        cssVar: "--color-success-bg",
        value: appTheme.colorSuccessBg,
        swatchClass: "bg-theme-success-bg",
      },
      {
        label: "border",
        cssVar: "--color-success-border",
        value: appTheme.colorSuccessBorder,
        swatchClass: "bg-theme-success-border",
      },
    ],
  },
  {
    name: "Warning",
    description: "提醒、待处理、风险状态",
    icon: <AlertTriangle size={18} />,
    textClass: "text-theme-warning",
    bgClass: "bg-theme-warning-bg",
    borderClass: "border-theme-warning-border",
    tokens: [
      {
        label: "base",
        cssVar: "--color-warning",
        value: appTheme.colorWarning,
        swatchClass: "bg-theme-warning",
      },
      {
        label: "hover",
        cssVar: "--color-warning-hover",
        value: appTheme.colorWarningHover,
        swatchClass: "bg-theme-warning-hover",
      },
      {
        label: "active",
        cssVar: "--color-warning-active",
        value: appTheme.colorWarningActive,
        swatchClass: "bg-theme-warning-active",
      },
      {
        label: "bg",
        cssVar: "--color-warning-bg",
        value: appTheme.colorWarningBg,
        swatchClass: "bg-theme-warning-bg",
      },
      {
        label: "border",
        cssVar: "--color-warning-border",
        value: appTheme.colorWarningBorder,
        swatchClass: "bg-theme-warning-border",
      },
    ],
  },
  {
    name: "Error",
    description: "错误、删除、失败状态",
    icon: <AlertCircle size={18} />,
    textClass: "text-theme-error",
    bgClass: "bg-theme-error-bg",
    borderClass: "border-theme-error-border",
    tokens: [
      {
        label: "base",
        cssVar: "--color-error",
        value: appTheme.colorError,
        swatchClass: "bg-theme-error",
      },
      {
        label: "hover",
        cssVar: "--color-error-hover",
        value: appTheme.colorErrorHover,
        swatchClass: "bg-theme-error-hover",
      },
      {
        label: "active",
        cssVar: "--color-error-active",
        value: appTheme.colorErrorActive,
        swatchClass: "bg-theme-error-active",
      },
      {
        label: "bg",
        cssVar: "--color-error-bg",
        value: appTheme.colorErrorBg,
        swatchClass: "bg-theme-error-bg",
      },
      {
        label: "border",
        cssVar: "--color-error-border",
        value: appTheme.colorErrorBorder,
        swatchClass: "bg-theme-error-border",
      },
    ],
  },
  {
    name: "Info",
    description: "说明、帮助、普通提示",
    icon: <Info size={18} />,
    textClass: "text-theme-info",
    bgClass: "bg-theme-info-bg",
    borderClass: "border-theme-info-border",
    tokens: [
      {
        label: "base",
        cssVar: "--color-info",
        value: appTheme.colorInfo,
        swatchClass: "bg-theme-info",
      },
      {
        label: "hover",
        cssVar: "--color-info-hover",
        value: appTheme.colorInfoHover,
        swatchClass: "bg-theme-info-hover",
      },
      {
        label: "active",
        cssVar: "--color-info-active",
        value: appTheme.colorInfoActive,
        swatchClass: "bg-theme-info-active",
      },
      {
        label: "bg",
        cssVar: "--color-info-bg",
        value: appTheme.colorInfoBg,
        swatchClass: "bg-theme-info-bg",
      },
      {
        label: "border",
        cssVar: "--color-info-border",
        value: appTheme.colorInfoBorder,
        swatchClass: "bg-theme-info-border",
      },
    ],
  },
];

const surfaceTokens = [
  {
    label: "Base",
    cssVar: "--color-bg-base",
    className: "bg-theme-bg-base",
    description: "页面背景",
  },
  {
    label: "Container",
    cssVar: "--color-bg-container",
    className: "bg-theme-bg-container",
    description: "内容容器",
  },
  {
    label: "Elevated",
    cssVar: "--color-bg-elevated",
    className: "bg-theme-bg-elevated",
    description: "浮层、输入框",
  },
  {
    label: "Spotlight",
    cssVar: "--color-bg-spotlight",
    className: "bg-theme-bg-spotlight",
    description: "强调区域",
  },
];

const borderTokens = [
  {
    label: "Default",
    cssVar: "--color-border",
    className: "border-theme-border",
  },
  {
    label: "Secondary",
    cssVar: "--color-border-secondary",
    className: "border-theme-border-secondary",
  },
];

const textTokens = [
  {
    label: "Title",
    cssVar: "--color-text",
    className: "text-theme-text",
    sample: "主标题与正文",
  },
  {
    label: "Secondary",
    cssVar: "--color-text-secondary",
    className: "text-theme-text-secondary",
    sample: "辅助说明文本",
  },
  {
    label: "Tertiary",
    cssVar: "--color-text-tertiary",
    className: "text-theme-text-tertiary",
    sample: "弱提示与占位文本",
  },
];

const motionTokens = [
  {
    label: "Fast",
    cssVar: "--motion-duration-fast",
    value: appTheme.motionDurationFast,
    className: "duration-motion-fast ease-motion-out",
  },
  {
    label: "Base",
    cssVar: "--motion-duration-base",
    value: appTheme.motionDurationBase,
    className: "duration-motion-base ease-motion-out",
  },
  {
    label: "Slow",
    cssVar: "--motion-duration-slow",
    value: appTheme.motionDurationSlow,
    className: "duration-motion-slow ease-motion-out",
  },
];

const ThemeTokens: React.FC = () => {
  const { themeConfig, setThemeConfig } = useTheme();

  return (
    <PageContainer
      title="Theme Tokens"
      subtitle="展示 CSS 变量、Tailwind 语义类与 Ant Design token 的同步效果"
      action={
        <div className="flex items-center gap-3 rounded-lg border border-theme-border bg-theme-bg px-3 py-2">
          <span className="text-sm text-theme-text-secondary">暗色模式</span>
          <Switch
            checked={themeConfig.darkMode}
            onChange={(darkMode) => setThemeConfig({ darkMode })}
          />
        </div>
      }
    >
      <div className="space-y-4">
        <section className="grid gap-4 xl:grid-cols-5">
          {colorGroups.map((group) => (
            <div
              key={group.name}
              className={`rounded-lg border ${group.borderClass} ${group.bgClass} p-4`}
            >
              <div className={`mb-4 flex items-center gap-2 ${group.textClass}`}>
                {group.icon}
                <div>
                  <h3 className="text-base font-semibold text-theme-text">
                    {group.name}
                  </h3>
                  <p className="text-xs text-theme-text-secondary">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {group.tokens.map((token) => (
                  <div
                    key={token.cssVar}
                    className="flex items-center justify-between gap-3 rounded-md border border-theme-border-secondary bg-theme-bg-container px-2.5 py-2"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-medium uppercase text-theme-text">
                        {token.label}
                      </div>
                      <div className="truncate text-xs text-theme-text-tertiary">
                        {token.cssVar}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden text-xs text-theme-text-tertiary 2xl:inline">
                        {token.value}
                      </span>
                      <span
                        className={`h-7 w-7 flex-shrink-0 rounded-md border border-theme-border-secondary ${token.swatchClass}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-theme-border bg-theme-bg p-4">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-theme-text">
                Surface & Border
              </h3>
              <p className="text-sm text-theme-text-secondary">
                背景、边框、悬浮层 token 在亮色和暗色模式下应保持层级清晰。
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {surfaceTokens.map((item) => (
                <div
                  key={item.cssVar}
                  className={`rounded-lg border border-theme-border-secondary ${item.className} p-4`}
                >
                  <div className="text-sm font-medium text-theme-text">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs text-theme-text-tertiary">
                    {item.cssVar}
                  </div>
                  <p className="mt-4 text-sm text-theme-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {borderTokens.map((item) => (
                <div
                  key={item.cssVar}
                  className={`rounded-lg border-2 ${item.className} bg-theme-bg-container p-4`}
                >
                  <div className="text-sm font-medium text-theme-text">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs text-theme-text-tertiary">
                    {item.cssVar}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-theme-border bg-theme-bg p-4">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-theme-text">
                Text Levels
              </h3>
              <p className="text-sm text-theme-text-secondary">
                文本层级统一使用 `text-theme-*`，避免在页面里写死灰阶。
              </p>
            </div>

            <div className="space-y-3">
              {textTokens.map((item) => (
                <div
                  key={item.cssVar}
                  className="rounded-lg border border-theme-border-secondary bg-theme-bg-container p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-theme-text-tertiary">
                      {item.label}
                    </span>
                    <span className="text-xs text-theme-text-tertiary">
                      {item.cssVar}
                    </span>
                  </div>
                  <p className={`mt-2 text-lg font-medium ${item.className}`}>
                    {item.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-theme-border bg-theme-bg p-4">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-theme-text">
              Motion Tokens
            </h3>
            <p className="text-sm text-theme-text-secondary">
              页面切换、加载态和交互反馈统一使用 motion token，避免动效节奏分散。
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {motionTokens.map((item) => (
              <div
                key={item.cssVar}
                className="group rounded-lg border border-theme-border-secondary bg-theme-bg-container p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-theme-text">
                      {item.label}
                    </div>
                    <div className="text-xs text-theme-text-tertiary">
                      {item.cssVar}
                    </div>
                  </div>
                  <span className="text-xs text-theme-text-tertiary">
                    {item.value}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-theme-bg-spotlight">
                  <div
                    className={`h-2 w-1/2 rounded-full bg-theme-primary transition-all group-hover:w-full ${item.className}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-theme-border bg-theme-bg p-4">
          <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-base font-semibold text-theme-text">
                Ant Design Components
              </h3>
              <p className="text-sm text-theme-text-secondary">
                AntD 组件应与 CSS 变量和 Tailwind 语义类保持同一套品牌与业务色。
              </p>
            </div>
            <Space wrap>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button danger>Danger</Button>
            </Space>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="space-y-3">
              <Alert
                showIcon
                type="success"
                message="Success token"
                description="成功反馈使用 colorSuccess、colorSuccessBg、colorSuccessBorder。"
              />
              <Alert
                showIcon
                type="warning"
                message="Warning token"
                description="提醒反馈使用 colorWarning、colorWarningBg、colorWarningBorder。"
              />
              <Alert
                showIcon
                type="error"
                message="Error token"
                description="错误反馈使用 colorError、colorErrorBg、colorErrorBorder。"
              />
              <Alert
                showIcon
                type="info"
                message="Info token"
                description="说明反馈使用 colorInfo、colorInfoBg、colorInfoBorder。"
              />
            </div>

            <div className="rounded-lg border border-theme-border-secondary bg-theme-bg-elevated p-4">
              <div className="mb-3 text-sm font-medium text-theme-text">
                Status Preview
              </div>
              <Space wrap className="mb-4">
                <Tag color="success">Enabled</Tag>
                <Tag color="warning">Pending</Tag>
                <Tag color="error">Failed</Tag>
                <Tag color="processing">Running</Tag>
              </Space>
              <div className="space-y-3">
                <Progress percent={68} status="active" />
                <Progress percent={92} status="success" />
                <Progress percent={46} status="exception" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default ThemeTokens;
