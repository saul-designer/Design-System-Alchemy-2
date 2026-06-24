import {
  BadgeCheck,
  Building2,
  Calendar,
  FileText,
  List,
  Mail,
  Pencil,
  Send,
  Settings,
  User,
  Users,
} from "lucide-react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { AppBar } from "../organisms/AppBar";
import { Sidebar } from "../organisms/Sidebar";
import { SidebarUserFooter } from "../organisms/Sidebar/SidebarUserFooter";
import {
  DocumentEditor,
  FieldToken,
  DocSectionHeading,
  DocParagraph,
} from "./DocumentEditor";

const alchemyIconSrc = new URL(
  "../organisms/Sidebar/assets/alchemy-icon.svg",
  import.meta.url
).href;
const alchemyLogoSrc = new URL(
  "../organisms/Sidebar/assets/alchemy-logo-full-color.svg",
  import.meta.url
).href;

// ─── Data ────────────────────────────────────────────────────────────────────

const FIELDS = [
  {
    id: "f2",
    label: "Full legal name",
    key: "field:full_name",
    type: "Text",
    source: "system",
  },
  {
    id: "f3",
    label: "Email address",
    key: "field:email",
    type: "Email",
    source: "system",
  },
  {
    id: "f4",
    label: "Phone number",
    key: "field:phone",
    type: "Phone",
    source: "contractor",
  },
  {
    id: "f6",
    label: "Business type",
    key: "field:business_type",
    type: "Select",
    source: "contractor",
  },
  {
    id: "f7",
    label: "EIN / SSN",
    key: "field:ein_ssn",
    type: "Text",
    source: "contractor",
  },
  {
    id: "f8",
    label: "Years in operation",
    key: "field:years",
    type: "Number",
    source: "contractor",
  },
  {
    id: "f9",
    label: "Signature",
    key: "field:signature",
    type: "Signature",
    source: "system",
  },
];

const sidebarSections = [
  {
    title: "Workspace",
    items: [
      { label: "Jobs", icon: <Send size={18} /> },
      { label: "Documents", icon: <FileText size={18} />, selected: true },
      { label: "Fields", icon: <List size={18} /> },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Users", icon: <Users size={18} /> },
      { label: "Settings", icon: <Settings size={18} /> },
    ],
  },
];

// ─── Story-only primitives ────────────────────────────────────────────────────

const VersionBadge = () => <Box component="span">v4 · draft</Box>;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Templates/DocumentEditor",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Document editor page for Alchemy Sign. Field registry panel on the left; rich document canvas on the right.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Story ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <DocumentEditor
      title="Master Services Agreement"
      versionBadge={<VersionBadge />}
      fields={FIELDS}
      sidebar={
        <Sidebar
          sections={sidebarSections}
          width={250}
          logo={
            <img
              src={alchemyLogoSrc}
              alt="Alchemy Sign"
              style={{ height: 26, width: "auto" }}
            />
          }
          collapsedLogo={
            <img
              src={alchemyIconSrc}
              alt="Alchemy Sign"
              style={{ height: 28, width: 28 }}
            />
          }
          collapsible
          footer={<SidebarUserFooter name="Saúl Castillo" email="saul@elementos.co" />}
        />
      }
      sidebarWidth={250}
      appBar={
        <AppBar
          appName="Alchemy Sign"
          greeting="Good Morning, Saúl"
          userInitials="SC"
          hasNotification
        />
      }
    >
      <DocParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, dated{" "}
        <FieldToken icon={<Calendar />} label="sent_date" /> and entered into by{" "}
        <strong>Alchemy Sign, Inc.</strong> and the undersigned contractor,{" "}
        <FieldToken icon={<User />} label="full_name" /> (&quot;Contractor&quot;). Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </DocParagraph>

      <DocSectionHeading>1. Engagement</DocSectionHeading>
      <DocParagraph>
        Ut enim ad minim veniam, contractor operates as a{" "}
        <FieldToken icon={<Building2 />} label="business_type" /> with EIN or SSN{" "}
        <FieldToken icon={<BadgeCheck />} label="ein_ssn" />. Quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.
      </DocParagraph>

      <DocSectionHeading>2. Compensation</DocSectionHeading>
      <DocParagraph>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Invoices shall be submitted to{" "}
        <FieldToken icon={<Mail />} label="email" /> on a monthly basis. Excepteur sint
        occaecat cupidatat non proident.
      </DocParagraph>

      <DocSectionHeading>3. Term &amp; Termination</DocSectionHeading>
      <DocParagraph>
        Sunt in culpa qui officia deserunt mollit anim id est laborum. This agreement
        commences on the effective date and continues until terminated by either party
        upon thirty (30) days&apos; written notice. Nemo enim ipsam voluptatem quia
        voluptas sit aspernatur aut odit aut fugit.
      </DocParagraph>

      <DocSectionHeading>4. Signature</DocSectionHeading>
      <DocParagraph>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. By signing below,
        Contractor acknowledges and agrees to the terms set forth in this agreement.
      </DocParagraph>

      {/* Signature row */}
      <Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              background: "rgba(31,95,242,.1)",
              color: "#1F5FF2",
              borderRadius: "10px",
              border: "1px dashed rgba(31,95,242,.3)",
              minHeight: 68,
              fontWeight: 500,
              fontSize: "13px",
              "& .MuiSvgIcon-root": { fontSize: "18px" },
            }}
          >
            <Pencil />
            signature
          </Box>
          <Box>Contractor signature</Box>
        </Box>
        <Box>
          <Box>John A. Smith</Box>
          <Box>Chief Executive Officer, Alchemy Sign, Inc.</Box>
        </Box>
      </Box>
    </DocumentEditor>
  ),
};
