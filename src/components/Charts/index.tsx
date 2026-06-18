import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartDatum = Record<string, string | number>;

interface ChartSeries {
  dataKey: string;
  name: string;
  color: string;
}

interface BaseChartProps<T extends ChartDatum> {
  data: T[];
  xKey?: string;
  height?: number | string;
}

interface TrendAreaChartProps<T extends ChartDatum> extends BaseChartProps<T> {
  series: ChartSeries[];
}

interface SimpleBarChartProps<T extends ChartDatum> extends BaseChartProps<T> {
  dataKey: string;
  name: string;
  color?: string;
}

const defaultMargin = { top: 8, right: 8, left: -20, bottom: 0 };

const axisTick = {
  fill: "var(--color-text-tertiary)",
  fontSize: 12,
};

const tooltipContentStyle = {
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-border-secondary)",
  borderRadius: 8,
  color: "var(--color-text)",
};

const tooltipLabelStyle = {
  color: "var(--color-text)",
  fontWeight: 600,
};

const ChartShell: React.FC<{
  height: number | string;
  children: React.ReactElement;
}> = ({ height, children }) => (
  <div style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
);

const CommonGrid = () => (
  <CartesianGrid
    stroke="var(--color-border-secondary)"
    strokeDasharray="3 3"
    vertical={false}
  />
);

const CommonXAxis = ({ dataKey }: { dataKey: string }) => (
  <XAxis
    dataKey={dataKey}
    axisLine={false}
    tickLine={false}
    tick={axisTick}
  />
);

const CommonYAxis = () => (
  <YAxis axisLine={false} tickLine={false} tick={axisTick} />
);

export function TrendAreaChart<T extends ChartDatum>({
  data,
  series,
  xKey = "name",
  height = "100%",
}: TrendAreaChartProps<T>) {
  return (
    <ChartShell height={height}>
      <AreaChart data={data} margin={defaultMargin}>
        <defs>
          {series.map((item) => (
            <linearGradient
              key={item.dataKey}
              id={`chart-${item.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={item.color} stopOpacity={0.24} />
              <stop offset="95%" stopColor={item.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CommonGrid />
        <CommonXAxis dataKey={xKey} />
        <CommonYAxis />
        <Tooltip
          cursor={{ stroke: "var(--color-border)", strokeDasharray: "4 4" }}
          contentStyle={tooltipContentStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={{ color: "var(--color-text-secondary)" }}
        />
        {series.map((item) => (
          <Area
            key={item.dataKey}
            type="monotone"
            dataKey={item.dataKey}
            name={item.name}
            stroke={item.color}
            strokeWidth={2}
            fill={`url(#chart-${item.dataKey})`}
            activeDot={{ r: 4 }}
          />
        ))}
      </AreaChart>
    </ChartShell>
  );
}

export function SimpleBarChart<T extends ChartDatum>({
  data,
  dataKey,
  name,
  xKey = "name",
  color = "var(--color-primary)",
  height = "100%",
}: SimpleBarChartProps<T>) {
  return (
    <ChartShell height={height}>
      <BarChart data={data} margin={defaultMargin}>
        <CommonGrid />
        <CommonXAxis dataKey={xKey} />
        <CommonYAxis />
        <Tooltip
          cursor={{ fill: "var(--color-hover-bg)" }}
          contentStyle={tooltipContentStyle}
          labelStyle={tooltipLabelStyle}
        />
        <Bar dataKey={dataKey} name={name} radius={[6, 6, 0, 0]} fill={color} />
      </BarChart>
    </ChartShell>
  );
}
