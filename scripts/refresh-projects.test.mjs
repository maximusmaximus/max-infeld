import assert from "node:assert/strict";
import test from "node:test";
import { calendarDateInTimeZone, isRecentlyUpdated, mergeLastUpdated, newestCalendarDate } from "./project-dates.mjs";

test("calendarDateInTimeZone uses America/Los_Angeles, not UTC", () => {
  // 2026-11-10 07:39:09 UTC is still Nov 9 in PT (UTC-8).
  const iso = new Date("2026-11-10T07:39:09Z");
  assert.equal(calendarDateInTimeZone(iso), "2026-11-09");
  assert.equal(calendarDateInTimeZone(new Date("2026-11-10T19:22:45Z")), "2026-11-10");
});

test("mergeLastUpdated never rewinds a stored Grok Build or prior date", () => {
  assert.equal(mergeLastUpdated("2026-11-10", "2026-11-01"), "2026-11-10");
  assert.equal(mergeLastUpdated("2026-10-20", "2026-11-10"), "2026-11-10");
  assert.equal(mergeLastUpdated(undefined, "2026-11-05"), "2026-11-05");
  assert.equal(mergeLastUpdated("2026-11-05", null), "2026-11-05");
});

test("newestCalendarDate accepts ISO timestamps and YYYY-MM-DD", () => {
  assert.equal(newestCalendarDate(["2026-11-03", "2026-11-09T02:38:00Z"]), "2026-11-08");
  assert.equal(newestCalendarDate(["2026-11-09T18:38:00Z", "2026-11-08"]), "2026-11-09");
});

test("isRecentlyUpdated is a 7-day inclusive PT window computed at call time", () => {
  const now = new Date("2026-11-10T19:30:00Z"); // 11:30 AM PT on Nov 10
  assert.equal(isRecentlyUpdated("2026-11-10", now), true);
  assert.equal(isRecentlyUpdated("2026-11-03", now), true);
  assert.equal(isRecentlyUpdated("2026-11-02", now), false);
  assert.equal(isRecentlyUpdated("2026-11-11", now), false);
  assert.equal(isRecentlyUpdated(undefined, now), false);
});
