import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "../../test/render";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders linear progress by default", () => {
    const { container } = render(<Progress />);
    expect(container.querySelector(".MuiLinearProgress-root")).toBeInTheDocument();
  });

  it("renders circular progress when type is circular", () => {
    const { container } = render(<Progress type="circular" />);
    expect(container.querySelector(".MuiCircularProgress-root")).toBeInTheDocument();
  });

  it("renders linear determinate with value", () => {
    const { container } = render(<Progress variant="determinate" value={50} />);
    expect(container.querySelector(".MuiLinearProgress-determinate")).toBeInTheDocument();
  });

  it("renders linear buffer variant", () => {
    const { container } = render(<Progress variant="buffer" />);
    expect(container.querySelector(".MuiLinearProgress-buffer")).toBeInTheDocument();
  });

  it("renders linear query variant", () => {
    const { container } = render(<Progress variant="query" />);
    expect(container.querySelector(".MuiLinearProgress-query")).toBeInTheDocument();
  });

  it("renders circular determinate with value", () => {
    const { container } = render(
      <Progress type="circular" variant="determinate" value={75} />
    );
    expect(
      container.querySelector(".MuiCircularProgress-determinate")
    ).toBeInTheDocument();
  });

  it("maps buffer variant to indeterminate for circular", () => {
    const { container } = render(<Progress type="circular" variant="buffer" />);
    expect(
      container.querySelector(".MuiCircularProgress-indeterminate")
    ).toBeInTheDocument();
  });

  it("maps query variant to indeterminate for circular", () => {
    const { container } = render(<Progress type="circular" variant="query" />);
    expect(
      container.querySelector(".MuiCircularProgress-indeterminate")
    ).toBeInTheDocument();
  });

  it("applies secondary color to linear", () => {
    const { container } = render(<Progress color="secondary" />);
    expect(
      container.querySelector(".MuiLinearProgress-colorSecondary")
    ).toBeInTheDocument();
  });

  it("applies custom size to circular", () => {
    const { container } = render(<Progress type="circular" size={60} />);
    const el = container.querySelector(".MuiCircularProgress-root") as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.style.width).toBe("60px");
  });

  it("forwards ref for linear", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Progress ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("forwards ref for circular", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Progress type="circular" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
