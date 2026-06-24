import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { FilterBar } from "./FilterBar";

const mockFilters = [
  <input key="1" data-testid="filter-1" placeholder="Filter 1" />,
  <input key="2" data-testid="filter-2" placeholder="Filter 2" />,
];

describe("FilterBar", () => {
  it("renders the toggle button", () => {
    render(<FilterBar filters={mockFilters} />);
    expect(screen.getByRole("button", { name: /show filters/i })).toBeInTheDocument();
  });

  it("starts closed by default", () => {
    render(<FilterBar filters={mockFilters} />);
    expect(screen.getByRole("button", { name: /show filters/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /hide filters/i })
    ).not.toBeInTheDocument();
  });

  it("opens the panel when toggle button is clicked (uncontrolled)", () => {
    render(<FilterBar filters={mockFilters} />);
    fireEvent.click(screen.getByRole("button", { name: /show filters/i }));
    expect(screen.getByRole("button", { name: /hide filters/i })).toBeInTheDocument();
  });

  it("starts open when defaultOpen is true", () => {
    render(<FilterBar filters={mockFilters} defaultOpen />);
    expect(screen.getByRole("button", { name: /hide filters/i })).toBeInTheDocument();
  });

  it("calls onOpenChange when toggled", () => {
    const onOpenChange = vi.fn();
    render(<FilterBar filters={mockFilters} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: /show filters/i }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("respects controlled open prop", () => {
    render(<FilterBar filters={mockFilters} open={true} />);
    expect(screen.getByRole("button", { name: /hide filters/i })).toBeInTheDocument();
  });

  it("shows Clear button when onClearAll is provided", () => {
    const onClearAll = vi.fn();
    render(<FilterBar filters={mockFilters} defaultOpen onClearAll={onClearAll} />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("calls onClearAll when Clear button is clicked", () => {
    const onClearAll = vi.fn();
    render(<FilterBar filters={mockFilters} defaultOpen onClearAll={onClearAll} />);
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(onClearAll).toHaveBeenCalledOnce();
  });

  it("hides Clear button when showClearButton is false", () => {
    const onClearAll = vi.fn();
    render(
      <FilterBar
        filters={mockFilters}
        defaultOpen
        onClearAll={onClearAll}
        showClearButton={false}
      />
    );
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("renders custom show/hide labels", () => {
    render(
      <FilterBar
        filters={mockFilters}
        showLabel="Open Filters"
        hideLabel="Close Filters"
      />
    );
    expect(screen.getByRole("button", { name: /open filters/i })).toBeInTheDocument();
  });

  it("renders toolbarStart content", () => {
    render(
      <FilterBar
        filters={mockFilters}
        toolbarStart={<input data-testid="search" placeholder="Search" />}
      />
    );
    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  it("renders filter items when open", () => {
    render(<FilterBar filters={mockFilters} defaultOpen />);
    expect(screen.getByTestId("filter-1")).toBeInTheDocument();
    expect(screen.getByTestId("filter-2")).toBeInTheDocument();
  });

  it("renders empty filters without crashing", () => {
    render(<FilterBar filters={[]} />);
    expect(screen.getByRole("button", { name: /show filters/i })).toBeInTheDocument();
  });

  it("renders filters inline without toggle button", () => {
    render(
      <FilterBar
        filters={mockFilters}
        inline
        toolbarStart={<input data-testid="inline-search" placeholder="Search" />}
      />
    );
    expect(screen.getByTestId("inline-search")).toBeInTheDocument();
    expect(screen.getByTestId("filter-1")).toBeInTheDocument();
    expect(screen.getByTestId("filter-2")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /show filters/i })
    ).not.toBeInTheDocument();
  });

  it("renders inline clear button when onClearAll is provided", () => {
    const onClearAll = vi.fn();
    render(<FilterBar filters={mockFilters} inline onClearAll={onClearAll} />);
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(onClearAll).toHaveBeenCalledOnce();
  });

  it("hides inline clear button when showClearButton is false", () => {
    const onClearAll = vi.fn();
    render(
      <FilterBar
        filters={mockFilters}
        inline
        onClearAll={onClearAll}
        showClearButton={false}
      />
    );
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });
});
