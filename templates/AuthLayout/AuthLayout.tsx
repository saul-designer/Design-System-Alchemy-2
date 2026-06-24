import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export interface AuthLayoutProps {
  /** Content rendered over the left hero panel (logo, headline, feature list, etc.) */
  backgroundContent?: React.ReactNode;
  /** Cover image URL for the left panel */
  backgroundImage?: string;
  /** Logo rendered above the title in the form panel */
  logo?: React.ReactNode;
  /** Form panel heading */
  title?: string;
  /** Form panel sub-heading */
  subtitle?: string;
  /** Form fields and controls */
  children: React.ReactNode;
  /** Small note pinned below the form (legal copy, SSO notice, etc.) */
  footer?: React.ReactNode;
  /** Max-width of the inner form column. Defaults to 440. */
  maxWidth?: number | string;
  sx?: SxProps<Theme>;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  backgroundContent,
  backgroundImage,
  logo,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 440,
  sx,
}) => {
  const hasLeft = !!(backgroundImage || backgroundContent);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Roboto, sans-serif",
        ...sx,
      }}
    >
      {hasLeft && (
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            px: "80px",
            py: "24px",
            color: "#fff",
          }}
        >
          {backgroundImage && (
            <Box
              component="img"
              src={backgroundImage}
              alt=""
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          <Box
            sx={(theme) => ({
              position: "absolute",
              inset: 0,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(8,12,28,.88), rgba(22,73,223,.52))"
                  : "linear-gradient(135deg, rgba(21,35,86,.72), rgba(22,73,223,.55))",
            })}
          />
          {backgroundContent && (
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "flex-start",
              }}
            >
              {backgroundContent}
            </Box>
          )}
        </Box>
      )}

      <Box
        sx={(theme) => ({
          flex: 1,
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: "10%",
          py: "80px",
          overflowY: "auto",
          ...(theme.palette.mode === "dark" && {
            borderLeft: `1px solid ${theme.palette.divider}`,
          }),
        })}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth,
            width: "100%",
            mx: "auto",
            bgcolor: "transparent",
          }}
        >
          {(logo || title || subtitle) && (
            <Box>
              {logo}
              {title && (
                <Typography
                  component="h2"
                  sx={{
                    m: 0,
                    fontSize: "2rem",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: "-0.3px",
                    color: "text.primary",
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  sx={{
                    mt: 0.75,
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: "text.secondary",
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}

          {children}

          {footer && (
            <Box
              sx={{
                fontSize: "0.75rem",
                lineHeight: 1.5,
                color: "text.secondary",
                textAlign: "center",
                mt: 0.5,
              }}
            >
              {footer}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};
