import React from "react";
import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../test/render";
import { AlchemyPieChart } from "./AlchemyPieChart";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const data = [
  { name: "Mobile", value: 400 },
  { name: "Desktop", value: 300 },
  { name: "Tablet", value: 100, color: "#FF9800" },
];

describe("AlchemyPieChart", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme(<AlchemyPieChart data={data} />);
    expect(container).toBeTruthy();
  });

  it("renders title when provided", () => {
    renderWithTheme(<AlchemyPieChart data={data} title="Traffic Sources" />);
    expect(screen.getByText("Traffic Sources")).toBeInTheDocument();
  });

  it("renders without title", () => {
    const { container } = renderWithTheme(<AlchemyPieChart data={data} />);
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders donut variant", () => {
    const { container } = renderWithTheme(<AlchemyPieChart data={data} donut />);
    expect(container).toBeTruthy();
  });

  it("renders with showLegend false", () => {
    const { container } = renderWithTheme(
      <AlchemyPieChart data={data} showLegend={false} />
    );
    expect(container).toBeTruthy();
  });

  it("renders with custom height", () => {
    const { container } = renderWithTheme(<AlchemyPieChart data={data} height={400} />);
    expect(container).toBeTruthy();
  });

  it("renders with tooltipFormatter", () => {
    const { container } = renderWithTheme(
      <AlchemyPieChart
        data={data}
        tooltipFormatter={(value, name) => `${name}: ${value}`}
      />
    );
    expect(container).toBeTruthy();
  });
});
