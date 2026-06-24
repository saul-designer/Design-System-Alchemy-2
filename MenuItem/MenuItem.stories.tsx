import {
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import List from "@mui/material/List";
import { Chip } from "../../atoms/Chip";
import { Badge } from "../../atoms/Badge";
import { MenuItem } from "./MenuItem";

const meta: Meta<typeof MenuItem> = {
  title: "Molecules/MenuItem",
  component: MenuItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Sidebar navigation item for the Alchemy design system. Wraps MUI `ListItemButton` with 100px border-radius, matching the pill shape used across nav elements. Selected state applies a solid `primary.main` (#1F5FF2) fill with white text and icon — the canonical Alchemy selected-nav style. Use `endContent` for badges or chips (notification counts, "New" labels). Rendered inside a MUI `List` in the sidebar.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Navigation item label.",
    },
    icon: {
      control: false,
      description: 'Leading icon — use a Material Icon at `fontSize="small"`.',
    },
    selected: {
      control: "boolean",
      description:
        "Active/selected state: solid `primary.main` fill, white text and icon.",
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction. Greys out the item.",
    },
    endContent: {
      control: false,
      description:
        "Optional trailing content — typically a `Chip` or `Badge` for counts.",
    },
    onClick: {
      control: false,
      description: "Click handler for navigation. `() => void`.",
    },
    sx: {
      control: false,
      description: "MUI `sx` style overrides.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Playground: Story = {
  args: {
    label: "Daily Tracker",
    icon: <CalendarDays size={18} />,
  },
  decorators: [
    (Story) => (
      <List>
        <Story />
      </List>
    ),
  ],
};

export const Selected: Story = {
  args: {
    label: "Projects",
    icon: <ClipboardList size={18} />,
    selected: true,
  },
  decorators: [
    (Story) => (
      <List>
        <Story />
      </List>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Selected state — solid `primary.main` (#1F5FF2) fill, white text and icon. The single most recognizable Alchemy nav treatment.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Settings",
    icon: <Settings size={18} />,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <List>
        <Story />
      </List>
    ),
  ],
};

export const WithBadge: Story = {
  args: {
    label: "Issues",
    icon: <ClipboardList size={18} />,
    endContent: <Chip label="3" color="error" size="small" />,
  },
  decorators: [
    (Story) => (
      <List>
        <Story />
      </List>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Use `endContent` to show notification counts or status badges.",
      },
    },
  },
};

export const SidebarNav: Story = {
  render: () => (
    <List>
      <MenuItem label="Dashboard" icon={<LayoutDashboard size={18} />} />
      <MenuItem label="Projects" icon={<ClipboardList size={18} />} selected />
      <MenuItem
        label="Daily Tracker"
        icon={<CalendarDays size={18} />}
        endContent={<Badge badgeContent={2} color="error" />}
      />
      <MenuItem label="Blueprints" icon={<FileText size={18} />} />
      <MenuItem
        label="Users"
        icon={<Users size={18} />}
        endContent={<Chip label="New" color="primary" size="small" />}
      />
      <MenuItem label="Settings" icon={<Settings size={18} />} disabled />
    </List>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Full Alchemy sidebar navigation: one selected item, badge count on Daily Tracker, a "New" chip on Users, and Settings disabled.',
      },
    },
  },
};

export const OnSidebarGradient: Story = {
  render: () => (
    <div
      style={{
        background: "linear-gradient(180deg, #1649DF 0%, #152356 100%)",
        borderRadius: 8,
        padding: "8px",
        width: 240,
      }}
    >
      <List>
        <MenuItem
          label="Dashboard"
          icon={<LayoutDashboard size={18} />}
          sx={{
            color: "rgba(255,255,255,0.7)",
            "& .MuiListItemIcon-root": { color: "rgba(255,255,255,0.7)" },
          }}
        />
        <MenuItem label="Projects" icon={<ClipboardList size={18} />} selected />
        <MenuItem
          label="Daily Tracker"
          icon={<CalendarDays size={18} />}
          sx={{
            color: "rgba(255,255,255,0.7)",
            "& .MuiListItemIcon-root": { color: "rgba(255,255,255,0.7)" },
          }}
        />
        <MenuItem label="Settings" icon={<Settings size={18} />} disabled />
      </List>
    </div>
  ),
  parameters: {
    backgrounds: { disabled: true },
    docs: {
      description: {
        story:
          "Items rendered on the Alchemy sidebar gradient (`#1649DF → #152356`). Selected item stays white-on-blue; unselected items use reduced-opacity white.",
      },
    },
  },
};
