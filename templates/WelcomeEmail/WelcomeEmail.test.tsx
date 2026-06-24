import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { WelcomeEmail } from "./WelcomeEmail";

describe("WelcomeEmail", () => {
  it("renders children in the body section", () => {
    render(
      <WelcomeEmail>
        <p>Hello, world!</p>
      </WelcomeEmail>
    );
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("renders the Alchemy logo", () => {
    const { container } = render(<WelcomeEmail>Content</WelcomeEmail>);
    expect(container.querySelector('svg[aria-label="Alchemy"]')).toBeInTheDocument();
  });

  it("renders the default support email in the footer", () => {
    render(<WelcomeEmail>Content</WelcomeEmail>);
    expect(screen.getByText("support@therealchemy.com")).toBeInTheDocument();
  });

  it("renders a custom support email in the footer", () => {
    render(<WelcomeEmail supportEmail="help@example.com">Content</WelcomeEmail>);
    expect(screen.getByText("help@example.com")).toBeInTheDocument();
  });

  it("support email link points to the correct mailto address", () => {
    render(<WelcomeEmail supportEmail="help@example.com">Content</WelcomeEmail>);
    expect(screen.getByRole("link", { name: "help@example.com" })).toHaveAttribute(
      "href",
      "mailto:help@example.com"
    );
  });

  it("renders the footer thanks message", () => {
    render(<WelcomeEmail>Content</WelcomeEmail>);
    expect(screen.getByText(/The Alchemy Team/)).toBeInTheDocument();
  });

  it("renders arbitrary children regardless of type", () => {
    render(
      <WelcomeEmail>
        <button>Activate My Account</button>
        <a href="/reset">Reset</a>
      </WelcomeEmail>
    );
    expect(
      screen.getByRole("button", { name: "Activate My Account" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reset" })).toBeInTheDocument();
  });
});
