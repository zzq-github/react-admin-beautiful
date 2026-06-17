import React from "react";
import { Button, Progress, Space, message } from "antd";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock3,
  Database,
  FileText,
  Gauge,
  Layers,
  Plus,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";

type Tone = "primary" | "success" | "warning" | "error" | "info";

interface MetricCard {
  title: string;
  value: string;
  detail: string;
  change: string;
  trend: "up" | "down";
  tone: Tone;
  icon: LucideIcon;
}

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
}

const toneClasses: Record<Tone, { icon: string; chip: string }> = {
  primary: {
    icon: "bg-theme-primary-bg text-theme-primary",
    chip: "border-theme-primary-border bg-theme-primary-bg text-theme-primary",
  },
  success: {
    icon: "bg-theme-success-bg text-theme-success",
    chip: "border-theme-success-border bg-theme-success-bg text-theme-success",
  },
  warning: {
    icon: "bg-theme-warning-bg text-theme-warning",
    chip: "border-theme-warning-border bg-theme-warning-bg text-theme-warning",
  },
  error: {
    icon: "bg-theme-error-bg text-theme-error",
    chip: "border-theme-error-border bg-theme-error-bg text-theme-error",
  },
  info: {
    icon: "bg-theme-info-bg text-theme-info",
    chip: "border-theme-info-border bg-theme-info-bg text-theme-info",
  },
};

const metricCards: MetricCard[] = [
  {
    title: "用户总数",
    value: "12,893",
    detail: "活跃用户 8,642",
    change: "12.4%",
    trend: "up",
    tone: "primary",
    icon: Users,
  },
  {
    title: "今日订单",
    value: "1,893",
    detail: "支付转化 64%",
    change: "8.2%",
    trend: "up",
    tone: "success",
    icon: Database,
  },
  {
    title: "页面访问",
    value: "93k",
    detail: "平均停留 4m 12s",
    change: "3.1%",
    trend: "down",
    tone: "warning",
    icon: Activity,
  },
  {
    title: "内容发布",
    value: "456",
    detail: "待审核 18",
    change: "25%",
    trend: "up",
    tone: "info",
    icon: FileText,
  },
];

const trendData = [
  { name: "周一", visits: 6200, orders: 820 },
  { name: "周二", visits: 7800, orders: 960 },
  { name: "周三", visits: 7100, orders: 910 },
  { name: "周四", visits: 9400, orders: 1180 },
  { name: "周五", visits: 10800, orders: 1320 },
  { name: "周六", visits: 9900, orders: 1210 },
  { name: "周日", visits: 11600, orders: 1460 },
];

const quickActions: QuickAction[] = [
  {
    title: "新建项目",
    description: "创建业务模块",
    icon: Plus,
    tone: "primary",
  },
  {
    title: "权限配置",
    description: "角色与菜单授权",
    icon: ShieldCheck,
    tone: "success",
  },
  {
    title: "任务中心",
    description: "查看待办事项",
    icon: Clock3,
    tone: "warning",
  },
  {
    title: "发布日志",
    description: "记录版本变更",
    icon: Layers,
    tone: "info",
  },
];

const activityItems = [
  {
    time: "10:30",
    title: "管理员更新了系统配置",
    description: "基础参数和消息通知规则已同步",
    tone: "primary" as Tone,
  },
  {
    time: "09:15",
    title: "运营提交了新内容",
    description: "等待审核队列新增 3 条记录",
    tone: "warning" as Tone,
  },
  {
    time: "昨天",
    title: "系统完成数据备份",
    description: "备份文件已写入对象存储",
    tone: "success" as Tone,
  },
  {
    time: "昨天",
    title: "新增 4 个后台账号",
    description: "权限范围已按部门隔离",
    tone: "info" as Tone,
  },
];

const systemStatus = [
  { label: "API 可用性", value: 99, tone: "success" as Tone },
  { label: "任务队列", value: 76, tone: "primary" as Tone },
  { label: "缓存命中", value: 88, tone: "info" as Tone },
  { label: "存储容量", value: 64, tone: "warning" as Tone },
];

const today = new Intl.DateTimeFormat("zh-CN", {
  weekday: "short",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const getStrokeColor = (tone: Tone) => {
  const map: Record<Tone, string> = {
    primary: "var(--color-primary)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    error: "var(--color-error)",
    info: "var(--color-info)",
  };
  return map[tone];
};

const MetricCardItem: React.FC<MetricCard> = ({
  title,
  value,
  detail,
  change,
  trend,
  tone,
  icon: Icon,
}) => {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendClassName =
    trend === "up"
      ? "bg-theme-success-bg text-theme-success"
      : "bg-theme-error-bg text-theme-error";

  return (
    <PagePanel hoverable bodyClassName="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[tone].icon}`}>
          <Icon size={18} />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${trendClassName}`}
        >
          <TrendIcon size={13} />
          {change}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-sm text-theme-text-secondary">{title}</div>
        <div className="mt-1 text-2xl font-semibold tracking-normal text-theme-text">
          {value}
        </div>
        <div className="mt-2 text-xs text-theme-text-tertiary">{detail}</div>
      </div>
    </PagePanel>
  );
};

const QuickActionCard: React.FC<QuickAction> = ({
  title,
  description,
  icon: Icon,
  tone,
}) => (
  <button
    type="button"
    onClick={() => message.info(`${title} 功能入口`)}
    className="group flex w-full items-center gap-3 rounded-xl border border-theme-border-secondary bg-theme-bg px-3 py-3 text-left transition-all duration-motion-base ease-motion-out hover:-translate-y-0.5 hover:border-theme-primary-border hover:bg-theme-hover focus:outline-none focus:ring-2 focus:ring-theme-primary-bg"
  >
    <span
      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${toneClasses[tone].icon}`}
    >
      <Icon size={18} />
    </span>
    <span className="min-w-0">
      <span className="block truncate text-sm font-medium text-theme-text">
        {title}
      </span>
      <span className="mt-0.5 block truncate text-xs text-theme-text-tertiary">
        {description}
      </span>
    </span>
    <ArrowUpRight
      size={15}
      className="ml-auto flex-shrink-0 text-theme-text-tertiary transition-transform duration-motion-base ease-motion-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-theme-primary"
    />
  </button>
);

const Dashboard: React.FC = () => {
  return (
    <PageContainer
      title="仪表盘"
      subtitle="运营概览、系统状态和最近活动。"
      headerMeta={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-primary-border bg-theme-primary-bg px-2.5 py-1 text-xs font-medium text-theme-primary">
            <Gauge size={13} />
            Workspace
          </span>
          <span className="text-xs text-theme-text-tertiary">{today}</span>
        </>
      }
      action={
        <Space wrap>
          <Button
            icon={<RefreshCw size={14} />}
            onClick={() => message.success("数据已刷新")}
          >
            刷新
          </Button>
          <Button
            type="primary"
            icon={<Plus size={14} />}
            onClick={() => message.info("打开新建项目")}
          >
            新建项目
          </Button>
        </Space>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((item) => (
          <MetricCardItem key={item.title} {...item} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
        <PagePanel
          title="访问趋势"
          description="近 7 天访问量与订单量"
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-success-border bg-theme-success-bg px-2 py-0.5 text-xs font-medium text-theme-success">
              <span className="h-1.5 w-1.5 rounded-full bg-theme-success" />
              Live
            </span>
          }
          bodyClassName="p-0"
        >
          <div className="h-[320px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashboardVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.26} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dashboardOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="var(--color-border-secondary)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                />
                <RechartsTooltip
                  cursor={{ stroke: "var(--color-border)", strokeDasharray: "4 4" }}
                  contentStyle={{
                    background: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border-secondary)",
                    borderRadius: 8,
                    color: "var(--color-text)",
                  }}
                  labelStyle={{ color: "var(--color-text)", fontWeight: 600 }}
                  itemStyle={{ color: "var(--color-text-secondary)" }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  name="访问量"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#dashboardVisits)"
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  name="订单量"
                  stroke="var(--color-success)"
                  strokeWidth={2}
                  fill="url(#dashboardOrders)"
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </PagePanel>

        <PagePanel
          title="系统状态"
          description="核心服务健康度"
          action={<Server size={16} className="text-theme-primary" />}
        >
          <div className="space-y-4">
            {systemStatus.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-theme-text-secondary">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-theme-text">
                    {item.value}%
                  </span>
                </div>
                <Progress
                  percent={item.value}
                  showInfo={false}
                  strokeColor={getStrokeColor(item.tone)}
                  trailColor="var(--color-fill-secondary)"
                />
              </div>
            ))}

            <div className="rounded-xl border border-theme-border-secondary bg-theme-bg px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-success-bg text-theme-success">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-theme-text">
                    所有服务运行正常
                  </div>
                  <div className="mt-0.5 text-xs text-theme-text-tertiary">
                    最近检查 2 分钟前
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PagePanel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <PagePanel title="快捷入口" description="常用管理动作">
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((item) => (
              <QuickActionCard key={item.title} {...item} />
            ))}
          </div>
        </PagePanel>

        <PagePanel
          title="最近活动"
          description="团队与系统事件"
          action={<Bell size={16} className="text-theme-primary" />}
        >
          <div className="space-y-1">
            {activityItems.map((item) => (
              <div
                key={`${item.time}-${item.title}`}
                className="flex gap-3 rounded-xl px-2 py-3 transition-colors duration-motion-base ease-motion-out hover:bg-theme-hover"
              >
                <div className="w-12 flex-shrink-0 pt-0.5 text-xs text-theme-text-tertiary">
                  {item.time}
                </div>
                <div className="relative flex flex-1 gap-3">
                  <span
                    className={`mt-1 flex h-2.5 w-2.5 flex-shrink-0 rounded-full border ${toneClasses[item.tone].chip}`}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-theme-text">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs leading-5 text-theme-text-secondary">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PagePanel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PagePanel title="业务分布" description="本周模块使用量" bodyClassName="p-4">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid
                  stroke="var(--color-border-secondary)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                />
                <RechartsTooltip
                  cursor={{ fill: "var(--color-hover-bg)" }}
                  contentStyle={{
                    background: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border-secondary)",
                    borderRadius: 8,
                    color: "var(--color-text)",
                  }}
                  labelStyle={{ color: "var(--color-text)", fontWeight: 600 }}
                />
                <Bar
                  dataKey="orders"
                  name="业务量"
                  radius={[6, 6, 0, 0]}
                  fill="var(--color-primary)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PagePanel>

        <PagePanel title="效率指数" description="综合处理表现">
          <div className="flex h-full flex-col justify-between gap-5">
            <div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-semibold text-theme-text">
                  86
                </span>
                <span className="pb-1 text-sm text-theme-text-tertiary">
                  / 100
                </span>
              </div>
              <div className="mt-2 text-sm text-theme-text-secondary">
                较上周提升 9.6%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-theme-primary-bg p-3 text-theme-primary">
                <Zap size={18} />
                <div className="mt-3 text-sm font-medium">响应快</div>
              </div>
              <div className="rounded-xl bg-theme-success-bg p-3 text-theme-success">
                <CheckCircle2 size={18} />
                <div className="mt-3 text-sm font-medium">稳定高</div>
              </div>
            </div>
          </div>
        </PagePanel>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
