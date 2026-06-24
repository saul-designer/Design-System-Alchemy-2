import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";

export interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  endContent?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  selected,
  disabled,
  onClick,
  onMouseEnter,
  onFocus,
  endContent,
  sx,
}) => {
  return (
    <ListItemButton
      selected={selected}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      sx={{ px: 2, py: 0.75, ...sx }}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>{icon}</ListItemIcon>
      )}
      <ListItemText
        primary={label}
        slotProps={{
          primary: {
            fontSize: "0.875rem",
            fontWeight: selected ? 600 : 400,
          },
        }}
      />
      {endContent}
    </ListItemButton>
  );
};
