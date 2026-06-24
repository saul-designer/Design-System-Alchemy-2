import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { AlertBanner } from "./AlertBanner";

describe("AlertBanner", () => {
  it("renders message", () => {
    render(<AlertBanner message="Something happened" />);
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<AlertBanner title="Warning" message="Please review" />);
    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByText("Please review")).toBeInTheDocument();
  });

  it("renders info severity by default", () => {
    const { container } = render(<AlertBanner message="Info message" />);
    expect(container.querySelector(".MuiAlert-colorInfo")).toBeInTheDocument();
  });

  it("renders success severity", () => {
    const { container } = render(<AlertBanner severity="success" message="Done" />);
    expect(container.querySelector(".MuiAlert-colorSuccess")).toBeInTheDocument();
  });

  it("renders warning severity", () => {
    const { container } = render(<AlertBanner severity="warning" message="Warning" />);
    expect(container.querySelector(".MuiAlert-colorWarning")).toBeInTheDocument();
  });

  it("renders error severity", () => {
    const { container } = render(<AlertBanner severity="error" message="Error" />);
    expect(container.querySelector(".MuiAlert-colorError")).toBeInTheDocument();
  });

  it("renders close button when onClose provided", () => {
    render(<AlertBanner message="Closeable" onClose={() => {}} />);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(<AlertBanner message="Close me" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders when open is true", () => {
    render(<AlertBanner message="Visible" open />);
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it("does not render content when open is false and animate is false", () => {
    render(<AlertBanner message="Hidden" open={false} animate={false} />);
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("renders Collapse wrapper by default (animate=true)", () => {
    const { container } = render(<AlertBanner message="Animated" animate />);
    expect(container.querySelector(".MuiCollapse-root")).toBeInTheDocument();
  });

  it("renders without Collapse when animate is false", () => {
    const { container } = render(<AlertBanner message="No animate" animate={false} />);
    expect(container.querySelector(".MuiCollapse-root")).not.toBeInTheDocument();
  });

  it("renders ReactNode as message", () => {
    render(
      <AlertBanner message={<span data-testid="custom-msg">Custom content</span>} />
    );
    expect(screen.getByTestId("custom-msg")).toBeInTheDocument();
  });
});
