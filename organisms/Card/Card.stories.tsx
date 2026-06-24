import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { Button } from "../../atoms/Button";
import { StatusChip } from "../../molecules/StatusChip";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Organisms/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Surface container with optional header, footer, and dividers. `border-radius: 10px` matches the Alchemy card token. Compose with `title`, `subtitle`, `headerAction`, and `footer` slots — or pass `children` directly for content-only usage.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: (
      <Typography variant="body2" color="text.secondary">
        Card content goes here.
      </Typography>
    ),
  },
  argTypes: {
    title: {
      control: "text",
      description: "Card header title. Renders as `h6` with `fontWeight 600`.",
    },
    subtitle: {
      control: "text",
      description: "Secondary line below the title — `body2` style.",
    },
    dividerAfterHeader: {
      control: "boolean",
      description: "Adds a full-bleed `<Divider>` between the header and content.",
    },
    dividerBeforeFooter: {
      control: "boolean",
      description:
        "Adds a `<Divider>` above the footer. Defaults to `true` when a footer is present.",
    },
    noPadding: {
      control: "boolean",
      description:
        "Strips padding from the content area — useful for flush lists or tables.",
    },
    headerAction: {
      control: false,
      description:
        "Slot in the card header's top-right corner — typically a `StatusChip` or icon button.",
    },
    footer: {
      control: false,
      description: "Action area below the content, separated by a divider.",
    },
    contentSx: {
      control: false,
      description: "MUI `sx` overrides for the CardContent wrapper.",
    },
    sx: { control: false, description: "MUI `sx` overrides for the card root." },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {};

export const WithHeader: Story = {
  args: {
    title: "Project Summary",
    subtitle: "Overview of current progress",
    children: (
      <Typography variant="body2" color="text.secondary">
        The project is currently 65% complete with 3 pending tasks.
      </Typography>
    ),
  },
};

export const WithHeaderAction: Story = {
  args: {
    title: "Recent Projects",
    headerAction: <StatusChip status="active" />,
    dividerAfterHeader: true,
    children: (
      <Typography variant="body2" color="text.secondary">
        Your most recently accessed projects will appear here.
      </Typography>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header action slot renders in the top-right corner — commonly a `StatusChip`, icon button, or overflow menu.",
      },
    },
  },
};

export const WithFooter: Story = {
  args: {
    title: "Action Card",
    subtitle: "This card requires user action",
    children: (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Review the details below and confirm your selection.
      </Typography>
    ),
    footer: (
      <>
        <Button variant="outlined" color="inherit" size="small">
          Cancel
        </Button>
        <Button variant="contained" size="small" sx={{ ml: 1 }}>
          Confirm
        </Button>
      </>
    ),
  },
};

export const Full: Story = {
  args: {
    title: "Alchemy Project",
    subtitle: "Started Apr 26, 2026",
    headerAction: <StatusChip status="in_progress" />,
    dividerAfterHeader: true,
    children: (
      <div>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Component library for React and Next.js based on Material UI v7.
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Last updated 2 hours ago
        </Typography>
      </div>
    ),
    footer: (
      <>
        <Button variant="outlined" size="small">
          View Details
        </Button>
        <Button variant="contained" size="small" sx={{ ml: 1 }}>
          Edit
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full card with header, divider, status chip in the action slot, body content, and action footer.",
      },
    },
  },
};
