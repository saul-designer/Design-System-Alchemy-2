import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarGroup } from "./AvatarGroup";

const projectTeam = [
  { name: "Carlos López" },
  { name: "María Torres" },
  { name: "Roberto Silva" },
  { name: "Laura Martínez" },
  { name: "Pedro Jiménez" },
];

const meta: Meta<typeof AvatarGroup> = {
  title: "Molecules/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Stacked group of `Avatar` components for the Alchemy design system. Each avatar generates initials and a deterministic brand color from `name`. Overflow beyond `max` renders as a `+N` count bubble. Pass `showTooltips` to reveal full names on hover — useful in compact UI surfaces like project cards and daily tracker headers. Size tokens match the `Avatar` atom: `sm` 24px · `md` 40px · `lg` 56px · `xl` 72px.",
      },
    },
  },
  tags: ["autodocs"],
  args: { avatars: projectTeam },
  argTypes: {
    avatars: {
      control: false,
      description:
        "Array of `{ name, src?, alt? }`. `name` drives initials and brand-color selection; `src` overrides with an image.",
    },
    max: {
      control: "number",
      description:
        "Maximum avatars shown before a `+N` overflow bubble. Defaults to MUI's 5.",
    },
    showTooltips: {
      control: "boolean",
      description: "Show a tooltip with the member's full name on hover.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size token: `sm` 24px · `md` 40px · `lg` 56px · `xl` 72px.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Playground: Story = {};

export const WithMax: Story = {
  args: { max: 3 },
  parameters: {
    docs: {
      description: {
        story: "Cap visible avatars at 3 — the rest collapse into a `+N` count bubble.",
      },
    },
  },
};

export const WithTooltips: Story = {
  args: { showTooltips: true },
  parameters: {
    docs: {
      description: {
        story:
          "Hovering an avatar shows the member's full name — useful in compact surfaces.",
      },
    },
  },
};

export const WithImages: Story = {
  args: {
    showTooltips: true,
    avatars: [
      { name: "Carlos López", src: "https://i.pravatar.cc/150?img=11" },
      { name: "María Torres", src: "https://i.pravatar.cc/150?img=5" },
      { name: "Roberto Silva", src: "https://i.pravatar.cc/150?img=8" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Image avatars via `src`. Tooltip still uses `name` for accessibility.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "flex-start",
      }}
    >
      <AvatarGroup avatars={projectTeam} size="sm" max={4} />
      <AvatarGroup avatars={projectTeam} size="md" max={4} />
      <AvatarGroup avatars={projectTeam} size="lg" max={4} />
      <AvatarGroup avatars={projectTeam} size="xl" max={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Token sizes: `sm` 24 · `md` 40 · `lg` 56 · `xl` 72px. Match to surrounding context.",
      },
    },
  },
};

export const ProjectCardHeader: Story = {
  render: () => (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 360,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: 14,
            color: "rgba(21,35,86,0.87)",
          }}
        >
          Hillcrest Commercial Build
        </div>
        <div
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: 12,
            color: "rgba(21,35,86,0.6)",
            marginTop: 2,
          }}
        >
          Phase 2 · 15 crew members
        </div>
      </div>
      <AvatarGroup avatars={projectTeam} max={3} size="sm" showTooltips />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Typical project card usage: `sm` size, capped at 3, with tooltips enabled. The `+N` bubble signals the full team size.",
      },
    },
  },
};
