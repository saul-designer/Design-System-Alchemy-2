import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { alchemyTheme } from "./theme";
import type { Theme, ThemeOptions } from "@mui/material/styles";

export interface AlchemyProviderProps {
  children: React.ReactNode;
  /** Completely replaces the default Alchemy theme. Takes priority over themeOverrides. */
  theme?: Theme;
  /** Partial theme options merged on top of alchemyTheme. Use this to customize colors, typography, etc. */
  themeOverrides?: ThemeOptions;
  disableCssBaseline?: boolean;
}

export const AlchemyProvider: React.FC<AlchemyProviderProps> = ({
  children,
  theme,
  themeOverrides,
  disableCssBaseline = false,
}) => {
  const resolvedTheme = useMemo(() => {
    if (theme) return theme;
    if (themeOverrides) return createTheme(alchemyTheme, themeOverrides);
    return alchemyTheme;
  }, [theme, themeOverrides]);

  return (
    <ThemeProvider theme={resolvedTheme}>
      {!disableCssBaseline && <CssBaseline />}
      {children}
    </ThemeProvider>
  );
};
