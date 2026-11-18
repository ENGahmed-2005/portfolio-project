import type { Metadata, MetadataRoute } from "next";
import { copy, isProjectSlug, pagePath, profiles, projects, projectSlugs, sectionSlugs, type Language, type PageSlug, type ProjectSlug, type SectionSlug } from "./portfolio";
import { sections, stops, stopName } from "./sections";

export const siteOrigin = new URL(process.env.SITE_URL || "https://ahmed-kahlout-portfolio.vercel.app").origin;
export const indexable = process.env.VERCEL_ENV !== "preview";
export const absolute = (path: string) => new URL(path, siteOrigin).href;

const projectSeoTitles: Record<ProjectSlug, Record<Language, string>> = {
  menupilot: {
    en: "MenuPilot | React Restaurant Dashboard Case Study | Ahmed Kahlout",
    ar: "MenuPilot | دراسة حالة لوحة مطعم بـ React | أحمد الكحلوت",
  },
  khotwa: {
    en: "Khotwa | Educational App Case Study | Ahmed Kahlout",
    ar: "خطوة | دراسة حالة تطبيق تعليمي | أحمد الكحلوت",
  },
  rukza: {
    en: "Rukza | React Productivity Tool Case Study | Ahmed Kahlout",
    ar: "رُكزة | دراسة حالة أداة إنتاجية بـ React | أحمد الكحلوت",
  },
};

const sectionSeoTitles: Record<SectionSlug, Record<Language, string>> = {
  explore: {
    en: "Interactive Portfolio Map | Ahmed Kahlout",
    ar: "خريطة معرض الأعمال التفاعلية | أحمد الكحلوت",
  },
  process: {
    en: "Bilingual UI Design Process | Ahmed Kahlout",
    ar: "تصميم واجهات ثنائية اللغة | أحمد الكحلوت",
  },
  experience: {
    en: "Frontend Experience & Education | Ahmed Kahlout",
    ar: "الخبرة والدراسة في تطوير الواجهات | أحمد الكحلوت",
  },
};

const projectSeoDescriptions: Record<ProjectSlug, Record<Language, string>> = {
  menupilot: {
    en: "See how Ahmed Kahlout led frontend work on MenuPilot, a React restaurant product with a QR menu, responsive ordering flow, and Arabic staff dashboard.",
    ar: "تعرّف إلى دور أحمد الكحلوت في قيادة واجهات MenuPilot، وهو منتج مطاعم مبني بـ React يجمع قائمة QR وتدفق طلب متجاوب ولوحة تحكم عربية للموظفين.",
  },
  khotwa: {
    en: "Explore Khotwa, an Arabic educational app prototype for academic assessment, individual support planning, and mobile-first specialist workflows.",
    ar: "استكشف «خطوة»، وهو نموذج أولي لتطبيق تعليمي عربي للتقييم الأكاديمي والتخطيط للدعم الفردي وتجربة أخصائي مصممة للهاتف.",
  },
  rukza: {
    en: "Explore Rukza, a React and TypeScript productivity tool for study focus, bilingual sessions, and a Chrome extension that helps users return to their task.",
    ar: "استكشف «رُكزة»، وهي أداة إنتاجية مبنية بـ React وTypeScript لجلسات التركيز الثنائية وإضافة Chrome تساعد المستخدم على العودة إلى مهمته.",
  },
};

function languageUrls(slug?: PageSlug) {
  return { en: absolute(pagePath("en", slug)), ar: absolute(pagePath("ar", slug)), "x-default": absolute(pagePath("en", slug)) };
}

function seoTitle(lang: Language, slug?: PageSlug) {
  if (!slug) return copy[lang].title;
  return isProjectSlug(slug) ? projectSeoTitles[slug][lang] : sectionSeoTitles[slug][lang];
}

function seoDescription(lang: Language, slug?: PageSlug) {
  if (!slug) return copy[lang].description;
  return isProjectSlug(slug) ? projectSeoDescriptions[slug][lang] : sections[slug][lang].description;
}

export function pageMetadata(lang: Language, slug?: PageSlug): Metadata {
  const c = copy[lang];
  const project = slug && isProjectSlug(slug) ? projects[slug][lang] : undefined;
  const section = slug && !isProjectSlug(slug) ? sections[slug][lang] : undefined;
  const title = seoTitle(lang, slug);
  const description = seoDescription(lang, slug);
  const url = absolute(pagePath(lang, slug));
  const siteName = lang === "en" ? "Ahmed Kahlout · React & Next.js Portfolio" : "أحمد الكحلوت · معرض أعمال React وNext.js";
  const image = {
    url: absolute("/social/" + (slug || "home") + "-" + lang + ".jpg"),
    width: 1200, height: 630, type: "image/jpeg",
    alt: section?.name ?? (project ? project.name + " · " + project.field : c.name + " · " + c.role),
  };

  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    authors: [{ name: c.name }],
    creator: c.name,
    alternates: { canonical: url, languages: languageUrls(slug) },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable, "max-image-preview": "large", "max-snippet": -1 },
    },
    icons: { icon: { url: "/icon.svg", type: "image/svg+xml" } },
    openGraph: {
      type: project ? "article" : "website",
      title,
      description,
      url,
      siteName,
      locale: lang === "en" ? "en_US" : "ar_PS",
      alternateLocale: lang === "en" ? "ar_PS" : "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
  };
}

export function siteMap(): MetadataRoute.Sitemap {
  const routes: (PageSlug | undefined)[] = [undefined, ...projectSlugs, ...sectionSlugs];
  return routes.flatMap((slug) => (["en", "ar"] as const).map((lang) => ({
    url: absolute(pagePath(lang, slug)),
    alternates: { languages: languageUrls(slug) },
    changeFrequency: "monthly" as const,
    priority: slug ? (isProjectSlug(slug) ? 0.8 : 0.7) : 1,
  })));
}

export function structuredData(lang: Language, slug?: PageSlug) {
  const c = copy[lang];
  const home = absolute(pagePath(lang));
  const person = {
    "@type": "Person",
    "@id": absolute("/#person"),
    name: c.name,
    alternateName: ["Ahmed Kahlout", "Ahmed Alkahlout", "أحمد الكحلوت"],
    url: home,
    jobTitle: c.role,
    description: c.description,
    sameAs: Object.values(profiles),
    image: absolute("/media/ahmed.webp"),
    knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Frontend Development", "Responsive Web Design", "Dashboards", "Landing Pages", "RTL Interfaces"],
    knowsLanguage: ["Arabic", "English"],
  };

  if (!slug) {
    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": home + "#profile",
      url: home,
      inLanguage: lang,
      name: c.title,
      description: c.description,
      mainEntity: person,
    };
  }

  const url = absolute(pagePath(lang, slug));
  if (!isProjectSlug(slug)) {
    const section = sections[slug][lang];
    return {
      "@context": "https://schema.org",
      "@type": slug === "experience" ? "AboutPage" : slug === "explore" ? "CollectionPage" : "WebPage",
      "@id": url,
      url,
      inLanguage: lang,
      name: seoTitle(lang, slug),
      description: seoDescription(lang, slug),
      author: person,
      ...(slug === "explore" && {
        hasPart: stops.map(({ id }) => ({
          "@type": "WebPage",
          url: absolute(pagePath(lang, id)),
          name: stopName(lang, id),
        })),
      }),
    };
  }

  const p = projects[slug][lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: seoTitle(lang, slug),
        description: seoDescription(lang, slug),
        inLanguage: lang,
        breadcrumb: { "@id": url + "#breadcrumbs" },
        mainEntity: {
          "@type": "CreativeWork",
          "@id": url + "#project",
          name: p.name,
          description: p.summary,
          url,
          inLanguage: lang,
          contributor: person,
          keywords: projects[slug].tools.join(", "),
          image: projects[slug].images.map((file) => absolute("/media/" + file)),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": url + "#breadcrumbs",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.name, item: home },
          { "@type": "ListItem", position: 2, name: p.name, item: url },
        ],
      },
    ],
  };
}
