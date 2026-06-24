import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { AccordionGroup } from "./accordion-group";

const items = [
  { id: "item1", title: "Section One", content: <div>Content One</div> },
  { id: "item2", title: "Section Two", content: <div>Content Two</div> },
  { id: "item3", title: "Section Three", content: <div>Content Three</div> },
];

const getSummaryButton = (name: string) =>
  screen.getByRole("button", { name: new RegExp(name, "i") });

describe("AccordionGroup", () => {
  it("renders all item titles", () => {
    render(<AccordionGroup items={items} />);
    expect(screen.getByText("Section One")).toBeInTheDocument();
    expect(screen.getByText("Section Two")).toBeInTheDocument();
    expect(screen.getByText("Section Three")).toBeInTheDocument();
  });

  it("allows multiple sections open by default", () => {
    render(<AccordionGroup items={items} />);
    fireEvent.click(getSummaryButton("Section One"));
    fireEvent.click(getSummaryButton("Section Two"));
    expect(getSummaryButton("Section One")).toHaveAttribute("aria-expanded", "true");
    expect(getSummaryButton("Section Two")).toHaveAttribute("aria-expanded", "true");
  });

  it("supports single open mode", () => {
    render(<AccordionGroup items={items} allowMultiple={false} />);
    fireEvent.click(getSummaryButton("Section One"));
    fireEvent.click(getSummaryButton("Section Two"));
    expect(getSummaryButton("Section One")).toHaveAttribute("aria-expanded", "false");
    expect(getSummaryButton("Section Two")).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onChange when section changes", () => {
    const onChangeExpanded = vi.fn();
    render(<AccordionGroup items={items} onChangeExpanded={onChangeExpanded} />);
    fireEvent.click(getSummaryButton("Section One"));
    expect(onChangeExpanded).toHaveBeenCalledWith(["item1"]);
  });

  it("removes id from expanded list when collapsing", () => {
    const onChangeExpanded = vi.fn();
    render(
      <AccordionGroup
        items={items}
        defaultExpandedIds={["item1"]}
        onChangeExpanded={onChangeExpanded}
      />
    );
    fireEvent.click(getSummaryButton("Section One"));
    expect(onChangeExpanded).toHaveBeenCalledWith([]);
  });

  it("supports controlled expanded ids", () => {
    const onChangeExpanded = vi.fn();
    const { rerender } = render(
      <AccordionGroup
        items={items}
        expandedIds={["item2"]}
        onChangeExpanded={onChangeExpanded}
      />
    );
    expect(getSummaryButton("Section Two")).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(getSummaryButton("Section Two"));
    expect(onChangeExpanded).toHaveBeenCalledWith([]);
    rerender(
      <AccordionGroup
        items={items}
        expandedIds={[]}
        onChangeExpanded={onChangeExpanded}
      />
    );
    expect(getSummaryButton("Section Two")).toHaveAttribute("aria-expanded", "false");
  });

  it("accepts sx as style object", () => {
    render(<AccordionGroup items={items} sx={{ borderColor: "rgb(255, 0, 0)" }} />);
    expect(screen.getByText("Section One")).toBeInTheDocument();
  });

  it("accepts sx as style array", () => {
    render(<AccordionGroup items={items} sx={[{ borderColor: "rgb(0, 0, 255)" }]} />);
    expect(screen.getByText("Section One")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AccordionGroup items={items} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
