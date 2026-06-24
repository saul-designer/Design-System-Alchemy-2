import {
  Archive,
  Copy,
  ExternalLink,
  FileDown,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../atoms/Button";
import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Molecules/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown context menu for the Alchemy design system. Wraps MUI `Menu` with a declarative `items` array API. Each item supports a label, icon, click handler, divider, and disabled state. Use for row-level actions in tables, `MoreVert` overflow menus, and contextual action dropdowns.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: false,
      description:
        "Array of `MenuAction` — each with `label`, optional `icon`, `onClick`, `disabled`, and `divider`.",
    },
    open: {
      control: false,
      description:
        "Controls whether the menu is visible. Pair with `anchorEl` and `onClose`.",
    },
    anchorEl: {
      control: false,
      description: "The DOM element the menu positions itself relative to.",
    },
    onClose: {
      control: false,
      description: "Called when the user clicks outside the menu or presses Escape.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Playground: Story = {
  render: () => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const items = [
      {
        label: "Edit project",
        icon: <Pencil size={18} />,
        onClick: () => setAnchor(null),
      },
      {
        label: "Duplicate",
        icon: <Copy size={18} />,
        onClick: () => setAnchor(null),
      },
      {
        label: "Export PDF",
        icon: <FileDown size={18} />,
        onClick: () => setAnchor(null),
        divider: true,
      },
      {
        label: "Archive",
        icon: <Archive size={18} />,
        onClick: () => setAnchor(null),
      },
      {
        label: "Delete project",
        icon: <Trash2 size={18} />,
        onClick: () => setAnchor(null),
      },
    ];
    return (
      <>
        <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>
          Project actions
        </Button>
        <Menu
          items={items}
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full project actions menu — icons, a divider separating the destructive section, and all items clickable.",
      },
    },
  },
};

export const OverflowMenu: Story = {
  render: () => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const items = [
      {
        label: "View details",
        icon: <ExternalLink size={18} />,
        onClick: () => setAnchor(null),
      },
      {
        label: "Edit",
        icon: <Pencil size={18} />,
        onClick: () => setAnchor(null),
      },
      {
        label: "Delete",
        icon: <Trash2 size={18} />,
        divider: true,
        onClick: () => setAnchor(null),
      },
      { label: "Archive", disabled: true, icon: <Archive size={18} /> },
    ];
    return (
      <>
        <Button
          variant="text"
          color="inherit"
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <MoreVertical />
        </Button>
        <Menu
          items={items}
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`MoreVert` overflow menu pattern — compact trigger, last item disabled (e.g. archive unavailable on active projects).",
      },
    },
  },
};

export const WithoutIcons: Story = {
  render: () => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const items = [
      { label: "Edit", onClick: () => setAnchor(null) },
      { label: "Duplicate", onClick: () => setAnchor(null) },
      { label: "Delete", divider: true, onClick: () => setAnchor(null) },
    ];
    return (
      <>
        <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>
          Actions
        </Button>
        <Menu
          items={items}
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
        />
      </>
    );
  },
};
