import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../test/render";
import { useAlchemyForm } from "./useAlchemyForm";
import { ControlledCheckbox } from "./ControlledCheckbox";

function TestForm() {
  const { control } = useAlchemyForm({ defaultValues: { agree: false } });
  return <ControlledCheckbox control={control} name="agree" />;
}

describe("ControlledCheckbox", () => {
  it("renders unchecked by default", () => {
    renderWithTheme(<TestForm />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("toggles on click", async () => {
    renderWithTheme(<TestForm />);
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("renders checked when default value is true", () => {
    function CheckedForm() {
      const { control } = useAlchemyForm({ defaultValues: { agree: true } });
      return <ControlledCheckbox control={control} name="agree" />;
    }
    renderWithTheme(<CheckedForm />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
