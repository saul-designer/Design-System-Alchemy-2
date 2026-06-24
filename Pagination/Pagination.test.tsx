import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders pagination navigation", () => {
    render(<Pagination count={10} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders page buttons", () => {
    render(<Pagination count={5} />);
    expect(screen.getByRole("button", { name: /go to page 3/i })).toBeInTheDocument();
  });

  it("marks the active page with aria-current", () => {
    render(<Pagination count={10} page={1} />);
    const pageOneBtn = screen.getByRole("button", { name: /^page 1$/i });
    expect(pageOneBtn).toHaveAttribute("aria-current", "page");
  });

  it("marks the correct active page", () => {
    render(<Pagination count={10} page={5} />);
    const pageFiveBtn = screen.getByRole("button", { name: /^page 5$/i });
    expect(pageFiveBtn).toHaveAttribute("aria-current", "page");
  });

  it("calls onChange when a page is clicked", () => {
    const onChange = vi.fn();
    render(<Pagination count={10} page={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /go to page 2/i }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 2);
  });

  it("renders outlined variant", () => {
    const { container } = render(<Pagination count={5} variant="outlined" />);
    expect(container.querySelector(".MuiPagination-outlined")).toBeInTheDocument();
  });

  it("renders rounded shape", () => {
    const { container } = render(<Pagination count={5} shape="rounded" />);
    expect(container.querySelector(".MuiPagination-root")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination count={10} page={1} />);
    expect(screen.getByRole("button", { name: /go to previous page/i })).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination count={5} page={5} />);
    expect(screen.getByRole("button", { name: /go to next page/i })).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Pagination count={5} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
