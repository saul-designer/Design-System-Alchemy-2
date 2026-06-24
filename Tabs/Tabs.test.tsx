import { Home } from "lucide-react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { Tabs } from "./Tabs";

const tabs = [
  { label: "Tab One", content: <div>Content One</div> },
  { label: "Tab Two", content: <div>Content Two</div> },
  { label: "Tab Three", content: <div>Content Three</div>, disabled: true },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Tab One")).toBeInTheDocument();
    expect(screen.getByText("Tab Two")).toBeInTheDocument();
    expect(screen.getByText("Tab Three")).toBeInTheDocument();
  });

  it("shows first tab content by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Content One")).toBeInTheDocument();
  });

  it("shows second tab when clicked", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByText("Tab Two"));
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });

  it("calls onChange when tab changes", () => {
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} onChange={onChange} />);
    fireEvent.click(screen.getByText("Tab Two"));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("renders with defaultTab set to second tab", () => {
    render(<Tabs tabs={tabs} defaultTab={1} />);
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });

  it("renders disabled tab", () => {
    render(<Tabs tabs={tabs} />);
    const disabledTab = screen.getByText("Tab Three").closest("button");
    expect(disabledTab).toBeDisabled();
  });

  it("renders tab with icon", () => {
    const tabsWithIcon = [
      {
        label: "Home",
        content: <div>Home</div>,
        icon: <Home data-testid="home-icon" />,
      },
    ];
    render(<Tabs tabs={tabsWithIcon} />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Tabs ref={ref} tabs={tabs} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders pill style variant and switches tabs", () => {
    render(
      <Tabs
        tabs={tabs}
        styleVariant="pill"
        slotProps={{ root: { "data-testid": "pill-tabs" } }}
      />
    );
    fireEvent.click(screen.getByText("Tab Two"));
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });

  it("merges array sx props in pill style variant", () => {
    render(<Tabs tabs={tabs} styleVariant="pill" sx={[{ padding: 2 }, { margin: 1 }]} />);
    expect(screen.getByText("Content One")).toBeInTheDocument();
  });
});
