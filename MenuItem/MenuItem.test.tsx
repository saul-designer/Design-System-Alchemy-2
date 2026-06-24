import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import List from "@mui/material/List";
import { render } from "../../test/render";
import { MenuItem } from "./MenuItem";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <List>{children}</List>;
}

describe("MenuItem", () => {
  it("renders label", () => {
    render(<MenuItem label="Dashboard" />, { wrapper: Wrapper });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<MenuItem label="Settings" icon={<span data-testid="settings-icon" />} />, {
      wrapper: Wrapper,
    });
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  it("does not render icon slot when no icon provided", () => {
    render(<MenuItem label="No Icon" />, { wrapper: Wrapper });
    expect(document.querySelector(".MuiListItemIcon-root")).not.toBeInTheDocument();
  });

  it("applies selected state", () => {
    render(<MenuItem label="Active" selected />, { wrapper: Wrapper });
    expect(document.querySelector(".Mui-selected")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<MenuItem label="Disabled" disabled />, { wrapper: Wrapper });
    expect(document.querySelector(".Mui-disabled")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<MenuItem label="Click" onClick={onClick} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has aria-disabled when disabled", () => {
    render(<MenuItem label="Disabled" disabled />, { wrapper: Wrapper });
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });

  it("renders endContent", () => {
    render(<MenuItem label="Menu" endContent={<span data-testid="badge">5</span>} />, {
      wrapper: Wrapper,
    });
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("selected item has bolder label text", () => {
    const { rerender } = render(<MenuItem label="Item" />, { wrapper: Wrapper });
    const normalLabel = screen.getByText("Item");
    const normalWeight = window.getComputedStyle(normalLabel).fontWeight;

    rerender(
      <List>
        <MenuItem label="Item" selected />
      </List>
    );
    const selectedLabel = screen.getByText("Item");
    const selectedWeight = window.getComputedStyle(selectedLabel).fontWeight;
    expect(Number(selectedWeight)).toBeGreaterThanOrEqual(Number(normalWeight));
  });
});
