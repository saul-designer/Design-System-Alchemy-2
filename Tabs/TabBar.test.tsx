import { Folder, LayoutDashboard } from "lucide-react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { TabBar } from "./TabBar";

const items = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard data-testid="dashboard-icon" />,
  },
  { id: "files", label: "Files", icon: <Folder data-testid="files-icon" /> },
  { id: "reports", label: "Reports", disabled: true },
];

describe("TabBar", () => {
  it("renders all tab labels", () => {
    render(<TabBar items={items} value="dashboard" onChange={() => undefined} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Files")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
  });

  it("calls onChange with tab id when clicked", () => {
    const onChange = vi.fn();
    render(<TabBar items={items} value="dashboard" onChange={onChange} />);
    fireEvent.click(screen.getByText("Files"));
    expect(onChange).toHaveBeenCalledWith("files");
  });

  it("renders tab icons", () => {
    render(<TabBar items={items} value="dashboard" onChange={() => undefined} />);
    expect(screen.getByTestId("dashboard-icon")).toBeInTheDocument();
    expect(screen.getByTestId("files-icon")).toBeInTheDocument();
  });

  it("renders disabled tab", () => {
    render(<TabBar items={items} value="dashboard" onChange={() => undefined} />);
    const disabledTab = screen.getByText("Reports").closest("button");
    expect(disabledTab).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TabBar ref={ref} items={items} value="dashboard" onChange={() => undefined} />
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("falls back to first tab when value is unknown", () => {
    render(<TabBar items={items} value="missing" onChange={() => undefined} />);
    expect(screen.getByRole("tab", { name: /dashboard/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("supports underline style variant", () => {
    render(
      <TabBar
        items={items}
        value="dashboard"
        onChange={() => undefined}
        styleVariant="underline"
      />
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
