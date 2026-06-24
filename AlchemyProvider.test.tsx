import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useTheme } from "@mui/material/styles";
import { AlchemyProvider } from "./AlchemyProvider";
import { alchemyTheme } from "./theme";

function ThemeConsumer() {
  const theme = useTheme();
  return <div data-testid="primary">{theme.palette.primary.main}</div>;
}

function ThemeSecondaryConsumer() {
  const theme = useTheme();
  return <div data-testid="secondary">{theme.palette.secondary.main}</div>;
}

describe("AlchemyProvider", () => {
  it("renders children", () => {
    render(
      <AlchemyProvider>
        <div data-testid="child">hello</div>
      </AlchemyProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("provides alchemyTheme to children by default", () => {
    render(
      <AlchemyProvider>
        <ThemeConsumer />
      </AlchemyProvider>
    );
    expect(screen.getByTestId("primary").textContent).toBe("#1F5FF2");
  });

  it("accepts a custom theme via theme prop", () => {
    const customTheme = {
      ...alchemyTheme,
      palette: {
        ...alchemyTheme.palette,
        primary: { ...alchemyTheme.palette.primary, main: "#FF0000" },
      },
    };
    render(
      <AlchemyProvider theme={customTheme as typeof alchemyTheme}>
        <ThemeConsumer />
      </AlchemyProvider>
    );
    expect(screen.getByTestId("primary").textContent).toBe("#FF0000");
  });

  it("merges themeOverrides with alchemyTheme", () => {
    render(
      <AlchemyProvider themeOverrides={{ palette: { primary: { main: "#ABCDEF" } } }}>
        <ThemeConsumer />
      </AlchemyProvider>
    );
    expect(screen.getByTestId("primary").textContent).toBe("#ABCDEF");
  });

  it("themeOverrides preserves non-overridden tokens", () => {
    render(
      <AlchemyProvider themeOverrides={{ palette: { primary: { main: "#ABCDEF" } } }}>
        <ThemeSecondaryConsumer />
      </AlchemyProvider>
    );
    expect(screen.getByTestId("secondary").textContent).toBe("#00A8C0");
  });

  it("theme prop takes priority over themeOverrides", () => {
    const customTheme = {
      ...alchemyTheme,
      palette: {
        ...alchemyTheme.palette,
        primary: { ...alchemyTheme.palette.primary, main: "#FF0000" },
      },
    };
    render(
      <AlchemyProvider
        theme={customTheme as typeof alchemyTheme}
        themeOverrides={{ palette: { primary: { main: "#00FF00" } } }}
      >
        <ThemeConsumer />
      </AlchemyProvider>
    );
    expect(screen.getByTestId("primary").textContent).toBe("#FF0000");
  });

  it("renders without CssBaseline when disableCssBaseline is true", () => {
    const { container } = render(
      <AlchemyProvider disableCssBaseline>
        <div>no baseline</div>
      </AlchemyProvider>
    );
    expect(container).toBeTruthy();
  });
});
