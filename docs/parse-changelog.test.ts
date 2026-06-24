import { describe, it, expect } from "vitest";
import { parseChangelog } from "./parse-changelog";

const SAMPLE = `# Changelog

## [Unreleased]

### Fixed

- First fix

## [0.1.41] — 2026-06-21

### Added

#### Atoms
- \`Button\` — loading state

### Infrastructure
- Storybook changelog page

## [0.1.0] — 2026-01-01

### Added
- Initial release
`;

describe("parseChangelog", () => {
  it("parses releases in file order", () => {
    const releases = parseChangelog(SAMPLE);

    expect(releases).toHaveLength(3);
    expect(releases[0].version).toBe("Unreleased");
    expect(releases[1].version).toBe("0.1.41");
    expect(releases[1].date).toBe("2026-06-21");
    expect(releases[2].version).toBe("0.1.0");
  });

  it("parses section items and nested subsections", () => {
    const release = parseChangelog(SAMPLE).find((entry) => entry.version === "0.1.41");
    expect(release?.sections).toHaveLength(2);

    const added = release?.sections.find((section) => section.type === "Added");
    expect(added?.subsections).toHaveLength(1);
    expect(added?.subsections[0].title).toBe("Atoms");
    expect(added?.subsections[0].items[0]).toContain("Button");

    const infrastructure = release?.sections.find(
      (section) => section.type === "Infrastructure"
    );
    expect(infrastructure?.items[0]).toContain("Storybook changelog page");
  });
});
