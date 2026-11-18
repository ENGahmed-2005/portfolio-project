import { notFound } from "next/navigation";
import { CaseStudy } from "./Portfolio";
import { isProjectSlug, projectSlugs, type Language } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";

export type ProjectParams = { params: Promise<{ slug: string }> };
export const staticProjects = () => projectSlugs.map((slug) => ({ slug }));

async function resolveSlug(props: ProjectParams) {
  const { slug } = await props.params;
  if (!isProjectSlug(slug)) notFound();
  return slug;
}

export async function caseMetadata(lang: Language, props: ProjectParams) {
  return pageMetadata(lang, await resolveSlug(props));
}

export async function casePage(lang: Language, props: ProjectParams) {
  return <CaseStudy lang={lang} slug={await resolveSlug(props)} />;
}
