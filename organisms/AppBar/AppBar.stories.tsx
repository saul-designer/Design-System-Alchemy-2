import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppBar } from "./AppBar";

const meta: Meta<typeof AppBar> = {
  title: "Organisms/AppBar",
  component: AppBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Generic top navigation bar. White surface with a 2 px cyan bottom border, eyebrow label, greeting, notification bell, and user avatar.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    greeting: "Good Morning, Saúl",
    userInitials: "SC",
    hasNotification: true,
  },
  argTypes: {
    appLogo: {
      control: false,
      description:
        "Logo node rendered at the left of the bar. Defaults to `<AlchemyLogo />` when omitted.",
    },
    greeting: {
      control: "text",
      description: "Greeting text displayed next to the sun icon.",
    },
    userInitials: {
      control: "text",
      description: "Two-letter initials rendered inside the user avatar.",
    },
    hasNotification: {
      control: "boolean",
      description: "Show or hide the unread dot on the notification bell.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Playground: Story = {};
