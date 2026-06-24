import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { List } from "./List";

const items = [
  { id: 1, primary: "Inbox", secondary: "5 new messages" },
  { id: 2, primary: "Starred" },
  { id: 3, primary: "Trash", disabled: true },
];

describe("List", () => {
  it("renders all item labels", () => {
    render(<List items={items} />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
    expect(screen.getByText("Starred")).toBeInTheDocument();
    expect(screen.getByText("Trash")).toBeInTheDocument();
  });

  it("renders secondary text", () => {
    render(<List items={items} />);
    expect(screen.getByText("5 new messages")).toBeInTheDocument();
  });

  it("renders a subheader when provided", () => {
    render(<List items={items} subheader="Folders" />);
    expect(screen.getByText("Folders")).toBeInTheDocument();
  });

  it("renders items with onClick as ListItemButton", () => {
    const onClick = vi.fn();
    render(<List items={[{ primary: "Click me", onClick }]} />);
    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables a ListItemButton when disabled", () => {
    render(<List items={[{ primary: "Disabled", onClick: vi.fn(), disabled: true }]} />);
    expect(screen.getByRole("button", { name: "Disabled" })).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });

  it("marks item as selected", () => {
    render(<List items={[{ primary: "Selected", onClick: vi.fn(), selected: true }]} />);
    expect(screen.getByRole("button", { name: "Selected" })).toHaveClass("Mui-selected");
  });

  it("renders a divider after items with divider flag", () => {
    const { container } = render(
      <List items={[{ primary: "Item A", divider: true }, { primary: "Item B" }]} />
    );
    expect(container.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(
      <List
        items={[
          {
            primary: "With icon",
            icon: <span data-testid="icon">★</span>,
          },
        ]}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders icon in a clickable item", () => {
    render(
      <List
        items={[
          {
            primary: "Icon + click",
            icon: <span data-testid="icon2">★</span>,
            onClick: vi.fn(),
          },
        ]}
      />
    );
    expect(screen.getByTestId("icon2")).toBeInTheDocument();
  });

  it("renders in dense mode", () => {
    const { container } = render(<List items={items} dense />);
    expect(container.querySelector(".MuiList-dense")).toBeInTheDocument();
  });

  it("uses item index as key when id is not provided", () => {
    render(<List items={[{ primary: "No ID" }]} />);
    expect(screen.getByText("No ID")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<List items={items} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
