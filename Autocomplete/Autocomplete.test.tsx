import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Autocomplete } from "./Autocomplete";

const options = ["Apple", "Banana", "Cherry", "Date"];

describe("Autocomplete", () => {
  it("renders the combobox input", () => {
    render(<Autocomplete options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders with a label element", () => {
    const { container } = render(<Autocomplete options={options} label="Fruit" />);
    expect(container.querySelector("label")).toHaveTextContent("Fruit");
  });

  it("renders with placeholder", () => {
    render(<Autocomplete options={options} label="Fruit" placeholder="Select a fruit" />);
    expect(screen.getByPlaceholderText("Select a fruit")).toBeInTheDocument();
  });

  it("renders with error state", () => {
    const { container } = render(<Autocomplete options={options} error />);
    expect(container.querySelector(".Mui-error")).toBeInTheDocument();
  });

  it("renders with helperText", () => {
    render(<Autocomplete options={options} helperText="Choose one" />);
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });

  it("renders without optional props", () => {
    render(<Autocomplete options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows options on input change", () => {
    render(<Autocomplete options={options} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "a" } });
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("calls onChange when option is selected", () => {
    const onChange = vi.fn();
    render(<Autocomplete options={options} onChange={onChange} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Apple" } });
    fireEvent.click(screen.getByText("Apple"));
    expect(onChange).toHaveBeenCalled();
  });

  it("renders as disabled", () => {
    render(<Autocomplete options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders in multiple selection mode", () => {
    render(<Autocomplete options={options} multiple />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders in freeSolo mode and accepts custom input", () => {
    render(<Autocomplete options={options} freeSolo />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Custom value" } });
    expect((input as HTMLInputElement).value).toBe("Custom value");
  });

  it("renders with small size", () => {
    const { container } = render(<Autocomplete options={options} size="small" />);
    expect(container.querySelector(".MuiInputBase-sizeSmall")).toBeInTheDocument();
  });

  it("uses inputAriaLabel when the visible label is omitted", () => {
    render(<Autocomplete options={options} inputAriaLabel="Fruit" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "Fruit");
    expect(screen.queryByText("Fruit")).not.toBeInTheDocument();
  });
});
