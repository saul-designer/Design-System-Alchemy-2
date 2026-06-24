import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox for the Alchemy design system. Checked state uses `primary.main` (#1F5FF2). Wraps in a `FormControlLabel` when `label` is supplied. Use `indeterminate` for select-all controls in Alchemy data table headers.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text. Renders inside a `FormControlLabel`.",
    },
    labelPlacement: {
      control: "select",
      options: ["start", "end", "top", "bottom"],
      description: "Label position relative to the checkbox. Default: `end`.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "`small` for dense Alchemy table rows.",
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "error", "warning", "info", "success"],
      description: "Defaults to `primary` (#1F5FF2).",
    },
    indeterminate: {
      control: "boolean",
      description:
        "Partial-selection state. Use in select-all header cells for data tables.",
    },
    disabled: {
      control: "boolean",
      description:
        "Disabled: `rgba(21,35,86,0.38)` on `rgba(21,35,86,0.12)` — Alchemy ink alpha system.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {
    label: "Include in report",
    size: "medium",
    color: "primary",
    disabled: false,
    indeterminate: false,
  },
};

export const WithLabel: Story = {
  args: { label: "Notify project team" },
};

export const Checked: Story = {
  args: { label: "Include in report", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all tasks", indeterminate: true },
};

export const Disabled: Story = {
  args: { label: "Restricted option", disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: "Required (locked)", disabled: true, defaultChecked: true },
};

export const LabelStart: Story = {
  args: { label: "Show on dashboard", labelPlacement: "start" },
};

export const LabelTop: Story = {
  args: { label: "Enable notifications", labelPlacement: "top" },
};

export const Small: Story = {
  args: { label: "Compact row", size: "small" },
};
