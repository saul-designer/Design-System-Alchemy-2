import { describe, it, expect } from "vitest";
import { createAlchemyTheme } from "./createAlchemyTheme";
import { alchemyTheme } from "./index";

describe("createAlchemyTheme", () => {
  it("returns alchemyTheme defaults when called with no tokens", () => {
    const theme = createAlchemyTheme();
    expect(theme.palette.primary.main).toBe(alchemyTheme.palette.primary.main);
    expect(theme.palette.secondary.main).toBe(alchemyTheme.palette.secondary.main);
  });

  it("overrides primary color", () => {
    const theme = createAlchemyTheme({ primary: "#FF0000" });
    expect(theme.palette.primary.main).toBe("#FF0000");
  });

  it("overrides secondary color", () => {
    const theme = createAlchemyTheme({ secondary: "#00FF00" });
    expect(theme.palette.secondary.main).toBe("#00FF00");
  });

  it("overrides error color", () => {
    const theme = createAlchemyTheme({ error: "#AA0000" });
    expect(theme.palette.error.main).toBe("#AA0000");
  });

  it("overrides warning color", () => {
    const theme = createAlchemyTheme({ warning: "#FF8800" });
    expect(theme.palette.warning.main).toBe("#FF8800");
  });

  it("overrides info color", () => {
    const theme = createAlchemyTheme({ info: "#0088FF" });
    expect(theme.palette.info.main).toBe("#0088FF");
  });

  it("overrides success color", () => {
    const theme = createAlchemyTheme({ success: "#008800" });
    expect(theme.palette.success.main).toBe("#008800");
  });

  it("overrides fontFamily", () => {
    const theme = createAlchemyTheme({ fontFamily: "Inter, sans-serif" });
    expect(theme.typography.fontFamily).toBe("Inter, sans-serif");
  });

  it("overrides borderRadius", () => {
    const theme = createAlchemyTheme({ borderRadius: 4 });
    expect(theme.shape.borderRadius).toBe(4);
  });

  it("overrides background", () => {
    const theme = createAlchemyTheme({
      background: { default: "#F0F0F0", paper: "#FFFFFF" },
    });
    expect(theme.palette.background.default).toBe("#F0F0F0");
    expect(theme.palette.background.paper).toBe("#FFFFFF");
  });

  it("applies raw overrides", () => {
    const theme = createAlchemyTheme({
      overrides: {
        palette: { primary: { main: "#ABCDEF" } },
      },
    });
    expect(theme.palette.primary.main).toBe("#ABCDEF");
  });

  it("preserves non-overridden alchemy tokens", () => {
    const theme = createAlchemyTheme({ primary: "#FF0000" });
    expect(theme.palette.secondary.main).toBe(alchemyTheme.palette.secondary.main);
    expect(theme.typography.fontFamily).toBe(alchemyTheme.typography.fontFamily);
    expect(theme.shadows).toHaveLength(25);
  });

  it("supports multiple overrides simultaneously", () => {
    const theme = createAlchemyTheme({
      primary: "#FF0000",
      secondary: "#00FF00",
      borderRadius: 4,
    });
    expect(theme.palette.primary.main).toBe("#FF0000");
    expect(theme.palette.secondary.main).toBe("#00FF00");
    expect(theme.shape.borderRadius).toBe(4);
  });
});
