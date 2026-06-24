import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Molecules/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Collapsible content panel for the Alchemy design system. Key traits: 8px border-radius, `blue[100]` Alchemy border, no MUI `::before` divider, zero elevation. Summary row is 56px tall; hover shifts to `blue[50]`; when expanded the header gets a `blue[700]` 10% tint. Supports controlled (`expanded`) and uncontrolled (`defaultExpanded`) modes. Compose multiple panels with `AccordionGroup`.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    summary: "Project details",
    details:
      "Hillcrest Commercial Build — Phase 2. Owner: Elementos Development. Contract type: GMP. Start date: 2026-03-01.",
    defaultExpanded: false,
  },
  argTypes: {
    summary: {
      control: "text",
      description:
        "Header content — rendered as `body1` if a string, or passed through as-is for React nodes.",
    },
    details: {
      control: "text",
      description:
        "Body content rendered inside the expanded panel with `p: 3` (24px) padding.",
    },
    defaultExpanded: {
      control: "boolean",
      description:
        "Initial open state in uncontrolled mode. Ignored when `expanded` is provided.",
    },
    expanded: {
      control: "boolean",
      description: "Controlled open state. Provide `onChange` to handle toggling.",
    },
    disabled: {
      control: "boolean",
      description: "Prevents expand/collapse interaction. Grays out the summary row.",
    },
    checkable: {
      control: "boolean",
      description: "Renders a checkbox on the left of the summary row.",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state of the header checkbox.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Initial checked state in uncontrolled mode.",
    },
    indeterminate: {
      control: "boolean",
      description: "Shows a dash (−) when some but not all children are selected.",
    },
    onCheckChange: {
      control: false,
      description:
        "Fired when the header checkbox is toggled: `(checked: boolean) => void`.",
    },
    onChange: {
      control: false,
      description:
        "Callback fired when the panel toggles: `(expanded: boolean) => void`.",
    },
    sx: {
      control: false,
      description: "MUI `sx` style overrides applied to the root accordion element.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {};

export const DefaultExpanded: Story = {
  args: { defaultExpanded: true },
  parameters: {
    docs: {
      description: {
        story:
          "Panel open by default — useful as the first visible section in a project detail view.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    summary: "Archived section",
    details: "This section is read-only and cannot be expanded.",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled state — the header is greyed out and cannot be interacted with.",
      },
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    checkable: true,
    defaultChecked: false,
    defaultExpanded: true,
    summary: "Projects",
    details: "List of projects would appear here.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `checkable` to show a header checkbox. Clicking it fires `onCheckChange(checked)` — the parent uses this to select or deselect all children. The checkbox does not toggle the panel.",
      },
    },
  },
};

export const CheckboxIndeterminate: Story = {
  args: {
    checkable: true,
    indeterminate: true,
    defaultExpanded: true,
    summary: "Projects 2/10",
    details: "Some projects are selected.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`indeterminate` renders a dash (−) when some but not all children are selected. Toggle the checkbox to resolve to fully checked or unchecked.",
      },
    },
  },
};

const CheckableDemo = () => {
  const allProjects = [
    "Hillcrest Commercial Build",
    "Riverside Office Park",
    "Downtown Mixed-Use Tower",
    "Airport Terminal Expansion",
    "Harbor Bridge Retrofit",
  ];
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(["Hillcrest Commercial Build", "Riverside Office Park"])
  );

  const allSelected = selected.size === allProjects.length;
  const noneSelected = selected.size === 0;

  const handleHeaderCheck = (checked: boolean) => {
    setSelected(checked ? new Set(allProjects) : new Set());
  };

  const handleItemCheck = (project: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(project);
      } else {
        next.delete(project);
      }
      return next;
    });
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <Accordion
        checkable
        checked={allSelected}
        indeterminate={!allSelected && !noneSelected}
        onCheckChange={handleHeaderCheck}
        defaultExpanded
        summary={`Projects ${selected.size}/${allProjects.length}`}
        details={
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {allProjects.map((project) => (
              <label
                key={project}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontFamily: "Roboto, sans-serif",
                  color: "rgba(21,35,86,0.87)",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.has(project)}
                  onChange={(e) => handleItemCheck(project, e.target.checked)}
                  style={{ accentColor: "#1F5FF2", width: 16, height: 16 }}
                />
                {project}
              </label>
            ))}
          </div>
        }
      />
    </div>
  );
};

export const CheckableInteractive: Story = {
  render: () => <CheckableDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive: header checkbox selects/deselects all children. When some are selected the header shows indeterminate (−). The summary label reflects the live count.",
      },
    },
  },
};

export const ProjectDetailView: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Accordion
        summary="Project details"
        details="Hillcrest Commercial Build — Phase 2. Owner: Elementos Development. Contract type: GMP. Start date: 2026-03-01."
        defaultExpanded
      />
      <div style={{ marginTop: 12 }}>
        <Accordion
          summary="Permits"
          details="Building permit #BP-2026-0142 approved. Electrical inspection scheduled 2026-05-14."
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <Accordion
          summary="Crew"
          details="15 crew members assigned. Foreman: R. Castillo. Daily headcount via Activity Tracker."
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <Accordion
          summary="Archived data"
          details="Previous phase data is locked and cannot be modified."
          disabled
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Typical project detail layout: first panel open by default, secondary panels collapsed, and an archived section disabled.",
      },
    },
  },
};
