import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { WelcomeEmail } from "./WelcomeEmail";

const meta: Meta<typeof WelcomeEmail> = {
  title: "Templates/Email",
  component: WelcomeEmail,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Generic email template shell. Renders the Alchemy logo header and branded footer around any body content passed as children.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    supportEmail: {
      control: "text",
      description: "Support email address shown in the footer.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeEmail>;

export const AccountActivation: Story = {
  args: {
    supportEmail: "support@therealchemy.com",
  },
  render: (args) => (
    <WelcomeEmail {...args}>
      <Box
        component="p"
        sx={{
          color: "#152356",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "24px",
          fontWeight: 400,
          lineHeight: "133.4%",
          margin: "0 0 24px",
        }}
      >
        Hi Jane,
      </Box>

      <Box
        component="h1"
        sx={{
          color: "#152356",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "47px",
          fontWeight: 400,
          lineHeight: "116.7%",
          margin: "12px 0 4px",
        }}
      >
        Welcome to{" "}
        <Box component="span" sx={{ color: "#03859b" }}>
          Alchemy
        </Box>
        {"–"}
      </Box>

      <Box
        component="h1"
        sx={{
          color: "#152356",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "47px",
          fontWeight: 400,
          lineHeight: "116.7%",
          margin: "12px 0 32px",
        }}
      >
        Activate your account
      </Box>

      <Box
        component="p"
        sx={{
          color: "#152356",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          margin: "0 0 16px",
        }}
      >
        You&apos;ve been invited to join{" "}
        <Box component="span" sx={{ color: "#193bb4" }}>
          Alchemy
        </Box>
        , your smart assistant for customer service. Click the button below to activate
        your account &mdash; you&apos;ll be asked to create a password before logging in
        for the first time.
      </Box>

      <Box sx={{ margin: "32px 0" }}>
        <Box
          component="a"
          href="#"
          sx={{
            display: "inline-block",
            borderRadius: "100px",
            background: "#1f5ff2",
            boxShadow:
              "0 1px 5px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2)",
            color: "#ffffff",
            textDecoration: "none",
            padding: "12px 36px",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Activate My Account
        </Box>
      </Box>
    </WelcomeEmail>
  ),
};

export const PasswordReset: Story = {
  args: {
    supportEmail: "support@therealchemy.com",
  },
  render: (args) => (
    <WelcomeEmail {...args}>
      <Box
        component="p"
        sx={{
          color: "#152356",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "24px",
          fontWeight: 400,
          lineHeight: "133.4%",
          margin: "0 0 24px",
        }}
      >
        Hi Jane,
      </Box>

      <Box
        component="h1"
        sx={{
          color: "#152356",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "47px",
          fontWeight: 400,
          lineHeight: "116.7%",
          margin: "12px 0 32px",
        }}
      >
        Reset your password
      </Box>

      <Box
        component="p"
        sx={{
          color: "#152356",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          margin: "0 0 16px",
        }}
      >
        We received a request to reset the password for your Alchemy account. Click the
        button below to choose a new password. This link expires in 24 hours.
      </Box>

      <Box
        component="p"
        sx={{
          color: "#6b7280",
          fontFamily: "'Roboto', Arial, sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          margin: "0 0 32px",
        }}
      >
        If you didn&apos;t request a password reset, you can safely ignore this email.
      </Box>

      <Box sx={{ margin: "32px 0" }}>
        <Box
          component="a"
          href="#"
          sx={{
            display: "inline-block",
            borderRadius: "100px",
            background: "#1f5ff2",
            boxShadow:
              "0 1px 5px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2)",
            color: "#ffffff",
            textDecoration: "none",
            padding: "12px 36px",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Reset Password
        </Box>
      </Box>
    </WelcomeEmail>
  ),
};
