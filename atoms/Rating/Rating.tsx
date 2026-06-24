import React from "react";
import MuiRating, { type RatingProps as MuiRatingProps } from "@mui/material/Rating";

export type RatingProps = MuiRatingProps;

export const Rating = React.forwardRef<HTMLSpanElement, RatingProps>((props, ref) => {
  return <MuiRating ref={ref} {...props} />;
});

Rating.displayName = "Rating";
