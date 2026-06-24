import { ChevronDown, FileDown, Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup } from "./ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Group of related `Button` atoms rendered as a connected unit for the Alchemy design system. Wraps MUI `ButtonGroup` with a declarative `buttons` array API. Inherits Alchemy button traits: 24px border-radius on the outer corners, `text-transform: none`. Use for segmented action sets, filter toggles, or split-button patterns.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    buttons: [{ label: "Add task" }, { label: "Edit" }, { label: "Delete" }],
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "contained", "text"],
      description:
        "`outlined` (default) — shared borders. `contained` — solid fill. `text` — no borders.",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Stacks buttons horizontally (default) or vertically.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Maps to `minHeight`: `small` 32px · `medium` 40px · `large` 48px.",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "warning", "info", "success", "inherit"],
      description: "Alchemy semantic color applied to all buttons in the group.",
    },
    disabled: {
      control: "boolean",
      description: "Disables all buttons in the group at once.",
    },
    buttons: {
      control: false,
      description:
        "Array of `{ label, onClick?, disabled?, startIcon?, endIcon? }` — one entry per button.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    buttons: [
      { label: "Add task", startIcon: <Plus /> },
      { label: "Edit", startIcon: <Pencil /> },
      { label: "Delete", startIcon: <Trash2 /> },
    ],
  },
};

export const Contained: Story = {
  args: {
    variant: "contained",
    buttons: [{ label: "Save" }, { label: "Save and close" }],
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    buttons: [{ label: "Day" }, { label: "Week" }, { label: "Month" }],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Text variant used for view-selector toggles — e.g., Daily Tracker date range.",
      },
    },
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    variant: "outlined",
    buttons: [
      { label: "Overview" },
      { label: "Permits" },
      { label: "Crew" },
      { label: "Issues" },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    buttons: [
      { label: "Export PDF", startIcon: <FileDown /> },
      { label: "Export CSV", startIcon: <FileDown /> },
      { label: "Archive", disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Individual buttons can be disabled within an otherwise active group.",
      },
    },
  },
};

export const SplitButton: Story = {
  args: {
    variant: "contained",
    buttons: [
      { label: "Create report" },
      {
        label: <ChevronDown size={18} />,
        "aria-label": "select report type",
      } as never,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Split-button pattern: primary action on the left, dropdown trigger on the right. The two share a single visual unit.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-start",
      }}
    >
      <ButtonGroup
        size="small"
        buttons={[{ label: "Small" }, { label: "Group" }, { label: "Buttons" }]}
      />
      <ButtonGroup
        size="medium"
        buttons={[{ label: "Medium" }, { label: "Group" }, { label: "Buttons" }]}
      />
      <ButtonGroup
        size="large"
        buttons={[{ label: "Large" }, { label: "Group" }, { label: "Buttons" }]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "`small` 32px · `medium` 40px · `large` 48px minimum height.",
      },
    },
  },
};
