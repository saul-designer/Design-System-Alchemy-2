import { Home } from "lucide-react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Menu } from "./Menu";

const anchor = document.createElement("button");
document.body.appendChild(anchor);

const items = [
  { label: "Home", onClick: vi.fn(), icon: <Home data-testid="home-icon" /> },
  { label: "Settings", onClick: vi.fn() },
  { label: "Divider Item", onClick: vi.fn(), divider: true },
  { label: "Disabled", onClick: vi.fn(), disabled: true },
];

describe("Menu", () => {
  it("renders menu items when open", () => {
    render(<Menu items={items} open anchorEl={anchor} onClose={() => {}} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Divider Item")).toBeInTheDocument();
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });

  it("does not render items when closed", () => {
    render(<Menu items={items} open={false} anchorEl={anchor} onClose={() => {}} />);
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("renders icon for items with icon prop", () => {
    render(<Menu items={items} open anchorEl={anchor} onClose={() => {}} />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("renders divider before item with divider prop", () => {
    render(<Menu items={items} open anchorEl={anchor} onClose={() => {}} />);
    expect(document.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  it("calls onClick when item is clicked", () => {
    const onClick = vi.fn();
    render(
      <Menu
        items={[{ label: "Click me", onClick }]}
        open
        anchorEl={anchor}
        onClose={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders disabled items", () => {
    render(<Menu items={items} open anchorEl={anchor} onClose={() => {}} />);
    const disabledItem = screen.getByText("Disabled").closest("[role='menuitem']");
    expect(disabledItem).toHaveAttribute("aria-disabled", "true");
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<Menu items={items} open anchorEl={anchor} onClose={onClose} />);
    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders items without icon when icon prop is absent", () => {
    render(
      <Menu items={[{ label: "No icon" }]} open anchorEl={anchor} onClose={() => {}} />
    );
    expect(screen.getByText("No icon")).toBeInTheDocument();
    expect(document.querySelector(".MuiListItemIcon-root")).not.toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Menu items={items} open anchorEl={anchor} onClose={() => {}} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("blurs background focus when opened", () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Open menu";
    document.body.appendChild(trigger);
    trigger.focus();
    const blurSpy = vi.spyOn(trigger, "blur");

    render(<Menu items={items} open anchorEl={anchor} onClose={() => {}} />);

    expect(blurSpy).toHaveBeenCalled();
    expect(document.activeElement).not.toBe(trigger);
  });

  it("blurs menu item focus and restores anchor when closed", () => {
    const anchor = document.createElement("button");
    anchor.textContent = "Open menu";
    document.body.appendChild(anchor);

    const menuItem = document.createElement("button");
    menuItem.textContent = "Menu item";
    menuItem.className = "MuiMenuItem-root";
    menuItem.focus();

    const blurSpy = vi.spyOn(menuItem, "blur");
    const focusSpy = vi.spyOn(anchor, "focus");
    const activeElementDescriptor = Object.getOwnPropertyDescriptor(
      document,
      "activeElement"
    );

    Object.defineProperty(document, "activeElement", {
      configurable: true,
      get: () => menuItem,
    });

    const { rerender } = render(
      <Menu items={items} open anchorEl={anchor} onClose={() => {}} />
    );

    rerender(<Menu items={items} open={false} anchorEl={anchor} onClose={() => {}} />);

    if (activeElementDescriptor) {
      Object.defineProperty(document, "activeElement", activeElementDescriptor);
    }

    expect(blurSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });

  it("restores focus to anchor when a menu item is pressed", () => {
    const anchor = document.createElement("button");
    document.body.appendChild(anchor);
    const focusSpy = vi.spyOn(anchor, "focus");

    render(<Menu items={items} open anchorEl={anchor} onClose={() => {}} />);

    fireEvent.mouseDown(screen.getByText("Home"));

    expect(focusSpy).toHaveBeenCalled();
  });

  it("does not release focus on non-primary mouse button press", () => {
    const menuAnchor = document.createElement("button");
    document.body.appendChild(menuAnchor);
    const focusSpy = vi.spyOn(menuAnchor, "focus");

    render(<Menu items={items} open anchorEl={menuAnchor} onClose={() => {}} />);

    fireEvent.mouseDown(screen.getByText("Home"), { button: 2 });

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it("does not release focus when a disabled item is pressed", () => {
    const menuAnchor = document.createElement("button");
    document.body.appendChild(menuAnchor);
    const focusSpy = vi.spyOn(menuAnchor, "focus");

    render(<Menu items={items} open anchorEl={menuAnchor} onClose={() => {}} />);

    fireEvent.mouseDown(screen.getByText("Disabled"));

    expect(focusSpy).not.toHaveBeenCalled();
  });
});
