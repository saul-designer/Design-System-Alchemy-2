import React from "react";
import MuiAvatarGroup, {
  type AvatarGroupProps as MuiAvatarGroupProps,
} from "@mui/material/AvatarGroup";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, type AvatarSize, sizeStyles } from "../../atoms/Avatar";

export interface AvatarGroupItem {
  name: string;
  src?: string;
  alt?: string;
}

export interface AvatarGroupProps extends Omit<MuiAvatarGroupProps, "children"> {
  avatars?: AvatarGroupItem[];
  showTooltips?: boolean;
  size?: AvatarSize | number;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars = [], showTooltips = true, size, sx, ...props }, ref) => {
    const resolvedSize =
      size !== undefined
        ? typeof size === "number"
          ? { width: size, height: size, fontSize: Math.round(size * 0.45) }
          : sizeStyles[size]
        : undefined;

    const mergedSx: SxProps<Theme> | undefined = resolvedSize
      ? [
          { "& .MuiAvatar-root": resolvedSize },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]
      : sx;

    return (
      <MuiAvatarGroup ref={ref} sx={mergedSx} {...props}>
        {avatars.map((avatar, index) => {
          const el = (
            <Avatar
              key={index}
              name={avatar.name}
              src={avatar.src}
              alt={avatar.alt ?? avatar.name}
            />
          );

          return showTooltips ? (
            <Tooltip key={index} title={avatar.name}>
              {el}
            </Tooltip>
          ) : (
            el
          );
        })}
      </MuiAvatarGroup>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";
