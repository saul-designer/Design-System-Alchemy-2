import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import MuiAutocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import MuiTextField from "@mui/material/TextField";
import { Square, SquareCheck } from "lucide-react";
import {
  Box,
  Chip,
  List,
  ListItem,
  Popover,
  Tooltip,
  alpha,
  useTheme,
  type SxProps,
  type Theme,
  type InputLabelProps,
} from "@mui/material";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

// ─── Styles ───────────────────────────────────────────────────────────────────

function getAutocompleteSx(theme: Theme): SxProps<Theme> {
  return {
    "& .MuiAutocomplete-inputRoot": {
      alignItems: "center",
      flexWrap: "nowrap",
      overflow: "hidden",
    },
    "& .MuiAutocomplete-tag": { maxHeight: 24 },
    "& .MuiOutlinedInput-root": {
      minHeight: "48px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(theme.palette.text.primary, 0.23),
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(theme.palette.text.primary, 0.23),
      },
    },
  };
}

function getTextFieldSx(theme: Theme) {
  return {
    color: "text.disabled",
    "& .MuiInputLabel-root": {
      color: theme.palette.text.disabled,
      fontWeight: 400,
      "&.MuiInputLabel-outlined": { transform: "translate(14px, 12.5px) scale(1)" },
      "&.MuiInputLabel-outlined.MuiInputLabel-sizeSmall": {
        transform: "translate(14px, 8.5px) scale(1)",
      },
      "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)",
      },
      "&.Mui-focused": { color: theme.palette.text.disabled },
    },
    "& .MuiOutlinedInput-root": { minHeight: "48px" },
    "& .MuiOutlinedInput-input": { paddingTop: "12.5px", paddingBottom: "12.5px" },
    "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": { minHeight: "40px" },
    "& .MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": {
      paddingTop: "8.5px",
      paddingBottom: "8.5px",
    },
  } satisfies SxProps<Theme>;
}

const checkboxSx: SxProps<Theme> = { mr: 1 };
const popoverPaperSx: SxProps<Theme> = {
  maxHeight: 320,
  overflowY: "auto",
  p: 1,
  borderRadius: "10px",
};
const listItemSx: SxProps<Theme> = { py: 0.5, fontSize: "14px" };
const getChipSx = (maxWidth: number): SxProps<Theme> => ({
  maxWidth,
  "& .MuiChip-label": {
    display: "block",
    maxWidth: maxWidth - 24,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});
const getMoreChipSx = (maxWidth: number): SxProps<Theme> => ({
  cursor: "default",
  maxWidth,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filter = createFilterOptions<any>();

const stableId = (v: string) =>
  v
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "field";

let _seq = 0;
const uniqueKey = (base: string) => `${base}-${++_seq}`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ControlledAutocompleteProps<T, TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  data: ReadonlyArray<T>;
  label: string;
  placeholder?: string;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  InputLabelProps?: InputLabelProps;
  chipMaxWidth?: number;
  disabled?: boolean;
  /** Appends a counter suffix to each React key — use when option values may repeat. */
  enableUniqueKeys?: boolean;
  noOptionsText?: React.ReactNode;
  freeSolo?: boolean;
  /** Called with the typed input when freeSolo triggers a new-item action. */
  onOpenModal?: (inputValue: string) => void;
  hideCheckbox?: boolean;
  singleSelect?: boolean;
  onClick?: () => void;
  error?: boolean;
  helperText?: React.ReactNode;
  onBlur?: () => void;
  size?: "small" | "medium";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ControlledAutocomplete<T, TFieldValues extends FieldValues>({
  name,
  control,
  data,
  label,
  placeholder,
  getOptionLabel,
  getOptionValue,
  InputLabelProps: inputLabelProps,
  chipMaxWidth = 120,
  disabled = false,
  enableUniqueKeys = false,
  noOptionsText = "No Options",
  freeSolo = false,
  onOpenModal,
  hideCheckbox = false,
  singleSelect = false,
  onClick,
  error: externalError,
  helperText: externalHelperText,
  onBlur: externalOnBlur,
  size = "medium",
}: ControlledAutocompleteProps<T, TFieldValues>) {
  const theme = useTheme();
  const instanceId = useId().replace(/:/g, "");
  const autocompleteId = `autocomplete-${stableId(String(name))}-${instanceId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    field: { onChange, value, onBlur: rhfOnBlur },
    fieldState: { error },
  } = useController({ name, control });

  const shouldShowCheckbox = !singleSelect && !hideCheckbox;

  const getSelectedItems = (): T | T[] | null => {
    if (singleSelect) {
      return data.find((item) => getOptionValue(item) === value) ?? null;
    }
    const ids = (value || []) as (string | number)[];
    return (data as T[]).filter((item) => ids.includes(getOptionValue(item)));
  };

  const selectedValue = getSelectedItems();

  const [visibleCount, setVisibleCount] = useState(1);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreAnchor, setMoreAnchor] = useState<HTMLElement | null>(null);
  const [moreItems, setMoreItems] = useState<T[]>([]);
  const hoverAreaRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const lastSanitizeRef = useRef<string | null>(null);

  const openPopover = (anchor: HTMLElement, items: T[]) => {
    setMoreItems(items);
    setMoreAnchor(anchor);
    setMoreOpen(true);
  };

  const closePopover = () => {
    setMoreOpen(false);
    setMoreAnchor(null);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, items: T[]) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    hoverAreaRef.current = true;
    openPopover(e.currentTarget, items);
  };

  const handleMouseLeave = () => {
    hoverAreaRef.current = false;
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {}, 250);
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    },
    []
  );

  // Remove stale ids from the form value when data changes
  useEffect(() => {
    if (singleSelect) return;
    const currentValue = value || [];
    if (!Array.isArray(currentValue)) return;

    const currentIds = currentValue as (string | number)[];
    const validIds = new Set(data.map(getOptionValue));
    const cleanIds = currentIds.filter((id) => validIds.has(id));

    const hasChanges =
      cleanIds.length !== currentIds.length ||
      cleanIds.some((id, i) => id !== currentIds[i]);
    if (!hasChanges) {
      lastSanitizeRef.current = null;
      return;
    }

    const sig = `${JSON.stringify(currentIds)}=>${JSON.stringify(cleanIds)}`;
    if (lastSanitizeRef.current === sig) return;
    lastSanitizeRef.current = sig;
    onChange(cleanIds);
  }, [value, data, getOptionValue, onChange, singleSelect]);

  useEffect(() => {
    if (singleSelect) lastSanitizeRef.current = null;
  }, [singleSelect]);

  const selectedCount = singleSelect ? 0 : (selectedValue as T[]).length;

  useLayoutEffect(() => {
    if (singleSelect) return;
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const available = el.clientWidth - 72;
      const chipWidth = chipMaxWidth + 8;
      const max = Math.floor(available / chipWidth);
      setVisibleCount(Math.max(1, isFinite(max) ? max : 1));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [chipMaxWidth, selectedCount, singleSelect]);

  const icon = <Square size={16} aria-hidden />;
  const checkedIcon = <SquareCheck size={16} aria-hidden />;
  const genKey = (option: T, base: string) => (enableUniqueKeys ? uniqueKey(base) : base);

  return (
    <Box>
      <Box ref={containerRef} onClick={onClick}>
        <MuiAutocomplete
          id={autocompleteId}
          multiple={!singleSelect}
          options={data as T[]}
          disableCloseOnSelect={!singleSelect}
          onBlur={() => {
            rhfOnBlur();
            externalOnBlur?.();
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getOptionLabel={(option: any) => {
            if (typeof option === "string") return option;
            if (option?.inputValue) return option.inputValue;
            return getOptionLabel(option as T);
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value={selectedValue as any}
          disabled={disabled}
          freeSolo={freeSolo}
          noOptionsText={freeSolo ? null : noOptionsText}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (freeSolo && params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
                isNewOption: true,
              });
            }
            return filtered;
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(_e, newValue: any) => {
            const target = singleSelect ? newValue : newValue[newValue.length - 1];
            if (
              freeSolo &&
              target &&
              (typeof target === "string" || target?.inputValue)
            ) {
              onOpenModal?.(typeof target === "string" ? target : target.inputValue);
              return;
            }
            if (singleSelect) {
              onChange(newValue ? getOptionValue(newValue as T) : null);
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const ids = (newValue as any[])
                .map((item) => {
                  if (typeof item === "string" || item?.inputValue) return null;
                  return getOptionValue(item as T);
                })
                .filter(Boolean) as (string | number)[];
              onChange(ids);
            }
          }}
          isOptionEqualToValue={(option, v) =>
            getOptionValue(option as T) === getOptionValue(v as T)
          }
          renderOption={(props, option, { selected }) => {
            const { key, ...rest } = props;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((option as any)?.isNewOption) {
              return (
                <li key="add-new-option" {...rest}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {`Add "${(option as any).inputValue}"`}
                </li>
              );
            }
            const baseKey = String(key ?? getOptionValue(option as T));
            const finalKey = genKey(option as T, baseKey);
            return (
              <li key={finalKey} {...rest}>
                {shouldShowCheckbox && (
                  <Checkbox
                    sx={checkboxSx}
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                )}
                {getOptionLabel(option as T)}
              </li>
            );
          }}
          renderValue={
            singleSelect
              ? undefined
              : (tagValue, getCustomizedItemProps) => {
                  const items = tagValue as T[];
                  if (items.length === 0) return null;
                  const count = Math.max(1, visibleCount);
                  const visible = items.slice(0, count);
                  const extra = items.length - visible.length;
                  return [
                    ...visible.map((option, index) => {
                      const { key: _chipKey, ...chipProps } = getCustomizedItemProps({
                        index,
                      }) as {
                        key: number;
                        className: string;
                        disabled: boolean;
                        "data-item-index": number;
                        tabIndex: -1;
                        onDelete: (event: React.SyntheticEvent) => void;
                      };
                      const lbl = getOptionLabel(option as T);
                      const finalKey = genKey(
                        option as T,
                        String(getOptionValue(option as T))
                      );
                      return (
                        <Tooltip key={finalKey} title={lbl} arrow enterDelay={300}>
                          <span>
                            <Chip
                              {...chipProps}
                              label={lbl}
                              size="small"
                              sx={getChipSx(chipMaxWidth)}
                            />
                          </span>
                        </Tooltip>
                      );
                    }),
                    extra > 0 ? (
                      <Box
                        key="more-wrapper"
                        onMouseEnter={(e) => handleMouseEnter(e, items.slice(count))}
                        onMouseLeave={handleMouseLeave}
                        sx={{ display: "inline-flex" }}
                      >
                        <Chip
                          label={`+${extra} more`}
                          size="small"
                          disabled={disabled}
                          sx={getMoreChipSx(chipMaxWidth)}
                        />
                      </Box>
                    ) : null,
                  ];
                }
          }
          renderInput={(params) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const p = params as any;
            // Separate slot-related keys from the base params (id, disabled, fullWidth, size).
            // MUI ≥ v9 moves InputProps/inputProps/InputLabelProps into params.slotProps;
            // earlier versions keep them as top-level legacy keys. Support both so the ref
            // is always forwarded.
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
              <MuiTextField
                {...restParams}
                label={label}
                size={size}
                placeholder={
                  disabled
                    ? undefined
                    : (singleSelect && selectedValue) ||
                        (!singleSelect && (selectedValue as T[]).length > 0)
                      ? undefined
                      : placeholder
                }
                error={externalError !== undefined ? externalError : !!error}
                helperText={
                  externalHelperText !== undefined
                    ? externalHelperText
                    : (error?.message ?? " ")
                }
                slotProps={{
                  inputLabel: { ...inputLabelSlot, ...inputLabelProps },
                  input: inputSlot,
                  htmlInput: htmlInputSlot,
                }}
                disabled={disabled}
                sx={getTextFieldSx(theme)}
              />
            );
          }}
          sx={getAutocompleteSx(theme)}
        />
      </Box>

      {!singleSelect && (
        <Popover
          open={moreOpen}
          anchorEl={moreAnchor}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          onClose={closePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{ paper: { sx: popoverPaperSx } }}
        >
          <List dense sx={{ minWidth: 240 }}>
            {moreItems.map((item) => (
              <ListItem key={String(getOptionValue(item))} sx={listItemSx}>
                {getOptionLabel(item)}
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </Box>
  );
}
