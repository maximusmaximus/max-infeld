#!/usr/bin/env node
/**
 * Re-check each project URL and refresh lastUpdated from GitHub.
 *
 * Usage:
 *   node scripts/refresh-projects.mjs           # write updates to src/data/projects.json
 *   node scripts/refresh-projects.mjs --dry-run # report only
 *
 * Does not invent Grok Build publish dates, does not rewind a stored lastUpdated
 * that is newer than GitHub (so a known Grok Build date is kept), and never
 * rewrites dafontUpdates.
 */
import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { calendarDateInTimeZone, mergeLastUpdated } from "./project-dates.mjs";

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "src/data/projects.json");
const dryRun = process.argv.includes("--dry-run");
const UA = "maxi-refresh-projects/1.0 (https://maxi.grok.me/)";

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": UA },
    });
    // Some hosts (or CDNs) reject HEAD; fall back to a GET.
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": UA },
      });
    }
    return { ok: res.ok, status: res.status };
  } catch (error) {
    return { ok: false, status: 0, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

async function latestCommitIso(repo) {
  try {
    const { stdout } = await execFileAsync(
      "gh",
      ["api", `repos/${repo}/commits?per_page=1`, "--jq", ".[0].commit.committer.date // .[0].commit.author.date"],
      { timeout: 20_000 },
    );
    const iso = stdout.trim();
    return iso || null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // Fall back to the public API if gh is missing or unauthenticated.
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
        headers: {
          "user-agent": UA,
          accept: "application/vnd.github+json",
        },
      });
      if (!res.ok) {
        console.warn(`  ! GitHub ${repo}: HTTP ${res.status}${message.includes("gh") ? ` (gh: ${message.split("\n")[0]})` : ""}`);
        return null;
      }
      const [commit] = await res.json();
      return commit?.commit?.committer?.date ?? commit?.commit?.author?.date ?? null;
    } catch (fallbackError) {
      const fallback = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
      console.warn(`  ! GitHub ${repo}: ${fallback}`);
      return null;
    }
  }
}

function pad(value, width) {
  const text = String(value);
  return text.length >= width ? text : text + " ".repeat(width - text.length);
}

async function main() {
  const raw = await readFile(dataPath, "utf8");
  const data = JSON.parse(raw);
  const dafontSnapshot = JSON.stringify(data.dafontUpdates ?? null);
  const projects = data.projects ?? [];

  console.log(`Checking ${projects.length} projects…${dryRun ? " (dry run)" : ""}`);

  const rows = [];
  for (const project of projects) {
    const urlCheck = project.url ? await checkUrl(project.url) : { ok: false, status: 0, error: "missing url" };
    if (!urlCheck.ok) {
      console.warn(
        `  ! ${project.id} ${project.url ?? ""} → ${urlCheck.status || "error"}${urlCheck.error ? ` (${urlCheck.error})` : ""}`,
      );
    }

    let githubDate = null;
    if (project.repo) {
      const iso = await latestCommitIso(project.repo);
      githubDate = iso ? calendarDateInTimeZone(new Date(iso)) : null;
    }

    const nextUpdated = mergeLastUpdated(project.lastUpdated, githubDate);
    const changed = nextUpdated !== (project.lastUpdated ?? null);
    if (changed) project.lastUpdated = nextUpdated;

    rows.push({
      id: project.id,
      url: project.url,
      status: urlCheck.status || "err",
      ok: urlCheck.ok,
      lastUpdated: project.lastUpdated ?? "—",
      github: githubDate ?? "—",
      changed: changed ? "yes" : "",
    });
  }

  if (JSON.stringify(data.dafontUpdates ?? null) !== dafontSnapshot) {
    throw new Error("Internal error: dafontUpdates was mutated. Refusing to write.");
  }

  console.log("");
  console.log(
    `${pad("id", 14)} ${pad("status", 7)} ${pad("lastUpdated", 12)} ${pad("github", 12)} ${pad("wrote", 6)} url`,
  );
  for (const row of rows) {
    const mark = row.ok ? String(row.status) : `!${row.status}`;
    console.log(
      `${pad(row.id, 14)} ${pad(mark, 7)} ${pad(row.lastUpdated, 12)} ${pad(row.github, 12)} ${pad(row.changed, 6)} ${row.url}`,
    );
  }

  const failed = rows.filter((r) => !r.ok);
  const changed = rows.filter((r) => r.changed);

  if (!dryRun) {
    const next = `${JSON.stringify(data, null, 2)}\n`;
    if (next !== raw) {
      await writeFile(dataPath, next);
      console.log(`\nWrote ${dataPath} (${changed.length} lastUpdated change${changed.length === 1 ? "" : "s"}).`);
    } else {
      console.log(`\nNo lastUpdated changes. ${dataPath} left as-is.`);
    }
  } else if (changed.length) {
    console.log(`\nDry run: ${changed.length} lastUpdated value(s) would change.`);
  } else {
    console.log("\nDry run: no lastUpdated changes.");
  }

  if (failed.length) {
    console.warn(`\nWarning: ${failed.length} URL(s) failed the live check. Projects were not removed.`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
});
