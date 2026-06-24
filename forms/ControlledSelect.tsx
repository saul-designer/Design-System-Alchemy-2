import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Select } from "../atoms/Select";
import type { SelectProps, SelectOption } from "../atoms/Select";

export type ControlledSelectProps<T extends FieldValues> = Omit<
  SelectProps,
  "name" | "value" | "onChange" | "onBlur" | "ref"
> & {
  control: Control<T>;
  name: Path<T>;
  options: SelectOption[];
};

export function ControlledSelect<T extends FieldValues>({
  control,
  name,
  helperText,
  ...props
}: ControlledSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          {...props}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  );
}
