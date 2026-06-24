import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Atoms/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Progress indicator for the Alchemy design system. Two modes via the custom `type` prop: `linear` (MUI LinearProgress — theme override: `height` 6px, `border-radius` `radius-xs` 4px) and `circular` (MUI CircularProgress — theme defaults: `size` 24, `thickness` 4). Colors follow Alchemy semantic palette.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["linear", "circular"] },
    variant: {
      control: "select",
      options: ["indeterminate", "determinate", "buffer", "query"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "info", "success", "warning", "inherit"],
    },
    value: { control: { type: "range", min: 0, max: 100 } },
    size: { control: "number" },
    thickness: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 400 }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    type: "linear",
    variant: "indeterminate",
    color: "primary",
  },
};

export const LinearIndeterminate: Story = {
  args: { type: "linear" },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Progress {...args} />
    </div>
  ),
};

export const LinearDeterminate: Story = {
  args: { type: "linear", variant: "determinate", value: 60 },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Progress {...args} />
    </div>
  ),
};

export const LinearBuffer: Story = {
  args: { type: "linear", variant: "buffer", value: 40 },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Progress {...args} />
    </div>
  ),
};

export const CircularIndeterminate: Story = {
  args: { type: "circular" },
};

export const CircularDeterminate: Story = {
  args: { type: "circular", variant: "determinate", value: 75 },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 400 }}>
      {(["primary", "secondary", "error", "info", "success", "warning"] as const).map(
        (color) => (
          <Progress key={color} color={color} />
        )
      )}
    </div>
  ),
};
