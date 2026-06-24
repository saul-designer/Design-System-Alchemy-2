import React from "react";
import MuiAutocomplete, {
  type AutocompleteProps as MuiAutocompleteProps,
  type AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export interface AutocompleteProps<T> extends Omit<
  MuiAutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  "renderInput"
> {
  label?: string;
  inputAriaLabel?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

export function Autocomplete<T = string>({
  label,
  inputAriaLabel,
  placeholder,
  error,
  helperText,
  size,
  multiple,
  defaultValue,
  ...props
}: Readonly<AutocompleteProps<T>>) {
  const resolvedDefaultValue =
    defaultValue === undefined && multiple
      ? ([] as unknown as typeof defaultValue)
      : defaultValue;
  const accessibleName = label ?? inputAriaLabel ?? placeholder ?? "Select option";

  return (
    <MuiAutocomplete
      size={size}
      multiple={multiple}
      defaultValue={resolvedDefaultValue}
      {...props}
      renderInput={(params: AutocompleteRenderInputParams) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = params as any;
        // MUI ≥ v9 moves InputProps/inputProps/InputLabelProps into params.slotProps;
        // earlier versions keep them as top-level legacy keys. Support both so the ref
        // is always forwarded and legacy keys are not leaked to the DOM.
        const {
          InputLabelProps: pInputLabelProps,
          InputProps: pInputProps,
          inputProps: pHtmlInputProps,
          slotProps: pSlotProps,
          ...restParams
        } = p;
        const inputLabelSlot = pInputLabelProps ?? pSlotProps?.inputLabel;
        const inputSlot = pInputProps ?? pSlotProps?.input;
        const htmlInputSlot = pHtmlInputProps ?? pSlotProps?.htmlInput;

        return (
          <TextField
            {...restParams}
            label={label}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            size={size}
            slotProps={{
              inputLabel: inputLabelSlot,
              input: inputSlot,
              htmlInput: {
                ...htmlInputSlot,
                ...(label ? {} : { "aria-label": accessibleName }),
              },
            }}
          />
        );
      }}
    />
  );
}
