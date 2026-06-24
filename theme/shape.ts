export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 100,
} as const;

export const shapeConfig = {
  borderRadius: borderRadius.sm,
} as const;
