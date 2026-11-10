import { ArrowUpRight } from "lucide-react";
import { McclawBanner } from "@/components/mcclaw-banner";
import { Badge } from "@/components/ui/badge";
import {
  PROJECT_SECTIONS,
  type Project,
  type ProjectSectionId,
  getProject,
  isRecentlyUpdated,
  projectsByIds,
  projectsInSection,
} from "@/lib/projects";
import { FitText } from "@/components/fit-text";
import { DisplayTitle } from "@/components/display-title";
import { displayFontClass, cn } from "@/lib/utils";

function RecentBadge({ lastUpdated, light }: { lastUpdated?: string; light?: boolean }) {
  if (!isRecentlyUpdated(lastUpdated)) return null;
  return (
    <Badge
      className={
        light
          ? "border-white/20 bg-white text-black"
          : "border-border bg-accent text-accent-fg"
      }
    >
      Recently updated
    </Badge>
  );
}

export function ProjectCard({ project, framed }: { project: Project; framed?: boolean }) {
  if (project.custom === "mcclaw") {
    return <McclawBanner framed={framed} badge={<RecentBadge lastUpdated={project.lastUpdated} light />} />;
  }

  const host = project.url.replace(/^https:\/\//, "").replace(/\/$/, "");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      data-project-banner={project.id}
      className={cn(
        "group relative block overflow-hidden bg-black",
        framed ? "rounded-xl border border-border" : "border-t border-border",
      )}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[16/10] h-auto w-full max-w-full object-cover sm:aspect-[21/9] lg:aspect-[21/8]"
          width={1200}
          height={630}
        />
      ) : (
        <span className="block aspect-[16/10] w-full bg-raised sm:aspect-[21/9] lg:aspect-[21/8]" />
      )}
      <span className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
      <span className="@container absolute inset-0 flex flex-col justify-end gap-1.5 px-4 py-4 sm:gap-2 sm:px-8 sm:py-10">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">
            {project.kicker}
          </span>
          <RecentBadge lastUpdated={project.lastUpdated} light />
        </span>
        <FitText
          as="span"
          className={cn(
            "max-w-xl text-[clamp(1.25rem,6cqi,var(--text-3xl))] tracking-tight text-white",
            displayFontClass(project.title),
          )}
        >
          {project.title}
        </FitText>
        <span className="line-clamp-2 max-w-xl text-sm font-semibold text-white/90 sm:line-clamp-3 sm:text-base">
          {project.description}
        </span>
        {project.cta ? (
          <span className="mt-2 inline-flex min-h-11 items-center self-start rounded-md bg-accent px-4 text-sm font-semibold text-accent-fg">
            {project.cta}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-white/80">
            {host}
            <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </span>
    </a>
  );
}

export function ProjectBanners({
  section,
  ids,
  framed,
  includeCustom = true,
}: {
  section?: ProjectSectionId;
  ids?: string[];
  framed?: boolean;
  includeCustom?: boolean;
}) {
  const works = ids
    ? projectsByIds(ids)
    : section
      ? projectsInSection(section, { includeCustom })
      : PROJECT_SECTIONS.flatMap((s) => projectsInSection(s.id, { includeCustom }));

  if (works.length === 0) return null;

  return (
    <div className={framed ? "space-y-3 sm:space-y-6" : ""}>
      {works.map((project) => (
        <ProjectCard key={project.id} project={project} framed={framed} />
      ))}
    </div>
  );
}

export function ProjectSections({
  framed,
  includeCustom = true,
  hideSections = ["fonts-type"],
}: {
  framed?: boolean;
  includeCustom?: boolean;
  hideSections?: ProjectSectionId[];
}) {
  const hidden = new Set(hideSections);
  const sections = PROJECT_SECTIONS.filter((section) => !hidden.has(section.id)).filter(
    (section) => projectsInSection(section.id, { includeCustom }).length > 0,
  );

  return (
    <div>
      {sections.map((section) => {
        const works = projectsInSection(section.id, { includeCustom });
        return (
          <section key={section.id}>
            <div className={cn("mx-auto max-w-6xl px-4 pt-6 pb-2 sm:px-6 sm:pt-12 sm:pb-4", framed && "px-0")}>
              <p className="font-mono text-xs uppercase tracking-wider text-subtle">{section.kicker}</p>
              <DisplayTitle className="mt-2 text-2xl tracking-tight sm:text-3xl">{section.title}</DisplayTitle>
            </div>
            <div className={framed ? "space-y-3 sm:space-y-6" : ""}>
              {works.map((project) => (
                <ProjectCard key={project.id} project={project} framed={framed} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function ProjectBanner({ id, framed }: { id: string; framed?: boolean }) {
  const project = getProject(id);
  if (!project) return null;
  return <ProjectCard project={project} framed={framed} />;
}
