import { describe, it, expect } from "vitest";
import { alchemyDarkTheme } from "../theme/dark";
import { alchemyTheme } from "../theme";
import { accentChipSx, neutralChipSx, semanticChipSx } from "./semanticChipStyles";

describe("semanticChipStyles", () => {
  it("returns light-mode semantic colors", () => {
    const styles = semanticChipSx(alchemyTheme, "success");
    expect(styles.backgroundColor).toBeDefined();
    expect(styles.color).toBeDefined();
    expect(styles.border).toContain("solid");
  });

  it("returns dark-mode semantic colors", () => {
    const styles = semanticChipSx(alchemyDarkTheme, "primary");
    expect(styles.backgroundColor).toBeDefined();
    expect(styles.color).toBeDefined();
  });

  it("returns neutral chip colors", () => {
    const light = neutralChipSx(alchemyTheme);
    const dark = neutralChipSx(alchemyDarkTheme);
    expect(light.color).not.toEqual(dark.color);
  });

  it("returns accent chip colors with optional dark tone", () => {
    const styles = accentChipSx(alchemyDarkTheme, "#6A1B9A", "#4A148C");
    expect(styles.color).toBe("#6A1B9A");
  });

  it("returns accent chip colors without dark tone in light mode", () => {
    const styles = accentChipSx(alchemyTheme, "#6A1B9A");
    expect(styles.color).toBe("#6A1B9A");
  });
});
