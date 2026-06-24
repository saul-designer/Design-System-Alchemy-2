import React from "react";
import { Search, X } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import MuiIconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

export interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      defaultValue,
      placeholder = "Search...",
      onChange,
      onClear,
      onSearch,
      disabled,
      fullWidth = true,
      size = "medium",
      sx,
    },
    ref
  ) => {
    const theme = useTheme();
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      onClear?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(currentValue);
      }
    };

    return (
      <OutlinedInput
        inputRef={ref}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        startAdornment={
          <InputAdornment position="start">
            <Search size={20} aria-hidden color={theme.palette.text.secondary} />
          </InputAdornment>
        }
        endAdornment={
          currentValue ? (
            <InputAdornment position="end">
              <MuiIconButton
                size="small"
                onClick={handleClear}
                edge="end"
                aria-label="clear search"
              >
                <X size={18} aria-hidden />
              </MuiIconButton>
            </InputAdornment>
          ) : null
        }
        sx={{
          borderRadius: "100px",
          bgcolor: "action.hover",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
            bgcolor: "transparent",
          },
          ...sx,
        }}
      />
    );
  }
);

SearchBar.displayName = "SearchBar";
