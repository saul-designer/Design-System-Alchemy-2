import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../test/render";
import { useAlchemyForm } from "./useAlchemyForm";
import { ControlledTextField } from "./ControlledTextField";

function TestForm({ onSubmit = () => {} }: { onSubmit?: (data: unknown) => void }) {
  const { control, handleSubmit } = useAlchemyForm({
    defaultValues: { email: "" },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField control={control} name="email" label="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("ControlledTextField", () => {
  it("renders with label", () => {
    renderWithTheme(<TestForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("updates value on user input", async () => {
    renderWithTheme(<TestForm />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });

  it("shows validation error", async () => {
    const { z } = await import("zod");
    const schema = z.object({ email: z.string().email("Invalid email") });
    function ErrorForm() {
      const form = useAlchemyForm({
        schema,
        defaultValues: { email: "bad" },
        mode: "all",
      });
      return (
        <form onSubmit={form.handleSubmit(() => {})}>
          <ControlledTextField control={form.control} name="email" label="Email" />
          <button type="submit">Submit</button>
        </form>
      );
    }
    renderWithTheme(<ErrorForm />);
    await userEvent.click(screen.getAllByText("Submit")[0]);
    expect(await screen.findByText("Invalid email")).toBeInTheDocument();
  });

  it("shows static helperText when no error", () => {
    function FormWithHelper() {
      const { control } = useAlchemyForm({ defaultValues: { note: "" } });
      return (
        <ControlledTextField
          control={control}
          name="note"
          label="Note"
          helperText="Optional"
        />
      );
    }
    renderWithTheme(<FormWithHelper />);
    expect(screen.getByText("Optional")).toBeInTheDocument();
  });
});
