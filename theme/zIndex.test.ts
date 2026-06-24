import { describe, it, expect } from "vitest";
import { zIndex } from "./zIndex";

describe("zIndex", () => {
  it("mobileStepper is 1000", () => {
    expect(zIndex.mobileStepper).toBe(1000);
  });

  it("appBar is 1100", () => {
    expect(zIndex.appBar).toBe(1100);
  });

  it("drawer is 1200", () => {
    expect(zIndex.drawer).toBe(1200);
  });

  it("modal is 1300", () => {
    expect(zIndex.modal).toBe(1300);
  });

  it("snackbar is 1400", () => {
    expect(zIndex.snackbar).toBe(1400);
  });

  it("tooltip is 1500", () => {
    expect(zIndex.tooltip).toBe(1500);
  });

  it("values increase in stacking order", () => {
    expect(zIndex.mobileStepper).toBeLessThan(zIndex.appBar);
    expect(zIndex.appBar).toBeLessThan(zIndex.drawer);
    expect(zIndex.drawer).toBeLessThan(zIndex.modal);
    expect(zIndex.modal).toBeLessThan(zIndex.snackbar);
    expect(zIndex.snackbar).toBeLessThan(zIndex.tooltip);
  });
});
