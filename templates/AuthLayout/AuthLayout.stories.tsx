import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { FormField } from "../../molecules/FormField";
import { Button } from "../../atoms/Button";
import { AuthLayout } from "./AuthLayout";
import { AuthLayoutHeroContent } from "./AuthLayoutHeroContent";
import type { AuthLayoutHeroContentProps } from "./AuthLayoutHeroContent";

const bgLogin = new URL("../../assets/images/background-info-login.webp", import.meta.url)
  .href;
const alchemyLogo = new URL(
  "../../assets/logos/alchemy-logo-white-wordmark.svg",
  import.meta.url
).href;

const LoginForm = () => (
  <Box component="form">
    <FormField
      label="Email address"
      type="email"
      placeholder="you@company.com"
      required
      startAdornment={<Mail size={18} />}
    />
    <Button type="submit" variant="contained" fullWidth size="large">
      Send code
    </Button>
    <Box>
      <MuiLink href="#" underline="none">
        Forgot your password?
      </MuiLink>
    </Box>
  </Box>
);

LoginForm.displayName = "LoginForm";

const PasswordLoginForm = () => {
  const [showPw, setShowPw] = useState(false);

  return (
    <Box component="form">
      <FormField
        label="Email address"
        type="email"
        placeholder="you@company.com"
        required
        startAdornment={<Mail size={18} />}
      />
      <FormField
        label="Password"
        type={showPw ? "text" : "password"}
        placeholder="••••••••"
        required
        startAdornment={<Lock size={18} />}
        endAdornment={
          <IconButton
            size="small"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            edge="end"
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </IconButton>
        }
      />
      <Box>
        <Box component="label">
          <Box component="input" type="checkbox" defaultChecked />
          Stay signed in
        </Box>
        <MuiLink href="#" underline="none">
          Forgot your password?
        </MuiLink>
      </Box>
      <Button type="submit" variant="contained" fullWidth size="large">
        Sign In
      </Button>
    </Box>
  );
};

PasswordLoginForm.displayName = "PasswordLoginForm";

const OTP_SLOTS = ["s0", "s1", "s2", "s3", "s4", "s5"] as const;

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Box component="form">
      <Box>
        {otp.map((digit, i) => (
          <Box
            key={OTP_SLOTS[i]}
            component="input"
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[i] = el;
            }}
            value={digit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(i, e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(i, e)}
            maxLength={1}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            sx={{
              width: 48,
              height: 56,
              textAlign: "center",
              fontSize: "1.375rem",
              fontWeight: 500,
              fontFamily: "Roboto, sans-serif",
              borderRadius: "12px",
              border: "1px solid rgba(21,35,86,.235)",
              outline: "none",
              caretColor: "#1F5FF2",
              color: "rgba(21,35,86,.92)",
              transition: "border-color 0.2s, box-shadow 0.2s",
              "&:focus": {
                borderColor: "#1F5FF2",
                borderWidth: "2px",
                boxShadow: "0 0 0 4px rgba(31,95,242,.12)",
              },
            }}
          />
        ))}
      </Box>
      <Button type="submit" variant="contained" fullWidth size="large">
        Verify &amp; sign in
      </Button>
      <Box>
        Didn&apos;t get it?{" "}
        <MuiLink href="#" underline="none">
          Resend code
        </MuiLink>
      </Box>
      <Box>
        <MuiLink href="#" underline="none">
          Wrong email? Go back
        </MuiLink>
      </Box>
    </Box>
  );
};

OtpForm.displayName = "OtpForm";

type AuthLayoutStoryArgs = React.ComponentProps<typeof AuthLayout> &
  AuthLayoutHeroContentProps;

const HERO_DESCRIPTION =
  "The document signing workspace for field-services teams. Collect signatures, store signed PDFs, and stay audit-ready.";

const meta: Meta<AuthLayoutStoryArgs> = {
  title: "Templates/AuthLayout",
  component: AuthLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Authentication layout template. Split layout with hero panel on desktop — full-bleed cover image with gradient overlay on the left, white form panel on the right.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    headingStart: {
      control: "text",
      description: "Text before the highlighted word in the hero heading.",
      table: { category: "Hero panel" },
    },
    headingHighlight: {
      control: "text",
      description: "Highlighted word in the hero heading.",
      table: { category: "Hero panel" },
    },
    headingEnd: {
      control: "text",
      description: "Text after the highlighted word in the hero heading.",
      table: { category: "Hero panel" },
    },
    description: {
      control: "text",
      description: "Supporting description under the hero heading.",
      table: { category: "Hero panel" },
    },
  },
  render: ({
    headingStart,
    headingHighlight,
    headingEnd,
    description,
    copyright,
    logo: _logo,
    ...args
  }) => (
    <AuthLayout
      {...args}
      backgroundContent={
        <AuthLayoutHeroContent
          logo={<Box component="img" src={alchemyLogo} alt="Alchemy Sign" />}
          headingStart={headingStart}
          headingHighlight={headingHighlight}
          headingEnd={headingEnd}
          description={description}
          copyright={copyright}
        />
      }
    />
  ),
};

export default meta;
type Story = StoryObj<AuthLayoutStoryArgs>;

export const Login: Story = {
  args: {
    backgroundImage: bgLogin,
    headingStart: "Send, sign, and",
    headingHighlight: "track",
    headingEnd: "contractor agreements with clarity.",
    description: HERO_DESCRIPTION,
    title: "Welcome back",
    subtitle: "Sign in to access your jobs and documents.",
    children: <LoginForm />,
  },
  parameters: {
    docs: {
      source: {
        code: `import { AuthLayout } from "@elementos-development/alchemy-ui";
import { FormField } from "@elementos-development/alchemy-ui";
import { Button } from "@elementos-development/alchemy-ui";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

<AuthLayout
  backgroundImage="/path/to/hero.webp"
  backgroundContent={
    <>
      <Box component="img" src="/your-logo.svg" alt="Logo" />
      <Typography component="h1">
        Send, sign, and{" "}
        <Box component="strong">track</Box>{" "}
        contractor agreements with clarity.
      </Typography>
      <Typography>
        The document signing workspace for field-services teams.
      </Typography>
    </>
  }
  title="Welcome back"
  subtitle="Sign in to access your jobs and documents."
>
  <Box component="form">
    <FormField
      label="Email address"
      type="email"
      placeholder="you@company.com"
      required
      startAdornment={<Mail size={18} />}
    />
    <Button type="submit" variant="contained" fullWidth size="large">
      Send code
    </Button>
    <Box>
      <Link href="/forgot-password" underline="none">
        Forgot your password?
      </Link>
    </Box>
  </Box>
</AuthLayout>`,
      },
    },
  },
};

export const LoginWithPassword: Story = {
  args: {
    backgroundImage: bgLogin,
    headingStart: "Send, sign, and",
    headingHighlight: "track",
    headingEnd: "contractor agreements with clarity.",
    description: HERO_DESCRIPTION,
    title: "Welcome back",
    subtitle: "Sign in to continue to your workspace.",
    children: <PasswordLoginForm />,
  },
  parameters: {
    docs: {
      source: {
        code: `import { AuthLayout } from "@elementos-development/alchemy-ui";
import { FormField } from "@elementos-development/alchemy-ui";
import { Button } from "@elementos-development/alchemy-ui";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const [showPw, setShowPw] = useState(false);

<AuthLayout
  backgroundImage="/path/to/hero.webp"
  backgroundContent={
    <>
      <Box component="img" src="/your-logo.svg" alt="Logo" />
      <Typography component="h1">
        Send, sign, and{" "}
        <Box component="strong">track</Box>{" "}
        contractor agreements with clarity.
      </Typography>
      <Typography>
        The document signing workspace for field-services teams.
      </Typography>
    </>
  }
  title="Welcome back"
  subtitle="Sign in to continue to your workspace."
>
  <Box component="form">
    <FormField
      label="Email address"
      type="email"
      placeholder="you@company.com"
      required
      startAdornment={<Mail size={18} />}
    />
    <FormField
      label="Password"
      type={showPw ? "text" : "password"}
      placeholder="••••••••"
      required
      startAdornment={<Lock size={18} />}
      endAdornment={
        <IconButton size="small" onClick={() => setShowPw((v) => !v)} edge="end">
          {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
        </IconButton>
      }
    />
    <Box>
      <Box component="label">
        <input type="checkbox" defaultChecked style={{ width: 16, height: 16, accentColor: "#1F5FF2" }} />
        Stay signed in
      </Box>
      <Link href="/forgot-password" underline="none">
        Forgot your password?
      </Link>
    </Box>
    <Button type="submit" variant="contained" fullWidth size="large">
      Sign In
    </Button>
  </Box>
</AuthLayout>`,
      },
    },
  },
};

export const OtpLogin: Story = {
  args: {
    backgroundImage: bgLogin,
    headingStart: "Send, sign, and",
    headingHighlight: "track",
    headingEnd: "contractor agreements with clarity.",
    description: HERO_DESCRIPTION,
    title: "Enter verification code",
    subtitle: "We sent a 6-digit code to your email address.",
    children: <OtpForm />,
  },
  parameters: {
    docs: {
      source: {
        code: `import { AuthLayout } from "@elementos-development/alchemy-ui";
import { Button } from "@elementos-development/alchemy-ui";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";

const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const inputRefs = useRef([]);

const handleChange = (index, value) => {
  if (!/^\\d?$/.test(value)) return;
  const next = [...otp];
  next[index] = value.slice(-1);
  setOtp(next);
  if (value && index < 5) inputRefs.current[index + 1]?.focus();
};

const handleKeyDown = (index, e) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};

<AuthLayout
  backgroundImage="/path/to/hero.webp"
  backgroundContent={
    <>
      <Box component="img" src="/your-logo.svg" alt="Logo" />
      <Typography component="h1">
        Send, sign, and{" "}
        <Box component="strong">track</Box>{" "}
        contractor agreements with clarity.
      </Typography>
      <Typography>
        The document signing workspace for field-services teams.
      </Typography>
    </>
  }
  title="Enter verification code"
  subtitle="We sent a 6-digit code to your email address."
>
  <Box component="form">
    <Box>
      {otp.map((digit, i) => (
        <Box
          key={i}
          component="input"
          ref={(el) => { inputRefs.current[i] = el; }}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          maxLength={1}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          sx={{
            width: 48, height: 56, textAlign: "center",
            fontSize: "1.375rem", fontWeight: 500,
            borderRadius: "12px", border: "1px solid rgba(21,35,86,.235)",
            outline: "none",
            "&:focus": { borderColor: "#1F5FF2", borderWidth: "2px", boxShadow: "0 0 0 4px rgba(31,95,242,.12)" },
          }}
        />
      ))}
    </Box>
    <Button type="submit" variant="contained" fullWidth size="large">
      Verify &amp; sign in
    </Button>
    <Box>
      Didn't get it?{" "}
      <Link href="#" underline="none">Resend code</Link>
    </Box>
    <Box>
      <Link href="#" underline="none">
        Wrong email? Go back
      </Link>
    </Box>
  </Box>
</AuthLayout>`,
      },
    },
  },
};
