import React from "react";
import Box from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import { LogOut } from "lucide-react";
import { Avatar } from "../../atoms/Avatar";

export interface SidebarUserFooterProps {
  name: string;
  email: string;
  onSignOut?: () => void;
}

export const SidebarUserFooter: React.FC<SidebarUserFooterProps> = ({
  name,
  email,
  onSignOut,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.25,
      px: 1.25,
      py: 1,
      borderRadius: "12px",
      minWidth: 0,
      width: "100%",
    }}
  >
    <Avatar
      name={name}
      sx={{ width: 32, height: 32, fontSize: "0.75rem", flexShrink: 0 }}
    />
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Box
        sx={{
          fontSize: "0.8125rem",
          fontWeight: 500,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Box>
      <Box
        title={email}
        sx={{
          fontSize: "0.6875rem",
          opacity: 0.7,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {email}
      </Box>
    </Box>
    {onSignOut && (
      <MuiIconButton
        size="small"
        title="Sign out"
        onClick={onSignOut}
        sx={{
          color: "inherit",
          width: 30,
          height: 30,
          borderRadius: "8px",
          opacity: 0.7,
          flexShrink: 0,
          "&:hover": { opacity: 1, bgcolor: "rgba(255,255,255,.1)" },
        }}
      >
        <LogOut size={18} aria-hidden />
      </MuiIconButton>
    )}
  </Box>
);
