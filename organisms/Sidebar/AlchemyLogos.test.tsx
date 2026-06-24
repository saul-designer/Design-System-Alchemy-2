import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "../../test/render";
import {
  AlchemyIcon,
  AlchemyLogo,
  AlchemyLogoBlack,
  AlchemyLogoWhite,
} from "./AlchemyLogos";

describe("AlchemyIcon", () => {
  it("renders an svg with aria-label", () => {
    const { container } = render(<AlchemyIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-label", "Alchemy");
  });

  it("merges custom style", () => {
    const { container } = render(<AlchemyIcon style={{ height: 48 }} />);
    const svg = container.querySelector("svg") as SVGElement;
    expect(svg.style.height).toBe("48px");
  });
});

describe("AlchemyLogo", () => {
  it("renders an svg with aria-label", () => {
    const { container } = render(<AlchemyLogo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-label", "Alchemy");
  });

  it("merges custom style", () => {
    const { container } = render(<AlchemyLogo style={{ height: 40 }} />);
    const svg = container.querySelector("svg") as SVGElement;
    expect(svg.style.height).toBe("40px");
  });
});

describe("AlchemyLogoBlack", () => {
  it("renders an svg with aria-label", () => {
    const { container } = render(<AlchemyLogoBlack />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-label", "Alchemy");
  });

  it("merges custom style", () => {
    const { container } = render(<AlchemyLogoBlack style={{ height: 40 }} />);
    const svg = container.querySelector("svg") as SVGElement;
    expect(svg.style.height).toBe("40px");
  });
});

describe("AlchemyLogoWhite", () => {
  it("renders an svg with aria-label", () => {
    const { container } = render(<AlchemyLogoWhite />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-label", "Alchemy");
  });

  it("merges custom style", () => {
    const { container } = render(<AlchemyLogoWhite style={{ height: 40 }} />);
    const svg = container.querySelector("svg") as SVGElement;
    expect(svg.style.height).toBe("40px");
  });
});
