import { describe, it, expect } from "vitest";
import { chartColors, getChartColor } from "./chartColors";

describe("chartColors", () => {
  it("has 10 colors", () => {
    expect(chartColors).toHaveLength(10);
  });

  it("first color is Alchemy primary", () => {
    expect(chartColors[0]).toBe("#1F5FF2");
  });

  it("second color is Alchemy secondary", () => {
    expect(chartColors[1]).toBe("#00A8C0");
  });

  it("all colors are valid hex strings", () => {
    chartColors.forEach((color) => {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe("getChartColor", () => {
  it("returns color at given index", () => {
    expect(getChartColor(0)).toBe("#1F5FF2");
    expect(getChartColor(1)).toBe("#00A8C0");
  });

  it("wraps around when index exceeds array length", () => {
    expect(getChartColor(10)).toBe(chartColors[0]);
    expect(getChartColor(11)).toBe(chartColors[1]);
  });

  it("handles large index values", () => {
    expect(getChartColor(20)).toBe(chartColors[0]);
  });
});
