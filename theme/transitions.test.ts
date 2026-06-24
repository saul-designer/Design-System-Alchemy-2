import { describe, it, expect } from "vitest";
import { transitionsConfig } from "./transitions";

describe("transitionsConfig", () => {
  describe("easing", () => {
    it("easeInOut is correct cubic-bezier", () => {
      expect(transitionsConfig.easing.easeInOut).toBe("cubic-bezier(0.4, 0, 0.2, 1)");
    });

    it("easeOut is correct cubic-bezier", () => {
      expect(transitionsConfig.easing.easeOut).toBe("cubic-bezier(0.0, 0, 0.2, 1)");
    });

    it("easeIn is correct cubic-bezier", () => {
      expect(transitionsConfig.easing.easeIn).toBe("cubic-bezier(0.4, 0, 1, 1)");
    });

    it("sharp is correct cubic-bezier", () => {
      expect(transitionsConfig.easing.sharp).toBe("cubic-bezier(0.4, 0, 0.6, 1)");
    });

    it("all easing values start with cubic-bezier", () => {
      Object.values(transitionsConfig.easing).forEach((value) => {
        expect(value).toMatch(/^cubic-bezier/);
      });
    });
  });

  describe("duration", () => {
    it("shortest is 150ms", () => {
      expect(transitionsConfig.duration.shortest).toBe(150);
    });

    it("shorter is 200ms", () => {
      expect(transitionsConfig.duration.shorter).toBe(200);
    });

    it("short is 250ms", () => {
      expect(transitionsConfig.duration.short).toBe(250);
    });

    it("standard is 300ms", () => {
      expect(transitionsConfig.duration.standard).toBe(300);
    });

    it("complex is 375ms", () => {
      expect(transitionsConfig.duration.complex).toBe(375);
    });

    it("enteringScreen is 225ms", () => {
      expect(transitionsConfig.duration.enteringScreen).toBe(225);
    });

    it("leavingScreen is 195ms", () => {
      expect(transitionsConfig.duration.leavingScreen).toBe(195);
    });

    it("durations increase from shortest to complex", () => {
      const { shortest, shorter, short, standard, complex } = transitionsConfig.duration;
      expect(shortest).toBeLessThan(shorter);
      expect(shorter).toBeLessThan(short);
      expect(short).toBeLessThan(standard);
      expect(standard).toBeLessThan(complex);
    });
  });
});
