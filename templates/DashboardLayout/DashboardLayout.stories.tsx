import {
  Bell,
  ClipboardList,
  Folder,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AppBar } from "../../organisms/AppBar";
import { Sidebar } from "../../organisms/Sidebar";
import { Card } from "../../organisms/Card";
import { StatusChip } from "../../molecules/StatusChip";
import { Avatar } from "../../atoms/Avatar";
import { Badge } from "../../atoms/Badge";
import { IconButton } from "../../atoms/IconButton";
import { SearchBar } from "../../molecules/SearchBar";
import { Typography } from "../../atoms/Typography";
import { DashboardLayout } from "./DashboardLayout";

const meta: Meta<typeof DashboardLayout> = {
  title: "Templates/DashboardLayout",
  component: DashboardLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full dashboard layout with sidebar, app bar, and main content area. Combines AppBar, Sidebar, and content slot.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 72;

const brandLogo = <Box>A</Box>;

const sidebarSections = [
  {
    items: [
      { label: "Dashboard", icon: <LayoutDashboard size={18} />, selected: true },
      { label: "Projects", icon: <Folder size={18} /> },
      { label: "Tasks", icon: <ClipboardList size={18} /> },
      { label: "Team", icon: <Users size={18} /> },
    ],
  },
  {
    title: "System",
    items: [{ label: "Settings", icon: <Settings size={18} /> }],
  },
];

export const Full: Story = {
  render: function FullDashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <DashboardLayout
        sidebarWidth={collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}
        sidebar={
          <Sidebar
            sections={sidebarSections}
            title="Alchemy"
            width={SIDEBAR_WIDTH}
            collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
            collapsible
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            logo={brandLogo}
            collapsedLogo={brandLogo}
            footer={
              <Box>
                <Avatar name="Lester Arteaga" />
                <Box>
                  <Box>Lester Arteaga</Box>
                  <Box>Admin</Box>
                </Box>
              </Box>
            }
          />
        }
        appBar={
          <AppBar
            position="static"
            centerContent={
              <Box>
                <SearchBar placeholder="Search..." size="small" />
              </Box>
            }
            endContent={
              <>
                <Badge badgeContent={3} color="error">
                  <IconButton size="small" tooltip="Notifications">
                    <Bell size={18} />
                  </IconButton>
                </Badge>
              </>
            }
          />
        }
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: "Active Projects", value: "12", status: "active" as const },
            { title: "Pending Tasks", value: "34", status: "pending" as const },
            { title: "Completed", value: "89", status: "completed" as const },
            { title: "Team Members", value: "8", status: "active" as const },
          ].map((stat) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.title}>
              <Card>
                <Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <StatusChip status={stat.status} />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DashboardLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click the chevron in the sidebar header to collapse or expand navigation. Sync `sidebarWidth` with the sidebar's expanded/collapsed width so the main content reflows smoothly.",
      },
    },
  },
};
