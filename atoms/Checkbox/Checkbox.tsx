import React from "react";
import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export interface CheckboxProps extends MuiCheckboxProps {
  label?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, labelPlacement = "end", ...props }, ref) => {
    if (label) {
      return (
        <FormControlLabel
          control={<MuiCheckbox ref={ref} {...props} />}
          label={label}
          labelPlacement={labelPlacement}
        />
      );
    }

    return <MuiCheckbox ref={ref} {...props} />;
  }
);

Checkbox.displayName = "Checkbox";
