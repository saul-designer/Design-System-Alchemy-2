import type { Theme, Components } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { borderRadius } from "./shape";
import { transitionsConfig } from "./transitions";

const { shorter } = transitionsConfig.duration;
const { easeInOut } = transitionsConfig.easing;

export const components: Components<Theme> = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        cursor: "pointer",
        "&.Mui-disabled": {
          cursor: "not-allowed",
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      'button:not(:disabled), [type="button"]:not(:disabled), [type="submit"]:not(:disabled), [type="reset"]:not(:disabled)':
        {
          cursor: "pointer",
        },
      'button:disabled, [type="button"]:disabled, [type="submit"]:disabled, [type="reset"]:disabled':
        {
          cursor: "not-allowed",
        },
      'a[href], summary, label[for], select:not(:disabled), input[type="checkbox"], input[type="radio"], input[type="file"]':
        {
          cursor: "pointer",
        },
      '[role="button"]:not([aria-disabled="true"])': {
        cursor: "pointer",
      },
      '[role="button"][aria-disabled="true"]': {
        cursor: "not-allowed",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: borderRadius.xl,
        fontWeight: 400,
        fontSize: "0.9375rem",
        textTransform: "none",
        boxShadow: "none",
        padding: "6px 16px",
        minHeight: 40,
        transition: `background-color ${shorter}ms ${easeInOut}, box-shadow ${shorter}ms ${easeInOut}, border-color ${shorter}ms ${easeInOut}`,
        "&:focus-visible": {
          boxShadow: `0 0 0 4px rgba(1, 117, 253, 0.20)`,
        },
        "&.MuiButton-containedPrimary:hover": {
          boxShadow: "0 4px 12px 0 rgba(1, 117, 253, 0.16)",
        },
        "&.Mui-disabled": {
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.disabledBackground,
        },
      }),
      sizeLarge: {
        padding: "10px 22px",
        fontSize: "1rem",
        minHeight: 48,
      },
      sizeSmall: {
        padding: "4px 10px",
        fontSize: "0.8125rem",
        minHeight: 32,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        transition: `background-color ${shorter}ms ${easeInOut}, box-shadow ${shorter}ms ${easeInOut}`,
        "&:focus-visible": {
          boxShadow: "0 0 0 4px rgba(1, 117, 253, 0.20)",
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: borderRadius.lg,
          minHeight: 48,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: borderRadius.lg,
        minHeight: 48,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, 0.23),
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderWidth: 2,
          borderColor: theme.palette.primary.main,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
        },
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.action.disabledBackground,
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 500,
        color: theme.palette.text.secondary,
        "&.Mui-focused": {
          color: theme.palette.primary.main,
        },
        "&.Mui-error": {
          color: theme.palette.error.main,
        },
        "&.Mui-disabled": {
          color: theme.palette.action.disabled,
        },
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: "0.85rem",
        marginLeft: 0,
        "&.Mui-error": {
          color: theme.palette.error.main,
        },
        "&.Mui-disabled": {
          color: theme.palette.action.disabled,
        },
      }),
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: borderRadius.xl,
        minHeight: 32,
        gap: 8,
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          boxShadow:
            "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          "& .MuiListItemIcon-root": {
            color: theme.palette.common.white,
          },
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        boxShadow: "0px 4px 14px rgba(22, 73, 223, 0.08)",
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 24,
        "&:last-child": {
          paddingBottom: 24,
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        cursor: "pointer",
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        cursor: "pointer",
        "&.Mui-disabled": {
          cursor: "not-allowed",
        },
      },
    },
  },
  MuiNativeSelect: {
    styleOverrides: {
      select: {
        cursor: "pointer",
        "&.Mui-disabled": {
          cursor: "not-allowed",
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
        fontWeight: 500,
        fontSize: "0.8125rem",
        "&.MuiChip-clickable, &.MuiChip-deletable": {
          cursor: "pointer",
        },
      },
      sizeSmall: {
        height: 24,
        fontSize: "0.75rem",
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRight: `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
      rounded: {
        borderRadius: borderRadius.lg,
      },
      elevation1: {
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.04), 0px 1px 4px rgba(0, 0, 0, 0.04)",
      },
      elevation2: {
        boxShadow: "0px 4px 14px rgba(22, 73, 223, 0.08)",
      },
      elevation4: {
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: borderRadius.sm,
        fontSize: "0.75rem",
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        fontSize: "0.875rem",
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiTableCell-root": {
          fontWeight: 600,
          fontSize: "0.875rem",
          color: theme.palette.text.secondary,
          borderBottom: `2px solid ${theme.palette.divider}`,
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.67)}`,
        fontSize: "0.875rem",
      }),
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-selected": {
          backgroundColor: theme.palette.action.selected,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.22 : 0.08
            ),
          },
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.xs,
        height: 6,
      },
    },
  },
  MuiCircularProgress: {
    defaultProps: {
      size: 24,
      thickness: 4,
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontWeight: 600,
        fontSize: "0.6875rem",
      },
    },
  },
};
