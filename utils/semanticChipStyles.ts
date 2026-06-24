import { alpha, type Theme } from "@mui/material/styles";

export type SemanticPaletteKey =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "primary"
  | "secondary";

export function semanticChipSx(theme: Theme, key: SemanticPaletteKey) {
  const paletteColor = theme.palette[key];
  const isDark = theme.palette.mode === "dark";

  return {
    backgroundColor: alpha(paletteColor.main, isDark ? 0.2 : 0.12),
    color: isDark
      ? (paletteColor.light ?? paletteColor.main)
      : (paletteColor.dark ?? paletteColor.main),
    border: `1px solid ${alpha(paletteColor.main, isDark ? 0.35 : 0.24)}`,
  };
}

export function neutralChipSx(theme: Theme) {
  return {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
  };
}

export function accentChipSx(theme: Theme, accent: string, accentDark?: string) {
  const isDark = theme.palette.mode === "dark";

  return {
    backgroundColor: alpha(accent, isDark ? 0.2 : 0.12),
    color: isDark ? accent : (accentDark ?? accent),
    border: `1px solid ${alpha(accent, isDark ? 0.35 : 0.24)}`,
  };
}
