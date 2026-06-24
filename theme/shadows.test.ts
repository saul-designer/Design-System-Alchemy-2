import { describe, it, expect } from "vitest";
import { shadows } from "./shadows";

describe("shadows", () => {
  it("has exactly 25 elevations", () => {
    expect(shadows).toHaveLength(25);
  });

  it("elevation 0 is none", () => {
    expect(shadows[0]).toBe("none");
  });

  it("elevation 1 is a non-empty string", () => {
    expect(typeof shadows[1]).toBe("string");
    expect(shadows[1].length).toBeGreaterThan(0);
  });

  it("elevation 24 is defined", () => {
    expect(typeof shadows[24]).toBe("string");
    expect(shadows[24].length).toBeGreaterThan(0);
  });

  it("all elevations are strings", () => {
    shadows.forEach((shadow) => {
      expect(typeof shadow).toBe("string");
    });
  });

  it("elevations 1-24 contain rgba values", () => {
    shadows.slice(1).forEach((shadow) => {
      expect(shadow).toMatch(/rgba/);
    });
  });
});
