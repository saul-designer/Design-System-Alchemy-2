import { Star } from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip, ALCHEMY_CHIP_PRESETS, type AlchemyChipPreset } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Chip for the Alchemy design system. Use `preset` for Alchemy Sign semantic variants (sent, viewed, signed, expired, etc.). Use `color` + `variant` for MUI standard colors, or pass `sx` for fully custom styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    preset: {
      control: "select",
      options: [undefined, ...Object.keys(ALCHEMY_CHIP_PRESETS)],
      description:
        "Alchemy Sign semantic preset. Applies the matching background, text, and border colors. Overrides `color` when set.",
    },
    variant: {
      control: "select",
      options: ["filled", "outlined"],
      description:
        "`filled` — solid background (default). `outlined` — border only, transparent background.",
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "error", "warning", "info", "success"],
      description: "MUI semantic color token. Ignored when `preset` is set.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description:
        "`small` — 24px height for dense contexts (table cells, list items). `medium` — default.",
    },
    clickable: {
      control: "boolean",
      description: "Adds hover/focus styles for interactive chips.",
    },
    disabled: {
      control: "boolean",
      description: "Disabled: `rgba(21,35,86,0.38)` on `rgba(21,35,86,0.12)`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  args: {
    label: "Signed",
    preset: "signed",
    size: "small",
    clickable: false,
    disabled: false,
  },
};

// ─── Alchemy Sign presets ─────────────────────────────────────────────────────

export const AlchemySignStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip label="Sent" preset="sent" size="small" />
      <Chip label="Viewed" preset="viewed" size="small" />
      <Chip label="Signed" preset="signed" size="small" />
      <Chip label="Expired" preset="expired" size="small" />
      <Chip label="Active" preset="active" size="small" />
      <Chip label="Inactive" preset="inactive" size="small" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Job / document lifecycle statuses from the Alchemy Sign design.",
      },
    },
  },
};

export const AlchemySignRoles: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip label="Admin" preset="admin" size="small" />
      <Chip label="Public" preset="public" size="small" />
      <Chip label="System" preset="system" size="small" />
      <Chip label="Contractor" preset="contractor" size="small" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Role / source chips used across user tables and field registries.",
      },
    },
  },
};

export const VersionChip: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip label="v1" preset="version" size="small" />
      <Chip label="v4 · draft" preset="version" size="small" />
      <Chip label="v7" preset="version" size="small" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Version badge used on document templates.",
      },
    },
  },
};

export const AllPresets: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 480 }}>
      {(Object.keys(ALCHEMY_CHIP_PRESETS) as AlchemyChipPreset[]).map((p) => (
        <Chip
          key={p}
          label={p.charAt(0).toUpperCase() + p.slice(1)}
          preset={p}
          size="small"
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Every available `preset` value rendered at a glance.",
      },
    },
  },
};

// ─── MUI standard colors ──────────────────────────────────────────────────────

export const MuiColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip label="Default" />
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Error" color="error" />
      <Chip label="Warning" color="warning" />
      <Chip label="Info" color="info" />
      <Chip label="Success" color="success" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Standard MUI `color` tokens — use when a preset doesn't fit.",
      },
    },
  },
};

// ─── Custom colors via sx ─────────────────────────────────────────────────────

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip label="Brand gradient" size="small" />
      <Chip label="Custom teal" size="small" />
      <Chip label="Dark navy" size="small" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass any `sx` styles for fully custom chip colors. Works alongside or instead of `preset`.",
      },
    },
  },
};

// ─── Size & interaction variants ─────────────────────────────────────────────

export const Outlined: Story = {
  args: {
    label: "Outlined",
    color: "primary",
    variant: "outlined",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Featured",
    icon: <Star />,
    color: "primary",
  },
};

export const Deletable: Story = {
  args: {
    label: "Removable",
    preset: "admin",
    size: "small",
    onDelete: () => {},
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Chip label="Medium" preset="signed" size="medium" />
      <Chip label="Small" preset="signed" size="small" />
    </div>
  ),
};
