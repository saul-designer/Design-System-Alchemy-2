import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { AppBar } from "./AppBar";

const defaultProps = {
  greeting: "Good Morning, Saúl",
  userInitials: "SC",
};

describe("AppBar", () => {
  it("renders without crashing", () => {
    const { container } = render(<AppBar {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders a custom appLogo node", () => {
    render(
      <AppBar {...defaultProps} appLogo={<img alt="Custom logo" src="logo.png" />} />
    );
    expect(screen.getByAltText("Custom logo")).toBeInTheDocument();
  });

  it("renders greeting", () => {
    render(<AppBar {...defaultProps} greeting="Hello, World" />);
    expect(screen.getByText(/Hello, World/)).toBeInTheDocument();
  });

  it("renders userInitials in avatar", () => {
    render(<AppBar {...defaultProps} userInitials="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders notification bell button", () => {
    render(<AppBar {...defaultProps} />);
    expect(screen.getByTitle("Notifications")).toBeInTheDocument();
  });

  it("shows notification dot when hasNotification is true", () => {
    render(<AppBar {...defaultProps} hasNotification />);
    expect(screen.getByTestId("notification-dot")).toBeInTheDocument();
  });

  it("hides notification dot when hasNotification is false", () => {
    render(<AppBar {...defaultProps} hasNotification={false} />);
    const bell = screen.getByTitle("Notifications");
    expect(bell.parentElement?.children).toHaveLength(1);
  });

  it("defaults hasNotification to false", () => {
    render(<AppBar {...defaultProps} />);
    const bell = screen.getByTitle("Notifications");
    expect(bell.parentElement?.children).toHaveLength(1);
  });

  it("renders sun icon alongside greeting", () => {
    render(<AppBar {...defaultProps} />);
    expect(screen.getByTestId("WbSunnyIcon")).toBeInTheDocument();
  });

  it("renders notifications icon", () => {
    render(<AppBar {...defaultProps} />);
    expect(screen.getByTestId("NotificationsNoneIcon")).toBeInTheDocument();
  });
});
