import React, { useState } from "react";
import MuiTabs, { type TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

export interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactElement;
}

export interface TabsProps extends Omit<MuiTabsProps, "onChange" | "value"> {
  tabs: TabItem[];
  defaultTab?: number;
  onChange?: (index: number) => void;
  /**
   * Visual style variant.
   * - `"default"` — standard MUI underline indicator.
   * - `"pill"` — active tab gets a filled rounded pill; no underline indicator.
   */
  styleVariant?: "default" | "pill";
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      defaultTab = 0,
      onChange,
      styleVariant = "default",
      sx: userSx,
      slotProps: userSlotProps,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
      onChange?.(newValue);
    };

    const pillSx: SxProps<Theme> =
      styleVariant === "pill"
        ? {
            "& .MuiTabs-flexContainer": { width: "100%" },
            "& .MuiTab-root": {
              textTransform: "none",
              borderRadius: "20px",
              minHeight: "36px",
              px: 2,
              py: 1,
              fontWeight: 500,
              flexGrow: 1,
              maxWidth: "none",
            },
            "& .Mui-selected": {
              backgroundColor: theme.customColors.blue[800],
              color: "white !important",
            },
          }
        : {};

    const pillSlotProps =
      styleVariant === "pill"
        ? { indicator: { sx: { display: "none" } }, ...userSlotProps }
        : userSlotProps;

    return (
      <Box ref={ref}>
        <MuiTabs
          value={activeTab}
          onChange={handleChange}
          slotProps={pillSlotProps}
          sx={[pillSx, ...(Array.isArray(userSx) ? userSx : [userSx])] as SxProps<Theme>}
          {...props}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              disabled={tab.disabled}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </MuiTabs>
        {tabs.map((tab, index) => (
          <Box
            key={index}
            role="tabpanel"
            hidden={activeTab !== index}
            aria-labelledby={`tab-${index}`}
          >
            {activeTab === index && tab.content}
          </Box>
        ))}
      </Box>
    );
  }
);

Tabs.displayName = "Tabs";
