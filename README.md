# @alchemy/ui

> Production-grade React component library built on **Material UI v7**, following **Atomic Design** principles. Fully compatible with React 18/19 and Next.js App Router.

[![CI](https://github.com/elementosdevelopment/alchemy-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/elementosdevelopment/alchemy-ui/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](./coverage)
[![npm version](https://img.shields.io/npm/v/@alchemy/ui)](https://www.npmjs.com/package/@alchemy/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Provider & Theming](#provider--theming)
- [Design Tokens](#design-tokens)
- [Components](#components)
- [Forms Integration](#forms-integration)
- [Charts](#charts)
- [Multi-Brand Themes](#multi-brand-themes)
- [Testing Utilities](#testing-utilities)
- [Next.js Setup](#nextjs-setup)
- [Storybook](#storybook)
- [Branching Strategy](#branching-strategy)
- [Contributing](#contributing)
- [Scripts](#scripts)

---

## Overview

`@alchemy/ui` is the official UI component library for [Elementos Development](https://elementosdevelopment.com). It provides a consistent, accessible, and themeable set of components that match the Alchemy design system — the same visual language used across all Elementos products.

**Built with:**
- [Material UI v7](https://mui.com/) — component foundation
- [Emotion](https://emotion.sh/) — CSS-in-JS styling
- [TypeScript](https://www.typescriptlang.org/) — full type safety
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — 100% test coverage
- [Storybook v10](https://storybook.js.org/) — interactive component documentation

---

## Installation

```bash
npm install @alchemy/ui @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### Optional peer dependencies

Install only what you need:

```bash
# For form integration (react-hook-form + zod)
npm install react-hook-form @hookform/resolvers zod

# For charts (recharts)
npm install recharts

# For testing utilities
npm install -D @testing-library/react @testing-library/jest-dom
```

> **Required peer dependencies**
>
> | Package | Version |
> |---------|---------|
> | `react` | `>=18.0.0` |
> | `react-dom` | `>=18.0.0` |
> | `@mui/material` | `>=7.0.0` |
> | `@mui/icons-material` | `>=7.0.0` |
> | `@emotion/react` | `>=11.0.0` |
> | `@emotion/styled` | `>=11.0.0` |

---

## Quick Start

Wrap your application with `AlchemyProvider` to apply the design system theme:

```tsx
// App.tsx (React) or layout.tsx (Next.js)
import { AlchemyProvider } from '@alchemy/ui';

export default function App({ children }) {
  return (
    <AlchemyProvider>
      {children}
    </AlchemyProvider>
  );
}
```

Then use any component:

```tsx
import { Button, Card, StatusChip, DataTable } from '@alchemy/ui';

function ProjectCard() {
  return (
    <Card
      title="Alchemy UI"
      subtitle="Component library"
      headerAction={<StatusChip status="in_progress" />}
      footer={
        <>
          <Button variant="outlined" size="small">Cancel</Button>
          <Button variant="contained" size="small">Save</Button>
        </>
      }
    >
      Build beautiful interfaces with the Alchemy design system.
    </Card>
  );
}
```

---

## Provider & Theming

`AlchemyProvider` supports three modes:

```tsx
import { AlchemyProvider } from '@alchemy/ui';

// 1. Default — uses alchemyTheme out of the box
<AlchemyProvider>
  {children}
</AlchemyProvider>

// 2. Partial overrides — merges on top of alchemyTheme
<AlchemyProvider themeOverrides={{ palette: { primary: { main: '#FF6B00' } } }}>
  {children}
</AlchemyProvider>

// 3. Full replacement — completely custom theme
import { createTheme } from '@mui/material/styles';
const myTheme = createTheme({ ... });
<AlchemyProvider theme={myTheme}>
  {children}
</AlchemyProvider>
```

`theme` takes priority over `themeOverrides`. Both are optional — the default is `alchemyTheme`.

---

## Design Tokens

All tokens are available as named exports for use in custom components and `sx` props.

### Import tokens

```ts
import {
  // Colors
  palette, customColors,
  // Typography
  typography,
  // Shape
  borderRadius, shapeConfig,
  // Spacing (4px base grid)
  spacingTokens, spacingUnit,
  // Shadows (25 elevations)
  shadows,
  // Transitions
  transitionsConfig,
  // Opacities
  opacities,
} from '@alchemy/ui';
```

### Color palette

| Token | Value |
|-------|-------|
| `palette.primary.main` | `#1F5FF2` |
| `palette.secondary.main` | `#00A8C0` |
| `palette.error.main` | `#D32F2F` |
| `palette.warning.main` | `#EF6C00` |
| `palette.success.main` | `#2E7D32` |
| `palette.text.primary` | `#171A1C` |

### Border radius tokens

```ts
import { borderRadius } from '@alchemy/ui';

borderRadius.none  // 0
borderRadius.xs    // 4px  — LinearProgress
borderRadius.sm    // 8px  — Chip, Tooltip, base
borderRadius.md    // 12px — IconButton, Alert
borderRadius.lg    // 16px — TextField, Card, Paper
borderRadius.xl    // 24px — Button, ListItem
borderRadius.pill  // 100px — fully rounded
```

### Spacing tokens (4px grid)

```ts
import { spacingTokens } from '@alchemy/ui';

spacingTokens[1]   // 4px
spacingTokens[2]   // 8px
spacingTokens[3]   // 12px
spacingTokens[4]   // 16px
spacingTokens[6]   // 24px
spacingTokens[12]  // 48px
// ...up to spacingTokens[32] = 128px
```

### Transitions

```ts
import { transitionsConfig } from '@alchemy/ui';

transitionsConfig.easing.easeInOut   // cubic-bezier(0.4, 0, 0.2, 1)
transitionsConfig.easing.easeOut     // cubic-bezier(0.0, 0, 0.2, 1)
transitionsConfig.duration.shorter   // 200ms
transitionsConfig.duration.standard  // 300ms
```

### Shadows

```ts
import { shadows } from '@alchemy/ui';
// shadows[0] = 'none'
// shadows[1] = subtle panel shadow
// shadows[2] = card shadow (blue-tinted)
// shadows[4] = floating element shadow
// ... full 25-elevation scale
```

---

## Components

### Atomic Design Structure

```
src/
├── atoms/          # Primitive UI elements (22 components)
├── molecules/      # Composed functional units (15 components)
├── organisms/      # Complex sections (7 components)
└── templates/      # Page layout shells (2 components)
```

### Atoms

| Component | Description |
|-----------|-------------|
| `Button` | Extended with `loading` state |
| `TextField` | Outlined input with `startAdornment` / `endAdornment` |
| `Typography` | Alchemy type scale |
| `Avatar` | Auto-generates initials and color from `name` |
| `Badge` | Notification counter |
| `Checkbox` | With `indeterminate` state and label |
| `Chip` | Tag/label component |
| `Divider` | Horizontal / vertical with optional text |
| `Fab` | Floating Action Button |
| `IconButton` | With optional `tooltip` prop |
| `Link` | With underline and color control |
| `Progress` | Linear and circular (determinate / indeterminate / buffer) |
| `RadioGroup` | Group with label, row layout, disabled options |
| `Rating` | Star rating with half-precision and read-only |
| `Select` | Dropdown with option groups |
| `Skeleton` | Loading placeholder (text / rect / circular) |
| `Slider` | Range slider with marks and vertical orientation |
| `Switch` | Toggle with optional label |
| `ToggleButton` / `ToggleButtonGroup` | Exclusive or multi-select |
| `Tooltip` | Contextual tooltip with placement and arrow |

### Molecules

| Component | Description |
|-----------|-------------|
| `Accordion` | Collapsible sections (exclusive and multi-expand) |
| `AlertBanner` | Animated alert with dismissal |
| `Autocomplete` | Combobox with multiple selection and freeSolo |
| `AvatarGroup` | Overlapping stack with `+N` overflow |
| `Breadcrumb` | Navigation breadcrumb with custom separators |
| `ButtonGroup` | Related action buttons |
| `FileUpload` | Drag-and-drop with size validation |
| `FormField` | Label + input + helper text pattern |
| `List` | With icons, secondary text, dividers |
| `Menu` | Dropdown context menu with icons |
| `MenuItem` | Sidebar nav item with icon and selection |
| `Pagination` | Page navigation controls |
| `SearchBar` | Pill-shaped search with clear button |
| `StatusChip` | Pre-configured semantic statuses (9 variants) |
| `Tabs` | With icon support and controlled / uncontrolled |
| `Toast` | Snackbar with severity and auto-hide |

### Organisms

| Component | Description |
|-----------|-------------|
| `Card` | With optional header, footer, and dividers |
| `DataTable` | Sort, pagination, loading, empty state |
| `AppBar` | Logo / title / search / actions slots |
| `Sidebar` | Navigation drawer with sections and footer |
| `EmptyState` | Placeholder with icon, title, and action |
| `Dialog` | Modal with title, loading state, and footer |
| `Stepper` | Multi-step wizard (horizontal / vertical) |

### Templates

| Component | Description |
|-----------|-------------|
| `AuthLayout` | Single-column or split-panel auth layout |
| `DashboardLayout` | App shell with sidebar, top bar, content |

---

## Forms Integration

Requires: `react-hook-form`, `@hookform/resolvers`, `zod`

```bash
npm install react-hook-form @hookform/resolvers zod
```

```tsx
import {
  useAlchemyForm,
  ControlledTextField,
  ControlledSelect,
  ControlledCheckbox,
  ControlledSwitch,
  ControlledRadioGroup,
} from '@alchemy/ui/forms';
import { z } from 'zod';
import { Button } from '@alchemy/ui';

const schema = z.object({
  email: z.string().email('Invalid email'),
  role: z.string().min(1, 'Required'),
  agree: z.boolean(),
});

function RegistrationForm() {
  const { control, handleSubmit, formState } = useAlchemyForm({
    schema,
    defaultValues: { email: '', role: '', agree: false },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <ControlledTextField
        control={control}
        name="email"
        label="Email"
        fullWidth
      />
      <ControlledSelect
        control={control}
        name="role"
        label="Role"
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ]}
        fullWidth
      />
      <ControlledCheckbox
        control={control}
        name="agree"
      />
      <Button
        type="submit"
        variant="contained"
        loading={formState.isSubmitting}
      >
        Register
      </Button>
    </form>
  );
}
```

### useAlchemyForm

A thin wrapper over `useForm` with:
- `mode: "onTouched"` by default (validates on blur)
- Automatic `zodResolver` when a `schema` is provided

```ts
const form = useAlchemyForm({
  schema,               // optional zod schema
  defaultValues: { ... },
  mode: 'onChange',     // override validation mode
});
```

---

## Charts

Requires: `recharts`

```bash
npm install recharts
```

```tsx
import {
  AlchemyLineChart,
  AlchemyBarChart,
  AlchemyPieChart,
  AlchemyAreaChart,
  chartColors,
} from '@alchemy/ui/charts';
```

### AlchemyLineChart

```tsx
<AlchemyLineChart
  data={[
    { month: 'Jan', users: 100, revenue: 500 },
    { month: 'Feb', users: 150, revenue: 700 },
  ]}
  lines={[
    { dataKey: 'users', label: 'Users' },
    { dataKey: 'revenue', label: 'Revenue', color: '#00A8C0', dashed: true },
  ]}
  xAxisKey="month"
  title="Monthly Growth"
  height={300}
/>
```

### AlchemyBarChart

```tsx
<AlchemyBarChart
  data={salesData}
  bars={[
    { dataKey: 'q1', label: 'Q1', stackId: 'year' },
    { dataKey: 'q2', label: 'Q2', stackId: 'year' },
  ]}
  xAxisKey="region"
  title="Sales by Region"
  horizontal  // optional: renders horizontal bars
  yAxisFormatter={(v) => `$${v}k`}
/>
```

### AlchemyPieChart

```tsx
<AlchemyPieChart
  data={[
    { name: 'Mobile', value: 400 },
    { name: 'Desktop', value: 300 },
    { name: 'Tablet', value: 100, color: '#FF9800' },
  ]}
  title="Traffic Sources"
  donut  // optional: renders as donut chart
/>
```

### AlchemyAreaChart

```tsx
<AlchemyAreaChart
  data={trafficData}
  areas={[
    { dataKey: 'pageViews', label: 'Page Views' },
    { dataKey: 'sessions', label: 'Sessions', stacked: true },
  ]}
  xAxisKey="week"
  title="Weekly Traffic"
/>
```

### Chart colors

All charts use the Alchemy palette automatically, cycling through 10 colors:

```ts
import { chartColors, getChartColor } from '@alchemy/ui/charts';

chartColors[0]      // '#1F5FF2' — primary blue
chartColors[1]      // '#00A8C0' — secondary cyan
getChartColor(12)   // wraps around: chartColors[12 % 10]
```

---

## Multi-Brand Themes

Use `createAlchemyTheme` to generate a brand-specific theme that inherits all Alchemy defaults:

```ts
import { createAlchemyTheme } from '@alchemy/ui';

const acmeTheme = createAlchemyTheme({
  primary: '#E63946',
  secondary: '#457B9D',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 4,
});

// Use in provider
<AlchemyProvider theme={acmeTheme}>
  {children}
</AlchemyProvider>
```

### BrandTokens

| Property | Type | Description |
|----------|------|-------------|
| `primary` | `string` | Primary brand color (hex) |
| `secondary` | `string` | Secondary brand color (hex) |
| `fontFamily` | `string` | Font family string |
| `borderRadius` | `number` | Base border radius in px |
| `error` | `string` | Error color |
| `warning` | `string` | Warning color |
| `info` | `string` | Info color |
| `success` | `string` | Success color |
| `background.default` | `string` | Page background |
| `background.paper` | `string` | Surface/card background |
| `overrides` | `ThemeOptions` | Raw MUI ThemeOptions for advanced overrides |

All unspecified tokens inherit from `alchemyTheme`.

---

## Testing Utilities

Use the Alchemy testing helpers to render components with the correct theme:

```ts
// vitest / jest setup
import { renderWithTheme, screen, fireEvent } from '@alchemy/ui/testing';

it('shows button label', () => {
  renderWithTheme(<Button variant="contained">Save</Button>);
  expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
});
```

`@alchemy/ui/testing` re-exports everything from `@testing-library/react` with `render` pre-wrapped in `AlchemyProvider`.

Requires: `@testing-library/react`, `@testing-library/jest-dom`

---

## Next.js Setup

Add the provider to your root `layout.tsx`:

```tsx
// app/layout.tsx
import { AlchemyProvider } from '@alchemy/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AlchemyProvider>
          {children}
        </AlchemyProvider>
      </body>
    </html>
  );
}
```

Add Roboto via `next/font`:

```tsx
// app/layout.tsx
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      ...
    </html>
  );
}
```

---

## Storybook

Interactive component catalog with a11y checks and dark mode toggle:

```bash
pnpm run storybook
# Opens http://localhost:6006
```

Build static Storybook:

```bash
pnpm run build-storybook
# Output in storybook-static/
```

---

## Branching Strategy

This repository follows **GitFlow**:

```
main ←── release ←── develop ←── feature/your-feature
```

| Branch | Purpose |
|--------|---------|
| `main` | Production — always stable |
| `release` | Release candidate — triggers auto version bump |
| `develop` | Integration — all features merge here via PR |

### Conventional Commits

```bash
git commit -m "feat(Button): add loading state"
git commit -m "fix(DataTable): correct sort on re-render"
git commit -m "feat!: redesign token API"   # BREAKING CHANGE → major bump
```

---

## Contributing

1. Branch from `develop`: `git checkout -b feat/my-feature develop`
2. Write component + Storybook story + tests (coverage must stay at 100%)
3. Open a PR against `develop`

**Pre-commit:** lint + format check  
**Pre-push:** full test suite with 100% coverage enforcement

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run build` | Build all entry points (CJS + ESM + types) |
| `pnpm run dev` | Build in watch mode |
| `pnpm run test` | Run all tests |
| `pnpm run test:watch` | Interactive watch mode |
| `pnpm run test:coverage` | Tests + coverage report |
| `pnpm run test:ui` | Vitest UI in browser |
| `pnpm run storybook` | Start Storybook dev server |
| `pnpm run build-storybook` | Build static Storybook |
| `pnpm run type-check` | TypeScript type check |
| `pnpm run lint` | ESLint |
| `pnpm run clean` | Remove `dist/` |

---

## License

MIT © [Elementos Development](https://elementosdevelopment.com)
