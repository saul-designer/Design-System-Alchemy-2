import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../atoms/Checkbox";
import type { CheckboxProps } from "../atoms/Checkbox";

export type ControlledCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  "name" | "checked" | "onChange" | "onBlur" | "ref"
> & {
  control: Control<T>;
  name: Path<T>;
};

export function ControlledCheckbox<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          {...props}
          checked={!!field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
        />
      )}
    />
  );
}
