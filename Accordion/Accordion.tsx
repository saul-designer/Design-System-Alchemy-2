import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ChevronDown } from "lucide-react";
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha, useTheme } from "@mui/material/styles";
import { Checkbox } from "../../atoms/Checkbox";

export interface AccordionProps {
  summary: React.ReactNode;
  details: React.ReactNode;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  /** Renders a checkbox on the left of the summary row. */
  checkable?: boolean;
  /** Controlled checked state of the header checkbox. */
  checked?: boolean;
  /** Initial checked state in uncontrolled mode. */
  defaultChecked?: boolean;
  /** Shows a dash (−) when some but not all children are selected. */
  indeterminate?: boolean;
  /** Fired when the header checkbox is toggled: `(checked: boolean) => void`. */
  onCheckChange?: (checked: boolean) => void;
  sx?: SxProps<Theme>;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      summary,
      details,
      disabled,
      expanded,
      defaultExpanded = false,
      onChange,
      checkable = false,
      checked,
      defaultChecked = false,
      indeterminate = false,
      onCheckChange,
      sx,
    },
    ref
  ) => {
    const theme = useTheme();
    const isControlled = typeof expanded === "boolean";
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
    const isExpanded = isControlled ? expanded : internalExpanded;

    const isCheckedControlled = typeof checked === "boolean";
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = isCheckedControlled ? checked : internalChecked;

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const next = e.target.checked;
      if (!isCheckedControlled) setInternalChecked(next);
      onCheckChange?.(next);
    };
    const isDark = theme.palette.mode === "dark";
    const borderColor = isDark ? theme.palette.divider : theme.customColors.blue[100];
    const baseSx: SxProps<Theme> = {
      overflow: "hidden",
      "&:before": { display: "none" },
      borderRadius: 2,
      border: `1px solid ${borderColor}`,
      backgroundColor: theme.palette.background.paper,
    };
    const composedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ] as SxProps<Theme>;

    const handleChange = (_: React.SyntheticEvent, nextExpanded: boolean) => {
      if (!isControlled) {
        setInternalExpanded(nextExpanded);
      }
      onChange?.(nextExpanded);
    };

    return (
      <MuiAccordion
        ref={ref}
        expanded={isExpanded}
        onChange={handleChange}
        disabled={disabled}
        disableGutters
        elevation={0}
        square={false}
        sx={composedSx}
      >
        <AccordionSummary
          expandIcon={<ChevronDown size={20} aria-hidden />}
          sx={{
            minHeight: 56,
            px: 2,
            backgroundColor: isExpanded
              ? alpha(theme.palette.primary.main, isDark ? 0.12 : 0.04)
              : theme.palette.background.default,
            borderBottom: isExpanded ? "none" : `1px solid ${borderColor}`,
            "&.Mui-expanded": { minHeight: 56 },
            "& .MuiAccordionSummary-content": {
              my: 0,
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 0.5,
            },
            "& .MuiAccordionSummary-content.Mui-expanded": { my: 0 },
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {checkable && (
            <Checkbox
              checked={isChecked}
              indeterminate={indeterminate}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              disabled={disabled}
              size="small"
              sx={{ p: 0.5, mr: 0.5 }}
            />
          )}
          {typeof summary === "string" ? (
            <Typography variant="body1">{summary}</Typography>
          ) : (
            summary
          )}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            p: 3,
            borderTop: "none",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          {details}
        </AccordionDetails>
      </MuiAccordion>
    );
  }
);

Accordion.displayName = "Accordion";
