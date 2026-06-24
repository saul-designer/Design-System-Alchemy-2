import { createTheme } from "@mui/material/styles";
import { palette, customColors } from "./palette";
import { typography } from "./typography";
import { components } from "./components";
import { shapeConfig } from "./shape";
import { shadows } from "./shadows";
import { transitionsConfig } from "./transitions";
import { spacingUnit } from "./spacing";
import "./types";

const opacities = {
  4: 0.04,
  8: 0.08,
  12: 0.12,
  16: 0.16,
  20: 0.2,
  24: 0.24,
  32: 0.32,
  40: 0.4,
  48: 0.48,
  56: 0.56,
  60: 0.6,
  64: 0.64,
  72: 0.72,
  80: 0.8,
  88: 0.88,
  96: 0.96,
  100: 1,
};

export const alchemyTheme = createTheme({
  palette: {
    ...palette,
    shadow: {
      light: "rgba(0, 0, 0, 0.12)",
      medium: "rgba(0, 0, 0, 0.14)",
      dark: "rgba(0, 0, 0, 0.20)",
    },
  },
  typography,
  components,
  shape: shapeConfig,
  shadows,
  transitions: transitionsConfig,
  spacing: spacingUnit,
  customColors,
  opacities,
} as Parameters<typeof createTheme>[0]);

export { customColors, palette, typography, components, opacities };
export { borderRadius, shapeConfig } from "./shape";
export { shadows } from "./shadows";
export { transitionsConfig } from "./transitions";
export { spacingTokens, spacingUnit } from "./spacing";
export { createAlchemyTheme } from "./createAlchemyTheme";
export type { BrandTokens } from "./createAlchemyTheme";
export { zIndex } from "./zIndex";
export type { Theme } from "@mui/material/styles";
