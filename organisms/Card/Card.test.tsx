import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders title in header", () => {
    render(<Card title="My Card">Content</Card>);
    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  it("renders subtitle in header", () => {
    render(
      <Card title="Title" subtitle="Subtitle text">
        Content
      </Card>
    );
    expect(screen.getByText("Subtitle text")).toBeInTheDocument();
  });

  it("renders headerAction", () => {
    render(
      <Card title="Card" headerAction={<button>Action</button>}>
        Content
      </Card>
    );
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(<Card footer={<button>Save</button>}>Content</Card>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders divider after header when dividerAfterHeader=true", () => {
    const { container } = render(
      <Card title="Title" dividerAfterHeader>
        Content
      </Card>
    );
    expect(container.querySelectorAll(".MuiDivider-root").length).toBeGreaterThan(0);
  });

  it("does not render header when no title, subtitle or headerAction", () => {
    render(<Card>No header</Card>);
    expect(document.querySelector(".MuiCardHeader-root")).not.toBeInTheDocument();
  });

  it("renders footer divider by default when footer is present", () => {
    const { container } = render(<Card footer={<span>Footer</span>}>Content</Card>);
    expect(container.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  it("does not render footer divider when dividerBeforeFooter=false", () => {
    const { container } = render(
      <Card footer={<span>Footer</span>} dividerBeforeFooter={false}>
        Content
      </Card>
    );
    expect(container.querySelector(".MuiDivider-root")).not.toBeInTheDocument();
  });

  it("renders without footer when footer not provided", () => {
    render(<Card>No footer</Card>);
    expect(document.querySelector(".MuiCardActions-root")).not.toBeInTheDocument();
  });

  it("renders MUI Card with elevation", () => {
    const { container } = render(<Card elevation={4}>Content</Card>);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("renders noPadding removes content padding", () => {
    render(<Card noPadding>Content</Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders ReactNode as title", () => {
    render(<Card title={<span data-testid="custom-title">Custom</span>}>Content</Card>);
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
