import { describe, it, expect } from "vitest";
import { borderRadius, shapeConfig } from "./shape";

describe("borderRadius", () => {
  it("none is 0", () => {
    expect(borderRadius.none).toBe(0);
  });

  it("xs is 4", () => {
    expect(borderRadius.xs).toBe(4);
  });

  it("sm is 8", () => {
    expect(borderRadius.sm).toBe(8);
  });

  it("md is 12", () => {
    expect(borderRadius.md).toBe(12);
  });

  it("lg is 16", () => {
    expect(borderRadius.lg).toBe(16);
  });

  it("xl is 24", () => {
    expect(borderRadius.xl).toBe(24);
  });

  it("pill is 100", () => {
    expect(borderRadius.pill).toBe(100);
  });

  it("values increase from none to pill", () => {
    expect(borderRadius.none).toBeLessThan(borderRadius.xs);
    expect(borderRadius.xs).toBeLessThan(borderRadius.sm);
    expect(borderRadius.sm).toBeLessThan(borderRadius.md);
    expect(borderRadius.md).toBeLessThan(borderRadius.lg);
    expect(borderRadius.lg).toBeLessThan(borderRadius.xl);
    expect(borderRadius.xl).toBeLessThan(borderRadius.pill);
  });
});

describe("shapeConfig", () => {
  it("borderRadius matches borderRadius.sm", () => {
    expect(shapeConfig.borderRadius).toBe(borderRadius.sm);
  });

  it("borderRadius is 8", () => {
    expect(shapeConfig.borderRadius).toBe(8);
  });
});
