import React, { useLayoutEffect } from "react";
import MuiMenu, { type MenuProps as MuiMenuProps } from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDivider from "@mui/material/Divider";
import {
  mergeMenuTransitionSlotProps,
  releaseMenuFocus,
  releaseModalBackgroundFocus,
} from "../../utils/releaseModalBackgroundFocus";

export interface MenuAction {
  label: string;
  onClick?: () => void;
  icon?: React.ReactElement;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuProps extends Omit<MuiMenuProps, "children"> {
  items: MenuAction[];
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ items, open, slotProps, onClose, anchorEl, ...props }, ref) => {
    useLayoutEffect(() => {
      if (open) {
        releaseModalBackgroundFocus();
        return;
      }
      releaseMenuFocus(anchorEl);
    }, [open, anchorEl]);

    const handleClose: MenuProps["onClose"] = (event, reason) => {
      releaseMenuFocus(anchorEl);
      onClose?.(event, reason);
    };

    const mergedSlotProps = mergeMenuTransitionSlotProps(slotProps);

    return (
      <MuiMenu
        ref={ref}
        open={open}
        anchorEl={anchorEl}
        slotProps={mergedSlotProps}
        onClose={handleClose}
        {...props}
      >
        {items.flatMap((item, index) => {
          const elements = [];
          if (item.divider) {
            elements.push(<MuiDivider key={`divider-${index}`} />);
          }
          elements.push(
            <MuiMenuItem
              key={`item-${index}`}
              disabled={item.disabled}
              onMouseDown={(event) => {
                if (item.disabled || event.button !== 0) return;
                releaseMenuFocus(anchorEl);
              }}
              onClick={() => {
                releaseMenuFocus(anchorEl);
                item.onClick?.();
              }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText>{item.label}</ListItemText>
            </MuiMenuItem>
          );
          return elements;
        })}
      </MuiMenu>
    );
  }
);

Menu.displayName = "Menu";
