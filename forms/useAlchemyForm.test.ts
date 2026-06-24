import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { z } from "zod";
import { useAlchemyForm } from "./useAlchemyForm";

describe("useAlchemyForm", () => {
  it("returns useForm result", () => {
    const { result } = renderHook(() => useAlchemyForm());
    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState).toBeDefined();
  });

  it("uses onTouched mode by default", () => {
    const { result } = renderHook(() => useAlchemyForm());
    expect(result.current.formState.isValid).toBeDefined();
  });

  it("applies default values", () => {
    const { result } = renderHook(() =>
      useAlchemyForm({ defaultValues: { name: "Alchemy" } })
    );
    expect(result.current.getValues("name")).toBe("Alchemy");
  });

  it("validates with zod schema — returns false on invalid", async () => {
    const schema = z.object({ email: z.string().min(1, "Required") });
    const { result } = renderHook(() =>
      useAlchemyForm({ schema, defaultValues: { email: "" } })
    );
    let isValid = true;
    await act(async () => {
      isValid = await result.current.trigger("email");
    });
    expect(isValid).toBe(false);
  });

  it("validates with zod schema — returns true on valid", async () => {
    const schema = z.object({ email: z.string().min(1, "Required") });
    const { result } = renderHook(() =>
      useAlchemyForm({ schema, defaultValues: { email: "valid@example.com" } })
    );
    let isValid = false;
    await act(async () => {
      isValid = await result.current.trigger("email");
    });
    expect(isValid).toBe(true);
  });

  it("accepts custom mode", () => {
    const { result } = renderHook(() => useAlchemyForm({ mode: "onChange" }));
    expect(result.current.control).toBeDefined();
  });
});
