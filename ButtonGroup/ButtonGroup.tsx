import React from "react";
import MuiButtonGroup, {
  type ButtonGroupProps as MuiButtonGroupProps,
} from "@mui/material/ButtonGroup";
import MuiButton from "@mui/material/Button";

export interface ButtonGroupItem {
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export interface ButtonGroupProps extends Omit<MuiButtonGroupProps, "children"> {
  buttons: ButtonGroupItem[];
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ buttons, ...props }, ref) => {
    return (
      <MuiButtonGroup ref={ref} {...props}>
        {buttons.map((btn, index) => (
          <MuiButton
            key={index}
            onClick={btn.onClick}
            disabled={btn.disabled}
            startIcon={btn.startIcon}
            endIcon={btn.endIcon}
          >
            {btn.label}
          </MuiButton>
        ))}
      </MuiButtonGroup>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
