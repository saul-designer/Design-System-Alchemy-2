import { Pencil, Plus } from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fab } from "./Fab";

const meta: Meta<typeof Fab> = {
  title: "Atoms/Fab",
  component: Fab,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Floating Action Button for the Alchemy design system. Uses `primary.main` (#1F5FF2) by default. Prefer `size="medium"` or `size="large"` for primary page actions; use `variant="extended"` when a text label improves discoverability.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "error",
        "warning",
        "info",
        "success",
        "inherit",
      ],
      description:
        "Alchemy semantic color. `primary` (#1F5FF2) is the standard FAB color.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "`small` 40px · `medium` 48px · `large` 56px.",
    },
    variant: {
      control: "select",
      options: ["circular", "extended"],
      description: "`extended` adds text label alongside the icon.",
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Playground: Story = {
  render: (args) => (
    <Fab {...args}>
      <Plus />
    </Fab>
  ),
  args: {
    color: "primary",
    size: "large",
    variant: "circular",
    disabled: false,
    "aria-label": "Add task",
  },
};

export const Secondary: Story = {
  args: { color: "secondary", "aria-label": "Edit project", children: <Pencil /> },
};

export const Extended: Story = {
  args: {
    variant: "extended",
    "aria-label": "Add task",
    children: (
      <>
        <Plus />
        Add task
      </>
    ),
  },
};

export const Small: Story = {
  args: { size: "small", "aria-label": "add", children: <Plus /> },
};

export const Medium: Story = {
  args: { size: "medium", "aria-label": "add", children: <Plus /> },
};

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "add", children: <Plus /> },
};
