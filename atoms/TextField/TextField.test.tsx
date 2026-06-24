import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("renders with label", () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<TextField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders controlled value", () => {
    render(<TextField value="hello" onChange={() => {}} />);
    expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<TextField onChange={onChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<TextField disabled label="Disabled" />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  it("shows error state", () => {
    render(<TextField label="Email" error helperText="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("renders startAdornment", () => {
    render(<TextField startAdornment={<span data-testid="start-icon" />} />);
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("renders endAdornment", () => {
    render(<TextField endAdornment={<span data-testid="end-icon" />} />);
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("renders both adornments", () => {
    render(
      <TextField
        startAdornment={<span data-testid="start" />}
        endAdornment={<span data-testid="end" />}
      />
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("renders multiline", () => {
    render(<TextField multiline rows={4} label="Description" />);
    expect(screen.getByLabelText("Description").tagName).toBe("TEXTAREA");
  });

  it("renders small size", () => {
    render(<TextField size="small" label="Small" />);
    expect(screen.getByLabelText("Small")).toBeInTheDocument();
  });

  it("renders as required", () => {
    render(<TextField required label="Required" />);
    const input = screen.getByLabelText(/Required/);
    expect(input).toBeRequired();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TextField ref={ref} label="Ref" />);
    expect(ref.current).toBeTruthy();
  });

  it("renders with filled variant", () => {
    render(<TextField variant="filled" label="Filled" />);
    expect(screen.getByLabelText("Filled")).toBeInTheDocument();
  });

  it("renders with standard variant", () => {
    render(<TextField variant="standard" label="Standard" />);
    expect(screen.getByLabelText("Standard")).toBeInTheDocument();
  });
});
