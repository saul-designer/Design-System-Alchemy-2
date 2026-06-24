import { describe, it, expect } from "vitest";
import { getChartThemeColors } from "./chartTheme";
import { alchemyDarkTheme } from "../theme/dark";
import { alchemyTheme } from "../theme";

describe("getChartThemeColors", () => {
  it("returns theme-aware chart colors for light mode", () => {
    const colors = getChartThemeColors(alchemyTheme);
    expect(colors.tickFill).toBe(alchemyTheme.palette.text.secondary);
    expect(colors.tooltipStyle.backgroundColor).toBe(
      alchemyTheme.palette.background.paper
    );
  });

  it("returns theme-aware chart colors for dark mode", () => {
    const colors = getChartThemeColors(alchemyDarkTheme);
    expect(colors.tickFill).toBe(alchemyDarkTheme.palette.text.secondary);
    expect(colors.titleColor).toBe(alchemyDarkTheme.palette.text.primary);
  });
});
