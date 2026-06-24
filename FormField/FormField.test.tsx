import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders without crashing", () => {
    render(<FormField />);
    expect(document.querySelector(".MuiFormControl-root")).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<FormField label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(<FormField placeholder="Enter email" />);
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("shows asterisk for required fields", () => {
    render(<FormField label="Required Field" required />);
    expect(document.querySelector(".MuiFormLabel-asterisk")).toBeInTheDocument();
  });

  it("shows helperText", () => {
    render(<FormField helperText="This is a hint" />);
    expect(screen.getByText("This is a hint")).toBeInTheDocument();
  });

  it("shows hint when helperText not provided", () => {
    render(<FormField hint="Helpful hint" />);
    expect(screen.getByText("Helpful hint")).toBeInTheDocument();
  });

  it("prefers helperText over hint", () => {
    render(<FormField helperText="Helper" hint="Hint" />);
    expect(screen.getByText("Helper")).toBeInTheDocument();
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("shows error state", () => {
    render(<FormField label="Email" error helperText="Invalid email" />);
    // MUI v7 marks the input with Mui-error, not the FormControl root
    expect(document.querySelector(".MuiOutlinedInput-root")).toHaveClass("Mui-error");
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("renders disabled input", () => {
    render(<FormField label="Disabled" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<FormField onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("renders fullWidth by default", () => {
    const { container } = render(<FormField />);
    expect(container.querySelector(".MuiFormControl-fullWidth")).toBeInTheDocument();
  });

  it("renders not fullWidth when fullWidth=false", () => {
    const { container } = render(<FormField fullWidth={false} />);
    expect(container.querySelector(".MuiFormControl-fullWidth")).not.toBeInTheDocument();
  });

  it("renders startAdornment", () => {
    render(<FormField startAdornment={<span data-testid="start" />} />);
    expect(screen.getByTestId("start")).toBeInTheDocument();
  });

  it("renders endAdornment", () => {
    render(<FormField endAdornment={<span data-testid="end" />} />);
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FormField ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("does not render helperText section when no helperText or hint", () => {
    render(<FormField label="Clean" />);
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });
});
