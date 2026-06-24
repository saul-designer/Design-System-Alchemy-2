import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChangelogPage } from "./ChangelogPage";

const meta = {
  title: "Documentation/Changelog",
  component: ChangelogPage,
  parameters: {
    layout: "fullscreen",
    options: {
      showPanel: false,
    },
    docs: {
      description: {
        component:
          "Release log for `@elementos-development/alchemy-ui`. " +
          "Content is sourced from `CHANGELOG.md` and must be updated with every library change.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChangelogPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
