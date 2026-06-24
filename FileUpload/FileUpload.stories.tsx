import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Molecules/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Drag-and-drop file upload zone for the Alchemy design system. Validates file size against `maxSize` (bytes) and calls `onError` on rejection. Pass `accept` to restrict MIME types. The drop zone visual uses Alchemy's `blue[100]` border and shifts to `blue[50]` on hover/drag-over. Used in the project tracker for attaching blueprints, permits, and daily report documents.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    onFileSelect: fn(),
    label: "Drop files here or click to upload",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Primary call-to-action text displayed inside the drop zone.",
    },
    helperText: {
      control: "text",
      description:
        "Secondary hint shown below the label — use for accepted types and size limits.",
    },
    accept: {
      control: "text",
      description: "Accepted MIME types or file extensions, e.g. `image/*,.pdf`.",
    },
    multiple: {
      control: "boolean",
      description: "Allow selecting multiple files in a single interaction.",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes. Files exceeding this trigger `onError`.",
    },
    error: {
      control: "boolean",
      description: "Puts the zone in error state — red border and `errorMessage`.",
    },
    errorMessage: {
      control: "text",
      description: "Validation message shown when `error` is true.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the drop zone — no click or drag events are processed.",
    },
    onFileSelect: {
      control: false,
      description:
        "Required. Called with the `FileList` when files are selected or dropped.",
    },
    onError: {
      control: false,
      description: "Called with a message string when a file fails validation.",
    },
    sx: {
      control: false,
      description: "MUI `sx` style overrides.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 440 }}>
      <FileUpload {...args} />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: (args) => (
    <div style={{ width: 440 }}>
      <FileUpload
        {...args}
        onFileSelect={fn()}
        helperText="Accepted: PNG, JPG, PDF — max 10 MB per file"
        accept="image/*,.pdf"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `helperText` to surface accepted formats and size limits directly in the zone.",
      },
    },
  },
};

export const MultipleFiles: Story = {
  render: (args) => (
    <div style={{ width: 440 }}>
      <FileUpload
        {...args}
        onFileSelect={fn()}
        multiple
        helperText="Select one or more blueprint files (PDF)"
        accept=".pdf"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multi-file mode — users can select or drop several documents at once.",
      },
    },
  },
};

export const WithError: Story = {
  render: (args) => (
    <div style={{ width: 440 }}>
      <FileUpload
        {...args}
        onFileSelect={fn()}
        error
        errorMessage="File type not supported. Please upload PNG, JPG, or PDF."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ width: 440 }}>
      <FileUpload
        {...args}
        onFileSelect={fn()}
        disabled
        helperText="File upload is disabled for archived projects."
      />
    </div>
  ),
};
