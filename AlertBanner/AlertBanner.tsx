import React from "react";
import Alert, { type AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

export interface AlertBannerProps extends Omit<AlertProps, "title"> {
  title?: string;
  message: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  animate?: boolean;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  message,
  open = true,
  onClose,
  animate = true,
  severity = "info",
  ...props
}) => {
  const content = (
    <Alert severity={severity} onClose={onClose} sx={{ borderRadius: 3 }} {...props}>
      {title && <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>}
      {message}
    </Alert>
  );

  if (animate) {
    return <Collapse in={open}>{content}</Collapse>;
  }

  return open ? content : null;
};
