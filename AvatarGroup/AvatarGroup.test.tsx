import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import { AvatarGroup } from "./AvatarGroup";

const avatars = [
  { name: "Alice Johnson" },
  { name: "Bob Smith" },
  { name: "Carol White" },
];

describe("AvatarGroup", () => {
  it("renders initials for each avatar", () => {
    render(<AvatarGroup avatars={avatars} />);
    expect(screen.getByText("AJ")).toBeInTheDocument();
    expect(screen.getByText("BS")).toBeInTheDocument();
    expect(screen.getByText("CW")).toBeInTheDocument();
  });

  it("renders single-word name with first letter only", () => {
    render(<AvatarGroup avatars={[{ name: "Alice" }]} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders with a max overflow indicator", () => {
    render(<AvatarGroup avatars={avatars} max={2} />);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("renders an image avatar when src is provided", () => {
    const { container } = render(
      <AvatarGroup avatars={[{ name: "Alice", src: "https://example.com/alice.jpg" }]} />
    );
    expect(container.querySelector("img")).toBeInTheDocument();
  });

  it("uses alt text from name when alt is not provided", () => {
    const { container } = render(
      <AvatarGroup avatars={[{ name: "Alice", src: "https://example.com/alice.jpg" }]} />
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "Alice");
  });

  it("uses explicit alt when provided", () => {
    const { container } = render(
      <AvatarGroup
        avatars={[
          { name: "Alice", src: "https://example.com/alice.jpg", alt: "Profile photo" },
        ]}
      />
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "Profile photo");
  });

  it("renders with tooltips by default", () => {
    render(<AvatarGroup avatars={[{ name: "Alice Johnson" }]} />);
    // Tooltip wraps the avatar — the initials text is still visible
    expect(screen.getByText("AJ")).toBeInTheDocument();
  });

  it("renders without tooltips when showTooltips is false", () => {
    render(<AvatarGroup avatars={[{ name: "Bob Smith" }]} showTooltips={false} />);
    expect(screen.getByText("BS")).toBeInTheDocument();
  });

  it("renders empty group with no avatars", () => {
    const { container } = render(<AvatarGroup avatars={[]} />);
    expect(container.querySelector(".MuiAvatarGroup-root")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AvatarGroup avatars={avatars} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  describe("size prop", () => {
    it("renders with named size sm", () => {
      render(<AvatarGroup avatars={avatars} size="sm" />);
      expect(screen.getByText("AJ")).toBeInTheDocument();
    });

    it("renders with named size md", () => {
      render(<AvatarGroup avatars={avatars} size="md" />);
      expect(screen.getByText("AJ")).toBeInTheDocument();
    });

    it("renders with named size lg", () => {
      render(<AvatarGroup avatars={avatars} size="lg" />);
      expect(screen.getByText("AJ")).toBeInTheDocument();
    });

    it("renders with named size xl", () => {
      render(<AvatarGroup avatars={avatars} size="xl" />);
      expect(screen.getByText("AJ")).toBeInTheDocument();
    });

    it("renders with numeric size", () => {
      render(<AvatarGroup avatars={avatars} size={48} />);
      expect(screen.getByText("AJ")).toBeInTheDocument();
    });

    it("renders without size prop", () => {
      render(<AvatarGroup avatars={avatars} />);
      expect(screen.getByText("AJ")).toBeInTheDocument();
    });

    it("merges size sx with user-provided sx", () => {
      render(<AvatarGroup avatars={avatars} size="sm" sx={{ opacity: 0.9 }} />);
      expect(screen.getByText("AJ")).toBeInTheDocument();
    });
  });
});
