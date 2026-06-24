import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { DashboardLayout } from "./DashboardLayout";

describe("DashboardLayout", () => {
  it("renders children in main content", () => {
    render(
      <DashboardLayout>
        <div data-testid="main-content">Page content</div>
      </DashboardLayout>
    );
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
  });

  it("renders sidebar when provided", () => {
    render(
      <DashboardLayout sidebar={<nav data-testid="sidebar">Nav</nav>}>
        Content
      </DashboardLayout>
    );
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renders appBar when provided", () => {
    render(
      <DashboardLayout appBar={<header data-testid="appbar">Header</header>}>
        Content
      </DashboardLayout>
    );
    expect(screen.getByTestId("appbar")).toBeInTheDocument();
  });

  it("renders all sections together", () => {
    render(
      <DashboardLayout
        sidebar={<nav data-testid="nav">Nav</nav>}
        appBar={<header data-testid="header">Header</header>}
      >
        <main data-testid="content">Main</main>
      </DashboardLayout>
    );
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders without sidebar", () => {
    render(
      <DashboardLayout>
        <p>No sidebar</p>
      </DashboardLayout>
    );
    expect(screen.getByText("No sidebar")).toBeInTheDocument();
    expect(document.querySelector("nav")).not.toBeInTheDocument();
  });

  it("renders without appBar", () => {
    render(
      <DashboardLayout>
        <p>No header</p>
      </DashboardLayout>
    );
    expect(screen.getByText("No header")).toBeInTheDocument();
    expect(document.querySelector("header")).not.toBeInTheDocument();
  });

  it("renders content without crashing when contentMaxWidth provided", () => {
    render(
      <DashboardLayout contentMaxWidth={1200}>
        <span data-testid="inner">Content</span>
      </DashboardLayout>
    );
    // contentMaxWidth is applied via emotion CSS classes, not inline style
    expect(screen.getByTestId("inner")).toBeInTheDocument();
  });

  it("renders nav element for sidebar region", () => {
    render(<DashboardLayout sidebar={<div>Nav</div>}>Content</DashboardLayout>);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders main element for content area", () => {
    render(<DashboardLayout>Content</DashboardLayout>);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
