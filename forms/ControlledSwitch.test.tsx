import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../test/render";
import { useAlchemyForm } from "./useAlchemyForm";
import { ControlledSwitch } from "./ControlledSwitch";

function TestForm() {
  const { control } = useAlchemyForm({ defaultValues: { enabled: false } });
  return <ControlledSwitch control={control} name="enabled" />;
}

describe("ControlledSwitch", () => {
  it("renders unchecked by default", () => {
    renderWithTheme(<TestForm />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("toggles on click", async () => {
    renderWithTheme(<TestForm />);
    const toggle = screen.getByRole("switch");
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it("renders checked when default value is true", () => {
    function EnabledForm() {
      const { control } = useAlchemyForm({ defaultValues: { enabled: true } });
      return <ControlledSwitch control={control} name="enabled" />;
    }
    renderWithTheme(<EnabledForm />);
    expect(screen.getByRole("switch")).toBeChecked();
  });
});
