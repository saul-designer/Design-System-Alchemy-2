import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../test/render";
import { useAlchemyForm } from "./useAlchemyForm";
import { ControlledSelect } from "./ControlledSelect";

const options = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

function TestForm() {
  const { control } = useAlchemyForm({ defaultValues: { role: "" } });
  return (
    <ControlledSelect control={control} name="role" label="Role" options={options} />
  );
}

describe("ControlledSelect", () => {
  it("renders select element", () => {
    renderWithTheme(<TestForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders options", () => {
    renderWithTheme(<TestForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows helper text when provided", () => {
    function FormWithHelper() {
      const { control } = useAlchemyForm({ defaultValues: { role: "" } });
      return (
        <ControlledSelect
          control={control}
          name="role"
          label="Role"
          options={options}
          helperText="Choose a role"
        />
      );
    }
    renderWithTheme(<FormWithHelper />);
    expect(screen.getByText("Choose a role")).toBeInTheDocument();
  });
});
