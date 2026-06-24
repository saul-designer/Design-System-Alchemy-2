import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { ButtonGroup } from "./ButtonGroup";

const buttons = [
  { label: "One", onClick: vi.fn() },
  { label: "Two", onClick: vi.fn() },
  { label: "Three", onClick: vi.fn() },
];

describe("ButtonGroup", () => {
  it("renders all button labels", () => {
    render(<ButtonGroup buttons={buttons} />);
    expect(screen.getByRole("button", { name: "One" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Two" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Three" })).toBeInTheDocument();
  });

  it("calls onClick when a button is clicked", () => {
    const onClick = vi.fn();
    render(<ButtonGroup buttons={[{ label: "Click", onClick }]} />);
    fireEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables individual buttons", () => {
    render(
      <ButtonGroup buttons={[{ label: "Disabled", disabled: true, onClick: vi.fn() }]} />
    );
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("renders with outlined variant by default", () => {
    const { container } = render(<ButtonGroup buttons={buttons} />);
    expect(container.querySelector(".MuiButtonGroup-outlined")).toBeInTheDocument();
  });

  it("renders with contained variant", () => {
    const { container } = render(<ButtonGroup buttons={buttons} variant="contained" />);
    expect(container.querySelector(".MuiButtonGroup-contained")).toBeInTheDocument();
  });

  it("renders with text variant", () => {
    const { container } = render(<ButtonGroup buttons={buttons} variant="text" />);
    expect(container.querySelector(".MuiButtonGroup-text")).toBeInTheDocument();
  });

  it("renders in vertical orientation", () => {
    const { container } = render(
      <ButtonGroup buttons={buttons} orientation="vertical" />
    );
    expect(container.querySelector(".MuiButtonGroup-vertical")).toBeInTheDocument();
  });

  it("renders with small size", () => {
    const { container } = render(<ButtonGroup buttons={buttons} size="small" />);
    expect(container.querySelector(".MuiButton-sizeSmall")).toBeInTheDocument();
  });

  it("renders with large size", () => {
    const { container } = render(<ButtonGroup buttons={buttons} size="large" />);
    expect(container.querySelector(".MuiButton-sizeLarge")).toBeInTheDocument();
  });

  it("renders startIcon in a button", () => {
    render(
      <ButtonGroup
        buttons={[{ label: "Save", startIcon: <span data-testid="icon">★</span> }]}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders endIcon in a button", () => {
    render(
      <ButtonGroup
        buttons={[{ label: "Next", endIcon: <span data-testid="end-icon">→</span> }]}
      />
    );
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("renders button without onClick gracefully", () => {
    render(<ButtonGroup buttons={[{ label: "No handler" }]} />);
    expect(screen.getByRole("button", { name: "No handler" })).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ButtonGroup buttons={buttons} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
