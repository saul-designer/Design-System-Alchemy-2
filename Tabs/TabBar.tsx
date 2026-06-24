import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import MuiTabs, { type TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha, useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { borderRadius } from "../../theme/shape";

export interface TabBarItem {
  id: string;
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
}

type TabBarPaletteColor = "primary" | "secondary";

interface TabBarThemeColors {
  dark: string;
  hoverBg: string;
  main: string;
  selectedHoverBg: string;
  softBg: string;
}

export interface TabBarProps extends Omit<
  MuiTabsProps,
  "children" | "onChange" | "value" | "variant"
> {
  items: TabBarItem[];
  value: string;
  onChange: (id: string) => void;
  /** Visual style for navigation-only tab bars. */
  styleVariant?: "icon-grid" | "underline";
  /** Palette color used for active, hover, and indicator states. */
  color?: TabBarPaletteColor;
  /** Accessible name for the tab list. */
  "aria-label"?: string;
  sx?: SxProps<Theme>;
}

function resolveActiveIndex(items: TabBarItem[], value: string): number {
  const index = items.findIndex((item) => item.id === value);
  return index >= 0 ? index : 0;
}

function getTabBarThemeColors(
  theme: Theme,
  color: TabBarPaletteColor
): TabBarThemeColors {
  const paletteColor = theme.palette[color];
  const isDark = theme.palette.mode === "dark";

  return {
    main: paletteColor.main,
    dark: paletteColor.dark ?? paletteColor.main,
    softBg: alpha(paletteColor.main, isDark ? 0.12 : 0.06),
    hoverBg: alpha(paletteColor.main, isDark ? 0.16 : 0.1),
    selectedHoverBg: alpha(paletteColor.main, isDark ? 0.22 : 0.14),
  };
}

function buildIconGridSx(colors: TabBarThemeColors, theme: Theme): SxProps<Theme> {
  return {
    minHeight: 96,
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& .MuiTabs-flexContainer": {
      width: "100%",
    },
    "& .MuiTab-root": {
      alignItems: "center",
      color: theme.palette.text.secondary,
      flexDirection: "column",
      fontSize: 15,
      fontWeight: 650,
      gap: theme.spacing(1.25),
      justifyContent: "center",
      lineHeight: 1.15,
      minHeight: 96,
      minWidth: 112,
      opacity: 1,
      padding: theme.spacing(1.75, 1.5, 2.25),
      textTransform: "none",
      transition: theme.transitions.create(
        ["color", "background-color", "transform", "box-shadow"],
        {
          duration: 180,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        }
      ),
      whiteSpace: "normal",
      "& .MuiTab-icon": {
        margin: 0,
        marginBottom: 0,
      },
      "&:hover": {
        backgroundColor: colors.hoverBg,
        boxShadow: `inset 0 0 0 1px ${alpha(colors.main, 0.14)}`,
        color: colors.main,
        transform: "translateY(-2px)",
      },
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
        "&:hover": {
          transform: "none",
        },
      },
      "&:focus-visible": {
        backgroundColor: colors.softBg,
        color: colors.main,
        outline: "none",
      },
    },
    "& .Mui-selected": {
      color: `${colors.main} !important`,
      fontWeight: 850,
      "&:hover": {
        backgroundColor: colors.selectedHoverBg,
        boxShadow: "none",
        color: `${colors.dark} !important`,
        transform: "none",
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: colors.main,
      borderRadius: "999px 999px 0 0",
      height: 7,
      bottom: -2,
    },
  };
}

function buildUnderlineSx(theme: Theme, color: TabBarPaletteColor): SxProps<Theme> {
  const paletteColor = theme.palette[color];

  return {
    minHeight: 48,
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& .MuiTab-root": {
      color: theme.palette.text.secondary,
      fontSize: 14,
      fontWeight: 650,
      minHeight: 48,
      textTransform: "none",
      "&:hover": {
        color: paletteColor.main,
      },
    },
    "& .Mui-selected": {
      color: `${paletteColor.main} !important`,
      fontWeight: 800,
    },
  };
}

export const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>(
  (
    {
      items,
      value,
      onChange,
      styleVariant = "icon-grid",
      color = "primary",
      "aria-label": ariaLabel,
      sx: userSx,
      slotProps: userSlotProps,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down("md"));
    const activeIndex = resolveActiveIndex(items, value);
    const tabColors = getTabBarThemeColors(theme, color);

    const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
      const nextItem = items[newIndex];
      if (nextItem) onChange(nextItem.id);
    };

    const variantSx =
      styleVariant === "icon-grid"
        ? buildIconGridSx(tabColors, theme)
        : buildUnderlineSx(theme, color);

    const shellSx: SxProps<Theme> = {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: `${borderRadius.md}px`,
      boxShadow: theme.shadows[2],
      overflow: "hidden",
      bgcolor: "background.paper",
    };

    return (
      <Box ref={ref} sx={shellSx}>
        <MuiTabs
          value={activeIndex}
          onChange={handleChange}
          color={color}
          variant={isCompact ? "scrollable" : "fullWidth"}
          scrollButtons={isCompact ? "auto" : false}
          allowScrollButtonsMobile
          aria-label={ariaLabel}
          slotProps={userSlotProps}
          sx={
            [variantSx, ...(Array.isArray(userSx) ? userSx : [userSx])] as SxProps<Theme>
          }
          {...props}
        >
          {items.map((item) => (
            <Tab
              key={item.id}
              label={item.label}
              icon={item.icon}
              iconPosition={styleVariant === "icon-grid" ? "top" : "start"}
              disabled={item.disabled}
              id={`tabbar-tab-${item.id}`}
              aria-controls={`tabbar-panel-${item.id}`}
            />
          ))}
        </MuiTabs>
      </Box>
    );
  }
);

TabBar.displayName = "TabBar";
