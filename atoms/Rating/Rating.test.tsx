import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("renders with default 5 stars", () => {
    render(<Rating />);
    // MUI renders radio inputs for each star value
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBeGreaterThanOrEqual(5);
  });

  it("renders with a custom max", () => {
    render(<Rating max={3} name="stars" />);
    const radios = screen.getAllByRole("radio");
    // MUI adds an empty radio for "0 stars" too
    expect(radios.length).toBeGreaterThanOrEqual(3);
  });

  it("reflects the provided value", () => {
    render(<Rating name="quality" value={3} onChange={() => {}} />);
    const checked = screen.getByRole("radio", { name: /3 stars/i });
    expect(checked).toBeChecked();
  });

  it("calls onChange when a star is clicked", () => {
    const onChange = vi.fn();
    render(<Rating name="quality" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: /2 stars/i }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders as read-only", () => {
    render(<Rating value={4} readOnly />);
    const radios = screen.queryAllByRole("radio");
    expect(radios).toHaveLength(0);
  });

  it("renders as disabled", () => {
    render(<Rating name="quality" disabled />);
    const radios = screen.getAllByRole("radio");
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  it("renders with half-star precision", () => {
    render(<Rating name="quality" value={2.5} precision={0.5} readOnly />);
    const { container } = render(
      <Rating name="quality2" value={2.5} precision={0.5} readOnly />
    );
    expect(container.querySelector(".MuiRating-decimal")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Rating ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
