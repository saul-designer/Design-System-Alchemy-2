/**
 * Covers the MUI ≥ v9 slotProps fallback branches in renderInput.
 * MUI v9 passes slot props via params.slotProps instead of the legacy
 * top-level InputProps / inputProps / InputLabelProps keys.
 */
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "../../test/render";
import { Autocomplete } from "./Autocomplete";

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

describe("Autocomplete — MUI v9 slotProps fallback", () => {
  it("renders the label when renderInput receives slotProps instead of legacy keys", () => {
    const { container } = render(
      <Autocomplete options={["Apple", "Banana"]} label="Fruit" />
    );
    expect(container.querySelector("label")?.textContent).toContain("Fruit");
  });
});
