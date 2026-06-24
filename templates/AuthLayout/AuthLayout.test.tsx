import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { AuthLayout } from "./AuthLayout";

describe("AuthLayout", () => {
  it("renders children inside the card", () => {
    render(
      <AuthLayout>
        <form data-testid="login-form">
          <input />
        </form>
      </AuthLayout>
    );
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<AuthLayout title="Sign In">Content</AuthLayout>);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(
      <AuthLayout title="Login" subtitle="Welcome back">
        Content
      </AuthLayout>
    );
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  it("renders logo", () => {
    render(<AuthLayout logo={<img alt="Logo" src="/logo.png" />}>Content</AuthLayout>);
    expect(screen.getByRole("img", { name: "Logo" })).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(<AuthLayout footer={<a href="/signup">Sign up</a>}>Content</AuthLayout>);
    expect(screen.getByRole("link", { name: "Sign up" })).toBeInTheDocument();
  });

  it("does not render title section when no title, subtitle or logo", () => {
    render(<AuthLayout>Just content</AuthLayout>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders background content panel", () => {
    render(
      <AuthLayout backgroundContent={<div data-testid="bg-content">Side panel</div>}>
        Content
      </AuthLayout>
    );
    expect(screen.getByTestId("bg-content")).toBeInTheDocument();
  });

  it("does not render background panel when not provided", () => {
    const { container } = render(<AuthLayout>Content</AuthLayout>);
    const bgPanel = container.querySelector("[style*='background']");
    expect(bgPanel).not.toBeInTheDocument();
  });

  it("renders children regardless of other props", () => {
    render(
      <AuthLayout title="Test" subtitle="Sub" logo={<span />} footer={<span />}>
        <button>Submit</button>
      </AuthLayout>
    );
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders Paper card for form", () => {
    const { container } = render(<AuthLayout>Form</AuthLayout>);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });
});
