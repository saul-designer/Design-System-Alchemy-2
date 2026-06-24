import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { RadioGroup } from "../atoms/RadioGroup";
import type { RadioGroupProps } from "../atoms/RadioGroup";

export type ControlledRadioGroupProps<T extends FieldValues> = Omit<
  RadioGroupProps,
  "name" | "value" | "onChange" | "onBlur" | "ref"
> & {
  control: Control<T>;
  name: Path<T>;
};

export function ControlledRadioGroup<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledRadioGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          {...props}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
        />
      )}
    />
  );
}
