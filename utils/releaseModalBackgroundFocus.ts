type MenuTransitionSlotProps = {
  onExiting?: () => void;
  onExited?: (node: HTMLElement) => void;
};

/**
 * Blur the currently focused element before MUI overlays mark background siblings as aria-hidden.
 * Prevents "Blocked aria-hidden on an element because its descendant retained focus".
 *
 * Menu items keep focus while their Menu unmounts; the next Dialog then hides that subtree.
 * Blurring here is safe because Dialog/Menu only call this when opening, before focus moves in.
 */
export function releaseModalBackgroundFocus(): void {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || active === document.body) return;
  active.blur();
}

/** Move focus back to the menu trigger before MUI marks the closing menu root as aria-hidden. */
export function releaseMenuFocus(anchorEl?: unknown): void {
  releaseModalBackgroundFocus();
  const resolved = typeof anchorEl === "function" ? anchorEl() : anchorEl;
  if (resolved instanceof HTMLElement) {
    resolved.focus({ preventScroll: true });
  }
}

/** Chain focus-release handlers onto MUI Menu transition slot props. */
export function mergeMenuTransitionSlotProps<T extends { transition?: unknown }>(
  slotProps?: T
): T {
  if (typeof slotProps?.transition === "function") {
    return slotProps;
  }

  const userTransition =
    slotProps?.transition && typeof slotProps.transition === "object"
      ? (slotProps.transition as MenuTransitionSlotProps)
      : undefined;

  return {
    ...slotProps,
    transition: {
      ...userTransition,
      onExiting: () => {
        releaseModalBackgroundFocus();
        userTransition?.onExiting?.();
      },
      onExited: (node: HTMLElement) => {
        releaseModalBackgroundFocus();
        userTransition?.onExited?.(node);
      },
    },
  } as T;
}
