import React from "react";
import MuiFab, { type FabProps as MuiFabProps } from "@mui/material/Fab";

export type FabProps = MuiFabProps;

export const Fab = React.forwardRef<HTMLButtonElement, FabProps>((props, ref) => {
  return <MuiFab ref={ref} {...props} />;
});

Fab.displayName = "Fab";
