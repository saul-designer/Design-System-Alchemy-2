export const chartColors = [
  "#1F5FF2",
  "#00A8C0",
  "#4CAF50",
  "#EF6C00",
  "#D32F2F",
  "#9C27B0",
  "#FF9800",
  "#00BCD4",
  "#795548",
  "#607D8B",
] as const;

export function getChartColor(index: number): string {
  return chartColors[index % chartColors.length];
}
