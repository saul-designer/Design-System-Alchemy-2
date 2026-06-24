import React from "react";
import MuiSkeleton, {
  type SkeletonProps as MuiSkeletonProps,
} from "@mui/material/Skeleton";

export type SkeletonProps = MuiSkeletonProps;

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>((props, ref) => {
  return <MuiSkeleton ref={ref} {...props} />;
});

Skeleton.displayName = "Skeleton";
