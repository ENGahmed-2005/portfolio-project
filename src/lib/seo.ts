import type { Metadata, MetadataRoute } from "next";
import { copy, isProjectSlug, pagePath, profiles, projects, projectSlugs, sectionSlugs, type Language, type PageSlug } from "./portfolio";
import { sections, stops, stopName } from "./sections";

export const siteOrigin = new URL(process.env.SITE_URL || "https://ahmed-kahlout-portfolio.vercel.app").origin;
export const indexable = process.env.VERCEL_ENV !== "preview";
export const absolute = (path: string) => new URL(path, siteOrigin).href;

function languageUrls(slug?: PageSlug) {
  return { en: absolute(pagePath("en", slug)), ar: absolute(pagePath("ar", slug)), "x-default": absolute(pagePath("en", slug)) };
}

export function pageMetadata(lang: Language, slug?: PageSlug): Metadata {
  const c = copy[lang];
  const project = slug && isProjectSlug(slug) ? projects[slug][lang] : undefined;
  const section = slug && !isProjectSlug(slug) ? sections[slug][lang] : undefined;
  const title = section ? section.name + " | " + c.name : project ? [project.name, project.field, c.name].join(" | ") : c.title;
  const description = section?.description ?? project?.summary ?? c.description;
  const url = absolute(pagePath(lang, slug));
  const siteName = lang === "en" ? "Ahmed Kahlout · Portfolio" : "أحمد الكحلوت · معرض الأعمال";
  const image = {
    url: absolute("/social/" + (slug || "home") + "-" + lang + ".jpg"),
    width: 1200, height: 630, type: "image/jpeg", alt: section?.name ?? (project ? project.name + " · " + project.field : c.name + " · " + c.role),
  };

  return {
    metadataBase: new URL(siteOrigin), title, description, authors: [{ name: c.name }],
    alternates: { canonical: url, languages: languageUrls(slug) },
    robots: { index: indexable, follow: indexable, googleBot: { index: indexable, follow: indexable, "max-image-preview": "large", "max-snippet": -1 } },
    icons: { icon: { url: "/icon.svg", type: "image/svg+xml" } },
    openGraph: {
      type: project ? "article" : "website", title, description, url, siteName,
      locale: lang === "en" ? "en_US" : "ar_PS", alternateLocale: lang === "en" ? "ar_PS" : "en_US", images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
  };
}

export function siteMap(): MetadataRoute.Sitemap {
  const routes: (PageSlug | undefined)[] = [undefined, ...projectSlugs, ...sectionSlugs];
  return routes.flatMap((slug) => (["en", "ar"] as const).map((lang) => ({
    url: absolute(pagePath(lang, slug)), alternates: { languages: languageUrls(slug) },
  })));
}

export function structuredData(lang: Language, slug?: PageSlug) {
  const c = copy[lang];
  const home = absolute(pagePath(lang));
  const person = {
    "@type": "Person", "@id": absolute("/#person"), name: c.name,
    alternateName: ["Ahmed Kahlout", "Ahmed Alkahlout", "أحمد الكحلوت"],
    url: home, jobTitle: c.role, sameAs: Object.values(profiles), image: absolute("/media/ahmed.webp"),
  };
  if (!slug) {
    return { "@context": "https://schema.org", "@type": "ProfilePage", url: home, inLanguage: lang, name: c.title, mainEntity: person };
  }
  const url = absolute(pagePath(lang, slug));
  if (!isProjectSlug(slug)) {
    const section = sections[slug][lang];
    return {
      "@context": "https://schema.org", "@type": slug === "experience" ? "AboutPage" : slug === "explore" ? "CollectionPage" : "WebPage",
      url, inLanguage: lang, name: section.name, description: section.description, author: person,
      ...(slug === "explore" && { hasPart: stops.map(({ id }) => ({ "@type": "WebPage", url: absolute(pagePath(lang, id)), name: stopName(lang, id) })) }),
    };
  }
  const p = projects[slug][lang];
  return {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": url, name: p.name, description: p.summary, inLanguage: lang,
        breadcrumb: { "@id": url + "#breadcrumbs" },
        mainEntity: { "@type": "CreativeWork", name: p.name, description: p.summary, contributor: person, image: absolute("/media/" + projects[slug].images[0]) } },
      { "@type": "BreadcrumbList", "@id": url + "#breadcrumbs", itemListElement: [
        { "@type": "ListItem", position: 1, name: c.name, item: home },
        { "@type": "ListItem", position: 2, name: p.name, item: url },
      ] },
    ],
  };
}
