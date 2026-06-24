import React from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { alchemyTheme } from "../theme";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={alchemyTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function renderWithTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult {
  return render(ui, { wrapper: Providers, ...options });
}

export * from "@testing-library/react";
export { renderWithTheme as render };
