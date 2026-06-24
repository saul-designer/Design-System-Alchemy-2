export interface ChangelogSubsection {
  title: string;
  items: string[];
}

export interface ChangelogSection {
  type: string;
  items: string[];
  subsections: ChangelogSubsection[];
}

export interface ChangelogRelease {
  version: string;
  date?: string;
  sections: ChangelogSection[];
}

const RELEASE_HEADING = /^## \[(.+?)\](?:\s*[—-]\s*(.+))?$/;
const SECTION_HEADING = /^### (.+)$/;
const SUBSECTION_HEADING = /^#### (.+)$/;
const LIST_ITEM = /^- (.+)$/;

function createSection(type: string): ChangelogSection {
  return { type, items: [], subsections: [] };
}

export function parseChangelog(markdown: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  let currentRelease: ChangelogRelease | null = null;
  let currentSection: ChangelogSection | null = null;
  let currentSubsection: ChangelogSubsection | null = null;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trimEnd();

    if (!line.trim() || line.trim() === "---") {
      continue;
    }

    const releaseMatch = line.match(RELEASE_HEADING);
    if (releaseMatch) {
      currentRelease = {
        version: releaseMatch[1].trim(),
        date: releaseMatch[2]?.trim(),
        sections: [],
      };
      releases.push(currentRelease);
      currentSection = null;
      currentSubsection = null;
      continue;
    }

    const sectionMatch = line.match(SECTION_HEADING);
    if (sectionMatch && currentRelease) {
      currentSection = createSection(sectionMatch[1].trim());
      currentRelease.sections.push(currentSection);
      currentSubsection = null;
      continue;
    }

    const subsectionMatch = line.match(SUBSECTION_HEADING);
    if (subsectionMatch && currentSection) {
      currentSubsection = { title: subsectionMatch[1].trim(), items: [] };
      currentSection.subsections.push(currentSubsection);
      continue;
    }

    const itemMatch = line.match(LIST_ITEM);
    if (!itemMatch) {
      continue;
    }

    const item = itemMatch[1].trim();
    if (currentSubsection) {
      currentSubsection.items.push(item);
      continue;
    }
    if (currentSection) {
      currentSection.items.push(item);
    }
  }

  return releases;
}
