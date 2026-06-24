/**
 * Covers the MUI ≥ v9 slotProps fallback branches in renderInput.
 * MUI v9 will pass slot props via params.slotProps instead of the legacy
 * top-level InputProps / inputProps / InputLabelProps keys.
 * We simulate that by mocking Autocomplete to call renderInput with v9-style params.
 */
import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { useForm } from "react-hook-form";
import { render } from "../test/render";
import { ControlledAutocomplete } from "./ControlledAutocomplete";

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

beforeAll(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

vi.mock("@mui/material/Autocomplete", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    default: ({ renderInput }: { renderInput: (params: unknown) => React.ReactNode }) =>
      renderInput({
        id: "test-autocomplete",
        disabled: false,
        fullWidth: true,
        size: undefined,
        // No legacy keys — only slotProps (MUI v9 style)
        slotProps: {
          inputLabel: { htmlFor: "test-autocomplete" },
          input: {
            ref: () => {},
            className: "MuiOutlinedInput-root",
            startAdornment: null,
            endAdornment: null,
            onMouseDown: () => {},
          },
          htmlInput: { className: "MuiInputBase-input", disabled: false },
        },
      }) as React.ReactElement,
  };
});

const users = [{ id: 1, name: "Alice" }];

function Form() {
  const { control } = useForm({ defaultValues: { tags: [] as number[] } });
  return (
    <ControlledAutocomplete
      name="tags"
      control={control}
      data={users}
      label="Tags"
      getOptionLabel={(u) => u.name}
      getOptionValue={(u) => u.id}
    />
  );
}

describe("ControlledAutocomplete — MUI v9 slotProps fallback", () => {
  it("renders the label when renderInput receives slotProps instead of legacy keys", () => {
    const { container } = render(<Form />);
    expect(container.querySelector("label")?.textContent).toContain("Tags");
  });
});
