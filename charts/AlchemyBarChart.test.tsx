import React from "react";
import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../test/render";
import { AlchemyBarChart } from "./AlchemyBarChart";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const data = [
  { category: "Q1", sales: 400, returns: 50 },
  { category: "Q2", sales: 600, returns: 80 },
];

const bars = [
  { dataKey: "sales", label: "Sales" },
  { dataKey: "returns", label: "Returns", color: "#D32F2F" },
];

describe("AlchemyBarChart", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme(
      <AlchemyBarChart data={data} bars={bars} xAxisKey="category" />
    );
    expect(container).toBeTruthy();
  });

  it("renders title when provided", () => {
    renderWithTheme(
      <AlchemyBarChart data={data} bars={bars} xAxisKey="category" title="Sales Chart" />
    );
    expect(screen.getByText("Sales Chart")).toBeInTheDocument();
  });

  it("renders without title", () => {
    const { container } = renderWithTheme(
      <AlchemyBarChart data={data} bars={bars} xAxisKey="category" />
    );
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders horizontal layout", () => {
    const { container } = renderWithTheme(
      <AlchemyBarChart data={data} bars={bars} xAxisKey="category" horizontal />
    );
    expect(container).toBeTruthy();
  });

  it("renders with showGrid false", () => {
    const { container } = renderWithTheme(
      <AlchemyBarChart data={data} bars={bars} xAxisKey="category" showGrid={false} />
    );
    expect(container).toBeTruthy();
  });

  it("renders with showLegend false", () => {
    const { container } = renderWithTheme(
      <AlchemyBarChart data={data} bars={bars} xAxisKey="category" showLegend={false} />
    );
    expect(container).toBeTruthy();
  });

  it("renders stacked bars", () => {
    const stackedBars = [
      { dataKey: "sales", stackId: "a" },
      { dataKey: "returns", stackId: "a" },
    ];
    const { container } = renderWithTheme(
      <AlchemyBarChart data={data} bars={stackedBars} xAxisKey="category" />
    );
    expect(container).toBeTruthy();
  });

  it("renders with yAxisFormatter", () => {
    const { container } = renderWithTheme(
      <AlchemyBarChart
        data={data}
        bars={bars}
        xAxisKey="category"
        yAxisFormatter={(v) => `${v}k`}
      />
    );
    expect(container).toBeTruthy();
  });
});
