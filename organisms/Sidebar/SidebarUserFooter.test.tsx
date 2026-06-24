import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { SidebarUserFooter } from "./SidebarUserFooter";

describe("SidebarUserFooter", () => {
  it("renders name and email", () => {
    render(<SidebarUserFooter name="Saúl Castillo" email="saul@elementos.co" />);
    expect(screen.getByText("Saúl Castillo")).toBeInTheDocument();
    expect(screen.getByText("saul@elementos.co")).toBeInTheDocument();
  });

  it("does not render sign-out button when onSignOut is not provided", () => {
    render(<SidebarUserFooter name="Saúl Castillo" email="saul@elementos.co" />);
    expect(screen.queryByTitle("Sign out")).not.toBeInTheDocument();
  });

  it("renders sign-out button when onSignOut is provided", () => {
    render(
      <SidebarUserFooter
        name="Saúl Castillo"
        email="saul@elementos.co"
        onSignOut={() => {}}
      />
    );
    expect(screen.getByTitle("Sign out")).toBeInTheDocument();
  });

  it("calls onSignOut when sign-out button is clicked", () => {
    const onSignOut = vi.fn();
    render(
      <SidebarUserFooter
        name="Saúl Castillo"
        email="saul@elementos.co"
        onSignOut={onSignOut}
      />
    );
    fireEvent.click(screen.getByTitle("Sign out"));
    expect(onSignOut).toHaveBeenCalled();
  });
});
