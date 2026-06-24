# Changelog

All notable changes to `@alchemy/ui` are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.47] — 2026-06-23

### Fixed

- `Select` — stop overriding MUI's internal menu close handler so the dropdown dismisses on backdrop click and Escape without forcing a selection.

---

## [0.1.48] — 2026-06-23

### Fixed

- Theme — set `cursor: pointer` on interactive controls via `MuiButtonBase`, `MuiCssBaseline`, links, selects, and clickable chips; disabled controls use `cursor: not-allowed`.

---

## [0.1.52] — 2026-06-23

### Fixed

- `Autocomplete` — map `renderInput` params to TextField `slotProps` on MUI v9 so legacy `inputProps` is not forwarded to the DOM.

---

## [0.1.49] — 2026-06-23

### Fixed

- `DatePicker` — support `inputAriaLabel` when the visible label is omitted so external form labels stay accessible.
- `Autocomplete` — support `inputAriaLabel` when the visible label is omitted so external form labels stay accessible.

---

## [0.1.56] — 2026-06-23

### Fixed

- `DataTable` — tag the built-in empty-state row with `DATA_TABLE_EMPTY_ROW_CLASS` so table hover styles can skip it.

---

## [Unreleased]

### Fixed

- `IconButton` — omit the native `title` attribute when `tooltip` is set so MUI does not warn about duplicate tooltips on the wrapped button.

---

## [0.1.63] — 2026-06-24

### Fixed

- Theme — global MUI overrides (`MuiOutlinedInput`, `MuiDivider`, `MuiDrawer`, `MuiTable*`, `MuiBackdrop`) now derive borders, text, and hover colors from the active palette in dark mode.
- `AppBar`, `DataTable`, `DatePicker`, `Accordion`, `DocumentEditor`, and `ControlledAutocomplete` — replace hardcoded light ink colors with theme tokens.
- `Chip` / `StatusChip` — preset and status colors use semantic palette alphas that adapt to dark mode.
- Charts (`AlchemyLineChart`, `AlchemyBarChart`, `AlchemyAreaChart`, `AlchemyPieChart`) — grid, axis, tooltip, and title colors follow the active theme.

---

## [0.1.62] — 2026-06-24

### Fixed

- `DataTablePagination` — footer labels, select, page count, and navigation buttons now follow the active theme palette in dark mode instead of hardcoded light colors.

---

## [0.1.60] — 2026-06-23

### Fixed

- `AuthLayout` — form panel, headings, and footer now follow the active theme palette in dark mode instead of hardcoded light colors.

---
- `Sidebar` — constrain footer width so long user emails truncate with ellipsis instead of overflowing the drawer.

### Added

- `Sidebar` / `MenuItem` — optional `onMouseEnter` and `onFocus` handlers on nav items for route prefetch and other hover/focus interactions.
- `TabBar` — navigation-only tab component with `icon-grid` and `underline` variants, string-id controlled selection, responsive scroll, and theme-driven active/hover colors.

### Changed

- `TabBar` — active, hover, indicator, and shell styles now derive from the MUI theme (`primary` / `secondary`, `divider`, `shadows`, `text`) instead of hardcoded accent colors.


- Icons — replace `@mui/icons-material` with `lucide-react` across production components (`Sidebar`, `SearchBar`, `AppBar`, `FileUpload`, `Accordion`, `DatePicker`, `FilterBar`, `DocumentEditor`, `DataTable`, `ControlledAutocomplete`, and related utilities). Storybook stories and tests updated to match.
- Peer dependency — `@mui/icons-material` removed; `lucide-react` (`>=0.400.0`) is now required.

### Added

- Storybook — `Documentation/Changelog` docs page with the full English release history sourced from `CHANGELOG.md`.
- Tests — coverage for `ChangelogPage`, empty-state illustrations, `AlchemyLogoBlack`, temporary `Sidebar` focus handling, and `Menu`/`Select` focus utilities (keeps 95%+ thresholds).
- Cursor rules — `.cursor/rules/` with coverage, changelog, publish, components, and theme guidance for this repo.

### Infrastructure

- Monorepo — parent `alchemy-nexus/.cursor/rules/` now points to this repo's rules as source of truth.

---

## [0.1.54] — 2026-06-23

### Fixed

- `DatePicker` — keep range-mode calendars in a horizontal row instead of stacking vertically when the popover is narrower than two month panels.

---

## [0.1.53] — 2026-06-23

### Fixed

- `Dialog` and `Menu` — release background focus when an overlay opens so MUI does not leave focus inside an `aria-hidden` subtree (accessibility warning in consuming apps).
- `Menu` and `Select` — move focus back to the trigger and blur menu items before MUI marks the closing menu root as `aria-hidden` (fixes persistent console warning on menu item click/close).

---

## [0.1.0] — Unreleased

### Added

#### Atoms
- `Button` — MUI Button extended with `loading` state and Alchemy border radius
- `TextField` — Outlined input with `startAdornment` / `endAdornment` shortcuts
- `Typography` — MUI Typography with Alchemy type scale
- `Avatar` — Auto-generates initials and consistent color from `name` prop
- `Checkbox` — Checkbox with optional label, `indeterminate` state, and label placement
- `Chip` — Tag/label component with Alchemy border radius
- `Divider` — Semantic separator (horizontal / vertical, with optional text)
- `IconButton` — Icon button with optional `tooltip` prop
- `Badge` — Notification counter badge
- `Link` — Anchor link with underline (`always` / `hover` / `none`) and color control
- `Progress` — Linear and circular progress indicators (determinate / indeterminate)
- `RadioGroup` — Group of radio buttons with group label, disabled options, and row layout
- `Rating` — Star rating with half-precision, custom max, read-only, and disabled modes
- `Select` — Dropdown select with option groups support
- `Skeleton` — Loading placeholder (text, rectangular, rounded, circular)
- `Slider` — Range slider with marks, min/max, range selection, and vertical orientation
- `Switch` — Toggle switch with optional label and label placement
- `ToggleButton` / `ToggleButtonGroup` — Exclusive or multi-select button group (horizontal / vertical)
- `Fab` — Floating Action Button with circular and extended variants, size, and color control
- `Tooltip` — Contextual tooltip with placement and arrow support

#### Molecules
- `AvatarGroup` — Overlapping avatar stack with `+N` overflow, initials generation, and optional tooltips
- `ButtonGroup` — Group of related action buttons with variant, size, orientation, and disabled items
- `List` — List with clickable items (`ListItemButton`), icons, secondary text, dividers, and subheader
- `FormField` — Label + input + helper text, externalized label pattern
- `SearchBar` — Pill-shaped search with clear button and `onSearch` on Enter
- `StatusChip` — Pre-configured semantic status chip (9 statuses)
- `AlertBanner` — Animated alert with title, severity, and dismissal
- `MenuItem` — Sidebar navigation item with icon, selection, and end slot
- `Tabs` — Tab container with icon support and controlled / uncontrolled mode
- `Breadcrumb` — Accessible breadcrumb navigation with custom separators
- `Toast` — Snackbar notification with severity and auto-hide
- `Accordion` — Collapsible content sections (exclusive and multi-expand modes)
- `Autocomplete` — Combobox with dropdown suggestions, multiple selection, freeSolo
- `FileUpload` — Drag-and-drop file upload zone with size validation
- `Menu` — Dropdown context menu with icons, dividers, and disabled items
- `Pagination` — Page navigation controls (text / outlined, circular / rounded)

#### Organisms
- `Card` — Content card with optional header, footer, and dividers
- `DataTable` — Full-featured table with sort, pagination, loading, empty state
- `AppBar` — Top navigation bar with flexible logo / title / search / actions slots
- `Sidebar` — Navigation drawer with sections, icons, and footer slot
- `EmptyState` — Placeholder for empty lists with icon, title, and action
- `Dialog` — Modal dialog with title, subtitle, loading state, and footer slot
- `Stepper` — Multi-step wizard (horizontal / vertical) with built-in navigation

#### Templates
- `AuthLayout` — Single-column or split-panel authentication layout
- `DashboardLayout` — App shell with sidebar, top bar, and scrollable content

#### Theme
- `alchemyTheme` — Light theme with Alchemy design tokens
- `alchemyDarkTheme` — Dark theme (bg `#0B0F19`, paper `#131929`)
- `AlchemyProvider` — Theme provider wrapper with optional dark theme and CssBaseline toggle
- Design tokens exported: `customColors`, `palette`, `typography`, `components`, `opacities`

### Infrastructure
- tsup build (CJS + ESM + TypeScript declarations)
- Vitest + Testing Library — 100% coverage enforced
- Storybook v10 with a11y, docs, themes addons
- ESLint v9 flat config with TypeScript, React, and Storybook rules
- Prettier formatting enforced in CI and pre-commit
- Husky hooks: pre-commit (lint-staged + coverage), pre-push (blocks main/release), commit-msg (commitlint)
- GitHub Actions: `ci.yml` (quality checks) + `release.yml` (semver bump + npm publish)
- Size limit: 150 kB (actual: ~8 kB brotli-compressed)
