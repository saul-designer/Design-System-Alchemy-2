import { createTheme } from "@mui/material/styles";
import { alchemyTheme } from "./index";
import type { Theme, ThemeOptions } from "@mui/material/styles";

export interface BrandTokens {
  primary?: string;
  secondary?: string;
  fontFamily?: string;
  borderRadius?: number;
  error?: string;
  warning?: string;
  info?: string;
  success?: string;
  background?: {
    default?: string;
    paper?: string;
  };
  overrides?: ThemeOptions;
}

export function createAlchemyTheme(tokens: BrandTokens = {}): Theme {
  const {
    primary,
    secondary,
    fontFamily,
    borderRadius,
    error,
    warning,
    info,
    success,
    background,
    overrides = {},
  } = tokens;

  const paletteOverrides: ThemeOptions["palette"] = {};
  if (primary) paletteOverrides.primary = { main: primary };
  if (secondary) paletteOverrides.secondary = { main: secondary };
  if (error) paletteOverrides.error = { main: error };
  if (warning) paletteOverrides.warning = { main: warning };
  if (info) paletteOverrides.info = { main: info };
  if (success) paletteOverrides.success = { main: success };
  if (background) paletteOverrides.background = background;

  const typographyOverrides: ThemeOptions["typography"] = fontFamily
    ? ({ fontFamily } as ThemeOptions["typography"])
    : {};

  const shapeOverrides: ThemeOptions["shape"] =
    borderRadius !== undefined ? { borderRadius } : {};

  return createTheme(alchemyTheme, {
    palette: paletteOverrides,
    typography: typographyOverrides,
    shape: shapeOverrides,
    ...overrides,
  });
}
