import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { alpha, useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { borderRadius } from "../../theme/shape";

const MIN_LENGTH = 1;
const MAX_LENGTH = 8;
const DEFAULT_LENGTH = 6;

export type VerificationCodeType = "numeric" | "alphanumeric";

export interface VerificationCodeInputProps {
  /** Number of code slots (1–8). Default: 6 */
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fires when every slot is filled */
  onComplete?: (value: string) => void;
  type?: VerificationCodeType;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  autoFocus?: boolean;
  /** Masks each digit (useful for PIN-style codes) */
  mask?: boolean;
  size?: "small" | "medium";
  name?: string;
  id?: string;
  sx?: SxProps<Theme>;
}

function clampLength(length: number): number {
  return Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, length));
}

function normalizeValue(
  value: string,
  length: number,
  type: VerificationCodeType
): string {
  const pattern = type === "numeric" ? /\d/g : /[a-zA-Z0-9]/g;
  return (value.match(pattern) ?? []).join("").slice(0, length);
}

function isValidChar(char: string, type: VerificationCodeType): boolean {
  return type === "numeric" ? /^\d$/.test(char) : /^[a-zA-Z0-9]$/.test(char);
}

function valueToSlots(value: string, length: number): string[] {
  const slots = value.split("").slice(0, length);
  while (slots.length < length) {
    slots.push("");
  }
  return slots;
}

function getSlotDimensions(length: number, size: "small" | "medium") {
  if (size === "small") {
    if (length <= 4) return { width: 44, height: 48, fontSize: "1.25rem" };
    if (length <= 6) return { width: 40, height: 44, fontSize: "1.125rem" };
    return { width: 36, height: 40, fontSize: "1rem" };
  }

  if (length <= 4) return { width: 56, height: 64, fontSize: "1.5rem" };
  if (length <= 6) return { width: 48, height: 56, fontSize: "1.375rem" };
  return { width: 40, height: 48, fontSize: "1.125rem" };
}

export const VerificationCodeInput = React.forwardRef<
  HTMLDivElement,
  VerificationCodeInputProps
>(
  (
    {
      length: lengthProp = DEFAULT_LENGTH,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      type = "numeric",
      disabled = false,
      error = false,
      helperText,
      label,
      autoFocus = false,
      mask = false,
      size = "medium",
      name,
      id,
      sx,
    },
    ref
  ) => {
    const theme = useTheme();
    const length = clampLength(lengthProp);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(() =>
      normalizeValue(defaultValue, length, type)
    );
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

    const currentValue = isControlled
      ? normalizeValue(value, length, type)
      : internalValue;
    const slots = valueToSlots(currentValue, length);
    const dimensions = getSlotDimensions(length, size);
    const generatedId = React.useId();
    const groupId = id ?? generatedId;

    const updateValue = React.useCallback(
      (nextRaw: string) => {
        const next = normalizeValue(nextRaw, length, type);
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
        if (next.length === length) {
          onComplete?.(next);
        }
        return next;
      },
      [isControlled, length, onChange, onComplete, type]
    );

    const focusSlot = (index: number) => {
      const clamped = Math.max(0, Math.min(length - 1, index));
      inputRefs.current[clamped]?.focus();
    };

    const applyCharsFromIndex = (startIndex: number, chars: string[]) => {
      const nextSlots = [...slots];
      let cursor = startIndex;

      for (const char of chars) {
        if (cursor >= length) break;
        if (!isValidChar(char, type)) continue;
        nextSlots[cursor] = char;
        cursor += 1;
      }

      const next = updateValue(nextSlots.join(""));
      focusSlot(Math.min(cursor, length - 1));
      return next;
    };

    const handleChange = (index: number, raw: string) => {
      const chars = raw.split("").filter((char) => isValidChar(char, type));

      if (chars.length > 1) {
        applyCharsFromIndex(index, chars);
        return;
      }

      const nextChar = chars[0] ?? "";
      if (nextChar === slots[index]) return;

      const nextSlots = [...slots];
      nextSlots[index] = nextChar;
      updateValue(nextSlots.join(""));

      if (chars[0] && index < length - 1) {
        focusSlot(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (slots[index]) return;
        if (index > 0) {
          e.preventDefault();
          const nextSlots = [...slots];
          nextSlots[index - 1] = "";
          updateValue(nextSlots.join(""));
          focusSlot(index - 1);
        }
        return;
      }

      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusSlot(index - 1);
        return;
      }

      if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusSlot(index + 1);
      }
    };

    const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text");
      applyCharsFromIndex(index, pasted.split(""));
    };

    const slotSx = (index: number) => {
      const isFocused = focusedIndex === index;
      const borderColor = error
        ? theme.palette.error.main
        : isFocused
          ? theme.palette.primary.main
          : alpha(theme.palette.text.primary, 0.23);

      return {
        width: dimensions.width,
        height: dimensions.height,
        flex: "0 0 auto",
        textAlign: "center" as const,
        fontSize: dimensions.fontSize,
        fontWeight: 500,
        fontFamily: theme.typography.fontFamily,
        borderRadius: `${borderRadius.sm}px`,
        border: "1px solid",
        borderColor,
        borderWidth: isFocused && !error ? 2 : 1,
        outline: "none",
        caretColor: theme.palette.primary.main,
        color: alpha(theme.palette.text.primary, 0.92),
        bgcolor: disabled ? alpha(theme.palette.text.primary, 0.04) : "background.paper",
        transition: theme.transitions.create(
          ["border-color", "box-shadow", "background-color"],
          {
            duration: theme.transitions.duration.shorter,
          }
        ),
        "&:focus": {
          borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
          borderWidth: 2,
          boxShadow: error
            ? `0 0 0 4px ${alpha(theme.palette.error.main, 0.12)}`
            : `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
        "&:disabled": {
          color: alpha(theme.palette.text.primary, 0.38),
          WebkitTextFillColor: alpha(theme.palette.text.primary, 0.38),
          cursor: "not-allowed",
        },
      };
    };

    return (
      <FormControl ref={ref} error={error} disabled={disabled} sx={sx}>
        {label && (
          <FormLabel
            id={`${groupId}-label`}
            sx={{
              mb: 1,
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
        <Box
          role="group"
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-label={label ? undefined : "Verification code"}
          sx={{
            display: "flex",
            gap: size === "small" ? 0.75 : 1,
            justifyContent: "flex-start",
            flexWrap: "nowrap",
          }}
        >
          {slots.map((digit, index) => (
            <Box
              key={`${groupId}-slot-${index}`}
              component="input"
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
                handlePaste(index, e)
              }
              onFocus={() => setFocusedIndex(index)}
              onBlur={() =>
                setFocusedIndex((current) => (current === index ? null : current))
              }
              maxLength={index === 0 ? length : 1}
              type={mask ? "password" : "text"}
              inputMode={type === "numeric" ? "numeric" : "text"}
              pattern={type === "numeric" ? "[0-9]*" : undefined}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              autoFocus={autoFocus && index === 0}
              disabled={disabled}
              name={index === 0 ? name : undefined}
              aria-label={`Character ${index + 1} of ${length}`}
              sx={slotSx(index)}
            />
          ))}
        </Box>
        {helperText && (
          <FormHelperText error={error} sx={{ mt: 1 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

VerificationCodeInput.displayName = "VerificationCodeInput";
