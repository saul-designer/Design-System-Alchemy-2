import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { FilterBar } from "./FilterBar";
import { TextField } from "../../atoms/TextField";
import { Select } from "../../atoms/Select";
import { SearchBar } from "../../molecules/SearchBar";

const meta: Meta<typeof FilterBar> = {
  title: "Templates/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A collapsible filter bar template. Renders a toggle button that shows/hides a grid of filter fields. Supports controlled and uncontrolled open state, a Clear button, and an optional toolbar slot for content like a search bar.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const typeOptions = [
  { value: "type-a", label: "Type A" },
  { value: "type-b", label: "Type B" },
  { value: "type-c", label: "Type C" },
];

export const Default: Story = {
  render: () => (
    <FilterBar
      filters={[
        <TextField key="name" label="Name" size="small" fullWidth />,
        <Select
          key="status"
          label="Status"
          options={statusOptions}
          size="small"
          fullWidth
        />,
        <Select key="type" label="Type" options={typeOptions} size="small" fullWidth />,
        <TextField key="date" label="Date" size="small" fullWidth />,
      ]}
    />
  ),
};

export const OpenByDefault: Story = {
  render: () => (
    <FilterBar
      defaultOpen
      filters={[
        <TextField key="name" label="Name" size="small" fullWidth />,
        <Select
          key="status"
          label="Status"
          options={statusOptions}
          size="small"
          fullWidth
        />,
        <Select key="type" label="Type" options={typeOptions} size="small" fullWidth />,
        <TextField key="date" label="Date" size="small" fullWidth />,
      ]}
    />
  ),
};

export const WithClearButton: Story = {
  render: () => (
    <FilterBar
      defaultOpen
      onClearAll={() => alert("Filters cleared")}
      filters={[
        <TextField key="name" label="Name" size="small" fullWidth />,
        <Select
          key="status"
          label="Status"
          options={statusOptions}
          size="small"
          fullWidth
        />,
        <Select key="type" label="Type" options={typeOptions} size="small" fullWidth />,
        <TextField key="date" label="Date" size="small" fullWidth />,
      ]}
    />
  ),
};

export const WithSearchBar: Story = {
  render: () => (
    <FilterBar
      defaultOpen
      onClearAll={() => {}}
      toolbarStart={<SearchBar placeholder="Search projects..." fullWidth />}
      filters={[
        <TextField key="name" label="Name" size="small" fullWidth />,
        <Select
          key="status"
          label="Status"
          options={statusOptions}
          size="small"
          fullWidth
        />,
        <Select key="type" label="Type" options={typeOptions} size="small" fullWidth />,
        <TextField key="date" label="Date" size="small" fullWidth />,
      ]}
    />
  ),
};

export const MultipleRows: Story = {
  render: () => (
    <FilterBar
      defaultOpen
      onClearAll={() => {}}
      filters={[
        <TextField key="f1" label="Project Name" size="small" fullWidth />,
        <Select key="f2" label="Status" options={statusOptions} size="small" fullWidth />,
        <Select key="f3" label="Type" options={typeOptions} size="small" fullWidth />,
        <TextField key="f4" label="Start Date" size="small" fullWidth />,
        <TextField key="f5" label="End Date" size="small" fullWidth />,
        <TextField key="f6" label="Assigned To" size="small" fullWidth />,
      ]}
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <Box sx={{ mb: 1, fontSize: "0.875rem", color: "text.secondary" }}>
          Panel is: <strong>{open ? "open" : "closed"}</strong>
        </Box>
        <FilterBar
          open={open}
          onOpenChange={setOpen}
          onClearAll={() => setOpen(false)}
          filters={[
            <TextField key="name" label="Name" size="small" fullWidth />,
            <Select
              key="status"
              label="Status"
              options={statusOptions}
              size="small"
              fullWidth
            />,
            <Select
              key="type"
              label="Type"
              options={typeOptions}
              size="small"
              fullWidth
            />,
          ]}
        />
      </Box>
    );
  },
};

export const InlineFilters: Story = {
  render: () => (
    <FilterBar
      inline
      onClearAll={() => alert("Filters cleared")}
      toolbarStart={<SearchBar placeholder="Search projects..." fullWidth />}
      filters={[
        <Select
          key="status"
          label="Status"
          options={statusOptions}
          size="small"
          fullWidth
        />,
        <Select key="type" label="Type" options={typeOptions} size="small" fullWidth />,
        <TextField key="date" label="Date" size="small" fullWidth />,
      ]}
    />
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <FilterBar
      showLabel="Open Filters"
      hideLabel="Close Filters"
      filters={[
        <TextField key="name" label="Name" size="small" fullWidth />,
        <Select
          key="status"
          label="Status"
          options={statusOptions}
          size="small"
          fullWidth
        />,
      ]}
    />
  ),
};
