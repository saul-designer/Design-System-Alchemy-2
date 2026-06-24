import React from "react";
import MuiTooltip, { type TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";

export type TooltipProps = MuiTooltipProps;

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  return <MuiTooltip ref={ref} {...props} />;
});

Tooltip.displayName = "Tooltip";
