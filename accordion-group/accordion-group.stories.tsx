import type { Meta, StoryObj } from "@storybook/react-vite";
import { AccordionGroup } from "./accordion-group";

const projectItems = [
  {
    id: "details",
    title: "Project details",
    content:
      "Hillcrest Commercial Build — Phase 2. Owner: Elementos Development. Contract type: GMP. Start date: 2026-03-01.",
  },
  {
    id: "permits",
    title: "Permits",
    content:
      "Building permit #BP-2026-0142 approved. Electrical inspection scheduled for 2026-05-14.",
  },
  {
    id: "crew",
    title: "Crew",
    content:
      "15 crew members assigned. Foreman: R. Castillo. Daily headcount tracked via Activity Tracker.",
  },
  {
    id: "issues",
    title: "Issues",
    content: "2 open issues. 1 escalated to project manager.",
  },
];

const meta: Meta<typeof AccordionGroup> = {
  title: "Molecules/AccordionGroup",
  component: AccordionGroup,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Managed group of `Accordion` panels. Coordinates expand/collapse state across items: `allowMultiple` controls whether one or several panels can be open simultaneously. Items spaced 12px apart (`mb: 1.5`) with no trailing gap. Supports controlled (`expandedIds`) and uncontrolled (`defaultExpandedIds`) modes.",
      },
    },
  },
  tags: ["autodocs"],
  args: { items: projectItems, allowMultiple: true },
  argTypes: {
    allowMultiple: {
      control: "boolean",
      description:
        "When `false`, opening a panel closes all others — accordion-style. Default `true`.",
    },
    expandedIds: {
      control: false,
      description:
        "Controlled list of open panel IDs. Requires `onChangeExpanded` to stay in sync.",
    },
    defaultExpandedIds: {
      control: false,
      description: "Initial set of open panel IDs in uncontrolled mode.",
    },
    onChangeExpanded: {
      control: false,
      description: "Callback fired on any toggle: `(expandedIds: string[]) => void`.",
    },
    sx: {
      control: false,
      description: "MUI `sx` overrides applied to each accordion panel.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AccordionGroup>;

export const Playground: Story = {};

export const MultipleOpen: Story = {
  args: { allowMultiple: true, defaultExpandedIds: ["details", "crew"] },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple panels open simultaneously — useful for dense detail views where users compare sections.",
      },
    },
  },
};

export const SingleOpen: Story = {
  args: { allowMultiple: false, defaultExpandedIds: ["details"] },
  parameters: {
    docs: {
      description: {
        story:
          "Only one panel open at a time. Opening another collapses the current one — standard accordion UX.",
      },
    },
  },
};

export const WithDisabledItem: Story = {
  args: {
    allowMultiple: true,
    defaultExpandedIds: ["details"],
    items: [
      ...projectItems.slice(0, 3),
      {
        id: "archived",
        title: "Archived data",
        content: "Locked — previous phase data.",
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled items render greyed out and cannot be expanded.",
      },
    },
  },
};
