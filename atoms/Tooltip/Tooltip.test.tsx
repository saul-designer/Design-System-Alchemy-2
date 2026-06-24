import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders children in the document", () => {
    render(
      <Tooltip title="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("renders with string title", () => {
    render(
      <Tooltip title="Helper text">
        <span>Target</span>
      </Tooltip>
    );
    expect(screen.getByText("Target")).toBeInTheDocument();
  });

  it("shows tooltip content when open is true", () => {
    render(
      <Tooltip title="Always visible" open>
        <button>Button</button>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Always visible")).toBeInTheDocument();
  });

  it("renders with arrow prop", () => {
    render(
      <Tooltip title="With arrow" arrow open>
        <button>Button</button>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("renders with placement prop", () => {
    render(
      <Tooltip title="Bottom tooltip" placement="bottom" open>
        <button>Button</button>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("does not show tooltip when title is empty string", () => {
    render(
      <Tooltip title="">
        <button>Button</button>
      </Tooltip>
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Tooltip title="Ref test" ref={ref} open>
        <button>Button</button>
      </Tooltip>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
