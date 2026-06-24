import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Switch } from "../atoms/Switch";
import type { SwitchProps } from "../atoms/Switch";

export type ControlledSwitchProps<T extends FieldValues> = Omit<
  SwitchProps,
  "name" | "checked" | "onChange" | "onBlur" | "ref"
> & {
  control: Control<T>;
  name: Path<T>;
};

export function ControlledSwitch<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
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
