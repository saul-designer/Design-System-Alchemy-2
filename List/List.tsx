import React from "react";
import MuiList, { type ListProps as MuiListProps } from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListSubheader from "@mui/material/ListSubheader";
import MuiDivider from "@mui/material/Divider";

export interface ListItemDef {
  id?: string | number;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  selected?: boolean;
}

export interface ListProps extends Omit<MuiListProps, "children"> {
  items: ListItemDef[];
  subheader?: string;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ items, subheader, dense, disablePadding, ...props }, ref) => {
    return (
      <MuiList
        ref={ref}
        dense={dense}
        disablePadding={disablePadding}
        subheader={
          subheader ? <MuiListSubheader>{subheader}</MuiListSubheader> : undefined
        }
        {...props}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id ?? index}>
            {item.onClick ? (
              <MuiListItem disablePadding>
                <MuiListItemButton
                  onClick={item.onClick}
                  disabled={item.disabled}
                  selected={item.selected}
                >
                  {item.icon && <MuiListItemIcon>{item.icon}</MuiListItemIcon>}
                  <MuiListItemText primary={item.primary} secondary={item.secondary} />
                </MuiListItemButton>
              </MuiListItem>
            ) : (
              <MuiListItem
                sx={item.disabled ? { opacity: 0.5, pointerEvents: "none" } : undefined}
              >
                {item.icon && <MuiListItemIcon>{item.icon}</MuiListItemIcon>}
                <MuiListItemText primary={item.primary} secondary={item.secondary} />
              </MuiListItem>
            )}
            {item.divider && <MuiDivider />}
          </React.Fragment>
        ))}
      </MuiList>
    );
  }
);

List.displayName = "List";
