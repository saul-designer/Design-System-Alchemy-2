import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusChip } from "./StatusChip";

const meta: Meta<typeof StatusChip> = {
  title: "Molecules/StatusChip",
  component: StatusChip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pre-configured semantic status chip for the Alchemy design system. Each `status` value maps to a fixed color/background pair derived from the Alchemy palette — no arbitrary color props. Prevents visual inconsistency across project, user, and issue status displays. The `label` prop overrides the default display text when needed. Border-radius is `6px` (denser than the pill chips elsewhere).",
      },
    },
  },
  tags: ["autodocs"],
  args: { status: "active" },
  argTypes: {
    status: {
      control: "select",
      options: [
        "active",
        "inactive",
        "pending",
        "in_progress",
        "on_hold",
        "completed",
        "cancelled",
        "error",
        "draft",
      ],
      description:
        "Semantic status value. Each maps to a fixed Alchemy color pair — no free-form color prop.",
    },
    label: {
      control: "text",
      description:
        "Overrides the default display text for the status. Useful for locale overrides or abbreviated labels.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description:
        "`small` (default) for table cells and cards · `medium` for detail headers.",
    },
    sx: {
      control: false,
      description: "MUI `sx` style overrides.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

export const Playground: Story = {};

export const Active: Story = {
  args: { status: "active" },
};

export const Inactive: Story = {
  args: { status: "inactive" },
};

export const Pending: Story = {
  args: { status: "pending" },
};

export const InProgress: Story = {
  args: { status: "in_progress" },
};

export const OnHold: Story = {
  args: { status: "on_hold" },
};

export const Completed: Story = {
  args: { status: "completed" },
};

export const Cancelled: Story = {
  args: { status: "cancelled" },
};

export const ErrorStatus: Story = {
  args: { status: "error" },
};

export const Draft: Story = {
  args: { status: "draft" },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <StatusChip status="active" />
      <StatusChip status="inactive" />
      <StatusChip status="pending" />
      <StatusChip status="in_progress" />
      <StatusChip status="on_hold" />
      <StatusChip status="completed" />
      <StatusChip status="cancelled" />
      <StatusChip status="error" />
      <StatusChip status="draft" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All 9 status variants — the complete set used across projects, issues, and user records.",
      },
    },
  },
};

export const ProjectTableRow: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        gap: "8px 24px",
        alignItems: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: 14,
        color: "rgba(21,35,86,0.87)",
        background: "#fff",
        padding: "12px 16px",
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        width: 480,
      }}
    >
      <span>Hillcrest Commercial Build</span>
      <span style={{ color: "rgba(21,35,86,0.6)", fontSize: 12 }}>Phase 2</span>
      <StatusChip status="in_progress" />

      <span>Riverside Office Park</span>
      <span style={{ color: "rgba(21,35,86,0.6)", fontSize: 12 }}>Phase 1</span>
      <StatusChip status="on_hold" />

      <span>Airport Terminal Expansion</span>
      <span style={{ color: "rgba(21,35,86,0.6)", fontSize: 12 }}>Phase 3</span>
      <StatusChip status="completed" />

      <span>Downtown Mixed-Use Tower</span>
      <span style={{ color: "rgba(21,35,86,0.6)", fontSize: 12 }}>Phase 1</span>
      <StatusChip status="pending" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Status chips in a projects table — `small` size keeps them compact inside rows.",
      },
    },
  },
};
