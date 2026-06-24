import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../test/render";
import { useAlchemyForm } from "./useAlchemyForm";
import { ControlledRadioGroup } from "./ControlledRadioGroup";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

function TestForm() {
  const { control } = useAlchemyForm({ defaultValues: { choice: "" } });
  return (
    <ControlledRadioGroup
      control={control}
      name="choice"
      options={options}
      label="Choose"
    />
  );
}

describe("ControlledRadioGroup", () => {
  it("renders options", () => {
    renderWithTheme(<TestForm />);
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
    expect(screen.getByLabelText("Option B")).toBeInTheDocument();
  });

  it("renders group label", () => {
    renderWithTheme(<TestForm />);
    expect(screen.getByText("Choose")).toBeInTheDocument();
  });

  it("selects option on click", async () => {
    renderWithTheme(<TestForm />);
    const optionA = screen.getByLabelText("Option A");
    await userEvent.click(optionA);
    expect(optionA).toBeChecked();
  });

  it("renders with default value", () => {
    function DefaultForm() {
      const { control } = useAlchemyForm({ defaultValues: { choice: "b" } });
      return <ControlledRadioGroup control={control} name="choice" options={options} />;
    }
    renderWithTheme(<DefaultForm />);
    expect(screen.getByLabelText("Option B")).toBeChecked();
  });

  it("handles undefined field value with empty string fallback", () => {
    function UndefinedForm() {
      const { control } = useAlchemyForm<{ choice?: string }>({});
      return (
        <ControlledRadioGroup
          control={control}
          name={"choice" as never}
          options={options}
        />
      );
    }
    renderWithTheme(<UndefinedForm />);
    expect(screen.getAllByRole("radio")[0]).not.toBeChecked();
  });
});
