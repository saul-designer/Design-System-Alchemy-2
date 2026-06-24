import { Lock, Mail, Phone, User } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compound form field for the Alchemy design system. Composes `FormControl` + `FormLabel` + `TextField` + `FormHelperText` into a single, consistent layout. The `label` sits above the input (not inside it) and `hint` renders as subdued helper text below. Validated by passing `error` + `helperText` together. Used on login, user management, and project settings forms.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Full name",
    placeholder: "Enter your full name",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Field label rendered above the input via `FormLabel`.",
    },
    hint: {
      control: "text",
      description:
        "Subdued helper text shown below the input when there is no error. Hidden when `helperText` is set.",
    },
    required: {
      control: "boolean",
      description: "Marks the field required — appends `*` to the label.",
    },
    error: {
      control: "boolean",
      description: "Puts the field in error state — red border and `helperText`.",
    },
    helperText: {
      control: "text",
      description: "Validation message shown when `error` is true.",
    },
    disabled: {
      control: "boolean",
      description:
        "Disables the field: `rgba(21,35,86,0.38)` text on `rgba(21,35,86,0.12)` background.",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches the input to fill its container. Default `true`.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the field is empty.",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel"],
      description: "HTML input type. Use `password` to toggle visibility.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Playground: Story = {};

export const WithHint: Story = {
  args: {
    label: "Email address",
    placeholder: "you@company.com",
    hint: "Use your company email — personal addresses are not accepted.",
    startAdornment: <Mail size={18} />,
  },
};

export const Required: Story = {
  args: {
    label: "Project name",
    placeholder: "e.g. Hillcrest Commercial Build",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Email address",
    value: "not-an-email",
    error: true,
    helperText: "Please enter a valid email address.",
    startAdornment: <Mail size={18} />,
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    hint: "Must be at least 8 characters.",
    startAdornment: <Lock size={18} />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    value: "carlos.lopez",
    disabled: true,
    hint: "Username is set by your administrator and cannot be changed.",
    startAdornment: <User size={18} />,
  },
};

export const LoginForm: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <FormField
        label="Email address"
        placeholder="you@company.com"
        required
        type="email"
        startAdornment={<Mail size={18} />}
      />
      <FormField
        label="Password"
        placeholder="Enter your password"
        required
        type="password"
        startAdornment={<Lock size={18} />}
        hint="Must be at least 8 characters."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Alchemy login form layout — stacked fields with icons, required markers, and hint text below the password field.",
      },
    },
  },
};

export const UserProfileForm: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 440 }}>
      <FormField
        label="Full name"
        placeholder="Carlos López"
        required
        startAdornment={<User size={18} />}
      />
      <FormField
        label="Email address"
        placeholder="carlos@elementos.dev"
        required
        type="email"
        startAdornment={<Mail size={18} />}
      />
      <FormField
        label="Phone number"
        placeholder="+1 (555) 000-0000"
        type="tel"
        startAdornment={<Phone size={18} />}
      />
      <FormField
        label="Username"
        value="carlos.lopez"
        disabled
        hint="Username cannot be changed."
        startAdornment={<User size={18} />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "User profile / account settings form — mix of editable and read-only fields.",
      },
    },
  },
};
