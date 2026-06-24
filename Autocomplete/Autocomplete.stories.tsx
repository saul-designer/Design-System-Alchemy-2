import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete } from "./Autocomplete";

const projectManagers = [
  "Carlos López",
  "María Torres",
  "Roberto Silva",
  "Laura Martínez",
  "Pedro Jiménez",
];
const tradeTypes = [
  "Electrical",
  "Plumbing",
  "HVAC",
  "Concrete",
  "Steel",
  "Carpentry",
  "Masonry",
  "Roofing",
];
const projectStatuses = ["Active", "On Hold", "Pending", "Completed", "Cancelled"];

const meta: Meta<typeof Autocomplete> = {
  title: "Molecules/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Autocomplete input with dropdown suggestions for the Alchemy design system. Wraps MUI `Autocomplete` with a built-in `TextField` using Alchemy's 16px rounded outline style. Supports single and multi-select (`multiple`), free-text entry (`freeSolo`), custom option types via the generic `<T>`, and the standard `error` / `helperText` validation pattern.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Field label rendered above the input.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when no value is selected.",
    },
    error: {
      control: "boolean",
      description: "Puts the field in error state — red border and helperText.",
    },
    helperText: {
      control: "text",
      description: "Helper or validation message shown below the input.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "Input height: `small` 40px · `medium` 56px.",
    },
    multiple: {
      control: "boolean",
      description: "Allows selecting multiple options. Selected values render as chips.",
    },
    freeSolo: {
      control: "boolean",
      description: "Allows typing any value, not just options from the list.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the field entirely.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Autocomplete
        {...args}
        key={String(args.multiple)}
        options={tradeTypes}
        label="Trade type"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Autocomplete
        options={projectManagers}
        label="Project manager"
        helperText="Select the lead PM for this project."
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Autocomplete
        options={projectManagers}
        label="Project manager"
        error
        helperText="Project manager is required."
      />
    </div>
  ),
};

export const MultiSelect: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Autocomplete options={tradeTypes} label="Trades on site" multiple />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multi-select mode — chosen values render as chips inside the input.",
      },
    },
  },
};

export const FreeSolo: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Autocomplete
        options={projectStatuses}
        label="Status filter"
        freeSolo
        helperText="Select from the list or type a custom value."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Free-solo mode — user can type any value in addition to selecting from suggestions.",
      },
    },
  },
};

export const SmallSize: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Autocomplete
        options={tradeTypes}
        label="Trade"
        size="small"
        placeholder="Select a trade"
      />
    </div>
  ),
};
