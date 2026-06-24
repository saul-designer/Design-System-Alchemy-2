import { alpha, type Theme } from "@mui/material/styles";

export function getChartThemeColors(theme: Theme) {
  return {
    gridStroke: alpha(theme.palette.divider, 0.67),
    axisStroke: theme.palette.divider,
    tickFill: theme.palette.text.secondary,
    tooltipStyle: {
      borderRadius: 8,
      border: `1px solid ${theme.palette.divider}`,
      fontSize: 12,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    titleColor: theme.palette.text.primary,
  };
}
