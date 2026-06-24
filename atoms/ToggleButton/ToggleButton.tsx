import React from "react";
import MuiToggleButton, {
  type ToggleButtonProps as MuiToggleButtonProps,
} from "@mui/material/ToggleButton";
import MuiToggleButtonGroup, {
  type ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";

export type ToggleButtonProps = MuiToggleButtonProps;
export type ToggleButtonGroupProps = MuiToggleButtonGroupProps;

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (props, ref) => {
    return <MuiToggleButton ref={ref} {...props} />;
  }
);
ToggleButton.displayName = "ToggleButton";

export const ToggleButtonGroup = React.forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
  (props, ref) => {
    return <MuiToggleButtonGroup ref={ref} {...props} />;
  }
);
ToggleButtonGroup.displayName = "ToggleButtonGroup";
