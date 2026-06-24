import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Skeleton loading placeholder for the Alchemy design system. Theme override: `border-radius` is `radius-sm` (8px) by default. Use `variant="circular"` for avatar placeholders, `variant="rectangular"` for image/card placeholders, and `variant="text"` for inline content rows.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "rectangular", "rounded", "circular"],
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", false],
    },
    width: { control: "number" },
    height: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  args: {
    variant: "rectangular",
    animation: "pulse",
    width: 210,
    height: 60,
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 210,
    height: 118,
  },
};

export const Rounded: Story = {
  args: {
    variant: "rounded",
    width: 210,
    height: 60,
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 40,
    height: 40,
  },
};

export const Wave: Story = {
  args: {
    variant: "rectangular",
    width: 210,
    height: 60,
    animation: "wave",
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 300 }}>
      <Skeleton variant="rectangular" width={300} height={160} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="40%" />
    </div>
  ),
};

export const AvatarWithText: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Skeleton variant="text" width={160} />
        <Skeleton variant="text" width={120} />
      </div>
    </div>
  ),
};

export const TableRowPlaceholder: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 640 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={180} />
          <Skeleton
            variant="rectangular"
            width={72}
            height={24}
            sx={{ borderRadius: 1, ml: "auto" }}
          />
          <Skeleton variant="text" width={80} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Placeholder for Alchemy data table rows while project data loads — avatar + name + status chip + date.",
      },
    },
  },
};
