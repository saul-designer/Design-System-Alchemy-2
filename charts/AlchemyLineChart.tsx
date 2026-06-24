import React from "react";
import {
  LineChart,
  Line,
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

export interface LineConfig {
  dataKey: string;
  label?: string;
  color?: string;
  dashed?: boolean;
}

export interface AlchemyLineChartProps {
  data: Record<string, unknown>[];
  lines: LineConfig[];
  xAxisKey: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  yAxisFormatter?: (value: number) => string;
}

export function AlchemyLineChart({
  data,
  lines,
  xAxisKey,
  title,
  height = 300,
  showGrid = true,
  showLegend = true,
  yAxisFormatter,
}: AlchemyLineChartProps) {
  const theme = useTheme();
  const chartTheme = getChartThemeColors(theme);

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
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
          )}
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
          <Tooltip contentStyle={chartTheme.tooltipStyle} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.label ?? line.dataKey}
              stroke={line.color ?? getChartColor(index)}
              strokeWidth={2}
              strokeDasharray={line.dashed ? "5 5" : undefined}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
