import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { ControlledAutocomplete } from "./ControlledAutocomplete";

// ─── Sample data ──────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
}

interface Trade {
  id: string;
  label: string;
}

const users: User[] = [
  { id: 1, name: "Carlos López" },
  { id: 2, name: "María Torres" },
  { id: 3, name: "Roberto Silva" },
  { id: 4, name: "Laura Martínez" },
  { id: 5, name: "Pedro Jiménez" },
  { id: 6, name: "Ana García" },
  { id: 7, name: "Diego Hernández" },
  { id: 8, name: "Sofia Ramírez" },
];

const trades: Trade[] = [
  { id: "electrical", label: "Electrical" },
  { id: "plumbing", label: "Plumbing" },
  { id: "hvac", label: "HVAC" },
  { id: "concrete", label: "Concrete" },
  { id: "steel", label: "Steel" },
  { id: "carpentry", label: "Carpentry" },
  { id: "masonry", label: "Masonry" },
  { id: "roofing", label: "Roofing" },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Forms/ControlledAutocomplete",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A react-hook-form controlled autocomplete built on MUI `Autocomplete`. " +
          "Manages its own value state via `useController` — pass `name` and `control` from `useForm`. " +
          "**Multi-select** renders chips inside the input with smart overflow: visible chips are computed " +
          "from the container width and extras collapse into a hoverable `+N more` chip with a Popover list. " +
          "**Single-select** mode (`singleSelect`) stores a scalar value instead of an id array. " +
          '**Free-solo** mode (`freeSolo`) shows an `Add "…"` option that calls `onOpenModal` instead of ' +
          "pushing the raw string — keeps the data layer clean. " +
          "Data is sanitised on mount and when `data` changes: ids missing from the dataset are silently " +
          "removed from the form value to prevent ghost selections.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ─── Helper ───────────────────────────────────────────────────────────────────

function FormValue({ value }: { value: unknown }) {
  return (
    <Box
      sx={{
        mt: 1,
        px: 1.5,
        py: 0.75,
        borderRadius: 1,
        bgcolor: "grey.100",
        fontFamily: "monospace",
        fontSize: 12,
        color: "text.secondary",
        minWidth: 0,
        wordBreak: "break-all",
      }}
    >
      value: {JSON.stringify(value)}
    </Box>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const MultiSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default mode. Selected options render as chips. Check multiple items to see chip overflow in action when the container is narrow.",
      },
    },
  },
  render: () => {
    const { control, watch } = useForm({ defaultValues: { assignees: [] as number[] } });
    return (
      <Box sx={{ width: 380 }}>
        <ControlledAutocomplete
          name="assignees"
          control={control}
          data={users}
          label="Assignees"
          placeholder="Select team members"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
        />
        <FormValue value={watch("assignees")} />
      </Box>
    );
  },
};

export const SingleSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Single-select mode stores one scalar value (the result of `getOptionValue`). No chips — the label replaces the placeholder.",
      },
    },
  },
  render: () => {
    const { control, watch } = useForm<{ manager: number | null }>({
      defaultValues: { manager: null },
    });
    return (
      <Box sx={{ width: 320 }}>
        <ControlledAutocomplete
          name="manager"
          control={control}
          data={users}
          label="Project Manager"
          placeholder="Select a manager"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
          singleSelect
          hideCheckbox
        />
        <FormValue value={watch("manager")} />
      </Box>
    );
  },
};

export const ChipOverflow: Story = {
  name: "Chip Overflow (+N more)",
  parameters: {
    docs: {
      description: {
        story:
          "Select 4+ trades in a narrow container to see visible chips collapse into a `+N more` chip. " +
          "Hover the `+N more` chip to see the Popover list of hidden selections.",
      },
    },
  },
  render: () => {
    const { control, watch } = useForm({
      defaultValues: {
        trades: ["electrical", "plumbing", "hvac", "concrete", "steel"] as string[],
      },
    });
    return (
      <Box sx={{ width: 300 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 0.5, display: "block" }}
        >
          Resize the story canvas to observe overflow behaviour
        </Typography>
        <ControlledAutocomplete
          name="trades"
          control={control}
          data={trades}
          label="Trades on site"
          getOptionLabel={(t) => t.label}
          getOptionValue={(t) => t.id}
          chipMaxWidth={100}
        />
        <FormValue value={watch("trades")} />
      </Box>
    );
  },
};

export const FreeSolo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Free-solo mode shows an `Add "…"` option when the user types a value not in the list. ' +
          "Rather than pushing the raw string into the form, it calls `onOpenModal` so the app can open a creation dialog. " +
          "The `alert` below simulates that callback.",
      },
    },
  },
  render: () => {
    const { control, watch } = useForm({ defaultValues: { tags: [] as string[] } });
    return (
      <Box sx={{ width: 380 }}>
        <ControlledAutocomplete
          name="tags"
          control={control}
          data={trades}
          label="Trade tags"
          placeholder="Search or add a trade"
          getOptionLabel={(t) => t.label}
          getOptionValue={(t) => t.id}
          freeSolo
          onOpenModal={(input) => alert(`onOpenModal called with: "${input}"`)}
        />
        <FormValue value={watch("tags")} />
      </Box>
    );
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass `error` and `helperText` directly to override react-hook-form's field state — useful when validation is handled outside RHF.",
      },
    },
  },
  render: () => {
    const { control } = useForm({ defaultValues: { assignees: [] as number[] } });
    return (
      <Box sx={{ width: 380 }}>
        <ControlledAutocomplete
          name="assignees"
          control={control}
          data={users}
          label="Assignees"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
          error
          helperText="At least one assignee is required."
        />
      </Box>
    );
  },
};

export const WithPreselectedValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Initial form values populate the field on mount — no user interaction needed.",
      },
    },
  },
  render: () => {
    const { control, watch } = useForm({
      defaultValues: { assignees: [2, 4, 6] as number[] },
    });
    return (
      <Box sx={{ width: 380 }}>
        <ControlledAutocomplete
          name="assignees"
          control={control}
          data={users}
          label="Assignees"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
        />
        <FormValue value={watch("assignees")} />
      </Box>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { assignees: [1, 3] as number[] } });
    return (
      <Box sx={{ width: 380 }}>
        <ControlledAutocomplete
          name="assignees"
          control={control}
          data={users}
          label="Assignees"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
          disabled
        />
      </Box>
    );
  },
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`size="small"` reduces the input height to 40px — matches compact table rows and inline filters.',
      },
    },
  },
  render: () => {
    const { control, watch } = useForm({ defaultValues: { assignees: [] as number[] } });
    return (
      <Box sx={{ width: 320 }}>
        <ControlledAutocomplete
          name="assignees"
          control={control}
          data={users}
          label="Assignees"
          placeholder="Select"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
          size="small"
        />
        <FormValue value={watch("assignees")} />
      </Box>
    );
  },
};

export const HiddenCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`hideCheckbox` removes the checkbox icons from the dropdown — useful when space is limited or the multi-select pattern is implied by chips.",
      },
    },
  },
  render: () => {
    const { control, watch } = useForm({ defaultValues: { trades: [] as string[] } });
    return (
      <Box sx={{ width: 380 }}>
        <ControlledAutocomplete
          name="trades"
          control={control}
          data={trades}
          label="Trades"
          placeholder="Select trades"
          getOptionLabel={(t) => t.label}
          getOptionValue={(t) => t.id}
          hideCheckbox
        />
        <FormValue value={watch("trades")} />
      </Box>
    );
  },
};
