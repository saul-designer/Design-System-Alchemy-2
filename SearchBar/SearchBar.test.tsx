import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test/render";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders with placeholder", () => {
    render(<SearchBar placeholder="Search projects..." />);
    expect(screen.getByPlaceholderText("Search projects...")).toBeInTheDocument();
  });

  it("renders default placeholder when not provided", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders search icon", () => {
    render(<SearchBar />);
    expect(document.querySelector(".MuiInputAdornment-root")).toBeInTheDocument();
  });

  it("shows clear button when has value (uncontrolled)", async () => {
    render(<SearchBar defaultValue="alchemy" />);
    expect(screen.getByRole("button", { name: "clear search" })).toBeInTheDocument();
  });

  it("does not show clear button when empty (uncontrolled)", () => {
    render(<SearchBar />);
    expect(
      screen.queryByRole("button", { name: "clear search" })
    ).not.toBeInTheDocument();
  });

  it("shows clear button when controlled value is set", () => {
    render(<SearchBar value="test" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "clear search" })).toBeInTheDocument();
  });

  it("does not show clear button when controlled value is empty", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(
      screen.queryByRole("button", { name: "clear search" })
    ).not.toBeInTheDocument();
  });

  it("calls onChange when typing (uncontrolled)", async () => {
    const onChange = vi.fn();
    render(<SearchBar onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith("hello");
  });

  it("calls onChange when typing (controlled)", () => {
    const onChange = vi.fn();
    const { rerender } = render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledWith("test");
    rerender(<SearchBar value="test" onChange={onChange} />);
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  it("clears value on clear button click (uncontrolled)", async () => {
    render(<SearchBar defaultValue="hello" />);
    fireEvent.click(screen.getByRole("button", { name: "clear search" }));
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: "clear search" })
      ).not.toBeInTheDocument();
    });
  });

  it("calls onClear when clear button clicked", () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    render(<SearchBar value="test" onChange={onChange} onClear={onClear} />);
    fireEvent.click(screen.getByRole("button", { name: "clear search" }));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("calls onSearch on Enter key", () => {
    const onSearch = vi.fn();
    render(<SearchBar value="hello" onChange={() => {}} onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("hello");
  });

  it("does not call onSearch on other keys", () => {
    const onSearch = vi.fn();
    render(<SearchBar value="hello" onChange={() => {}} onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("renders disabled state", () => {
    render(<SearchBar disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders small size", () => {
    const { container } = render(<SearchBar size="small" />);
    expect(container.querySelector(".MuiInputBase-sizeSmall")).toBeInTheDocument();
  });

  it("renders not fullWidth when fullWidth=false", () => {
    const { container } = render(<SearchBar fullWidth={false} />);
    expect(container.querySelector(".MuiInputBase-fullWidth")).not.toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<SearchBar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
