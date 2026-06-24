import React from "react";
import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../test/render";
import { AlchemyAreaChart } from "./AlchemyAreaChart";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const data = [
  { week: "W1", pageViews: 1200, sessions: 800 },
  { week: "W2", pageViews: 1500, sessions: 950 },
  { week: "W3", pageViews: 1800, sessions: 1100 },
];

const areas = [
  { dataKey: "pageViews", label: "Page Views" },
  { dataKey: "sessions", label: "Sessions", color: "#00A8C0" },
];

describe("AlchemyAreaChart", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme(
      <AlchemyAreaChart data={data} areas={areas} xAxisKey="week" />
    );
    expect(container).toBeTruthy();
  });

  it("renders title when provided", () => {
    renderWithTheme(
      <AlchemyAreaChart data={data} areas={areas} xAxisKey="week" title="Traffic" />
    );
    expect(screen.getByText("Traffic")).toBeInTheDocument();
  });

  it("renders without title", () => {
    const { container } = renderWithTheme(
      <AlchemyAreaChart data={data} areas={areas} xAxisKey="week" />
    );
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders stacked areas", () => {
    const stackedAreas = [
      { dataKey: "pageViews", stacked: true },
      { dataKey: "sessions", stacked: true },
    ];
    const { container } = renderWithTheme(
      <AlchemyAreaChart data={data} areas={stackedAreas} xAxisKey="week" />
    );
    expect(container).toBeTruthy();
  });

  it("renders with showGrid false", () => {
    const { container } = renderWithTheme(
      <AlchemyAreaChart data={data} areas={areas} xAxisKey="week" showGrid={false} />
    );
    expect(container).toBeTruthy();
  });

  it("renders with showLegend false", () => {
    const { container } = renderWithTheme(
      <AlchemyAreaChart data={data} areas={areas} xAxisKey="week" showLegend={false} />
    );
    expect(container).toBeTruthy();
  });

  it("renders with yAxisFormatter", () => {
    const { container } = renderWithTheme(
      <AlchemyAreaChart
        data={data}
        areas={areas}
        xAxisKey="week"
        yAxisFormatter={(v) => `${v}`}
      />
    );
    expect(container).toBeTruthy();
  });
});
