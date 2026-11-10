import { ProjectBanners } from "@/components/project-banners";

/** @deprecated Prefer ProjectBanners / ProjectSections. Kept for existing page call sites. */
export function GrokWorksBanners({
  framed,
  ids,
}: {
  framed?: boolean;
  ids?: string[];
}) {
  return (
    <ProjectBanners
      ids={ids}
      section={ids ? undefined : "art-interactive"}
      framed={framed}
      includeCustom={false}
    />
  );
}
