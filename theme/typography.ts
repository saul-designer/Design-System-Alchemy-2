import type { ThemeOptions } from "@mui/material/styles";

type TypographyOptions = NonNullable<ThemeOptions["typography"]>;

export const typography: TypographyOptions = {
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  h1: {
    fontSize: "6rem",
    fontWeight: 600,
    letterSpacing: "-1.5px",
    lineHeight: 1.167,
  },
  h2: {
    fontSize: "3.75rem",
    fontWeight: 300,
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
  },
  h3: {
    fontSize: "3rem",
    fontWeight: 400,
    letterSpacing: "0px",
    lineHeight: 1.167,
  },
  h4: {
    fontSize: "2.125rem",
    fontWeight: 400,
    letterSpacing: "0.25px",
    lineHeight: 1.235,
  },
  h5: {
    fontSize: "1.5rem",
    fontWeight: 400,
    letterSpacing: "0px",
    lineHeight: 1.334,
  },
  h6: {
    fontSize: "1.25rem",
    fontWeight: 500,
    letterSpacing: "0.15px",
    lineHeight: 1.6,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 400,
    letterSpacing: "0.15px",
    lineHeight: 1.75,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.1px",
    lineHeight: 1.57,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    letterSpacing: "0.5px",
    lineHeight: 1.5,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    letterSpacing: "0.17px",
    lineHeight: 1.43,
  },
  caption: {
    fontSize: "0.875rem",
    fontWeight: 400,
    letterSpacing: "0.4px",
    lineHeight: 1.66,
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    letterSpacing: "1px",
    lineHeight: 2.66,
    textTransform: "uppercase",
  },
  button: {
    fontSize: "0.9375rem",
    fontWeight: 400,
    letterSpacing: "0.46px",
    lineHeight: 1.75,
    textTransform: "none",
  },
};
