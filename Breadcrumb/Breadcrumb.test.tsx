import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders all breadcrumb labels", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Details" },
    ];
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("renders last item as non-link text", () => {
    const items = [{ label: "Home", href: "/" }, { label: "Current Page" }];
    render(<Breadcrumb items={items} />);
    const last = screen.getByText("Current Page");
    expect(last.tagName).toBe("P");
    expect(last).toHaveAttribute("aria-current", "page");
  });

  it("renders href items as anchor links", () => {
    const items = [{ label: "Home", href: "/home" }, { label: "Last" }];
    render(<Breadcrumb items={items} />);
    const link = screen.getByText("Home").closest("a");
    expect(link).toHaveAttribute("href", "/home");
  });

  it("renders onClick items as buttons", () => {
    const handleClick = vi.fn();
    const items = [{ label: "Home", onClick: handleClick }, { label: "Current" }];
    render(<Breadcrumb items={items} />);
    fireEvent.click(screen.getByText("Home"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a single-item breadcrumb (just the current page)", () => {
    const items = [{ label: "Only Page" }];
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Only Page")).toBeInTheDocument();
    expect(screen.getByText("Only Page")).toHaveAttribute("aria-current", "page");
  });

  it("forwards ref", () => {
    const items = [{ label: "Home", href: "/" }, { label: "Page" }];
    const ref = React.createRef<HTMLElement>();
    render(<Breadcrumb ref={ref} items={items} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
