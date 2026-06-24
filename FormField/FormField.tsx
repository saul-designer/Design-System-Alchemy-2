import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField, type TextFieldProps } from "../../atoms/TextField";

export interface FormFieldProps extends TextFieldProps {
  label?: string;
  hint?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, hint, required, error, helperText, fullWidth = true, ...props }, ref) => {
    return (
      <FormControl fullWidth={fullWidth} error={error}>
        {label && (
          <FormLabel
            required={required}
            sx={{
              mb: 0.75,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "text.primary",
              "&.Mui-focused": { color: "text.primary" },
              "&.Mui-error": { color: "error.main" },
            }}
          >
            {label}
          </FormLabel>
        )}
        <TextField
          ref={ref}
          required={required}
          error={error}
          fullWidth={fullWidth}
          {...props}
        />
        {(helperText || hint) && (
          <FormHelperText error={error} sx={{ mt: 0.5 }}>
            {helperText ?? hint}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

FormField.displayName = "FormField";
