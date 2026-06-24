import { describe, it, expect } from "vitest";
import { alchemyDarkTheme } from "./dark";

describe("alchemyDarkTheme", () => {
  it("has dark palette mode", () => {
    expect(alchemyDarkTheme.palette.mode).toBe("dark");
  });

  it("uses dark background color", () => {
    expect(alchemyDarkTheme.palette.background.default).toBe("#0B0F19");
  });

  it("uses dark paper color", () => {
    expect(alchemyDarkTheme.palette.background.paper).toBe("#131929");
  });

  it("uses lighter primary for dark mode", () => {
    expect(alchemyDarkTheme.palette.primary.main).toBe("#4D82F5");
  });
});
