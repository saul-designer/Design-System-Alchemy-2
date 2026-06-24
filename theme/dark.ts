import { createTheme } from "@mui/material/styles";
import { alchemyTheme } from "./index";

export const alchemyDarkTheme = createTheme(alchemyTheme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#4D82F5",
      light: "#7AA3F7",
      dark: "#1F5FF2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00BCD4",
      light: "#33C9DC",
      dark: "#00A8C0",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0B0F19",
      paper: "#131929",
    },
    text: {
      primary: "#E8EAF6",
      secondary: "#9FA8DA",
      disabled: "rgba(232,234,246,0.38)",
    },
    divider: "rgba(255,255,255,0.12)",
    action: {
      active: "rgba(255,255,255,0.7)",
      hover: "rgba(255,255,255,0.08)",
      selected: "rgba(77,130,245,0.16)",
      disabled: "rgba(255,255,255,0.3)",
      disabledBackground: "rgba(255,255,255,0.12)",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 24px rgba(0,0,0,0.4)",
        },
      },
    },
  },
});
