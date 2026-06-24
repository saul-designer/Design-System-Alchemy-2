import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Sidebar, type SidebarSection } from "./Sidebar";

const sections: SidebarSection[] = [
  {
    items: [{ label: "Dashboard", onClick: vi.fn() }, { label: "Projects" }],
  },
  {
    title: "System",
    items: [{ label: "Settings" }],
  },
];

describe("Sidebar", () => {
  it("renders menu item labels", () => {
    render(<Sidebar sections={sections} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders section title", () => {
    render(<Sidebar sections={sections} />);
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("renders brand title", () => {
    render(<Sidebar sections={sections} title="Alchemy" />);
    expect(screen.getByText("Alchemy")).toBeInTheDocument();
  });

  it("renders logo", () => {
    render(<Sidebar sections={sections} logo={<span data-testid="logo" />} />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(
      <Sidebar
        sections={sections}
        footer={<div data-testid="footer-content">User info</div>}
      />
    );
    expect(screen.getByTestId("footer-content")).toBeInTheDocument();
  });

  it("does not render footer when not provided", () => {
    render(<Sidebar sections={sections} />);
    expect(screen.queryByTestId("footer-content")).not.toBeInTheDocument();
  });

  it("renders selected item with visual indicator", () => {
    const selectedSections: SidebarSection[] = [
      {
        items: [{ label: "Dashboard", selected: true }],
      },
    ];
    render(<Sidebar sections={selectedSections} />);
    expect(document.querySelector(".Mui-selected")).toBeInTheDocument();
  });

  it("renders item with icon", () => {
    const withIcon: SidebarSection[] = [
      {
        items: [{ label: "Home", icon: <span data-testid="home-icon" /> }],
      },
    ];
    render(<Sidebar sections={withIcon} />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("calls onClick for menu items", () => {
    const onClick = vi.fn();
    render(<Sidebar sections={[{ items: [{ label: "Click me", onClick }] }]} />);
    fireEvent.click(screen.getByRole("button", { name: /Click me/i }));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders permanent variant by default", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.querySelector(".MuiDrawer-root")).toBeInTheDocument();
  });

  it("renders multiple sections with dividers", () => {
    render(<Sidebar sections={sections} />);
    expect(document.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  it("renders with custom width without crashing", () => {
    render(<Sidebar sections={sections} width={300} />);
    // Width is applied via sx/emotion classes — verify items render correctly
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(document.querySelector(".MuiDrawer-root")).toBeInTheDocument();
  });

  it("toggles collapsed state when toggle button is clicked", () => {
    render(<Sidebar sections={sections} collapsible />);
    const toggleBtn = screen.getByRole("button", { name: /collapse sidebar/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /expand sidebar/i })).toBeInTheDocument();
  });

  it("calls onCollapsedChange when toggle button is clicked", () => {
    const onCollapsedChange = vi.fn();
    render(
      <Sidebar sections={sections} collapsible onCollapsedChange={onCollapsedChange} />
    );
    fireEvent.click(screen.getByRole("button", { name: /collapse sidebar/i }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it("respects controlled collapsed prop", () => {
    render(<Sidebar sections={sections} collapsible collapsed={true} />);
    expect(screen.getByRole("button", { name: /expand sidebar/i })).toBeInTheDocument();
  });

  it("renders logo in collapsed state", () => {
    render(
      <Sidebar
        sections={sections}
        collapsible
        collapsed={true}
        logo={<span data-testid="collapsed-logo" />}
      />
    );
    expect(screen.getByTestId("collapsed-logo")).toBeInTheDocument();
  });

  it("renders persistent variant", () => {
    render(<Sidebar sections={sections} variant="persistent" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders temporary variant", () => {
    render(<Sidebar sections={sections} variant="temporary" open />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("calls onClose when temporary drawer backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<Sidebar sections={sections} variant="temporary" open onClose={onClose} />);
    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("blurs focused element when temporary drawer closes", () => {
    render(<Sidebar sections={sections} variant="temporary" open onClose={vi.fn()} />);
    const menuItem = screen.getByRole("button", { name: /Dashboard/i });
    menuItem.focus();
    const blurSpy = vi.spyOn(menuItem, "blur");

    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) fireEvent.click(backdrop);

    expect(blurSpy).toHaveBeenCalled();
  });

  it("restores focus via restoreFocusRef when temporary drawer closes", async () => {
    const restoreTarget = React.createRef<HTMLButtonElement>();
    const { rerender } = render(
      <>
        <button ref={restoreTarget}>Trigger</button>
        <Sidebar
          sections={sections}
          variant="temporary"
          open
          restoreFocusRef={restoreTarget}
        />
      </>
    );
    const focusSpy = vi.spyOn(restoreTarget.current!, "focus");

    rerender(
      <>
        <button ref={restoreTarget}>Trigger</button>
        <Sidebar
          sections={sections}
          variant="temporary"
          open={false}
          restoreFocusRef={restoreTarget}
        />
      </>
    );

    await vi.waitFor(() =>
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
    );
  });
});
