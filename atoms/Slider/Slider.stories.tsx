import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Slider for the Alchemy design system. Track and thumb use `primary.main` (#1F5FF2). Use for continuous numeric inputs (budget allocation, completion percentage, threshold configuration) where exact keyboard entry is not required. Pair with a `TextField` when precise values matter. Supports single value, range (`defaultValue` array), marks, and vertical orientation.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ px: 2, py: 3 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    defaultValue: {
      control: "number",
      description:
        "Initial value in uncontrolled mode. Pass an array `[min, max]` for a range slider.",
    },
    value: {
      control: "number",
      description: "Controlled value. Requires `onChange` to update.",
    },
    min: { control: "number", description: "Minimum value. Default: 0." },
    max: { control: "number", description: "Maximum value. Default: 100." },
    step: {
      control: "number",
      description: "Increment per step. Set to `null` to snap only to `marks`.",
    },
    marks: {
      control: "boolean",
      description:
        "Show tick marks at each step, or pass a `{ value, label }[]` array for custom marks.",
    },
    valueLabelDisplay: {
      control: "select",
      options: ["auto", "on", "off"],
      description:
        "`auto` shows the label on hover/focus · `on` always visible · `off` hidden.",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state: `rgba(21,35,86,0.38)` track and thumb.",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "warning", "info", "success"],
      description: "Alchemy semantic color applied to the track and thumb.",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "`vertical` requires an explicit `height` via `sx`.",
    },
  },
  args: { "aria-label": "Value" },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  args: { defaultValue: 30, valueLabelDisplay: "auto" },
};

export const WithValueLabel: Story = {
  args: { defaultValue: 45, valueLabelDisplay: "on" },
  parameters: {
    docs: {
      description: {
        story: '`valueLabelDisplay: "on"` keeps the value bubble always visible.',
      },
    },
  },
};

export const WithMarks: Story = {
  args: { defaultValue: 50, marks: true, step: 10, valueLabelDisplay: "auto" },
};

export const CustomMarks: Story = {
  args: {
    defaultValue: 25,
    valueLabelDisplay: "auto",
    marks: [
      { value: 0, label: "0%" },
      { value: 25, label: "25%" },
      { value: 50, label: "50%" },
      { value: 75, label: "75%" },
      { value: 100, label: "100%" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Custom marks for a project completion percentage slider.",
      },
    },
  },
};

export const Range: Story = {
  args: { defaultValue: [20, 80], valueLabelDisplay: "auto" },
  parameters: {
    docs: {
      description: {
        story:
          "Range slider — pass `defaultValue` as `[low, high]`. Used for budget or date-range filters.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { defaultValue: 40, disabled: true },
};

export const WithMinMax: Story = {
  args: {
    min: 10,
    max: 90,
    defaultValue: 50,
    marks: true,
    step: 10,
    valueLabelDisplay: "auto",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom `min` / `max` bounds — e.g., a crew headcount slider capped at 90.",
      },
    },
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    defaultValue: 60,
    valueLabelDisplay: "auto",
    sx: { height: 200 },
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: "flex", justifyContent: "center", height: 260, pt: 3 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Vertical orientation requires an explicit `height` via `sx`.",
      },
    },
  },
};

export const AllColors: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 2, py: 1 }}>
      {(["primary", "secondary", "success", "warning", "error", "info"] as const).map(
        (color) => (
          <Slider key={color} defaultValue={50} color={color} aria-label={color} />
        )
      )}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All Alchemy semantic colors — `primary` (#1F5FF2) is the standard for most use cases.",
      },
    },
  },
};
