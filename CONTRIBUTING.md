# Contributing to @alchemy/ui

Thank you for contributing to the Alchemy UI component library. This guide covers everything you need to get started.

## Table of Contents

- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Atomic Design Structure](#atomic-design-structure)
- [Creating a New Component](#creating-a-new-component)
- [Testing Requirements](#testing-requirements)
- [Storybook Documentation](#storybook-documentation)
- [Commit Convention](#commit-convention)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

---

## Development Setup

```bash
# 1. Clone and install
git clone https://github.com/elementosdevelopment/alchemy-ui.git
cd alchemy-ui
corepack enable
pnpm install

# 2. Start Storybook
pnpm run storybook

# 3. Run tests in watch mode
pnpm run test:watch
```

Node.js **22+** is required.

---

## Branching Strategy

```
main ←── release ←── develop ←── feature/your-feature
```

- Always branch from `develop`
- Open PRs against `develop` only
- Direct pushes to `main` and `release` are blocked by the pre-push hook

```bash
git checkout develop
git pull origin develop
git checkout -b feat/my-new-component
```

---

## Atomic Design Structure

Place new components in the correct layer:

| Layer | Location | Rule |
|-------|----------|------|
| **Atom** | `src/atoms/` | Indivisible UI primitives (no business logic) |
| **Molecule** | `src/molecules/` | Composed of atoms; a single cohesive function |
| **Organism** | `src/organisms/` | Complex, self-contained UI sections |
| **Template** | `src/templates/` | Page-level layout shells |

When in doubt, keep it as small as possible. Prefer atoms over molecules.

---

## Creating a New Component

Each component lives in its own folder with four files:

```
src/atoms/MyComponent/
├── MyComponent.tsx        # Component implementation
├── MyComponent.test.tsx   # Unit tests (coverage must reach 100%)
├── MyComponent.stories.tsx # Storybook stories
└── index.ts               # Re-exports
```

### Step-by-step

1. **Create the folder and files** following the structure above.

2. **Implement the component** with TypeScript, `forwardRef`, and exported props interface:

```tsx
import React from "react";

export interface MyComponentProps {
  label: string;
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ label }, ref) => {
    return <div ref={ref}>{label}</div>;
  }
);

MyComponent.displayName = "MyComponent";
```

3. **Export from the layer index** (e.g. `src/atoms/MyComponent/index.ts`):

```ts
export { MyComponent } from "./MyComponent";
export type { MyComponentProps } from "./MyComponent";
```

4. **Add to the main barrel** (`src/index.ts`):

```ts
export { MyComponent } from "./atoms/MyComponent";
export type { MyComponentProps } from "./atoms/MyComponent";
```

5. **Write tests** — see [Testing Requirements](#testing-requirements).

6. **Write Storybook stories** — see [Storybook Documentation](#storybook-documentation).

---

## Testing Requirements

- Framework: **Vitest** + **Testing Library**
- Coverage threshold: **100%** (lines, functions, branches, statements)
- Tests run automatically before every commit (Husky pre-commit hook)

```bash
pnpm run test:coverage   # run once with coverage report
pnpm run test:watch      # interactive watch mode
```

### Test file template

```tsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders label", () => {
    render(<MyComponent label="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

Use `../../test/render` (not `@testing-library/react` render directly) — it wraps the component with `AlchemyProvider` and the theme.

---

## Storybook Documentation

Every component must have stories covering all documented variants:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "Atoms/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: { label: "Default label" },
};
```

Required variants to document:
- `Default` — base state
- Loading / Disabled / Error states (if applicable)
- All significant prop combinations

---

## Commit Convention

This repository follows [Conventional Commits](https://www.conventionalcommits.org/). Commit messages are validated by **commitlint** on every commit.

```
<type>(<scope>): <description>
```

| Type | Use for | Version bump |
|------|---------|-------------|
| `feat` | New component or feature | minor |
| `fix` | Bug fix | patch |
| `perf` | Performance improvement | patch |
| `refactor` | Refactoring, no behavior change | none |
| `docs` | Documentation only | none |
| `style` | Formatting changes | none |
| `test` | Test additions or fixes | none |
| `build` | Build system or dependency changes | none |
| `ci` | CI/CD changes | none |
| `chore` | Other maintenance | none |
| `revert` | Revert a previous commit | none |

**Breaking changes:** append `!` or add `BREAKING CHANGE:` in the footer → **major** bump.

```bash
# Examples
git commit -m "feat(Select): add multi-select support"
git commit -m "fix(DataTable): correct pagination on empty dataset"
git commit -m "feat!: redesign theme token API"
```

---

## Code Style

- **Prettier** formats code automatically (`.prettierrc`)
- **ESLint** enforces rules (`eslint.config.mjs`)
- **TypeScript** strict mode — no `any`

```bash
pnpm run format        # format all source files
pnpm run format:check  # check formatting without writing
pnpm run lint          # run ESLint
pnpm run type-check    # TypeScript type check
```

### Key rules

- No hardcoded colors or sizes — use theme tokens
- Button border radius: `24px` | Input border radius: `16px` | Card: `16px`
- Use `forwardRef` on every component
- Export the props interface from the component file
- No `console.log` in production code

---

## Pull Request Process

1. Ensure all checks pass locally:
   ```bash
   pnpm run type-check
   pnpm run lint
   pnpm run test:coverage
   pnpm run build
   ```

2. Open a PR against `develop` using the [PR template](.github/PULL_REQUEST_TEMPLATE.md).

3. At least one approval is required before merging.

4. Squash-merge preferred for feature branches.

---

## Repository Setup (for maintainers)

Before the `release.yml` workflow can publish to npm, you must add the following secret to the GitHub repository settings (`Settings → Secrets and variables → Actions`):

| Secret | Description |
|--------|-------------|
| `NPM_TOKEN` | npm access token with publish rights for the `@alchemy` scope |

---

## Questions?

Open an issue or reach out at [lester@elementosdevelopment.com](mailto:lester@elementosdevelopment.com).
