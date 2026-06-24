import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",     // new feature → minor bump
        "fix",      // bug fix → patch bump
        "docs",     // documentation only
        "style",    // formatting, no logic change
        "refactor", // refactoring, no feature/fix
        "perf",     // performance improvement → patch bump
        "test",     // adding/fixing tests
        "build",    // build system or dependency changes
        "ci",       // CI/CD changes
        "chore",    // other changes (no src/test)
        "revert",   // revert a previous commit
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
  },
};

export default config;
