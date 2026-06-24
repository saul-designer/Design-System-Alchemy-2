import { describe, it, expect } from "vitest";
import { spacingUnit, spacingTokens } from "./spacing";

describe("spacingUnit", () => {
  it("is 8px base", () => {
    expect(spacingUnit).toBe(8);
  });
});

describe("spacingTokens", () => {
  it("token 0 is 0px", () => {
    expect(spacingTokens[0]).toBe(0);
  });

  it("token 1 is 4px", () => {
    expect(spacingTokens[1]).toBe(4);
  });

  it("token 2 is 8px", () => {
    expect(spacingTokens[2]).toBe(8);
  });

  it("token 4 is 16px", () => {
    expect(spacingTokens[4]).toBe(16);
  });

  it("token 6 is 24px", () => {
    expect(spacingTokens[6]).toBe(24);
  });

  it("token 12 is 48px", () => {
    expect(spacingTokens[12]).toBe(48);
  });

  it("token 32 is 128px", () => {
    expect(spacingTokens[32]).toBe(128);
  });

  it("each token equals key × 4", () => {
    (Object.entries(spacingTokens) as [string, number][]).forEach(([key, value]) => {
      expect(value).toBe(Number(key) * 4);
    });
  });
});
