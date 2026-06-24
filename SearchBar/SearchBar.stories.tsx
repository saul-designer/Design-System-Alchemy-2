import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pill-shaped search input for the Alchemy design system. Key traits: 100px border-radius, leading search icon, clear (×) button that appears when the field has a value. Pressing Enter fires `onSearch`. Used in the projects list toolbar, users table, and blueprint search. Supports controlled (`value`) and uncontrolled (`defaultValue`) modes.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Search projects...",
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the field is empty.",
    },
    value: {
      control: "text",
      description: "Controlled value. Provide `onChange` to keep it in sync.",
    },
    defaultValue: {
      control: "text",
      description: "Initial value in uncontrolled mode.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description:
        "`small` for toolbar/inline use · `medium` (default) for standalone search.",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches the bar to fill its container.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the field — no input or clear interaction.",
    },
    onChange: {
      control: false,
      description: "Fires on every keystroke: `(value: string) => void`.",
    },
    onSearch: {
      control: false,
      description: "Fires when the user presses Enter: `(value: string) => void`.",
    },
    onClear: {
      control: false,
      description: "Fires when the clear button is clicked: `() => void`.",
    },
    sx: {
      control: false,
      description: "MUI `sx` style overrides.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Playground: Story = {};

export const WithValue: Story = {
  args: {
    value: "Hillcrest",
    placeholder: "Search projects...",
  },
  parameters: {
    docs: {
      description: {
        story: "With a value the clear (×) button appears on the right.",
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Search blueprints...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`small` size for toolbar integration — e.g., the blueprint or users table header.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "Search all projects...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Search unavailable",
    disabled: true,
  },
};

const LiveSearchDemo = () => {
  const projects = [
    "Hillcrest Commercial Build",
    "Riverside Office Park",
    "Downtown Mixed-Use Tower",
    "Airport Terminal Expansion",
    "Harbor Bridge Retrofit",
  ];
  const [query, setQuery] = useState("");
  const filtered = projects.filter((p) => p.toLowerCase().includes(query.toLowerCase()));
  return (
    <div style={{ width: 400 }}>
      <SearchBar
        placeholder="Search projects..."
        fullWidth
        onChange={setQuery}
        onClear={() => setQuery("")}
      />
      <div
        style={{
          marginTop: 12,
          fontFamily: "Roboto, sans-serif",
          fontSize: 14,
          color: "rgba(21,35,86,0.87)",
        }}
      >
        {filtered.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No records found
          </Typography>
        ) : (
          filtered.map((p) => (
            <div
              key={p}
              style={{ padding: "6px 0", borderBottom: "1px solid rgba(21,35,86,0.08)" }}
            >
              {p}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const LiveSearch: Story = {
  render: () => <LiveSearchDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Live filter — `onChange` updates the list on every keystroke. Empty state shows Alchemy\'s standard "No records found" copy.',
      },
    },
  },
};
