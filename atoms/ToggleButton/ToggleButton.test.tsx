import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { ToggleButton, ToggleButtonGroup } from "./ToggleButton";

describe("ToggleButton", () => {
  it("renders the button with its label", () => {
    render(<ToggleButton value="bold">Bold</ToggleButton>);
    expect(screen.getByText("Bold")).toBeInTheDocument();
  });

  it("is not selected by default when standalone", () => {
    render(<ToggleButton value="bold">Bold</ToggleButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("renders with small size", () => {
    const { container } = render(
      <ToggleButton value="a" size="small">
        A
      </ToggleButton>
    );
    expect(container.querySelector(".MuiToggleButton-sizeSmall")).toBeInTheDocument();
  });

  it("renders as disabled", () => {
    render(
      <ToggleButton value="a" disabled>
        A
      </ToggleButton>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <ToggleButton value="a" ref={ref}>
        A
      </ToggleButton>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe("ToggleButtonGroup", () => {
  it("renders all buttons inside the group", () => {
    render(
      <ToggleButtonGroup value="left">
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("marks the selected button as pressed", () => {
    render(
      <ToggleButtonGroup value="left">
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
    expect(screen.getByText("Left").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByText("Right").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("calls onChange when a button is clicked", () => {
    const onChange = vi.fn();
    render(
      <ToggleButtonGroup value="left" onChange={onChange}>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
    fireEvent.click(screen.getByText("Right").closest("button")!);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("allows multiple selection when exclusive is not set", () => {
    render(
      <ToggleButtonGroup value={["left", "center"]}>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
    expect(screen.getByText("Left").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByText("Center").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByText("Right").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("renders in exclusive mode", () => {
    const { container } = render(
      <ToggleButtonGroup value="center" exclusive>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
    expect(container.querySelector(".MuiToggleButtonGroup-root")).toBeInTheDocument();
  });

  it("disables a specific button inside the group", () => {
    render(
      <ToggleButtonGroup value="left">
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right" disabled>
          Right
        </ToggleButton>
      </ToggleButtonGroup>
    );
    expect(screen.getByText("Right").closest("button")).toBeDisabled();
  });

  it("renders in vertical orientation", () => {
    const { container } = render(
      <ToggleButtonGroup value="left" orientation="vertical">
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
    expect(container.querySelector(".MuiToggleButtonGroup-vertical")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ToggleButtonGroup value="left" ref={ref}>
        <ToggleButton value="left">Left</ToggleButton>
      </ToggleButtonGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
