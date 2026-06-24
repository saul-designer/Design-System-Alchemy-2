import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { getChartColor } from "./chartColors";
import { getChartThemeColors } from "./chartTheme";

export interface BarConfig {
  dataKey: string;
  label?: string;
  color?: string;
  stackId?: string;
}

export interface AlchemyBarChartProps {
  data: Record<string, unknown>[];
  bars: BarConfig[];
  xAxisKey: string;
  title?: string;
  height?: number;
  horizontal?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  yAxisFormatter?: (value: number) => string;
}

export function AlchemyBarChart({
  data,
  bars,
  xAxisKey,
  title,
  height = 300,
  horizontal = false,
  showGrid = true,
  showLegend = true,
  yAxisFormatter,
}: AlchemyBarChartProps) {
  const theme = useTheme();
  const chartTheme = getChartThemeColors(theme);
  const layout = horizontal ? "vertical" : "horizontal";

  return (
    <div>
      {title && (
        <p
          style={{
            margin: "0 0 12px",
            fontWeight: 500,
            fontSize: "0.875rem",
            color: chartTheme.titleColor,
          }}
        >
          {title}
        </p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
          )}
          {horizontal ? (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: chartTheme.tickFill }}
                axisLine={false}
                tickLine={false}
                tickFormatter={yAxisFormatter}
              />
              <YAxis
                type="category"
                dataKey={xAxisKey}
                tick={{ fontSize: 12, fill: chartTheme.tickFill }}
                axisLine={{ stroke: chartTheme.axisStroke }}
                tickLine={false}
                width={80}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xAxisKey}
                tick={{ fontSize: 12, fill: chartTheme.tickFill }}
                axisLine={{ stroke: chartTheme.axisStroke }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: chartTheme.tickFill }}
                axisLine={false}
                tickLine={false}
                tickFormatter={yAxisFormatter}
              />
            </>
          )}
          <Tooltip contentStyle={chartTheme.tooltipStyle} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.label ?? bar.dataKey}
              fill={bar.color ?? getChartColor(index)}
              radius={[4, 4, 0, 0]}
              stackId={bar.stackId}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
