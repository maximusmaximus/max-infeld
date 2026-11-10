/** Shared date helpers for project lastUpdated values (America/Los_Angeles calendar dates). */

export const PROJECT_TIME_ZONE = "America/Los_Angeles";
export const RECENT_WINDOW_DAYS = 7;

export function calendarDateInTimeZone(date, timeZone = PROJECT_TIME_ZONE) {
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

/** Newest of ISO timestamps / YYYY-MM-DD strings, returned as a PT calendar date. */
export function newestCalendarDate(values, timeZone = PROJECT_TIME_ZONE) {
  const dates = values
    .filter(Boolean)
    .map((value) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return null;
      return calendarDateInTimeZone(parsed, timeZone);
    })
    .filter(Boolean)
    .sort();
  return dates.at(-1) ?? null;
}

/**
 * Choose a stored lastUpdated. GitHub (or any newly observed source) may advance
 * the date, but never rewind a previously recorded value (e.g. a known Grok Build
 * publish date that is newer than the latest git commit).
 */
export function mergeLastUpdated(existing, observed) {
  return newestCalendarDate([existing, observed]);
}

export function isRecentlyUpdated(lastUpdated, now = new Date()) {
  if (!lastUpdated) return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(lastUpdated);
  if (!match) return false;
  const updated = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const todayParts = calendarDateInTimeZone(now).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const today = Date.UTC(Number(todayParts[1]), Number(todayParts[2]) - 1, Number(todayParts[3]));
  const diffDays = Math.round((today - updated) / 86_400_000);
  return diffDays >= 0 && diffDays <= RECENT_WINDOW_DAYS;
}
