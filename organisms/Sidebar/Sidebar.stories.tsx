import { FileText, List, Send, Settings, Users } from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { Sidebar, type SidebarProps } from "./Sidebar";
import { SidebarUserFooter } from "./SidebarUserFooter";
const alchemyIconSrc = new URL("./assets/alchemy-icon.svg", import.meta.url).href;
const alchemyLogoSrc = new URL("./assets/alchemy-logo-full-color.svg", import.meta.url)
  .href;

const alchemyLogo = (
  <img
    src={alchemyLogoSrc}
    alt="Alchemy"
    style={{ height: 28, display: "block", maxWidth: "100%" }}
  />
);

const alchemyIcon = (
  <img
    src={alchemyIconSrc}
    alt="Alchemy"
    style={{ height: 32, width: 32, display: "block" }}
  />
);

const badgeLogo = <Box>A</Box>;

const logoPresets = {
  alchemy: { logo: alchemyLogo, collapsedLogo: alchemyIcon },
  badge: { logo: badgeLogo, collapsedLogo: badgeLogo },
  none: { logo: undefined, collapsedLogo: undefined },
} as const;

type LogoPreset = keyof typeof logoPresets;

type SidebarStoryArgs = SidebarProps & {
  logoPreset?: LogoPreset;
};

const meta: Meta<SidebarStoryArgs> = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Navigation sidebar built on MUI Drawer. Sections group nav items with optional section titles. The active item uses MUI `selected` state on `MenuItem`. Supports `permanent`, `persistent`, and `temporary` (mobile overlay) variants. Pass `logo` for the expanded header and `collapsedLogo` for the icon-only state — consumers can swap both for any `ReactNode` (an `<img>`, an inline SVG, or a styled `Box`).",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box>
        <Story />
        <Box>
          <Box>Main content area</Box>
        </Box>
      </Box>
    ),
  ],
  args: {
    width: 250,
    collapsedWidth: 64,
  },
  argTypes: {
    logoPreset: {
      control: "select",
      options: Object.keys(logoPresets),
      description:
        "Story-only helper that swaps the `logo` / `collapsedLogo` props between presets — useful to preview replacing the brand assets without editing code.",
      table: { category: "Story" },
    },
    title: {
      control: "text",
      description: "Brand name rendered in the header next to the logo.",
    },
    width: {
      control: { type: "number", min: 200, max: 400 },
      description: "Sidebar width in pixels. Defaults to `250`.",
    },
    collapsedWidth: {
      control: { type: "number", min: 48, max: 120 },
      description: "Width in pixels when collapsed. Defaults to `64`.",
    },
    variant: {
      control: "select",
      options: ["permanent", "persistent", "temporary"],
      description:
        "`permanent` for desktop shell · `temporary` for mobile overlay that closes on backdrop click.",
    },
    open: {
      control: "boolean",
      description: "Controls visibility for `persistent` and `temporary` variants.",
    },
    collapsible: {
      control: "boolean",
      description:
        "Adds a chevron toggle button in the header. When collapsed only icons are visible; labels appear as tooltips on hover.",
    },
    collapsed: {
      control: "boolean",
      description:
        "Controlled collapsed state. Omit to let the component manage state internally.",
    },
    logo: {
      control: false,
      description:
        "Brand mark rendered in the expanded header. Pass any `ReactNode` (image, inline SVG, styled `Box`).",
    },
    collapsedLogo: {
      control: false,
      description:
        "Brand mark rendered when the sidebar is collapsed. Falls back to `logo` when omitted — typically an icon-only version of the brand.",
    },
    sections: {
      control: false,
      description:
        "Array of `{ title?, items[] }` navigation groups separated by dividers.",
    },
    footer: {
      control: false,
      description:
        "Content pinned to the bottom above a 1 px divider — typically the signed-in user.",
    },
    onClose: {
      control: false,
      description: "Called when the temporary drawer backdrop is clicked.",
    },
    onCollapsedChange: {
      control: false,
      description:
        "Callback fired when the collapse state changes: `(collapsed: boolean) => void`.",
    },
    sx: { control: false, description: "MUI `sx` overrides for the Drawer root." },
  },
  render: ({ logoPreset = "alchemy", logo, collapsedLogo, ...args }) => {
    const preset = logoPresets[logoPreset];
    return (
      <Sidebar
        {...args}
        logo={logo ?? preset.logo}
        collapsedLogo={collapsedLogo ?? preset.collapsedLogo}
      />
    );
  },
};

export default meta;
type Story = StoryObj<SidebarStoryArgs>;

const commonSections = [
  {
    title: "Workspace",
    items: [
      { label: "Jobs", icon: <Send size={18} />, selected: true },
      { label: "Documents", icon: <FileText size={18} /> },
      { label: "Fields", icon: <List size={18} /> },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Users", icon: <Users size={18} /> },
      { label: "Settings", icon: <Settings size={18} /> },
    ],
  },
];

const userFooter = <SidebarUserFooter name="Saúl Castillo" email="saul@elementos.co" />;

export const Playground: Story = {
  args: {
    sections: commonSections,
    logoPreset: "alchemy",
  },
};

export const Collapsible: Story = {
  args: {
    sections: commonSections,
    collapsible: true,
    logoPreset: "alchemy",
    footer: userFooter,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click the chevron in the header to toggle between expanded and collapsed. The expanded state shows the full `logo` (wordmark); the collapsed state swaps to `collapsedLogo` (icon only). Footer is hidden when collapsed.",
      },
    },
  },
};

export const WithFooter: Story = {
  args: {
    sections: commonSections,
    logoPreset: "alchemy",
    footer: userFooter,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Footer slot is pinned to the bottom above a 1 px divider — ideal for the signed-in user card.",
      },
    },
  },
};

export const CustomLogo: Story = {
  args: {
    sections: commonSections,
    title: "Acme",
    collapsible: true,
    logoPreset: "none",
    logo: badgeLogo,
    collapsedLogo: badgeLogo,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Replace the brand assets by passing your own `logo` and `collapsedLogo` nodes. Any `ReactNode` works — an `<img>`, inline `<svg>`, or a styled MUI `Box`. Use `collapsedLogo` to provide an icon-only mark for the collapsed state; if omitted it falls back to `logo`.",
      },
    },
  },
};
