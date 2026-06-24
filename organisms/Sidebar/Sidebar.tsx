import React, { useCallback, useState, type RefObject } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiIconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import type { SxProps, Theme } from "@mui/material/styles";
import type { MenuItemProps } from "../../molecules/MenuItem";

export interface SidebarSection {
  title?: string;
  items: MenuItemProps[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  width?: number;
  collapsedWidth?: number;
  logo?: React.ReactNode;
  collapsedLogo?: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  open?: boolean;
  variant?: "permanent" | "persistent" | "temporary";
  onClose?: () => void;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Focus target after a temporary drawer finishes closing (e.g. menu trigger). */
  restoreFocusRef?: RefObject<HTMLElement | null>;
  sx?: SxProps<Theme>;
}

const ITEM_SX = {
  height: 44,
  borderRadius: "100px",
  mb: "2px",
  color: "#fff",
  transition: "background 0.15s",
  "&.Mui-selected": {
    bgcolor: "#fff",
    boxShadow:
      "0 1px 3px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.20)",
    color: "#1F5FF2",
    "& .MuiListItemIcon-root": { color: "#1F5FF2" },
    "&:hover": { bgcolor: "#fff" },
  },
  "&:hover": { bgcolor: "rgba(255,255,255,.1)" },
};

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  width = 190,
  collapsedWidth = 72,
  logo,
  collapsedLogo,
  title,
  footer,
  open = true,
  variant = "permanent",
  onClose,
  collapsible = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  restoreFocusRef,
  sx,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;
  const isTemporary = variant === "temporary";
  const isDocked = variant === "permanent" || variant === "persistent";

  const handleDrawerClose = useCallback(
    (_event: object, _reason: "backdropClick" | "escapeKeyDown") => {
      if (isTemporary && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      onClose?.();
    },
    [isTemporary, onClose]
  );

  const handleDrawerExited = useCallback(() => {
    restoreFocusRef?.current?.focus({ preventScroll: true });
  }, [restoreFocusRef]);

  const handleToggle = () => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const currentWidth = collapsible && isCollapsed ? collapsedWidth : width;
  const activeLogo = isCollapsed ? (collapsedLogo ?? logo) : logo;

  const renderItem = (item: MenuItemProps) => {
    if (isCollapsed) {
      return (
        <Tooltip key={item.label} title={item.label} placement="right">
          <Box component="span" sx={{ display: "block" }}>
            <ListItemButton
              selected={item.selected}
              disabled={item.disabled}
              onClick={item.onClick}
              onMouseEnter={item.onMouseEnter}
              onFocus={item.onFocus}
              sx={{ ...ITEM_SX, px: 0, justifyContent: "center" }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, color: "inherit", justifyContent: "center" }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </Box>
        </Tooltip>
      );
    }

    return (
      <ListItemButton
        key={item.label}
        selected={item.selected}
        disabled={item.disabled}
        onClick={item.onClick}
        onMouseEnter={item.onMouseEnter}
        onFocus={item.onFocus}
        sx={{ ...ITEM_SX, px: "14px", gap: 1.5 }}
      >
        {item.icon && (
          <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>{item.icon}</ListItemIcon>
        )}
        <ListItemText
          primary={item.label}
          slotProps={{
            primary: { fontSize: "0.875rem", fontWeight: item.selected ? 500 : 400 },
          }}
        />
      </ListItemButton>
    );
  };

  const content = (
    <Box
      sx={{
        width: currentWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {(activeLogo || title || collapsible) && (
        <Box
          sx={{
            height: 70,
            px: isCollapsed ? 0 : "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
            flexShrink: 0,
          }}
        >
          {!isCollapsed && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
              {activeLogo}
              {title && (
                <Typography variant="h6" fontWeight={700} noWrap sx={{ color: "#fff" }}>
                  {title}
                </Typography>
              )}
            </Box>
          )}
          {isCollapsed && activeLogo && (
            <Box sx={{ display: "flex", alignItems: "center" }}>{activeLogo}</Box>
          )}
          {collapsible && !isCollapsed && (
            <MuiIconButton
              size="small"
              onClick={handleToggle}
              aria-label="Collapse sidebar"
              sx={{
                flexShrink: 0,
                color: "#fff",
                width: 28,
                height: 28,
                borderRadius: "6px",
              }}
            >
              <ChevronsLeft size={20} aria-hidden />
            </MuiIconButton>
          )}
        </Box>
      )}

      {collapsible && isCollapsed && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <MuiIconButton
            size="small"
            onClick={handleToggle}
            aria-label="Expand sidebar"
            sx={{ color: "#fff" }}
          >
            <ChevronsRight size={20} aria-hidden />
          </MuiIconButton>
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: "auto", px: "10px", py: 1 }}>
        {sections.map((section, sectionIndex) => (
          <Box key={section.title ?? section.items.map((i) => i.label).join(",")}>
            {sectionIndex > 0 && (
              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,.15)" }} />
            )}
            {section.title && !isCollapsed && (
              <Typography
                variant="overline"
                sx={{
                  px: "14px",
                  py: 0.5,
                  display: "block",
                  color: "rgba(255,255,255,.6)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                {section.title}
              </Typography>
            )}
            <List dense disablePadding>
              {section.items.map((item) => renderItem(item))}
            </List>
          </Box>
        ))}
      </Box>

      {footer && !isCollapsed && (
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid rgba(255,255,255,.15)",
            flexShrink: 0,
            color: "#fff",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          {footer}
        </Box>
      )}
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={isTemporary ? handleDrawerClose : onClose}
      ModalProps={
        isTemporary && restoreFocusRef ? { disableRestoreFocus: true } : undefined
      }
      slotProps={
        isTemporary && restoreFocusRef
          ? {
              transition: {
                onExited: handleDrawerExited,
              },
            }
          : undefined
      }
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition: "width 0.3s ease-in-out",
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.3s ease-in-out",
          background: "linear-gradient(180deg, #1649DF 0%, #152356 100%)",
          border: "none",
          ...(isDocked && {
            position: "relative",
            top: "auto",
            left: "auto",
            height: "100%",
          }),
        },
        ...sx,
      }}
    >
      {content}
    </Drawer>
  );
};
