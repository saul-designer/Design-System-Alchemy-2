import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test/render";
import { VerificationCodeInput } from "./VerificationCodeInput";

describe("VerificationCodeInput", () => {
  it("renders the default number of slots", () => {
    render(<VerificationCodeInput />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("renders a custom number of slots within bounds", () => {
    render(<VerificationCodeInput length={4} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("clamps length to a maximum of 8", () => {
    render(<VerificationCodeInput length={12} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(8);
  });

  it("clamps length to a minimum of 1", () => {
    render(<VerificationCodeInput length={0} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });

  it("calls onChange when typing digits (uncontrolled)", async () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], "1");
    expect(onChange).toHaveBeenLastCalledWith("1");
  });

  it("advances focus to the next slot after entering a digit", async () => {
    render(<VerificationCodeInput length={4} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[0].focus();
    await userEvent.type(inputs[0], "1");
    expect(inputs[1]).toHaveFocus();
  });

  it("calls onComplete when all slots are filled", async () => {
    const onComplete = vi.fn();
    render(<VerificationCodeInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], "1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} value="12" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs[0].value).toBe("1");
    expect(inputs[1].value).toBe("2");
    fireEvent.change(inputs[2], { target: { value: "3" } });
    expect(onChange).toHaveBeenCalledWith("123");
  });

  it("rejects non-numeric characters in numeric mode", async () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], "a");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("accepts alphanumeric characters in alphanumeric mode", async () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} type="alphanumeric" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], "A");
    expect(onChange).toHaveBeenLastCalledWith("A");
  });

  it("fills multiple slots on paste", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={6} onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => "123456" },
    });
    expect(onChange).toHaveBeenCalledWith("123456");
  });

  it("moves focus to the previous slot on backspace when empty", () => {
    render(<VerificationCodeInput length={4} defaultValue="12" />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[2].focus();
    fireEvent.keyDown(inputs[2], { key: "Backspace" });
    expect(inputs[1]).toHaveFocus();
  });

  it("renders label and helper text", () => {
    render(
      <VerificationCodeInput
        label="Verification code"
        helperText="Enter the code sent to your email"
      />
    );
    expect(screen.getByText("Verification code")).toBeInTheDocument();
    expect(screen.getByText("Enter the code sent to your email")).toBeInTheDocument();
  });

  it("renders disabled inputs", () => {
    render(<VerificationCodeInput disabled />);
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("forwards ref to the form control root", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<VerificationCodeInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("moves focus with arrow keys", () => {
    render(<VerificationCodeInput length={4} defaultValue="1234" />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[2].focus();

    fireEvent.keyDown(inputs[2], { key: "ArrowLeft" });
    expect(inputs[1]).toHaveFocus();

    fireEvent.keyDown(inputs[1], { key: "ArrowRight" });
    expect(inputs[2]).toHaveFocus();
  });

  it("does not move focus left from the first slot", () => {
    render(<VerificationCodeInput length={4} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[0].focus();
    fireEvent.keyDown(inputs[0], { key: "ArrowLeft" });
    expect(inputs[0]).toHaveFocus();
  });

  it("does not move focus right from the last slot", () => {
    render(<VerificationCodeInput length={4} defaultValue="1234" />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[3].focus();
    fireEvent.keyDown(inputs[3], { key: "ArrowRight" });
    expect(inputs[3]).toHaveFocus();
  });

  it("clears the current slot on backspace when it has a value", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} defaultValue="1234" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[2].focus();
    fireEvent.keyDown(inputs[2], { key: "Backspace" });
    expect(onChange).not.toHaveBeenCalled();
    expect(inputs[2]).toHaveFocus();
  });

  it("does not navigate back on backspace at the first empty slot", () => {
    render(<VerificationCodeInput length={4} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[0].focus();
    fireEvent.keyDown(inputs[0], { key: "Backspace" });
    expect(inputs[0]).toHaveFocus();
  });

  it("fills multiple slots when a multi-character change is received", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1234" } });
    expect(onChange).toHaveBeenCalledWith("1234");
  });

  it("ignores change when the same character is re-entered", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} defaultValue="1" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not advance focus after filling the last slot", async () => {
    render(<VerificationCodeInput length={4} defaultValue="123" />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    inputs[3].focus();
    await userEvent.type(inputs[3], "4");
    expect(inputs[3]).toHaveFocus();
  });

  it("filters invalid characters from paste in alphanumeric mode", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput length={4} type="alphanumeric" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => "A!2@" },
    });
    expect(onChange).toHaveBeenCalledWith("A2");
  });

  it("normalizes defaultValue on mount", () => {
    render(<VerificationCodeInput length={4} defaultValue="12ab" />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs[0].value).toBe("1");
    expect(inputs[1].value).toBe("2");
    expect(inputs[2].value).toBe("");
  });

  it("uses fallback aria-label when no label is provided", () => {
    render(<VerificationCodeInput />);
    expect(screen.getByRole("group", { name: "Verification code" })).toBeInTheDocument();
  });

  it("uses provided id for label association", () => {
    render(<VerificationCodeInput id="otp-input" label="OTP" />);
    expect(screen.getByRole("group")).toHaveAttribute(
      "aria-labelledby",
      "otp-input-label"
    );
  });

  it("renders masked inputs as password fields", () => {
    const { container } = render(<VerificationCodeInput length={4} mask />);
    const inputs = container.querySelectorAll("input");
    expect(inputs[0].type).toBe("password");
  });

  it("renders error state with helper text", () => {
    render(
      <VerificationCodeInput error helperText="Invalid code" defaultValue="123456" />
    );
    expect(screen.getByText("Invalid code")).toHaveClass("Mui-error");
  });

  it("updates focus styling on focus and blur", () => {
    render(<VerificationCodeInput length={4} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.focus(inputs[0]);
    fireEvent.blur(inputs[0]);
    expect(inputs[0]).not.toHaveFocus();
  });

  it("handles blur from a slot that is not currently focused", () => {
    render(<VerificationCodeInput length={4} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.focus(inputs[0]);
    fireEvent.focus(inputs[1]);
    fireEvent.blur(inputs[0]);
    expect(inputs).toHaveLength(4);
  });

  it("renders small and large slot counts with responsive dimensions", () => {
    const { rerender } = render(<VerificationCodeInput length={8} size="small" />);
    expect(screen.getAllByRole("textbox")).toHaveLength(8);

    rerender(<VerificationCodeInput length={8} size="medium" />);
    expect(screen.getAllByRole("textbox")).toHaveLength(8);

    rerender(<VerificationCodeInput length={4} size="small" />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });
});
