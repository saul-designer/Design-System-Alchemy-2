import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { RadioGroup } from "./RadioGroup";

const options = [
  { value: "one", label: "Option One" },
  { value: "two", label: "Option Two" },
  { value: "three", label: "Option Three", disabled: true },
];

describe("RadioGroup", () => {
  it("renders all options", () => {
    render(<RadioGroup options={options} />);
    expect(screen.getByText("Option One")).toBeInTheDocument();
    expect(screen.getByText("Option Two")).toBeInTheDocument();
    expect(screen.getByText("Option Three")).toBeInTheDocument();
  });

  it("renders with a group label", () => {
    render(<RadioGroup options={options} label="Choose one" />);
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });

  it("renders without a group label", () => {
    render(<RadioGroup options={options} />);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("selects the correct option when value is provided", () => {
    render(<RadioGroup options={options} value="two" onChange={() => {}} />);
    expect(screen.getByDisplayValue("two")).toBeChecked();
  });

  it("calls onChange when an option is selected", () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} onChange={onChange} />);
    fireEvent.click(screen.getByDisplayValue("one"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("disables individual options", () => {
    render(<RadioGroup options={options} />);
    expect(screen.getByDisplayValue("three")).toBeDisabled();
  });

  it("renders in row (horizontal) layout", () => {
    const { container } = render(<RadioGroup options={options} row />);
    expect(container.querySelector(".MuiRadioGroup-row")).toBeInTheDocument();
  });

  it("passes radioProps to each radio button", () => {
    const { container } = render(
      <RadioGroup options={options} radioProps={{ size: "small" }} />
    );
    const smRadios = container.querySelectorAll(".MuiRadio-sizeSmall");
    expect(smRadios.length).toBe(options.length);
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RadioGroup options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("applies size prop to radio buttons", () => {
    const { container } = render(<RadioGroup options={options} size="small" />);
    const smRadios = container.querySelectorAll(".MuiRadio-sizeSmall");
    expect(smRadios.length).toBe(options.length);
  });

  it("radioProps.size overrides top-level size", () => {
    const { container } = render(
      <RadioGroup options={options} size="small" radioProps={{ size: "medium" }} />
    );
    const smRadios = container.querySelectorAll(".MuiRadio-sizeSmall");
    const radioInputs = container.querySelectorAll('input[type="radio"]');
    expect(smRadios.length).toBe(0);
    expect(radioInputs.length).toBe(options.length);
  });
});
