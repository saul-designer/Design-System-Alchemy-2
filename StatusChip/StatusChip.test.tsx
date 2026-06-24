import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { StatusChip, type StatusVariant } from "./StatusChip";

const ALL_STATUSES: StatusVariant[] = [
  "active",
  "inactive",
  "pending",
  "completed",
  "cancelled",
  "in_progress",
  "on_hold",
  "error",
  "draft",
];

describe("StatusChip", () => {
  it.each(ALL_STATUSES)("renders %s status without crashing", (status) => {
    render(<StatusChip status={status} />);
    expect(document.querySelector(".MuiChip-root")).toBeInTheDocument();
  });

  it("renders correct default label for active", () => {
    render(<StatusChip status="active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders correct default label for inactive", () => {
    render(<StatusChip status="inactive" />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("renders correct default label for pending", () => {
    render(<StatusChip status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("renders correct default label for completed", () => {
    render(<StatusChip status="completed" />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders correct default label for cancelled", () => {
    render(<StatusChip status="cancelled" />);
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("renders correct default label for in_progress", () => {
    render(<StatusChip status="in_progress" />);
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders correct default label for on_hold", () => {
    render(<StatusChip status="on_hold" />);
    expect(screen.getByText("On Hold")).toBeInTheDocument();
  });

  it("renders correct default label for error", () => {
    render(<StatusChip status="error" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders correct default label for draft", () => {
    render(<StatusChip status="draft" />);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("renders custom label overriding default", () => {
    render(<StatusChip status="active" label="En Producción" />);
    expect(screen.getByText("En Producción")).toBeInTheDocument();
    expect(screen.queryByText("Active")).not.toBeInTheDocument();
  });

  it("renders small size by default", () => {
    render(<StatusChip status="active" />);
    expect(document.querySelector(".MuiChip-sizeSmall")).toBeInTheDocument();
  });

  it("renders medium size when specified", () => {
    render(<StatusChip status="active" size="medium" />);
    expect(document.querySelector(".MuiChip-sizeMedium")).toBeInTheDocument();
  });
});
