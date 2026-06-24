import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface AuthLayoutHeroContentProps {
  /** Logo rendered at the top of the hero panel */
  logo?: React.ReactNode;
  /** Text before the highlighted word in the heading */
  headingStart?: string;
  /** Highlighted word rendered in accent color */
  headingHighlight?: string;
  /** Text after the highlighted word in the heading */
  headingEnd?: string;
  /** Supporting description below the heading */
  description?: string;
  /** Small copyright/legal line at the bottom */
  copyright?: string;
}

export const AuthLayoutHeroContent: React.FC<AuthLayoutHeroContentProps> = ({
  logo,
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  copyright,
}) => (
  <>
    {logo}
    {(headingStart || headingHighlight || headingEnd) && (
      <Typography
        component="h1"
        sx={{
          m: 0,
          fontSize: "2.75rem",
          fontWeight: 300,
          lineHeight: 1.15,
          letterSpacing: "-0.8px",
          color: "#fff",
        }}
      >
        {headingStart}{" "}
        {headingHighlight && (
          <Box component="strong" sx={{ fontWeight: 600, color: "#00F0FF" }}>
            {headingHighlight}
          </Box>
        )}{" "}
        {headingEnd}
      </Typography>
    )}
    {description && (
      <Typography
        sx={{
          m: 0,
          fontSize: "1rem",
          lineHeight: 1.6,
          color: "rgba(255,255,255,.85)",
        }}
      >
        {description}
      </Typography>
    )}
    {copyright && (
      <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,.6)" }}>
        {copyright}
      </Typography>
    )}
  </>
);

AuthLayoutHeroContent.displayName = "AuthLayoutHeroContent";
