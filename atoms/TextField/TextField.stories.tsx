import { Eye, Mail, Search } from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Atoms/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "TextField for the Alchemy design system. Theme overrides applied to `MuiOutlinedInput`: `border-radius` is `radius-lg` (16px), `min-height` 48px. Border states: rest `rgba(21,35,86,0.23)` · hover `#152356` (ink) · focus 2px `primary.main` (#1F5FF2) · error `error.main` (#D32F2F). Label uses `font-weight` 500 and shifts to `primary.main` on focus.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    multiline: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  args: {
    label: "Project name",
    placeholder: "Enter project name",
    variant: "outlined",
    size: "medium",
    disabled: false,
    error: false,
    required: false,
    fullWidth: false,
    multiline: false,
  },
};

export const WithValue: Story = {
  args: {
    label: "Email",
    value: "carlos.lopez@company.com",
    variant: "outlined",
  },
};

export const WithStartAdornment: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    startAdornment: <Search size={18} />,
  },
};

export const WithEndAdornment: Story = {
  args: {
    label: "Password",
    type: "password",
    endAdornment: <Eye size={18} />,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "Used for project notifications and account recovery.",
    startAdornment: <Mail size={18} />,
  },
};

export const ErrorField: Story = {
  args: {
    label: "Email",
    value: "invalid-email",
    error: true,
    helperText: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Tenant ID",
    value: "elementos-dev",
    disabled: true,
  },
};

export const Multiline: Story = {
  args: {
    label: "Project description",
    placeholder: "Describe the project scope and objectives...",
    multiline: true,
    rows: 4,
    fullWidth: true,
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    size: "small",
    placeholder: "Small input",
  },
};
