import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "@mui/material/Stack";
import { Button } from "../../atoms/Button";
import { Toaster, toast } from "./Toast";

const meta: Meta<typeof Toaster> = {
  title: "Molecules/Toast",
  component: Toaster,
  decorators: [
    (Story, context) => (
      <>
        <Story />
        <Toaster {...context.args} />
      </>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sonner-based toast notification system for the Alchemy design system. Mount `<Toaster />` once at the app root (or layout shell). Call `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`, or `toast.promise()` from anywhere. Styled with Alchemy's Roboto font and 10px card radius. `richColors` is enabled by default.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Where toasts appear on screen. Default `bottom-right`.",
    },
    richColors: {
      control: "boolean",
      description:
        "Enables semantic colors for `success`, `error`, `warning`, `info`. Default `true`.",
    },
    closeButton: {
      control: "boolean",
      description: "Shows a close (×) button on each toast.",
    },
    duration: {
      control: "number",
      description: "Auto-dismiss delay in milliseconds. Default 4000.",
    },
    expand: {
      control: "boolean",
      description: "Keeps all toasts expanded instead of stacking them.",
    },
    visibleToasts: {
      control: "number",
      description: "Maximum number of visible toasts before older ones are dismissed.",
    },
  },
  args: {
    position: "bottom-right",
    richColors: true,
    closeButton: false,
    duration: 4000,
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Playground: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="success"
        onClick={() => toast.success("Project saved.")}
      >
        Success
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => toast.error("Could not save changes.")}
      >
        Error
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => toast.warning("Session expiring soon.")}
      >
        Warning
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => toast.info("New version available.")}
      >
        Info
      </Button>
    </Stack>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      variant="contained"
      color="success"
      onClick={() => toast.success("Project saved successfully.")}
    >
      Show success
    </Button>
  ),
  parameters: {
    docs: {
      description: { story: "Confirmation after a save or create action." },
    },
  },
};

export const ErrorToast: Story = {
  render: () => (
    <Button
      variant="contained"
      color="error"
      onClick={() =>
        toast.error("Could not save changes. Check your connection and try again.")
      }
    >
      Show error
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outlined"
      color="warning"
      onClick={() => toast.warning("Your session will expire in 5 minutes.")}
    >
      Show warning
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      variant="outlined"
      color="info"
      onClick={() => toast.info("A new version is available. Refresh to update.")}
    >
      Show info
    </Button>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Button
      variant="contained"
      color="success"
      onClick={() =>
        toast.success("Blueprint uploaded", {
          description:
            "foundation-layout-rev4.pdf was added to Hillcrest Commercial Build.",
        })
      }
    >
      Show with description
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `description` as a second-line detail — useful for file uploads or batch operations.",
      },
    },
  },
};

export const WithCloseButton: Story = {
  render: () => (
    <Button
      variant="outlined"
      onClick={() =>
        toast.info("Issue escalated to project manager.", {
          duration: Infinity,
          closeButton: true,
        })
      }
    >
      Show persistent toast
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `closeButton: true` per-toast for notifications that require explicit dismissal, e.g. `duration: Infinity` alerts.",
      },
    },
  },
};

export const ToastPromise: Story = {
  render: () => (
    <Button
      variant="contained"
      color="primary"
      onClick={() =>
        toast.promise(
          new globalThis.Promise<void>((resolve) => setTimeout(resolve, 2000)),
          {
            loading: "Saving project...",
            success: "Project saved successfully.",
            error: "Could not save project.",
          }
        )
      }
    >
      Save project
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`toast.promise()` transitions through loading → success/error states automatically. Ideal for async form submissions.",
      },
    },
  },
};

export const Positions: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
      {(
        [
          "top-left",
          "top-center",
          "top-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ] as const
      ).map((position) => (
        <Button
          key={position}
          variant="outlined"
          size="small"
          onClick={() => toast.success(`Toast at ${position}`, { position })}
        >
          {position}
        </Button>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All 6 anchor positions. Each button fires a toast at that specific position.",
      },
    },
  },
};
