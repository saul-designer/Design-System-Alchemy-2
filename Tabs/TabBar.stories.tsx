import {
  BarChart3,
  ClipboardList,
  FileText,
  Folder,
  HardHat,
  LayoutDashboard,
  Receipt,
} from "lucide-react";
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabBar, type TabBarItem } from "./TabBar";

const projectTrackerItems: TabBarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  {
    id: "construction-orders",
    label: "Construction Orders",
    icon: <HardHat size={18} />,
  },
  { id: "files", label: "Files", icon: <Folder size={18} /> },
  { id: "production-logs", label: "Production Logs", icon: <ClipboardList size={18} /> },
  { id: "invoices", label: "Invoices", icon: <Receipt size={18} /> },
  { id: "bore-logs", label: "Bore Logs", icon: <FileText size={18} /> },
  { id: "reports-ar", label: "Reports / AR", icon: <BarChart3 size={18} /> },
];

function ControlledTabBar({
  items,
  initialId,
  styleVariant,
}: {
  items: TabBarItem[];
  initialId: string;
  styleVariant?: "icon-grid" | "underline";
}) {
  const [value, setValue] = useState(initialId);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TabBar
        items={items}
        value={value}
        onChange={setValue}
        styleVariant={styleVariant}
        aria-label="Project dashboard sections"
      />
      <Typography variant="body2" color="text.secondary">
        Active tab: <strong>{value}</strong>
      </Typography>
    </Box>
  );
}

const meta: Meta<typeof TabBar> = {
  title: "Molecules/TabBar",
  component: TabBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navigation-only tab bar for module dashboards. Controlled by string `id`, supports icon-grid and underline variants, responsive scroll on narrow viewports, and theme palette colors (`primary` or `secondary`). Use `Tabs` when you need built-in tab panels.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const IconGrid: Story = {
  render: () => (
    <ControlledTabBar
      items={projectTrackerItems}
      initialId="dashboard"
      styleVariant="icon-grid"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-grid variant — icon above label, full-width on desktop, scrollable on mobile. Used on Project Tracker dashboard navigation.",
      },
    },
  },
};

export const Underline: Story = {
  render: () => (
    <ControlledTabBar
      items={projectTrackerItems.slice(0, 4)}
      initialId="dashboard"
      styleVariant="underline"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact underline variant for secondary navigation or fewer tabs.",
      },
    },
  },
};

export const SecondaryColor: Story = {
  render: () => (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TabBar
        items={projectTrackerItems.slice(0, 4)}
        value="dashboard"
        onChange={() => undefined}
        color="secondary"
        aria-label="Secondary color tabs"
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Uses `color="secondary"` so active and hover states follow the theme secondary palette.',
      },
    },
  },
};

export const WithDisabledTab: Story = {
  render: () => (
    <ControlledTabBar
      items={[
        ...projectTrackerItems.slice(0, 3),
        {
          id: "reports-ar",
          label: "Reports / AR",
          icon: <BarChart3 size={18} />,
          disabled: true,
        },
      ]}
      initialId="dashboard"
    />
  ),
};
