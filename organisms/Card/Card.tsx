import React from "react";
import MuiCard from "@mui/material/Card";
import type { CardProps as MuiCardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export interface CardProps extends Omit<MuiCardProps, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
  dividerAfterHeader?: boolean;
  dividerBeforeFooter?: boolean;
  contentSx?: SxProps<Theme>;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      headerAction,
      footer,
      noPadding,
      dividerAfterHeader = false,
      dividerBeforeFooter = true,
      contentSx,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <MuiCard ref={ref} {...props}>
        {(title || subtitle || headerAction) && (
          <>
            <CardHeader
              disableTypography
              title={
                title != null ? (
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>
                ) : undefined
              }
              subheader={
                subtitle != null ? (
                  <Typography variant="body2">{subtitle}</Typography>
                ) : undefined
              }
              action={headerAction}
              sx={{ pb: dividerAfterHeader ? 2 : 0 }}
            />
            {dividerAfterHeader && <Divider />}
          </>
        )}
        <CardContent
          sx={{
            ...(noPadding && { p: "0 !important" }),
            ...contentSx,
          }}
        >
          {children}
        </CardContent>
        {footer && (
          <>
            {dividerBeforeFooter && <Divider />}
            <CardActions sx={{ px: 3, py: 2 }}>{footer}</CardActions>
          </>
        )}
      </MuiCard>
    );
  }
);

Card.displayName = "Card";
