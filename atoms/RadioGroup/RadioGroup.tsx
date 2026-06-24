import React from "react";
import MuiRadio, { type RadioProps as MuiRadioProps } from "@mui/material/Radio";
import MuiRadioGroup, {
  type RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<MuiRadioGroupProps, "children"> {
  label?: string;
  options: RadioOption[];
  size?: "small" | "medium" | "large";
  radioProps?: MuiRadioProps;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, options, size, radioProps, ...props }, ref) => {
    const radioSize = size === "large" ? "medium" : size;
    const effectiveRadioProps: MuiRadioProps =
      radioSize !== undefined ? { size: radioSize, ...radioProps } : { ...radioProps };
    return (
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <MuiRadioGroup ref={ref} {...props}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={option.disabled}
              control={<MuiRadio {...effectiveRadioProps} />}
            />
          ))}
        </MuiRadioGroup>
      </FormControl>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
