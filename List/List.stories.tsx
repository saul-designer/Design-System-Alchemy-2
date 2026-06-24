import {
  CalendarDays,
  CheckCircle,
  ClipboardList,
  FileText,
  TriangleAlert,
  Users,
} from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Molecules/List",
  component: List,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Declarative list of items for the Alchemy design system. Wraps MUI `List` with a typed `items` array API. Each item supports a primary label, optional secondary text, leading icon, click handler, divider, selected state, and disabled state. Used for navigation menus, activity feeds, issue lists, and settings panels.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    subheader: {
      control: "text",
      description: "Optional section heading rendered above the list items.",
    },
    dense: {
      control: "boolean",
      description: "Reduces item height for compact list views.",
    },
    items: {
      control: false,
      description:
        "Array of `{ id?, primary, secondary?, icon?, onClick?, disabled?, divider?, selected? }`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Playground: Story = {
  args: {
    items: [
      { id: 1, primary: "Daily Tracker", secondary: "Today's activity log" },
      { id: 2, primary: "Projects", secondary: "3 active projects" },
      { id: 3, primary: "Blueprints", secondary: "14 drawings" },
      { id: 4, primary: "Users", secondary: "8 team members" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 1,
        primary: "Daily Tracker",
        secondary: "Today's activity log",
        icon: <CalendarDays />,
      },
      {
        id: 2,
        primary: "Projects",
        secondary: "3 active projects",
        icon: <ClipboardList />,
      },
      {
        id: 3,
        primary: "Blueprints",
        secondary: "14 drawings",
        icon: <FileText />,
      },
      { id: 4, primary: "Users", secondary: "8 team members", icon: <Users /> },
    ],
  },
};

export const WithSubheader: Story = {
  args: {
    subheader: "Open issues",
    items: [
      {
        id: 1,
        primary: "Foundation crack — Zone B",
        secondary: "Escalated · Carlos López",
        icon: <TriangleAlert color="error" />,
      },
      {
        id: 2,
        primary: "Permit delay — Phase 2",
        secondary: "Pending · María Torres",
        icon: <TriangleAlert color="warning" />,
      },
      {
        id: 3,
        primary: "Inspection passed",
        secondary: "Closed · Roberto Silva",
        icon: <CheckCircle color="success" />,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Subheader labels a section — useful for grouping issues or tasks by category.",
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    items: [
      {
        id: 1,
        primary: "Daily Tracker",
        icon: <CalendarDays />,
        onClick: () => {},
        selected: true,
      },
      { id: 2, primary: "Projects", icon: <ClipboardList />, onClick: () => {} },
      { id: 3, primary: "Blueprints", icon: <FileText />, onClick: () => {} },
      {
        id: 4,
        primary: "Archived projects",
        icon: <ClipboardList />,
        onClick: () => {},
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Clickable items with a selected state. Disabled items are greyed out and not interactive.",
      },
    },
  },
};

export const WithDividers: Story = {
  args: {
    items: [
      {
        id: 1,
        primary: "Project details",
        secondary: "General information",
        divider: true,
      },
      { id: 2, primary: "Permits", secondary: "Approval status", divider: true },
      { id: 3, primary: "Crew", secondary: "15 assigned members" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Dividers separate logical groups within a single list.",
      },
    },
  },
};

export const Dense: Story = {
  args: {
    dense: true,
    subheader: "Recent activity",
    items: [
      { id: 1, primary: "Carlos López logged 8 hours" },
      { id: 2, primary: "Permit #BP-2026-0142 approved" },
      { id: 3, primary: "Blueprint rev. 4 uploaded" },
      { id: 4, primary: "Issue escalated to PM" },
      { id: 5, primary: "Crew headcount: 15" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dense mode reduces item height for compact activity feeds and audit logs.",
      },
    },
  },
};
