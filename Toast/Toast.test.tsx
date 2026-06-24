import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { screen, act, waitFor } from "@testing-library/react";
import { render } from "../../test/render";
import { Toaster, toast } from "./Toast";

afterEach(() => {
  toast.dismiss();
});

describe("Toaster", () => {
  it("mounts the notification container", async () => {
    render(<Toaster />);
    // Sonner renders a <section> with aria-label "Notifications alt+T"
    await waitFor(() => {
      expect(screen.getByRole("region", { name: /notifications/i })).toBeInTheDocument();
    });
  });

  it("renders with custom position without throwing", () => {
    expect(() => render(<Toaster position="top-center" />)).not.toThrow();
  });

  it("renders with richColors disabled without throwing", () => {
    expect(() => render(<Toaster richColors={false} />)).not.toThrow();
  });

  it("renders with closeButton enabled without throwing", () => {
    expect(() => render(<Toaster closeButton />)).not.toThrow();
  });
});

describe("toast", () => {
  it("toast.success shows the message", async () => {
    render(<Toaster />);
    act(() => {
      toast.success("Project saved.");
    });
    await waitFor(() => {
      expect(screen.getByText("Project saved.")).toBeInTheDocument();
    });
  });

  it("toast.error shows the message", async () => {
    render(<Toaster />);
    act(() => {
      toast.error("Could not save changes.");
    });
    await waitFor(() => {
      expect(screen.getByText("Could not save changes.")).toBeInTheDocument();
    });
  });

  it("toast.warning shows the message", async () => {
    render(<Toaster />);
    act(() => {
      toast.warning("Session expiring soon.");
    });
    await waitFor(() => {
      expect(screen.getByText("Session expiring soon.")).toBeInTheDocument();
    });
  });

  it("toast.info shows the message", async () => {
    render(<Toaster />);
    act(() => {
      toast.info("New version available.");
    });
    await waitFor(() => {
      expect(screen.getByText("New version available.")).toBeInTheDocument();
    });
  });

  it("shows description alongside the title", async () => {
    render(<Toaster />);
    act(() => {
      toast.success("Blueprint uploaded", {
        description: "foundation-layout-rev4.pdf was added.",
      });
    });
    await waitFor(() => {
      expect(screen.getByText("Blueprint uploaded")).toBeInTheDocument();
      expect(
        screen.getByText("foundation-layout-rev4.pdf was added.")
      ).toBeInTheDocument();
    });
  });

  it("exports the expected imperative methods", () => {
    expect(typeof toast).toBe("function");
    expect(typeof toast.success).toBe("function");
    expect(typeof toast.error).toBe("function");
    expect(typeof toast.warning).toBe("function");
    expect(typeof toast.info).toBe("function");
    expect(typeof toast.promise).toBe("function");
    expect(typeof toast.dismiss).toBe("function");
  });
});
