import React from "react";
import MuiChip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  accentChipSx,
  neutralChipSx,
  semanticChipSx,
  type SemanticPaletteKey,
} from "../../utils/semanticChipStyles";

export type StatusVariant =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "cancelled"
  | "in_progress"
  | "on_hold"
  | "error"
  | "draft"
  | "sent"
  | "viewed"
  | "signed"
  | "expired"
  | "admin"
  | "public";

interface StatusConfig {
  label: string;
  semantic: SemanticPaletteKey | "neutral" | "purple";
}

const STATUS_CONFIG: Record<StatusVariant, StatusConfig> = {
  active: { label: "Active", semantic: "success" },
  inactive: { label: "Inactive", semantic: "neutral" },
  pending: { label: "Pending", semantic: "warning" },
  completed: { label: "Completed", semantic: "success" },
  cancelled: { label: "Cancelled", semantic: "error" },
  in_progress: { label: "In Progress", semantic: "primary" },
  on_hold: { label: "On Hold", semantic: "warning" },
  error: { label: "Error", semantic: "error" },
  draft: { label: "Draft", semantic: "info" },
  sent: { label: "Sent", semantic: "warning" },
  viewed: { label: "Viewed", semantic: "info" },
  signed: { label: "Signed", semantic: "success" },
  expired: { label: "Expired", semantic: "error" },
  admin: { label: "Admin", semantic: "primary" },
  public: { label: "Public", semantic: "purple" },
};

function getStatusSx(
  theme: Theme,
  semantic: StatusConfig["semantic"]
): Record<string, unknown> {
  if (semantic === "neutral") {
    return neutralChipSx(theme);
  }

  if (semantic === "purple") {
    return accentChipSx(theme, "#6A1B9A", "#6A1B9A");
  }

  return semanticChipSx(theme, semantic);
}

export interface StatusChipProps {
  status: StatusVariant;
  label?: string;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  label,
  size = "small",
  sx,
}) => {
  const theme = useTheme();
  const config = STATUS_CONFIG[status];

  return (
    <MuiChip
      label={label ?? config.label}
      size={size}
      sx={{
        ...getStatusSx(theme, config.semantic),
        fontWeight: 600,
        borderRadius: "6px",
        ...sx,
      }}
    />
  );
};
