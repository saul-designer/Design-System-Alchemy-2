import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../test/render";
import { ChangelogPage } from "./ChangelogPage";

vi.mock("../../CHANGELOG.md?raw", () => ({
  default: `# Changelog

## [Unreleased]

### Fixed

- Test fix item

### Added

#### Atoms
- \`Button\` — loading state

## [0.1.0] — 2026-01-01

### Added

- Initial release
`,
}));

describe("ChangelogPage", () => {
  it("renders page title and package name", () => {
    render(<ChangelogPage />);
    expect(screen.getByRole("heading", { name: "Changelog" })).toBeInTheDocument();
    expect(screen.getByText("@elementos-development/alchemy-ui")).toBeInTheDocument();
  });

  it("renders current version chip", () => {
    render(<ChangelogPage />);
    expect(screen.getByText(/Current version: v/)).toBeInTheDocument();
  });

  it("renders unreleased and versioned release cards", () => {
    render(<ChangelogPage />);
    expect(screen.getByText("Unreleased")).toBeInTheDocument();
    expect(screen.getByText("v0.1.0")).toBeInTheDocument();
    expect(screen.getByText("2026-01-01")).toBeInTheDocument();
  });

  it("renders section chips and changelog items", () => {
    render(<ChangelogPage />);
    expect(screen.getByText("Fixed")).toBeInTheDocument();
    expect(screen.getAllByText("Added").length).toBeGreaterThan(0);
    expect(screen.getByText("Test fix item")).toBeInTheDocument();
    expect(screen.getByText("Atoms")).toBeInTheDocument();
    expect(screen.getByText(/Button.*loading state/)).toBeInTheDocument();
    expect(screen.getByText("Initial release")).toBeInTheDocument();
  });
});
