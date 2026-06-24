import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material/styles";
import { getChartColor } from "./chartColors";
import { getChartThemeColors } from "./chartTheme";

export interface PieDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface AlchemyPieChartProps {
  data: PieDataItem[];
  title?: string;
  height?: number;
  donut?: boolean;
  showLegend?: boolean;
  tooltipFormatter?: (value: number, name: string) => string;
}

export function AlchemyPieChart({
  data,
  title,
  height = 300,
  donut = false,
  showLegend = true,
  tooltipFormatter,
}: AlchemyPieChartProps) {
  const theme = useTheme();
  const chartTheme = getChartThemeColors(theme);
  const innerRadius = donut ? "55%" : 0;

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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="70%"
            paddingAngle={donut ? 3 : 0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color ?? getChartColor(index)} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={chartTheme.tooltipStyle}
            formatter={
              /* v8 ignore next 3 */
              tooltipFormatter
                ? (value, name) => [
                    tooltipFormatter(value as number, name as string),
                    name,
                  ]
                : undefined
            }
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
