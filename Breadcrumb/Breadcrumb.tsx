import React from "react";
import MuiBreadcrumbs, {
  type BreadcrumbsProps as MuiBreadcrumbsProps,
} from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends Omit<MuiBreadcrumbsProps, "children"> {
  items: BreadcrumbItem[];
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, ...props }, ref) => {
    return (
      <MuiBreadcrumbs ref={ref} aria-label="breadcrumb" {...props}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast) {
            return (
              <Typography key={index} color="text.primary" aria-current="page">
                {item.label}
              </Typography>
            );
          }

          if (item.href) {
            return (
              <Link key={index} href={item.href} underline="hover" color="inherit">
                {item.label}
              </Link>
            );
          }

          return (
            <Link
              key={index}
              component="button"
              underline="hover"
              color="inherit"
              onClick={item.onClick}
              sx={{
                cursor: "pointer",
                background: "none",
                border: "none",
                font: "inherit",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
