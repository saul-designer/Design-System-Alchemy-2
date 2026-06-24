import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Fab } from "./Fab";

describe("Fab", () => {
  it("renders as a button", () => {
    render(<Fab aria-label="add">+</Fab>);
    expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(
      <Fab aria-label="add" onClick={onClick}>
        +
      </Fab>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as disabled", () => {
    render(
      <Fab aria-label="add" disabled>
        +
      </Fab>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders with small size", () => {
    const { container } = render(
      <Fab aria-label="add" size="small">
        +
      </Fab>
    );
    expect(container.querySelector(".MuiFab-sizeSmall")).toBeInTheDocument();
  });

  it("renders with medium size", () => {
    const { container } = render(
      <Fab aria-label="add" size="medium">
        +
      </Fab>
    );
    expect(container.querySelector(".MuiFab-sizeMedium")).toBeInTheDocument();
  });

  it("renders with extended variant", () => {
    const { container } = render(
      <Fab variant="extended" aria-label="navigate">
        Navigate
      </Fab>
    );
    expect(container.querySelector(".MuiFab-extended")).toBeInTheDocument();
  });

  it("renders with secondary color", () => {
    render(
      <Fab color="secondary" aria-label="add">
        +
      </Fab>
    );
    expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
  });

  it("renders with inherit color", () => {
    const { container } = render(
      <Fab color="inherit" aria-label="add">
        +
      </Fab>
    );
    expect(container.querySelector(".MuiFab-root")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Fab ref={ref} aria-label="add">
        +
      </Fab>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
