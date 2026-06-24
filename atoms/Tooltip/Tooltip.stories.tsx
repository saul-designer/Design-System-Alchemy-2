import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Tooltip for the Alchemy design system. Theme overrides: `border-radius` `radius-sm` (8px), `font-size` 0.75rem. Alchemy copy voice: sentence-case, no exclamation points. Permission-block tooltips end with a period: "Disabled due to lack of permissions."',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "right",
      ],
    },
    arrow: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained">Hover me</Button>
    </Tooltip>
  ),
  args: {
    title: "View project details",
    placement: "bottom",
    arrow: false,
  },
};

export const WithArrow: Story = {
  args: {
    title: "View project details",
    arrow: true,
    children: <Button variant="outlined">Hover me</Button>,
  },
};

export const PermissionDisabled: Story = {
  args: {
    title: "Disabled due to lack of permissions.",
    arrow: true,
    children: (
      <span>
        <Button variant="contained" disabled>
          Delete project
        </Button>
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Alchemy pattern for permission-gated actions. Copy ends with a period and uses sentence-case. The `<span>` wrapper is required because disabled buttons don't fire mouse events.",
      },
    },
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} title={placement} placement={placement} arrow>
          <Button variant="outlined">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const RichContent: Story = {
  args: {
    title: (
      <div>
        <strong>Rich tooltip</strong>
        <p style={{ margin: "4px 0 0" }}>Supports any React node as content.</p>
      </div>
    ),
    children: <Button variant="contained">Rich tooltip</Button>,
  },
};
