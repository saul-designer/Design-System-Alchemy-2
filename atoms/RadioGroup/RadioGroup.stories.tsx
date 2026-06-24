import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "supervisor", label: "Supervisor" },
  { value: "operator", label: "Operator" },
  { value: "viewer", label: "Viewer (read-only)", disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "RadioGroup for the Alchemy design system. Uses `primary.main` (#1F5FF2) for the selected radio. Wrap in a `FormField` molecule for label + helper text + error state in real forms. Use `row` for short option lists (≤3) to save vertical space.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Group legend rendered above the options." },
    row: {
      control: "boolean",
      description: "Lay options out horizontally. Recommended for ≤3 options.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "`small` for dense filter panels.",
    },
    defaultValue: {
      control: "text",
      description: "Initially selected value (uncontrolled).",
    },
  },
  args: { options: roleOptions },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  args: {
    label: "User role",
    defaultValue: "operator",
    row: false,
    size: "medium",
  },
};

export const WithLabel: Story = {
  args: { label: "User role" },
};

export const WithDefaultValue: Story = {
  args: { label: "User role", defaultValue: "operator" },
};

export const Row: Story = {
  args: { label: "User role", row: true },
};

export const SmallSize: Story = {
  args: { label: "User role", size: "small" },
};

export const SmallRadios: Story = {
  args: { label: "User role", radioProps: { size: "small" } },
};
