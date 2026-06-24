import React from "react";
import {
  AreaChart,
  Area,
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

export interface AreaConfig {
  dataKey: string;
  label?: string;
  color?: string;
  stacked?: boolean;
}

export interface AlchemyAreaChartProps {
  data: Record<string, unknown>[];
  areas: AreaConfig[];
  xAxisKey: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  yAxisFormatter?: (value: number) => string;
}

export function AlchemyAreaChart({
  data,
  areas,
  xAxisKey,
  title,
  height = 300,
  showGrid = true,
  showLegend = true,
  yAxisFormatter,
}: AlchemyAreaChartProps) {
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
        <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <defs>
            {areas.map((area, index) => {
              const color = area.color ?? getChartColor(index);
              return (
                <linearGradient
                  key={area.dataKey}
                  id={`gradient-${area.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
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
          {areas.map((area, index) => {
            const color = area.color ?? getChartColor(index);
            return (
              <Area
                key={area.dataKey}
                type="monotone"
                dataKey={area.dataKey}
                name={area.label ?? area.dataKey}
                stroke={color}
                fill={`url(#gradient-${area.dataKey})`}
                stackId={area.stacked ? "stack" : undefined}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
