import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { AuthLayoutHeroContent } from "./AuthLayoutHeroContent";

describe("AuthLayoutHeroContent", () => {
  it("renders heading parts", () => {
    render(
      <AuthLayoutHeroContent
        headingStart="Send, sign, and"
        headingHighlight="track"
        headingEnd="agreements."
      />
    );
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Send, sign, and");
    expect(heading).toHaveTextContent("track");
    expect(heading).toHaveTextContent("agreements.");
  });

  it("renders description", () => {
    render(<AuthLayoutHeroContent description="Manage your documents." />);
    expect(screen.getByText("Manage your documents.")).toBeInTheDocument();
  });

  it("renders copyright", () => {
    render(<AuthLayoutHeroContent copyright="© 2026 Acme" />);
    expect(screen.getByText("© 2026 Acme")).toBeInTheDocument();
  });

  it("renders logo", () => {
    render(<AuthLayoutHeroContent logo={<img alt="Logo" src="/logo.svg" />} />);
    expect(screen.getByRole("img", { name: "Logo" })).toBeInTheDocument();
  });

  it("omits heading when no heading props provided", () => {
    render(<AuthLayoutHeroContent description="Only description" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders heading without highlight when headingHighlight is omitted", () => {
    render(<AuthLayoutHeroContent headingStart="Welcome" headingEnd="to the app." />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Welcome");
    expect(heading).toHaveTextContent("to the app.");
    expect(heading.querySelector("strong")).not.toBeInTheDocument();
  });

  it("omits description when not provided", () => {
    render(<AuthLayoutHeroContent headingStart="Hello" />);
    expect(screen.queryByText(/document/)).not.toBeInTheDocument();
  });

  it("omits copyright when not provided", () => {
    const { container } = render(<AuthLayoutHeroContent headingStart="Hello" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  it("renders nothing when no props given", () => {
    const { container } = render(<AuthLayoutHeroContent />);
    expect(container).toBeEmptyDOMElement();
  });
});
