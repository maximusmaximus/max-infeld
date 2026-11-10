import data from "@/data/projects.json";

export const RECENT_WINDOW_DAYS = 7;
export const PROJECT_TIME_ZONE = "America/Los_Angeles";

export type ProjectSectionId = "art-interactive" | "tools-agents" | "fonts-type" | "other-sites";

export type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  section: ProjectSectionId;
  kicker: string;
  image?: string;
  cta?: string;
  lastUpdated?: string;
  repo?: string;
  custom?: string;
};

export type ProjectSection = {
  id: ProjectSectionId;
  title: string;
  kicker: string;
};

export type DafontUpdate = {
  name: string;
  slug: string;
  url: string;
  published: string;
};

export const PROJECT_SECTIONS = data.sections as ProjectSection[];
export const PROJECTS = data.projects as Project[];
export const DAFONT_UPDATES = data.dafontUpdates as DafontUpdate[];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function projectsInSection(section: ProjectSectionId, options?: { includeCustom?: boolean }): Project[] {
  const includeCustom = options?.includeCustom ?? true;
  return PROJECTS.filter((p) => p.section === section && (includeCustom || !p.custom));
}

export function projectsByIds(ids: string[]): Project[] {
  return ids.map((id) => getProject(id)).filter((p): p is Project => Boolean(p));
}

/** Calendar date (YYYY-MM-DD) in the given IANA time zone. */
export function calendarDateInTimeZone(date: Date, timeZone = PROJECT_TIME_ZONE): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function utcMsForDate(isoDate: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate);
  if (!match) return Number.NaN;
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

/**
 * True when lastUpdated is on or after (today in PT minus 7 calendar days).
 * Computed at render time so the badge ages out without a rebuild of the dates.
 */
export function isRecentlyUpdated(lastUpdated: string | undefined, now = new Date()): boolean {
  if (!lastUpdated) return false;
  const updated = utcMsForDate(lastUpdated);
  if (Number.isNaN(updated)) return false;
  const today = utcMsForDate(calendarDateInTimeZone(now));
  const diffDays = Math.round((today - updated) / 86_400_000);
  return diffDays >= 0 && diffDays <= RECENT_WINDOW_DAYS;
}

export function recentDafontUpdates(now = new Date()): DafontUpdate[] {
  return DAFONT_UPDATES.filter((font) => isRecentlyUpdated(font.published, now)).sort((a, b) =>
    a.published === b.published ? a.name.localeCompare(b.name) : b.published.localeCompare(a.published),
  );
}

export function formatDafontRange(updates: DafontUpdate[]): string | null {
  if (updates.length === 0) return null;
  const dates = [...new Set(updates.map((u) => u.published))].sort();
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" }).format(
      new Date(`${iso}T00:00:00Z`),
    );
  if (dates.length === 1) return fmt(dates[0]!);
  const first = new Date(`${dates[0]}T00:00:00Z`);
  const last = new Date(`${dates[dates.length - 1]}T00:00:00Z`);
  const sameMonth = first.getUTCMonth() === last.getUTCMonth() && first.getUTCFullYear() === last.getUTCFullYear();
  if (sameMonth) {
    const month = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(first);
    return `${month} ${first.getUTCDate()}–${last.getUTCDate()}`;
  }
  return `${fmt(dates[0]!)}–${fmt(dates[dates.length - 1]!)}`;
}
