import React from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

export interface DashboardLayoutProps {
  sidebar?: React.ReactNode;
  appBar?: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number;
  contentMaxWidth?: number | string;
  sx?: SxProps<Theme>;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  appBar,
  children,
  sidebarWidth = 264,
  contentMaxWidth,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "grey.50",
        ...sx,
      }}
    >
      {sidebar && (
        <Box
          component="nav"
          sx={{
            flexShrink: 0,
            display: "flex",
            alignSelf: "stretch",
            ...(sidebarWidth === 0
              ? { width: 0, minWidth: 0, overflow: "visible" }
              : undefined),
          }}
        >
          {sidebar}
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {appBar && <Box component="header">{appBar}</Box>}

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              maxWidth: contentMaxWidth,
              mx: contentMaxWidth ? "auto" : undefined,
              height: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
