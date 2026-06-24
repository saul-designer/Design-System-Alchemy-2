import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import changelogRaw from "../../CHANGELOG.md?raw";
import packageJson from "../../package.json";
import {
  parseChangelog,
  type ChangelogRelease,
  type ChangelogSection,
} from "./parse-changelog";

const SECTION_COLORS: Record<
  string,
  "success" | "info" | "warning" | "error" | "default"
> = {
  Added: "success",
  Fixed: "info",
  Changed: "warning",
  Deprecated: "warning",
  Removed: "error",
  Security: "error",
  Infrastructure: "default",
};

function ReleaseHeader({ release }: { release: ChangelogRelease }) {
  const isUnreleased = release.version.toLowerCase() === "unreleased";

  return (
    <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
      <Chip
        label={isUnreleased ? "Unreleased" : `v${release.version}`}
        color={isUnreleased ? "warning" : "primary"}
        variant={isUnreleased ? "outlined" : "filled"}
        sx={{ fontWeight: 700, letterSpacing: "0.02em" }}
      />
      {release.date ? (
        <Typography variant="body2" color="text.secondary">
          {release.date}
        </Typography>
      ) : null}
    </Stack>
  );
}

function SectionBlock({ section }: { section: ChangelogSection }) {
  const chipColor = SECTION_COLORS[section.type] ?? "default";

  return (
    <Box>
      <Chip
        label={section.type}
        size="small"
        color={chipColor}
        variant="outlined"
        sx={{ mb: 1.25, fontWeight: 600 }}
      />

      {section.items.length > 0 ? (
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          {section.items.map((item) => (
            <Typography
              key={item}
              component="li"
              variant="body2"
              color="text.primary"
              sx={{ mb: 0.75, lineHeight: 1.55 }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      ) : null}

      {section.subsections.map((subsection) => (
        <Box key={subsection.title} sx={{ mt: 1.5, pl: 1 }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mb: 0.75,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            {subsection.title}
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            {subsection.items.map((item) => (
              <Typography
                key={item}
                component="li"
                variant="body2"
                color="text.primary"
                sx={{ mb: 0.75, lineHeight: 1.55 }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function ReleaseCard({ release }: { release: ChangelogRelease }) {
  const theme = useTheme();
  const isUnreleased = release.version.toLowerCase() === "unreleased";

  return (
    <Box
      component="article"
      sx={{
        border: "1px solid",
        borderColor: isUnreleased ? "warning.light" : "divider",
        borderRadius: 2,
        bgcolor: isUnreleased
          ? alpha(theme.palette.warning.main, 0.08)
          : "background.paper",
        p: 2,
      }}
    >
      <ReleaseHeader release={release} />
      <Divider sx={{ my: 2 }} />
      <Stack spacing={2.5}>
        {release.sections.map((section) => (
          <SectionBlock key={`${release.version}-${section.type}`} section={section} />
        ))}
      </Stack>
    </Box>
  );
}

export function ChangelogPage() {
  const releases = parseChangelog(changelogRaw);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 920, mx: "auto" }}>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ letterSpacing: "0.12em" }}
          >
            Documentation
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, lineHeight: 1.15 }}
          >
            Changelog
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
            Release history for{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              @elementos-development/alchemy-ui
            </Box>
            . This page is generated from <Box component="code">CHANGELOG.md</Box>.
          </Typography>
          <Chip
            label={`Current version: v${packageJson.version}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: "flex-start", mt: 0.5 }}
          />
        </Stack>

        <Stack spacing={2.5}>
          {releases.map((release) => (
            <ReleaseCard key={release.version} release={release} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
