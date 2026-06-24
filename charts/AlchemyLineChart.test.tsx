import React from "react";
import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../test/render";
import { AlchemyLineChart } from "./AlchemyLineChart";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const data = [
  { month: "Jan", users: 100, revenue: 500 },
  { month: "Feb", users: 150, revenue: 700 },
  { month: "Mar", users: 200, revenue: 900 },
];

const lines = [
  { dataKey: "users", label: "Users" },
  { dataKey: "revenue", label: "Revenue", color: "#00A8C0" },
];

describe("AlchemyLineChart", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme(
      <AlchemyLineChart data={data} lines={lines} xAxisKey="month" />
    );
    expect(container).toBeTruthy();
  });

  it("renders title when provided", () => {
    renderWithTheme(
      <AlchemyLineChart data={data} lines={lines} xAxisKey="month" title="Growth Chart" />
    );
    expect(screen.getByText("Growth Chart")).toBeInTheDocument();
  });

  it("renders without title", () => {
    const { container } = renderWithTheme(
      <AlchemyLineChart data={data} lines={lines} xAxisKey="month" />
    );
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders with empty data", () => {
    const { container } = renderWithTheme(
      <AlchemyLineChart data={[]} lines={lines} xAxisKey="month" />
    );
    expect(container).toBeTruthy();
  });

  it("renders with custom height", () => {
    const { container } = renderWithTheme(
      <AlchemyLineChart data={data} lines={lines} xAxisKey="month" height={400} />
    );
    expect(container).toBeTruthy();
  });

  it("renders with showGrid false", () => {
    const { container } = renderWithTheme(
      <AlchemyLineChart data={data} lines={lines} xAxisKey="month" showGrid={false} />
    );
    expect(container).toBeTruthy();
  });

  it("renders with showLegend false", () => {
    const { container } = renderWithTheme(
      <AlchemyLineChart data={data} lines={lines} xAxisKey="month" showLegend={false} />
    );
    expect(container).toBeTruthy();
  });

  it("renders dashed lines", () => {
    const dashedLines = [{ dataKey: "users", dashed: true }];
    const { container } = renderWithTheme(
      <AlchemyLineChart data={data} lines={dashedLines} xAxisKey="month" />
    );
    expect(container).toBeTruthy();
  });

  it("renders with yAxisFormatter", () => {
    const { container } = renderWithTheme(
      <AlchemyLineChart
        data={data}
        lines={lines}
        xAxisKey="month"
        yAxisFormatter={(v) => `$${v}`}
      />
    );
    expect(container).toBeTruthy();
  });
});
