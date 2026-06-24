import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Accordion } from "./Accordion";

const getSummaryButton = () => screen.getByRole("button", { name: /section one/i });

describe("Accordion", () => {
  it("renders summary and details content", () => {
    render(<Accordion summary="Section One" details={<div>Content One</div>} />);
    expect(screen.getByText("Section One")).toBeInTheDocument();
    expect(screen.getByText("Content One")).toBeInTheDocument();
  });

  it("renders custom summary node", () => {
    render(
      <Accordion summary={<span>Custom Summary</span>} details={<div>Content One</div>} />
    );
    expect(screen.getByText("Custom Summary")).toBeInTheDocument();
  });

  it("is collapsed by default", () => {
    render(<Accordion summary="Section One" details={<div>Content One</div>} />);
    expect(getSummaryButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("expands on click", () => {
    render(<Accordion summary="Section One" details={<div>Content One</div>} />);
    fireEvent.click(getSummaryButton());
    expect(getSummaryButton()).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses an expanded section on second click", () => {
    render(<Accordion summary="Section One" details={<div>Content One</div>} />);
    fireEvent.click(getSummaryButton());
    fireEvent.click(getSummaryButton());
    expect(getSummaryButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("renders expanded when defaultExpanded is true", () => {
    render(
      <Accordion summary="Section One" details={<div>Content One</div>} defaultExpanded />
    );
    expect(getSummaryButton()).toHaveAttribute("aria-expanded", "true");
  });

  it("supports controlled expanded state", () => {
    const { rerender } = render(
      <Accordion
        summary="Section One"
        details={<div>Content One</div>}
        expanded={false}
      />
    );
    expect(getSummaryButton()).toHaveAttribute("aria-expanded", "false");
    rerender(
      <Accordion summary="Section One" details={<div>Content One</div>} expanded />
    );
    expect(getSummaryButton()).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onChange when section expands", () => {
    const onChange = vi.fn();
    render(
      <Accordion
        summary="Section One"
        details={<div>Content One</div>}
        onChange={onChange}
      />
    );
    fireEvent.click(getSummaryButton());
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange when section collapses", () => {
    const onChange = vi.fn();
    render(
      <Accordion
        summary="Section One"
        details={<div>Content One</div>}
        defaultExpanded
        onChange={onChange}
      />
    );
    fireEvent.click(getSummaryButton());
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("renders disabled state", () => {
    render(<Accordion summary="Section One" details={<div>Content One</div>} disabled />);
    expect(screen.getByText("Section One").closest(".MuiAccordion-root")).toHaveClass(
      "Mui-disabled"
    );
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Accordion summary="Section One" details={<div>Content One</div>} ref={ref} />
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts sx as style object", () => {
    render(
      <Accordion
        summary="Section One"
        details={<div>Content One</div>}
        sx={{ borderColor: "rgb(255, 0, 0)" }}
      />
    );
    expect(screen.getByText("Section One")).toBeInTheDocument();
  });

  it("accepts sx as style array", () => {
    render(
      <Accordion
        summary="Section One"
        details={<div>Content One</div>}
        sx={[{ borderColor: "rgb(0, 0, 255)" }]}
      />
    );
    expect(screen.getByText("Section One")).toBeInTheDocument();
  });

  it("renders a checkbox when checkable is true", () => {
    render(
      <Accordion summary="Section One" details={<div>Content One</div>} checkable />
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("toggles internal checked state when uncontrolled checkbox is clicked", () => {
    render(
      <Accordion summary="Section One" details={<div>Content One</div>} checkable />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("calls onCheckChange when checkbox is clicked", () => {
    const onCheckChange = vi.fn();
    render(
      <Accordion
        summary="Section One"
        details={<div>Content One</div>}
        checkable
        onCheckChange={onCheckChange}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckChange).toHaveBeenCalledWith(true);
  });

  it("does not expand accordion when checkbox is clicked", () => {
    render(
      <Accordion summary="Section One" details={<div>Content One</div>} checkable />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(getSummaryButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("calls onCheckChange but does not update internal state when controlled", () => {
    const onCheckChange = vi.fn();
    render(
      <Accordion
        summary="Section One"
        details={<div>Content One</div>}
        checkable
        checked={false}
        onCheckChange={onCheckChange}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckChange).toHaveBeenCalledWith(true);
  });
});
