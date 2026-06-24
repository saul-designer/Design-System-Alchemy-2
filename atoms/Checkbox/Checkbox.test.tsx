import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders without a label", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders with a label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders as checked when defaultChecked", () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange when toggled", () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders with labelPlacement start", () => {
    const { container } = render(<Checkbox label="Check me" labelPlacement="start" />);
    expect(
      container.querySelector(".MuiFormControlLabel-labelPlacementStart")
    ).toBeInTheDocument();
  });

  it("renders with labelPlacement top", () => {
    const { container } = render(<Checkbox label="Check me" labelPlacement="top" />);
    expect(
      container.querySelector(".MuiFormControlLabel-labelPlacementTop")
    ).toBeInTheDocument();
  });

  it("renders with labelPlacement bottom", () => {
    const { container } = render(<Checkbox label="Check me" labelPlacement="bottom" />);
    expect(
      container.querySelector(".MuiFormControlLabel-labelPlacementBottom")
    ).toBeInTheDocument();
  });

  it("renders with indeterminate state", () => {
    const { container } = render(<Checkbox indeterminate />);
    expect(
      container.querySelector('[data-testid="IndeterminateCheckBoxIcon"]')
    ).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
