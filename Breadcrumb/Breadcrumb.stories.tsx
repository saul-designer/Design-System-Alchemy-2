import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navigation breadcrumb trail for the Alchemy design system. Wraps MUI `Breadcrumbs`. Each item accepts either `href` (renders an `<a>` tag) or `onClick` (renders a button-style link). The last item renders as non-interactive body text — it represents the current page. Supports `maxItems` to collapse long paths.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: false,
      description:
        "Array of `{ label, href?, onClick? }`. Last item is always rendered as static text regardless of `href`/`onClick`.",
    },
    maxItems: {
      control: "number",
      description:
        "Maximum items shown before collapsing the middle into an ellipsis (`…`). MUI default is 8.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {
  args: {
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Hillcrest Commercial Build", href: "/projects/hillcrest" },
      { label: "Daily Tracker" },
    ],
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Hillcrest Commercial Build", href: "/projects/hillcrest" },
      { label: "Daily Tracker" },
    ],
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: "Projects", onClick: fn() },
      { label: "Blueprints", onClick: fn() },
      { label: "Foundation Layout" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `onClick` instead of `href` for SPA navigation or custom routing logic.",
      },
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Dashboard" }],
  },
  parameters: {
    docs: {
      description: {
        story: "Single item renders as static text — used on the root/dashboard page.",
      },
    },
  },
};

export const DeepPath: Story = {
  args: {
    maxItems: 3,
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Hillcrest Commercial Build", href: "/projects/hillcrest" },
      { label: "Phase 2", href: "/projects/hillcrest/phase-2" },
      { label: "Blueprints", href: "/projects/hillcrest/phase-2/blueprints" },
      { label: "Foundation Layout" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "`maxItems: 3` collapses the middle segments into `…` — keeps the trail readable on deep navigation paths.",
      },
    },
  },
};
