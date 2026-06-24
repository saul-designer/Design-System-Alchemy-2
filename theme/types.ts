import type {} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customColors: {
      blue: Record<
        | 50
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900
        | "A100"
        | "A200"
        | "A400"
        | "A700",
        string
      >;
      lightBlue: Record<
        50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "A100" | "A200",
        string
      >;
      grey: Record<
        | 50
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900
        | "A100"
        | "A200"
        | "A400"
        | "A700",
        string
      >;
      amber: Record<
        | 50
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900
        | "A100"
        | "A200"
        | "A400"
        | "A700",
        string
      >;
      folderTitle: string;
    };
    opacities: Record<
      4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 60 | 64 | 72 | 80 | 88 | 96 | 100,
      number
    >;
  }

  interface ThemeOptions {
    customColors?: {
      blue?: Partial<Record<string, string>>;
      lightBlue?: Partial<Record<string, string>>;
      grey?: Partial<Record<string, string>>;
      amber?: Partial<Record<string, string>>;
      folderTitle?: string;
    };
    opacities?: Partial<Record<string, number>>;
  }

  interface Palette {
    shadow: {
      light: string;
      medium: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    shadow?: {
      light?: string;
      medium?: string;
      dark?: string;
    };
  }
}
