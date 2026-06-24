import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { TextField } from "../atoms/TextField";
import type { TextFieldProps } from "../atoms/TextField";

export type ControlledTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "ref"
> & {
  control: Control<T>;
  name: Path<T>;
};

export function ControlledTextField<T extends FieldValues>({
  control,
  name,
  helperText,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  );
}
