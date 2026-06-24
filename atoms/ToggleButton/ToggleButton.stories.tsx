import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleButton, ToggleButtonGroup } from "./ToggleButton";

const meta: Meta<typeof ToggleButtonGroup> = {
  title: "Atoms/ToggleButton",
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'ToggleButton and ToggleButtonGroup for the Alchemy design system. Selected state uses `primary.main` (#1F5FF2) fill with white text. Use `exclusive` for single-select (view mode, sort order) and multi-select for formatting toggles. Prefer `size="small"` in dense toolbar contexts.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    exclusive: {
      control: "boolean",
      description:
        "Single-selection mode — deselecting the active option is not allowed.",
    },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
    color: {
      control: "select",
      options: [
        "standard",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
      description: "Color of the selected state.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

export const Playground: Story = {
  args: { value: "center", exclusive: true },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="left" aria-label="left aligned">
        <AlignLeft />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <AlignCenter />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <AlignRight />
      </ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const ExclusiveSelection: Story = {
  args: { value: "center", exclusive: true },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="left" aria-label="left aligned">
        <AlignLeft />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <AlignCenter />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <AlignRight />
      </ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const MultipleSelection: Story = {
  args: { value: ["bold"] },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="bold" aria-label="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <Italic />
      </ToggleButton>
      <ToggleButton value="underline" aria-label="underlined">
        <Underline />
      </ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { value: "center", exclusive: true, orientation: "vertical" },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Small: Story = {
  args: { value: "left", exclusive: true, size: "small" },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const WithDisabledOption: Story = {
  args: { value: "left", exclusive: true },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right" disabled>
        Right
      </ToggleButton>
    </ToggleButtonGroup>
  ),
};
