import React from "react";
import {
  Toaster as SonnerToaster,
  type ToasterProps as SonnerToasterProps,
} from "sonner";

export { toast } from "sonner";

export interface ToasterProps extends SonnerToasterProps {
  position?: SonnerToasterProps["position"];
  richColors?: boolean;
  closeButton?: boolean;
  duration?: number;
}

/**
 * Mount once at the root of your app (or layout). Triggers are fired imperatively
 * via the exported `toast` utility:
 *
 * ```tsx
 * import { toast } from "@alchemy/ui";
 *
 * toast.success("Project saved.");
 * toast.error("Could not save changes.");
 * toast.warning("Unsaved changes.");
 * toast.info("New version available.");
 * toast.promise(saveProject(), { loading: "Saving...", success: "Saved.", error: "Failed." });
 * ```
 */
export const Toaster = React.forwardRef<HTMLElement, ToasterProps>(
  (
    {
      position = "bottom-right",
      richColors = true,
      closeButton = false,
      duration = 4000,
      ...props
    },
    _ref
  ) => {
    return (
      <SonnerToaster
        position={position}
        richColors={richColors}
        closeButton={closeButton}
        duration={duration}
        toastOptions={{
          style: {
            fontFamily: "Roboto, sans-serif",
            borderRadius: "10px",
          },
        }}
        {...props}
      />
    );
  }
);

Toaster.displayName = "Toaster";
