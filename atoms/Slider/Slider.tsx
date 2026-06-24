import React from "react";
import MuiSlider, { type SliderProps as MuiSliderProps } from "@mui/material/Slider";

export type SliderProps = MuiSliderProps;

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>((props, ref) => {
  return <MuiSlider ref={ref} {...props} />;
});

Slider.displayName = "Slider";
