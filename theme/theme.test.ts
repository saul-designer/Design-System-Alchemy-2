import { describe, it, expect } from "vitest";
import {
  alchemyTheme,
  customColors,
  palette,
  typography,
  components,
  opacities,
  borderRadius,
  shapeConfig,
  shadows,
  transitionsConfig,
  spacingTokens,
  spacingUnit,
} from "./index";

describe("alchemyTheme", () => {
  it("creates a valid MUI theme", () => {
    expect(alchemyTheme).toBeDefined();
    expect(alchemyTheme.palette).toBeDefined();
    expect(alchemyTheme.typography).toBeDefined();
  });

  describe("palette", () => {
    it("has correct primary color", () => {
      expect(alchemyTheme.palette.primary.main).toBe("#1F5FF2");
      expect(alchemyTheme.palette.primary.dark).toBe("#1565C0");
      expect(alchemyTheme.palette.primary.light).toBe("#00F0FF");
      expect(alchemyTheme.palette.primary.contrastText).toBe("#FFFFFF");
    });

    it("has correct secondary color", () => {
      expect(alchemyTheme.palette.secondary.main).toBe("#00A8C0");
      expect(alchemyTheme.palette.secondary.dark).toBe("#03859B");
    });

    it("has correct error color", () => {
      expect(alchemyTheme.palette.error.main).toBe("#D32F2F");
    });

    it("has correct warning color", () => {
      expect(alchemyTheme.palette.warning.main).toBe("#EF6C00");
    });

    it("has correct info color", () => {
      expect(alchemyTheme.palette.info.main).toBe("#03859B");
    });

    it("has correct success color", () => {
      expect(alchemyTheme.palette.success.main).toBe("#2E7D32");
    });

    it("has correct background colors", () => {
      expect(alchemyTheme.palette.background.default).toBe("#FFFFFF");
      expect(alchemyTheme.palette.background.paper).toBe("#FFFFFF");
    });

    it("has correct text colors", () => {
      expect(alchemyTheme.palette.text.primary).toBe("#171A1C");
    });

    it("has shadow colors", () => {
      expect(alchemyTheme.palette.shadow).toBeDefined();
      expect(alchemyTheme.palette.shadow.light).toBe("rgba(0, 0, 0, 0.12)");
      expect(alchemyTheme.palette.shadow.medium).toBe("rgba(0, 0, 0, 0.14)");
      expect(alchemyTheme.palette.shadow.dark).toBe("rgba(0, 0, 0, 0.20)");
    });
  });

  describe("typography", () => {
    it("uses Roboto font family", () => {
      expect(alchemyTheme.typography.fontFamily).toContain("Roboto");
    });

    it("has correct h6 font weight", () => {
      expect(alchemyTheme.typography.h6?.fontWeight).toBe(500);
    });

    it("button has no text transform", () => {
      expect(alchemyTheme.typography.button?.textTransform).toBe("none");
    });
  });

  describe("shape", () => {
    it("has correct border radius", () => {
      expect(alchemyTheme.shape.borderRadius).toBe(8);
    });
  });

  describe("customColors", () => {
    it("exposes blue palette", () => {
      expect(alchemyTheme.customColors.blue[700]).toBe("#1F5FF2");
      expect(alchemyTheme.customColors.blue[900]).toBe("#152356");
    });

    it("exposes lightBlue palette", () => {
      expect(alchemyTheme.customColors.lightBlue[500]).toBe("#00A8C0");
    });

    it("exposes grey palette", () => {
      expect(alchemyTheme.customColors.grey[500]).toBe("#9E9E9E");
    });

    it("exposes amber palette", () => {
      expect(alchemyTheme.customColors.amber[500]).toBe("#FFC107");
    });

    it("exposes folderTitle color", () => {
      expect(alchemyTheme.customColors.folderTitle).toBe("rgba(21, 35, 86, 0.87)");
    });
  });

  describe("opacities", () => {
    it("has correct opacity values", () => {
      expect(alchemyTheme.opacities[4]).toBe(0.04);
      expect(alchemyTheme.opacities[100]).toBe(1);
      expect(
        alchemyTheme.opacities[50 as keyof typeof alchemyTheme.opacities]
      ).toBeUndefined();
    });
  });

  describe("exports", () => {
    it("exports customColors", () => {
      expect(customColors.blue[700]).toBe("#1F5FF2");
    });

    it("exports palette", () => {
      expect(palette.primary).toBeDefined();
    });

    it("exports typography", () => {
      expect(typography.fontFamily).toBeDefined();
    });

    it("exports components", () => {
      expect(components.MuiButton).toBeDefined();
    });

    it("sets pointer cursor on interactive controls", () => {
      const buttonBaseRoot = components.MuiButtonBase?.styleOverrides?.root;
      expect(buttonBaseRoot).toBeDefined();
      if (typeof buttonBaseRoot === "function") {
        expect(buttonBaseRoot({ theme: alchemyTheme } as never)).toMatchObject({
          cursor: "pointer",
        });
        return;
      }
      expect(buttonBaseRoot).toMatchObject({ cursor: "pointer" });
    });

    it("exports opacities", () => {
      expect(opacities[4]).toBe(0.04);
    });

    it("exports borderRadius tokens", () => {
      expect(borderRadius.sm).toBe(8);
      expect(borderRadius.lg).toBe(16);
      expect(borderRadius.xl).toBe(24);
    });

    it("exports shapeConfig", () => {
      expect(shapeConfig.borderRadius).toBe(8);
    });

    it("exports shadows with 25 elevations", () => {
      expect(shadows).toHaveLength(25);
      expect(shadows[0]).toBe("none");
    });

    it("exports transitionsConfig", () => {
      expect(transitionsConfig.easing.easeInOut).toBeDefined();
      expect(transitionsConfig.duration.standard).toBe(300);
    });

    it("exports spacingTokens", () => {
      expect(spacingTokens[4]).toBe(16);
      expect(spacingTokens[6]).toBe(24);
    });

    it("exports spacingUnit", () => {
      expect(spacingUnit).toBe(8);
    });
  });

  describe("theme integrates new tokens", () => {
    it("shape borderRadius matches shapeConfig", () => {
      expect(alchemyTheme.shape.borderRadius).toBe(shapeConfig.borderRadius);
    });

    it("theme shadows has 25 elevations", () => {
      expect(alchemyTheme.shadows).toHaveLength(25);
    });

    it("theme transitions easing matches transitionsConfig", () => {
      expect(alchemyTheme.transitions.easing.easeInOut).toBe(
        transitionsConfig.easing.easeInOut
      );
    });
  });
});
