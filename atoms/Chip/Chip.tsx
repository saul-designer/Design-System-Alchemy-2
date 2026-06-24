import React from "react";
import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material";
import {
  accentChipSx,
  neutralChipSx,
  semanticChipSx,
  type SemanticPaletteKey,
} from "../../utils/semanticChipStyles";

const PRESET_SEMANTIC: Record<string, SemanticPaletteKey | "neutral" | "purple"> = {
  sent: "warning",
  viewed: "info",
  signed: "success",
  expired: "error",
  admin: "primary",
  public: "purple",
  system: "info",
  contractor: "warning",
  active: "success",
  inactive: "neutral",
  version: "info",
};

export type AlchemyChipPreset = keyof typeof PRESET_SEMANTIC;

export interface ChipProps extends Omit<MuiChipProps, "color"> {
  preset?: AlchemyChipPreset;
  color?: MuiChipProps["color"];
}

const presetBaseSx: SxProps<Theme> = {
  borderRadius: "100px",
  fontWeight: 500,
  fontSize: "0.75rem",
  lineHeight: 1.4,
};

function getPresetSx(theme: Theme, preset: AlchemyChipPreset): SxProps<Theme> {
  const mapping = PRESET_SEMANTIC[preset];

  if (mapping === "neutral") {
    return neutralChipSx(theme);
  }

  if (mapping === "purple") {
    return accentChipSx(theme, "#6A1B9A", "#6A1B9A");
  }

  return semanticChipSx(theme, mapping);
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ preset, sx, ...props }, ref) => {
    const theme = useTheme();
    const resolvedSx: SxProps<Theme> = preset
      ? [
          presetBaseSx,
          getPresetSx(theme, preset),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]
      : (sx ?? {});

    return <MuiChip ref={ref} sx={resolvedSx} {...props} />;
  }
);

Chip.displayName = "Chip";

export const ALCHEMY_CHIP_PRESETS = PRESET_SEMANTIC;
