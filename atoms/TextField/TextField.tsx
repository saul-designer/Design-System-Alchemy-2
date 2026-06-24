import React from "react";
import MuiTextField from "@mui/material/TextField";
import type { OutlinedTextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export interface TextFieldProps extends Omit<OutlinedTextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  ({ startAdornment, endAdornment, slotProps, ...props }, ref) => {
    const inputSlotProps: Record<string, unknown> = {
      ...(slotProps?.input as Record<string, unknown> | undefined),
    };

    if (startAdornment) {
      inputSlotProps.startAdornment = (
        <InputAdornment position="start">{startAdornment}</InputAdornment>
      );
    }
    if (endAdornment) {
      inputSlotProps.endAdornment = (
        <InputAdornment position="end">{endAdornment}</InputAdornment>
      );
    }

    return (
      <MuiTextField
        ref={ref}
        variant={props.variant ?? "outlined"}
        slotProps={{
          ...slotProps,
          input: inputSlotProps,
        }}
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";
