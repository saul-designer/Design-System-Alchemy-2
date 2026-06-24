import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "../../test/render";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".MuiSkeleton-root")).toBeInTheDocument();
  });

  it("renders text variant by default", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".MuiSkeleton-text")).toBeInTheDocument();
  });

  it("renders rectangular variant", () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    expect(container.querySelector(".MuiSkeleton-rectangular")).toBeInTheDocument();
  });

  it("renders circular variant", () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.querySelector(".MuiSkeleton-circular")).toBeInTheDocument();
  });

  it("renders rounded variant", () => {
    const { container } = render(<Skeleton variant="rounded" />);
    expect(container.querySelector(".MuiSkeleton-rounded")).toBeInTheDocument();
  });

  it("applies pulse animation by default", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".MuiSkeleton-pulse")).toBeInTheDocument();
  });

  it("renders wave animation", () => {
    const { container } = render(<Skeleton animation="wave" />);
    expect(container.querySelector(".MuiSkeleton-wave")).toBeInTheDocument();
  });

  it("renders without animation", () => {
    const { container } = render(<Skeleton animation={false} />);
    expect(container.querySelector(".MuiSkeleton-root")).not.toHaveClass(
      "MuiSkeleton-pulse"
    );
    expect(container.querySelector(".MuiSkeleton-root")).not.toHaveClass(
      "MuiSkeleton-wave"
    );
  });

  it("applies width and height", () => {
    const { container } = render(<Skeleton width={200} height={50} />);
    const el = container.querySelector(".MuiSkeleton-root") as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("50px");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
