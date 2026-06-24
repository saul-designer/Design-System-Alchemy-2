import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pagination controls for the Alchemy design system. A thin pass-through wrapper over MUI `Pagination` — all MUI props are accepted directly. Used below data tables (projects list, users table, daily tracker logs) to navigate paged content. The `primary` color maps to Alchemy blue `#1F5FF2`.",
      },
    },
  },
  tags: ["autodocs"],
  args: { count: 10, page: 1 },
  argTypes: {
    count: {
      control: "number",
      description: "Total number of pages.",
    },
    page: {
      control: "number",
      description: "Current page (1-indexed). Use with `onChange` for controlled mode.",
    },
    variant: {
      control: "select",
      options: ["text", "outlined"],
      description: "`text` — filled active page. `outlined` — bordered buttons.",
    },
    shape: {
      control: "select",
      options: ["circular", "rounded"],
      description: "Button corner shape.",
    },
    color: {
      control: "select",
      options: ["standard", "primary", "secondary"],
      description:
        "`primary` applies Alchemy blue `#1F5FF2` to the active page indicator.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Control button size.",
    },
    disabled: {
      control: "boolean",
      description: "Disables all page buttons.",
    },
    siblingCount: {
      control: "number",
      description: "Number of page buttons shown on each side of the current page.",
    },
    boundaryCount: {
      control: "number",
      description: "Number of page buttons shown at the start and end of the page range.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {};

export const Primary: Story = {
  args: { count: 10, page: 3, color: "primary" },
  parameters: {
    docs: {
      description: {
        story: "Alchemy primary color — active page uses `#1F5FF2` fill.",
      },
    },
  },
};

export const Outlined: Story = {
  args: { count: 10, page: 3, variant: "outlined", color: "primary" },
};

export const Rounded: Story = {
  args: { count: 10, page: 3, variant: "outlined", shape: "rounded", color: "primary" },
};

const ControlledDemo = () => {
  const [page, setPage] = useState(1);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
    >
      <Pagination
        count={10}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />
      <Typography variant="body2" color="text.secondary">
        Page {page} of 10
      </Typography>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
  parameters: {
    docs: {
      description: {
        story: "Controlled mode — parent owns `page` state and updates via `onChange`.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}
    >
      <Pagination count={5} size="small" color="primary" />
      <Pagination count={5} size="medium" color="primary" />
      <Pagination count={5} size="large" color="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`small` for dense table footers · `medium` default · `large` for prominent pagination.",
      },
    },
  },
};

const TableFooterDemo = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const total = 47;
  const from = (page - 1) * rowsPerPage + 1;
  const to = Math.min(page * rowsPerPage, total);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        borderTop: "1px solid rgba(21,35,86,0.12)",
        padding: "8px 16px",
        width: 640,
        borderRadius: "0 0 10px 10px",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {from}–{to} of {total} projects
      </Typography>
      <Pagination
        count={Math.ceil(total / rowsPerPage)}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
        size="small"
      />
    </div>
  );
};

export const TableFooter: Story = {
  render: () => <TableFooterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Typical projects table footer: row count label on the left, small paginator on the right.",
      },
    },
  },
};
