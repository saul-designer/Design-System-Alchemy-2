import React from "react";
import MuiLinearProgress from "@mui/material/LinearProgress";
import MuiCircularProgress from "@mui/material/CircularProgress";
import type { SxProps, Theme } from "@mui/material/styles";

export type ProgressType = "linear" | "circular";
export type ProgressVariant = "determinate" | "indeterminate" | "buffer" | "query";
export type ProgressColor =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "inherit";

export interface ProgressProps {
  type?: ProgressType;
  variant?: ProgressVariant;
  value?: number;
  color?: ProgressColor;
  size?: number | string;
  thickness?: number;
  sx?: SxProps<Theme>;
}

export const Progress = React.forwardRef<HTMLElement, ProgressProps>(
  (
    {
      type = "linear",
      variant = "indeterminate",
      value,
      color = "primary",
      size,
      thickness,
      sx,
    },
    ref
  ) => {
    if (type === "circular") {
      const circularVariant =
        variant === "buffer" || variant === "query" ? "indeterminate" : variant;
      return (
        <MuiCircularProgress
          ref={ref as React.Ref<HTMLSpanElement>}
          variant={circularVariant}
          value={value}
          color={color}
          size={size}
          thickness={thickness}
          sx={sx}
        />
      );
    }

    return (
      <MuiLinearProgress
        ref={ref as React.Ref<HTMLDivElement>}
        variant={variant}
        value={value}
        color={color}
        sx={sx}
      />
    );
  }
);

Progress.displayName = "Progress";
