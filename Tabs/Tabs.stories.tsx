import { ClipboardList, FileText, History, TriangleAlert, Users } from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { Tabs } from "./Tabs";

const projectTabs = [
  {
    label: "Overview",
    content: (
      <Typography variant="body2">
        Hillcrest Commercial Build — Phase 2. Contract type: GMP. Start date: 2026-03-01.
        Owner: Elementos Development.
      </Typography>
    ),
  },
  {
    label: "Blueprints",
    content: (
      <Typography variant="body2">
        14 blueprint drawings attached. Last updated: 2026-04-28.
      </Typography>
    ),
  },
  {
    label: "Crew",
    content: (
      <Typography variant="body2">
        15 crew members assigned. Foreman: R. Castillo.
      </Typography>
    ),
  },
  {
    label: "Issues",
    content: (
      <Typography variant="body2">
        2 open issues. 1 escalated to project manager.
      </Typography>
    ),
  },
  {
    label: "History",
    content: <Typography variant="body2">Activity log for this project.</Typography>,
    disabled: true,
  },
];

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Content-switching tab component for the Alchemy design system. Wraps MUI `Tabs` + `Tab` + `TabPanel` in a single component — pass a `tabs` array and the component manages panels automatically. Supports controlled (`onChange`) and uncontrolled (`defaultTab`) modes, optional icons, scrollable overflow, and full-width variants. The `styleVariant="pill"` variant replaces the underline indicator with a filled rounded pill for the active tab — used on project detail and settings pages.',
      },
    },
  },
  tags: ["autodocs"],
  args: { tabs: projectTabs },
  argTypes: {
    tabs: {
      control: false,
      description:
        "Array of `{ label, content, disabled?, icon? }`. Each entry maps to a tab and its panel.",
    },
    defaultTab: {
      control: "number",
      description: "Zero-indexed tab to open by default in uncontrolled mode.",
    },
    styleVariant: {
      control: "select",
      options: ["default", "pill"],
      description:
        "`default` uses the MUI underline indicator. `pill` renders a filled rounded pill for the active tab — no underline indicator.",
    },
    variant: {
      control: "select",
      options: ["standard", "scrollable", "fullWidth"],
      description:
        "`standard` — tabs take minimum width. `scrollable` — overflow scrolls. `fullWidth` — tabs divide available width equally.",
    },
    scrollButtons: {
      control: "select",
      options: ["auto", true, false],
      description: "Show scroll arrows for the `scrollable` variant.",
    },
    onChange: {
      control: false,
      description: "Callback fired on tab change: `(index: number) => void`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {};

export const SecondTabDefault: Story = {
  args: { defaultTab: 1 },
  parameters: {
    docs: {
      description: {
        story: "`defaultTab: 1` opens the Blueprints tab on first render.",
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      {
        label: "Overview",
        icon: <ClipboardList />,
        content: <Typography variant="body2">Project overview content.</Typography>,
      },
      {
        label: "Blueprints",
        icon: <FileText />,
        content: (
          <Typography variant="body2">Blueprint drawings and documents.</Typography>
        ),
      },
      {
        label: "Crew",
        icon: <Users />,
        content: <Typography variant="body2">Crew assignment and headcount.</Typography>,
      },
      {
        label: "Issues",
        icon: <TriangleAlert />,
        content: <Typography variant="body2">Open issues and escalations.</Typography>,
      },
      {
        label: "History",
        icon: <History />,
        content: <Typography variant="body2">Activity history.</Typography>,
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Icon tabs — icons render above the label by MUI default.",
      },
    },
  },
};

export const Scrollable: Story = {
  args: {
    variant: "scrollable",
    scrollButtons: "auto",
    tabs: [
      { label: "Overview", content: <Typography variant="body2">Overview</Typography> },
      {
        label: "Blueprints",
        content: <Typography variant="body2">Blueprints</Typography>,
      },
      { label: "Crew", content: <Typography variant="body2">Crew</Typography> },
      { label: "Issues", content: <Typography variant="body2">Issues</Typography> },
      { label: "History", content: <Typography variant="body2">History</Typography> },
      { label: "Permits", content: <Typography variant="body2">Permits</Typography> },
      { label: "Documents", content: <Typography variant="body2">Documents</Typography> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Scrollable variant for wide tab sets — arrow buttons appear when tabs overflow.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: "fullWidth",
    tabs: projectTabs.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: "`fullWidth` divides available width equally — best for 2–4 tabs.",
      },
    },
  },
};

export const Pill: Story = {
  args: { styleVariant: "pill" },
  parameters: {
    docs: {
      description: {
        story:
          "Pill variant — the active tab gets a filled rounded pill (`blue[800]`) instead of the underline indicator. Tabs grow to fill available width equally.",
      },
    },
  },
};

export const PillScrollable: Story = {
  args: {
    styleVariant: "pill",
    variant: "scrollable",
    scrollButtons: "auto",
    tabs: [
      { label: "Overview", content: <Typography variant="body2">Overview</Typography> },
      {
        label: "Blueprints",
        content: <Typography variant="body2">Blueprints</Typography>,
      },
      { label: "Crew", content: <Typography variant="body2">Crew</Typography> },
      { label: "Issues", content: <Typography variant="body2">Issues</Typography> },
      { label: "History", content: <Typography variant="body2">History</Typography> },
      { label: "Permits", content: <Typography variant="body2">Permits</Typography> },
      { label: "Documents", content: <Typography variant="body2">Documents</Typography> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pill variant with scrollable overflow — arrow buttons appear when tabs exceed the container width.",
      },
    },
  },
};
