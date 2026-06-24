import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Atoms/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Rating component for the Alchemy design system. Uses `warning.main` (#EF6C00) for filled stars by default — the amber accent color. Use `readOnly` for display-only quality scores and `precision={0.5}` for half-star fidelity.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 10, step: 0.5 },
      description: "Controlled value.",
    },
    defaultValue: {
      control: { type: "number", min: 0, max: 10, step: 0.5 },
      description: "Uncontrolled default value.",
    },
    max: { control: "number", description: "Number of stars. Default: 5." },
    precision: {
      control: "number",
      description: "Step between selectable values. Use `0.5` for half-star ratings.",
    },
    readOnly: {
      control: "boolean",
      description: "Display-only mode. No interaction, no focus ring.",
    },
    disabled: {
      control: "boolean",
      description: "Disabled: `rgba(21,35,86,0.38)` opacity.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Icon size.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Playground: Story = {
  args: { name: "playground", defaultValue: 3, max: 5, precision: 1 },
};

export const WithValue: Story = {
  args: { name: "quality", defaultValue: 3 },
};

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
};

export const Disabled: Story = {
  args: { name: "quality", defaultValue: 2, disabled: true },
};

export const HalfPrecision: Story = {
  args: { name: "quality", defaultValue: 2.5, precision: 0.5 },
};

export const CustomMax: Story = {
  args: { name: "quality", max: 10, defaultValue: 7 },
};
