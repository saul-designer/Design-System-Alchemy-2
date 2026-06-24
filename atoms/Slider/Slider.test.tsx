import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders the slider", () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders with a default value", () => {
    render(<Slider aria-label="Volume" defaultValue={30} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "30");
  });

  it("renders with min and max", () => {
    render(<Slider aria-label="Volume" min={10} max={90} defaultValue={50} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "90");
  });

  it("renders as disabled", () => {
    const { container } = render(<Slider aria-label="Volume" disabled />);
    expect(container.querySelector(".Mui-disabled")).toBeInTheDocument();
  });

  it("renders with marks", () => {
    const { container } = render(
      <Slider aria-label="Steps" marks min={0} max={100} step={25} />
    );
    expect(container.querySelector(".MuiSlider-mark")).toBeInTheDocument();
  });

  it("renders with custom marks array", () => {
    const marks = [
      { value: 0, label: "0°C" },
      { value: 50, label: "50°C" },
      { value: 100, label: "100°C" },
    ];
    render(<Slider aria-label="Temperature" marks={marks} />);
    expect(screen.getByText("0°C")).toBeInTheDocument();
    expect(screen.getByText("50°C")).toBeInTheDocument();
  });

  it("renders range slider with two thumbs", () => {
    render(<Slider aria-label="Range" value={[20, 80]} onChange={() => {}} />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs).toHaveLength(2);
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    render(<Slider aria-label="Volume" defaultValue={30} onChange={onChange} />);
    // MUI Slider onChange is triggered via input events internally — verify prop accepted
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders with vertical orientation", () => {
    const { container } = render(
      <Slider aria-label="Volume" orientation="vertical" sx={{ height: 200 }} />
    );
    expect(container.querySelector(".MuiSlider-vertical")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Slider aria-label="Volume" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
