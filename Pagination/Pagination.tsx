import React from "react";
import MuiPagination, {
  type PaginationProps as MuiPaginationProps,
} from "@mui/material/Pagination";

export type PaginationProps = MuiPaginationProps;

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  return <MuiPagination ref={ref} {...props} />;
});

Pagination.displayName = "Pagination";
