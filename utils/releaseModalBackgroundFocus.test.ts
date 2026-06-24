import { describe, it, expect, vi, afterEach } from "vitest";
import {
  mergeMenuTransitionSlotProps,
  releaseMenuFocus,
  releaseModalBackgroundFocus,
} from "./releaseModalBackgroundFocus";

describe("releaseModalBackgroundFocus", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("blurs a focused page element outside overlay roots", () => {
    const button = document.createElement("button");
    button.textContent = "Trigger";
    document.body.appendChild(button);
    button.focus();

    expect(document.activeElement).toBe(button);

    releaseModalBackgroundFocus();

    expect(document.activeElement).toBe(document.body);
  });

  it("blurs focus inside a closing menu overlay", () => {
    const overlay = document.createElement("div");
    overlay.className = "MuiPopover-root MuiMenu-root MuiModal-root";
    const menuItem = document.createElement("button");
    menuItem.textContent = "Menu item";
    overlay.appendChild(menuItem);
    document.body.appendChild(overlay);
    menuItem.focus();

    releaseModalBackgroundFocus();

    expect(document.activeElement).toBe(document.body);
  });

  it("no-ops when focus is already on body", () => {
    document.body.focus();
    releaseModalBackgroundFocus();
    expect(document.activeElement).toBe(document.body);
  });

  it("restores focus to the menu anchor after blur", () => {
    const anchor = document.createElement("button");
    anchor.textContent = "Open menu";
    const menuItem = document.createElement("button");
    menuItem.textContent = "Menu item";
    document.body.append(anchor, menuItem);
    menuItem.focus();

    releaseMenuFocus(anchor);

    expect(document.activeElement).toBe(anchor);
  });

  it("returns slotProps unchanged when transition is a function component", () => {
    const slotProps = { transition: () => null };
    expect(mergeMenuTransitionSlotProps(slotProps)).toBe(slotProps);
  });

  it("resolves function anchorEl in releaseMenuFocus", () => {
    const anchor = document.createElement("button");
    document.body.appendChild(anchor);
    const focusSpy = vi.spyOn(anchor, "focus");

    releaseMenuFocus(() => anchor);

    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
  });

  it("chains transition handlers in mergeMenuTransitionSlotProps", () => {
    const onExiting = vi.fn();
    const onExited = vi.fn();
    const merged = mergeMenuTransitionSlotProps({
      transition: { onExiting, onExited },
    });

    const menuItem = document.createElement("button");
    document.body.appendChild(menuItem);
    menuItem.focus();

    merged.transition.onExiting?.();
    expect(document.activeElement).toBe(document.body);
    expect(onExiting).toHaveBeenCalledTimes(1);

    menuItem.focus();
    merged.transition.onExited?.(document.createElement("div"));
    expect(document.activeElement).toBe(document.body);
    expect(onExited).toHaveBeenCalledTimes(1);
  });
});
