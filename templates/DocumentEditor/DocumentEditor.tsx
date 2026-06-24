import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { alpha, useTheme } from "@mui/material/styles";
import { GripVertical, Save } from "lucide-react";
import type { SxProps, Theme } from "@mui/material/styles";
import { Button } from "../../atoms/Button";
import { DashboardLayout } from "../DashboardLayout";

// ─── Field types ─────────────────────────────────────────────────────────────

export interface DocumentEditorField {
  id: string;
  label: string;
  key: string;
  type: string;
  source: string;
}

// ─── Sub-components (also exported for use inside document content) ───────────

export interface FieldTokenProps {
  icon?: React.ReactNode;
  label: string;
}

export const FieldToken: React.FC<FieldTokenProps> = ({ icon, label }) => {
  const theme = useTheme();

  return (
    <Box
      component="span"
      contentEditable={false}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: alpha(theme.palette.primary.main, 0.1),
        color: "primary.main",
        px: "8px",
        py: "2px",
        borderRadius: "6px",
        fontWeight: 500,
        fontSize: "13px",
        border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
        verticalAlign: "middle",
        userSelect: "none",
        "& .MuiSvgIcon-root": { fontSize: "14px" },
      }}
    >
      {icon}
      {label}
    </Box>
  );
};

export interface TypeChipProps {
  type: string;
  source: string;
}

export const TypeChip: React.FC<TypeChipProps> = ({ source, type }) => {
  const theme = useTheme();
  const isSystem = source === "system";
  const paletteColor = isSystem ? theme.palette.info : theme.palette.warning;

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: "12px",
        py: "3px",
        borderRadius: "100px",
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: "1.4",
        background: alpha(paletteColor.main, theme.palette.mode === "dark" ? 0.2 : 0.12),
        color: theme.palette.mode === "dark" ? paletteColor.light : paletteColor.dark,
        border: `1px solid ${alpha(paletteColor.main, theme.palette.mode === "dark" ? 0.35 : 0.24)}`,
      }}
    >
      {type}
    </Box>
  );
};

const editableFocus = (theme: Theme) => ({
  "&:focus": {
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.18)}`,
    borderRadius: "4px",
    outlineOffset: "3px",
  },
});

export interface DocSectionHeadingProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const DocSectionHeading: React.FC<DocSectionHeadingProps> = ({ children, sx }) => {
  const theme = useTheme();

  return (
    <Box
      component="h2"
      contentEditable
      suppressContentEditableWarning
      sx={{
        fontFamily: "'Roboto', sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: 1.4,
        color: "text.primary",
        m: 0,
        mt: "24px",
        mb: "12px",
        textTransform: "uppercase",
        letterSpacing: ".5px",
        outline: "none",
        cursor: "text",
        ...editableFocus(theme),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export interface DocParagraphProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const DocParagraph: React.FC<DocParagraphProps> = ({ children, sx }) => {
  const theme = useTheme();

  return (
    <Box
      component="p"
      contentEditable
      suppressContentEditableWarning
      sx={{
        m: 0,
        mb: "12px",
        lineHeight: 1.7,
        outline: "none",
        cursor: "text",
        ...editableFocus(theme),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export interface DocumentEditorProps {
  /** Document title shown in the page header and passed as editable h1 inside the canvas */
  title: string;
  /** Optional badge rendered after the title (e.g. version / draft indicator) */
  versionBadge?: React.ReactNode;
  /** Parent label shown in the breadcrumb */
  breadcrumbParent?: string;
  /** Subtitle rendered below the title in the page header */
  subtitle?: string;
  /** Fields listed in the left-hand Field Registry panel */
  fields?: DocumentEditorField[];
  /** Label for the registry panel */
  registryTitle?: string;
  /** Subtext below the registry label */
  registrySubtitle?: string;
  /** Document canvas content — use DocParagraph / DocSectionHeading / FieldToken */
  children: React.ReactNode;
  /** Called when "Preview" is clicked */
  onPreview?: () => void;
  /** Called when "Save version" is clicked */
  onSave?: () => void;
  /** Sidebar node passed to DashboardLayout */
  sidebar?: React.ReactNode;
  /** Sidebar width in px (must match the sidebar component's own width prop) */
  sidebarWidth?: number;
  /** AppBar node passed to DashboardLayout */
  appBar?: React.ReactNode;
  /** sx overrides for the outer wrapper Box */
  sx?: SxProps<Theme>;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  title,
  versionBadge,
  breadcrumbParent = "Documents",
  subtitle = "Insert fields from the registry by dragging them into the document.",
  fields = [],
  registryTitle = "Field Registry",
  registrySubtitle = "Drag to insert",
  children,
  onPreview,
  onSave,
  sidebar,
  sidebarWidth = 250,
  appBar,
  sx,
}) => {
  const theme = useTheme();

  return (
    <DashboardLayout sidebar={sidebar} sidebarWidth={sidebarWidth} appBar={appBar}>
      <Box sx={{ m: -3, p: 4, ...sx }}>
        {/* Page header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 3,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Box
              sx={{
                fontSize: "12px",
                color: "text.secondary",
                mb: "4px",
                display: "flex",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <Box component="span" sx={{ color: "primary.main", cursor: "pointer" }}>
                {breadcrumbParent}
              </Box>
              <Box component="span">/</Box>
              <Box component="span">{title}</Box>
            </Box>
            <Box
              component="h1"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "28px",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "text.primary",
                m: 0,
                mb: "6px",
                letterSpacing: "-0.2px",
              }}
            >
              {title}
              {versionBadge}
            </Box>
            <Box
              component="p"
              sx={{ fontSize: "14px", color: "text.secondary", m: 0, maxWidth: 560 }}
            >
              {subtitle}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button variant="outlined" onClick={onPreview}>
              Preview
            </Button>
            <Button
              variant="contained"
              startIcon={<Save size={18} aria-hidden />}
              onClick={onSave}
            >
              Save version
            </Button>
          </Box>
        </Box>

        {/* Editor grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* Field registry */}
          {fields.length > 0 && (
            <Paper
              sx={{
                bgcolor: "background.paper",
                borderRadius: 4,
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              <Box sx={{ px: 3, pt: "20px", pb: "12px" }}>
                <Box
                  sx={{
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: "text.primary",
                  }}
                >
                  {registryTitle}
                </Box>
                <Box sx={{ fontSize: "13px", color: "text.secondary", mt: "4px" }}>
                  {registrySubtitle}
                </Box>
              </Box>
              <Box
                sx={{ px: 3, pb: 3, display: "flex", flexDirection: "column", gap: 1 }}
              >
                {fields.map((f) => (
                  <Box
                    key={f.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      p: "10px 12px",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "10px",
                      bgcolor: "background.paper",
                      cursor: "grab",
                      transition: "all .15s",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.08)}`,
                      },
                    }}
                  >
                    <GripVertical
                      size={18}
                      aria-hidden
                      color={theme.palette.text.disabled}
                      style={{ flexShrink: 0 }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "text.primary",
                        }}
                      >
                        {f.label}
                      </Box>
                      <Box
                        sx={{
                          fontSize: "11px",
                          lineHeight: 1,
                          color: "text.secondary",
                          fontFamily: "monospace",
                          mt: "2px",
                        }}
                      >
                        {f.key}
                      </Box>
                    </Box>
                    <TypeChip source={f.source} type={f.type} />
                  </Box>
                ))}
              </Box>
            </Paper>
          )}

          {/* Document canvas */}
          <Paper
            sx={{
              bgcolor: "background.paper",
              borderRadius: 4,
              boxShadow: 1,
              px: "80px",
              py: "64px",
              minHeight: 720,
              fontSize: "14px",
              lineHeight: 1.7,
              color: "text.primary",
            }}
          >
            <Box
              component="h1"
              contentEditable
              suppressContentEditableWarning
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "26px",
                fontWeight: 600,
                lineHeight: 1.3,
                color: "text.primary",
                m: 0,
                mb: "24px",
                textAlign: "center",
                outline: "none",
                cursor: "text",
                ...editableFocus(theme),
              }}
            >
              {title}
            </Box>
            {children}
          </Paper>
        </Box>
      </Box>
    </DashboardLayout>
  );
};
