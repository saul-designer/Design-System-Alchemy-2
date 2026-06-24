import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "../../atoms/Button";
import { VerificationCodeInput } from "./VerificationCodeInput";

const meta: Meta<typeof VerificationCodeInput> = {
  title: "Molecules/VerificationCodeInput",
  component: VerificationCodeInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Multi-slot verification code input for OTP, 2FA, and email confirmation flows. Configure `length` from 1 to 8 digits. Each slot uses small rounded corners (`borderRadius.sm`, 8px) by default. Supports paste, auto-advance, backspace navigation, controlled/uncontrolled modes, error state, and optional masking for PIN-style codes.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    length: 6,
    label: "Verification code",
    helperText: "Enter the 6-digit code sent to your email.",
  },
  argTypes: {
    length: {
      control: { type: "number", min: 1, max: 8, step: 1 },
      description: "Number of input slots (1–8).",
    },
    type: {
      control: "select",
      options: ["numeric", "alphanumeric"],
      description: "Allowed characters per slot.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description:
        "Slot dimensions — `medium` for auth screens, `small` for compact layouts.",
    },
    mask: {
      control: "boolean",
      description: "Masks each character (PIN-style).",
    },
    autoFocus: {
      control: "boolean",
      description: "Focuses the first slot on mount.",
    },
    value: {
      control: "text",
      description: "Controlled value string.",
    },
    defaultValue: {
      control: "text",
      description: "Initial value in uncontrolled mode.",
    },
    onChange: { control: false },
    onComplete: { control: false },
    sx: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof VerificationCodeInput>;

export const Playground: Story = {};

export const FourDigits: Story = {
  args: {
    length: 4,
    label: "PIN code",
    helperText: "Enter your 4-digit PIN.",
  },
};

export const EightDigits: Story = {
  args: {
    length: 8,
    label: "Backup code",
    helperText: "Enter your 8-character backup code.",
    type: "alphanumeric",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    length: 6,
  },
};

export const Masked: Story = {
  args: {
    length: 4,
    mask: true,
    label: "Security PIN",
    helperText: "Your PIN is hidden as you type.",
  },
};

export const Error: Story = {
  args: {
    length: 6,
    error: true,
    helperText: "Invalid code. Please try again.",
    defaultValue: "123456",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "123456",
  },
};

const LiveVerificationDemo = () => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleComplete = (value: string) => {
    setStatus(value === "123456" ? "success" : "error");
  };

  const handleVerify = () => {
    setStatus(code === "123456" ? "success" : "error");
  };

  return (
    <Box sx={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 3 }}>
      <VerificationCodeInput
        length={6}
        label="Verification code"
        value={code}
        onChange={(value) => {
          setCode(value);
          setStatus("idle");
        }}
        onComplete={handleComplete}
        error={status === "error"}
        helperText={
          status === "success"
            ? "Code verified successfully."
            : status === "error"
              ? "Invalid code. Try 123456 for the demo."
              : "Enter the 6-digit code sent to your email."
        }
        autoFocus
      />
      <Button variant="contained" fullWidth size="large" onClick={handleVerify}>
        Verify &amp; continue
      </Button>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
        Tip: paste <strong>123456</strong> or type it digit by digit.
      </Typography>
    </Box>
  );
};

export const LiveVerification: Story = {
  render: () => <LiveVerificationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo — completes on fill and validates against `123456`. Supports paste and auto-advance.",
      },
    },
  },
};
