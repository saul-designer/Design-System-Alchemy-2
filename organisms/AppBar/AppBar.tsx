import React from "react";
import Box from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { Bell, Sun } from "lucide-react";

export interface AppBarProps {
  appLogo?: React.ReactNode;
  greeting: string;
  userInitials: string;
  hasNotification?: boolean;
  sx?: SxProps<Theme>;
}

export const AppBar: React.FC<AppBarProps> = ({
  appLogo,
  greeting,
  userInitials,
  hasNotification = false,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 70,
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        px: "32px",
        gap: "16px",
        borderBottom: `2px solid ${theme.palette.secondary.light}`,
        position: "sticky",
        top: 0,
        zIndex: 10,
        ...sx,
      }}
    >
      {appLogo && (
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{appLogo}</Box>
      )}

      <Box
        sx={{
          width: "1px",
          height: "28px",
          bgcolor: "divider",
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "14px",
          fontWeight: 400,
          color: "text.primary",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        {greeting}
        <Sun size={20} aria-hidden color="#FFE082" data-testid="WbSunnyIcon" />
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <MuiIconButton
          title="Notifications"
          sx={{
            width: 40,
            height: 40,
            color: "action.active",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Bell size={24} aria-hidden data-testid="NotificationsNoneIcon" />
        </MuiIconButton>
        {hasNotification && (
          <Box
            data-testid="notification-dot"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              bgcolor: "error.main",
              border: `2px solid ${theme.palette.background.paper}`,
              pointerEvents: "none",
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "primary.contrastText",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 500,
          fontSize: "13px",
          fontFamily: "Roboto, sans-serif",
          flexShrink: 0,
        }}
      >
        {userInitials}
      </Box>
    </Box>
  );
};
