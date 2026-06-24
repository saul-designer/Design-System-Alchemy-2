import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertBanner } from "./AlertBanner";

const meta: Meta<typeof AlertBanner> = {
  title: "Molecules/AlertBanner",
  component: AlertBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Inline alert banner for the Alchemy design system. Wraps MUI `Alert` with an optional title, animated show/hide via `Collapse`, and a close button. Use for page-level feedback: form submission results, permission warnings, system notices. For transient notifications, use `Toast` instead.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    severity: "info",
    message: "This is an informational message.",
    open: true,
    animate: true,
  },
  argTypes: {
    severity: {
      control: "select",
      options: ["info", "success", "warning", "error"],
      description:
        "Semantic color: `info` #03859B · `success` #2E7D32 · `warning` #EF6C00 · `error` #D32F2F.",
    },
    message: {
      control: "text",
      description: "Required. The main alert body text.",
    },
    title: {
      control: "text",
      description: "Optional bold heading shown above the message.",
    },
    open: {
      control: "boolean",
      description:
        "Controls visibility. When `false`, the banner collapses (if `animate`) or hides.",
    },
    animate: {
      control: "boolean",
      description: "Wraps show/hide in a MUI `Collapse` transition. Default `true`.",
    },
    onClose: {
      control: false,
      description:
        "When provided, renders a close (×) button in the top-right corner. `() => void`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertBanner>;

export const Playground: Story = {};

export const Info: Story = {
  args: {
    severity: "info",
    message:
      "Your session will expire in 15 minutes. Save your work to avoid losing changes.",
  },
};

export const Success: Story = {
  args: {
    severity: "success",
    title: "Project saved",
    message: "Hillcrest Commercial Build — Phase 2 has been saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    severity: "warning",
    title: "Unsaved changes",
    message: "You have unsaved changes. Save before navigating away.",
  },
};

export const ErrorAlert: Story = {
  args: {
    severity: "error",
    title: "Save failed",
    message: "Could not save changes. Check your connection and try again.",
  },
};

export const Dismissible: Story = {
  args: {
    severity: "info",
    title: "New features available",
    message:
      "Blueprint tools and issue escalation have been updated. Refresh to get the latest.",
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `onClose` to render a close button — the parent controls the `open` state.",
      },
    },
  },
};

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <AlertBanner
        severity="info"
        title="Info"
        message="Your session will expire in 15 minutes."
      />
      <AlertBanner
        severity="success"
        title="Success"
        message="Project saved successfully."
      />
      <AlertBanner
        severity="warning"
        title="Warning"
        message="You have unsaved changes. Save before navigating away."
      />
      <AlertBanner
        severity="error"
        title="Error"
        message="Could not save changes. Check your connection and try again."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four severity variants — each maps to a standard Alchemy semantic color.",
      },
    },
  },
};
