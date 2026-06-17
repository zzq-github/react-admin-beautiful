import React from "react";
import {
  AlertCircle,
  Construction,
  Inbox,
  SearchX,
  ShieldAlert,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

export type PageStateType =
  | "empty"
  | "error"
  | "forbidden"
  | "not-found"
  | "coming-soon"
  | "network";

interface PageStatePreset {
  icon: LucideIcon;
  title: string;
  description: string;
  toneClassName: string;
}

interface PageStateProps {
  type?: PageStateType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  compact?: boolean;
  fullscreen?: boolean;
  className?: string;
}

const presets: Record<PageStateType, PageStatePreset> = {
  empty: {
    icon: Inbox,
    title: "暂无数据",
    description: "当前没有可展示的数据。",
    toneClassName: "bg-theme-bg-spotlight text-theme-text-tertiary",
  },
  error: {
    icon: AlertCircle,
    title: "加载失败",
    description: "请求没有成功完成，请稍后重试。",
    toneClassName: "bg-theme-error-bg text-theme-error",
  },
  forbidden: {
    icon: ShieldAlert,
    title: "暂无权限",
    description: "当前账号没有访问此内容的权限。",
    toneClassName: "bg-theme-warning-bg text-theme-warning",
  },
  "not-found": {
    icon: SearchX,
    title: "页面不存在",
    description: "你访问的页面不存在或已被移动。",
    toneClassName: "bg-theme-info-bg text-theme-info",
  },
  "coming-soon": {
    icon: Construction,
    title: "即将上线",
    description: "这个功能正在准备中。",
    toneClassName: "bg-theme-primary-bg text-theme-primary",
  },
  network: {
    icon: WifiOff,
    title: "网络异常",
    description: "请检查网络连接后再试。",
    toneClassName: "bg-theme-error-bg text-theme-error",
  },
};

const PageState: React.FC<PageStateProps> = ({
  type = "empty",
  title,
  description,
  action,
  compact = false,
  fullscreen = false,
  className,
}) => {
  const preset = presets[type];
  const Icon = preset.icon;
  const wrapperClassName = [
    "flex items-center justify-center text-center",
    fullscreen ? "min-h-screen bg-theme-bg-base px-4" : "",
    compact ? "py-6" : fullscreen ? "" : "min-h-[220px] px-4 py-10",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <div className="flex max-w-sm flex-col items-center">
        <span
          className={[
            "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full",
            preset.toneClassName,
          ].join(" ")}
        >
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <h3 className="text-sm font-medium text-theme-text">
          {title ?? preset.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-theme-text-secondary">
          {description ?? preset.description}
        </p>
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
};

export default PageState;
