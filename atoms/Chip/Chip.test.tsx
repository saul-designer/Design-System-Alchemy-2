import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders with label", () => {
    render(<Chip label="Tag" />);
    expect(screen.getByText("Tag")).toBeInTheDocument();
  });

  it("renders filled variant by default", () => {
    render(<Chip label="Filled" />);
    expect(screen.getByText("Filled").closest(".MuiChip-root")).toHaveClass(
      "MuiChip-filled"
    );
  });

  it("renders outlined variant", () => {
    render(<Chip label="Outlined" variant="outlined" />);
    expect(screen.getByText("Outlined").closest(".MuiChip-root")).toHaveClass(
      "MuiChip-outlined"
    );
  });

  it("renders small size", () => {
    render(<Chip label="Small" size="small" />);
    expect(screen.getByText("Small").closest(".MuiChip-root")).toHaveClass(
      "MuiChip-sizeSmall"
    );
  });

  it("renders primary color", () => {
    render(<Chip label="Primary" color="primary" />);
    expect(screen.getByText("Primary").closest(".MuiChip-root")).toHaveClass(
      "MuiChip-colorPrimary"
    );
  });

  it("renders error color", () => {
    render(<Chip label="Error" color="error" />);
    expect(screen.getByText("Error").closest(".MuiChip-root")).toHaveClass(
      "MuiChip-colorError"
    );
  });

  it("renders success color", () => {
    render(<Chip label="Success" color="success" />);
    expect(screen.getByText("Success").closest(".MuiChip-root")).toHaveClass(
      "MuiChip-colorSuccess"
    );
  });

  it("renders delete button when onDelete provided", () => {
    render(<Chip label="Deletable" onDelete={() => {}} />);
    expect(screen.getByTestId("CancelIcon")).toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = vi.fn();
    render(<Chip label="Del" onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId("CancelIcon"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("renders clickable chip", () => {
    const onClick = vi.fn();
    render(<Chip label="Click me" clickable onClick={onClick} />);
    fireEvent.click(screen.getByText("Click me").closest(".MuiChip-root")!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Chip label="Disabled" disabled />);
    expect(screen.getByText("Disabled").closest(".MuiChip-root")).toHaveClass(
      "Mui-disabled"
    );
  });

  it("renders with icon", () => {
    render(<Chip label="Icon" icon={<span data-testid="chip-icon" />} />);
    expect(screen.getByTestId("chip-icon")).toBeInTheDocument();
  });

  it("renders with preset", () => {
    render(<Chip label="Sent" preset="sent" />);
    expect(screen.getByText("Sent")).toBeInTheDocument();
  });

  it("renders inactive preset", () => {
    render(<Chip label="Inactive" preset="inactive" />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Chip ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
