#!/bin/sh
# Determines the semver bump type from conventional commits since the last tag.
# Outputs: major | minor | patch
#
# Rules (Conventional Commits spec):
#   BREAKING CHANGE in body, or type! (e.g. feat!, fix!) → major
#   feat: or feat(scope):                                 → minor
#   everything else                                       → patch

set -e

LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

if [ -z "$LAST_TAG" ]; then
  RANGE="HEAD"
else
  RANGE="${LAST_TAG}..HEAD"
fi

# Collect full commit messages (subject + body)
COMMITS=$(git log "$RANGE" --format="%s%n%b" 2>/dev/null || echo "")

if [ -z "$COMMITS" ]; then
  echo "patch"
  exit 0
fi

# Check for breaking changes (major)
if echo "$COMMITS" | grep -qE "(BREAKING CHANGE|^[a-z]+(\([^)]+\))?!:)"; then
  echo "major"
  exit 0
fi

# Check for new features (minor)
if echo "$COMMITS" | grep -qE "^feat(\([^)]+\))?:"; then
  echo "minor"
  exit 0
fi

# Default: patch
echo "patch"
