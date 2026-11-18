import Image from "next/image";
import { copy, cvPath, email, otherLanguage, pagePath, profiles, projects, projectSlugs, type Language, type PageSlug, type ProjectSlug } from "@/lib/portfolio";
import { structuredData } from "@/lib/seo";
import { sections, walkCopy } from "@/lib/sections";

type IconName = "forward" | "external" | "down" | "download" | "globe" | "pin" | "up" | "mail" | "map";
export function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    forward: <path d="M4 12h15m-6-6 6 6-6 6" />,
    external: <path d="M6 18 18 6M7 6h11v11" />,
    down: <path d="M12 4v15m-6-6 6 6 6-6" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    up: <path d="M12 20V5m-6 6 6-6 6 6" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    map: <><path d="m2.5 6.5 6-3 7 3 6-3v14l-6 3-7-3-6 3zM8.5 3.5v14m7-11v14" /></>,
  };
  return <svg aria-hidden="true" focusable="false" className={"icon " + name} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function JsonLd({ lang, slug }: { lang: Language; slug?: PageSlug }) {
  const json = JSON.stringify(structuredData(lang, slug)).replaceAll("<", "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function Header({ lang, slug }: { lang: Language; slug?: PageSlug }) {
  const c = copy[lang];
  const home = slug ? pagePath(lang) : "";
  const alt = otherLanguage(lang);
  return <>
    <a className="skip" href="#content">{c.skip}</a>
    <header className="masthead" id="top">
      <div className="wrap masthead-inner">
        <a className="brand" href={home || "#top"}><img src="/icon.svg" alt="" width="36" height="36" />{c.name}</a>
        <nav aria-label={c.nav} className="main-nav">
          <a className="map-nav" href={pagePath(lang, "explore")} aria-current={slug === "explore" ? "page" : undefined}><Icon name="map" />{walkCopy[lang].nav}</a>
          <a href={home + "#work"}>{c.work}</a><a href={home + "#about"}>{c.about}</a>
          <a className="contact-nav" href={home + "#contact"}>{c.contact}<Icon name="forward" /></a>
        </nav>
        <a className="language" href={pagePath(alt, slug)} hrefLang={alt} lang={alt} aria-label={c.switchLabel}><Icon name="globe" />{lang === "en" ? "العربية" : "English"}</a>
      </div>
    </header>
  </>;
}

export function Footer({ lang }: { lang: Language }) {
  const c = copy[lang];
  return <footer className="wrap footer">
    <span>{c.name} <i aria-hidden="true">/</i> {c.place}</span>
    <div className="footer-links" aria-label={c.profileLinks}>
      {Object.entries(profiles).map(([name, url]) => <a href={url} key={name} lang="en">{name}<Icon name="external" /></a>)}
    </div>
    <a className="back-top" href="#top">{c.top}<Icon name="up" /></a>
  </footer>;
}

function Hero({ lang }: { lang: Language }) {
  const c = copy[lang];
  return <section className="wrap hero" aria-labelledby="hero-title">
    <div className="hero-text">
      <p className="overline role"><span className="status-dot" aria-hidden="true" />{c.role}</p>
      <h1 id="hero-title">{c.heroOne} <br /><em>{c.heroTwo}</em></h1>
      <p className="intro">{c.intro}</p>
      <div className="hero-actions">
        <a className="button" href={pagePath(lang, "explore")}><Icon name="map" />{walkCopy[lang].play}</a>
        <a className="cv" href={cvPath} download><Icon name="download" /><span>{c.cv}<small>{c.cvDetail}</small></span></a>
      </div>
    </div>
    <figure className="portrait">
      <div className="portrait-mat">
        <span className="guide guide-a" aria-hidden="true" /><span className="guide guide-b" aria-hidden="true" />
        <div className="portrait-print"><Image src="/media/ahmed.webp" width={720} height={720} alt={c.name} priority sizes="(max-width: 620px) 50vw, (max-width: 900px) 38vw, 293px" quality={82} /></div>
      </div>
      <figcaption><span><Icon name="pin" />{c.place}</span><span className="signature" lang="en" dir="ltr" aria-hidden="true">A. Kahlout</span></figcaption>
    </figure>
  </section>;
}

const projectThumbSizes: Record<ProjectSlug, [string, string]> = {
  menupilot: ["(max-width: 620px) 78vw, (max-width: 900px) 68vw, 500px", "(max-width: 620px) 22vw, (max-width: 900px) 20vw, 139px"],
  khotwa: ["(max-width: 620px) 34vw, (max-width: 900px) 32vw, 171px", "(max-width: 620px) 34vw, (max-width: 900px) 32vw, 171px"],
  rukza: ["(max-width: 620px) 78vw, (max-width: 900px) 60vw, 397px", "(max-width: 620px) 24vw, (max-width: 900px) 22vw, 121px"],
};

function ProjectVisual({ slug, eager = false }: { slug: ProjectSlug; eager?: boolean }) {
  const { images, size } = projects[slug];
  return <div aria-hidden="true" className={"project-art art-" + slug}>
    {images.map((file, i) => <div key={file} className={"screen screen-" + i}>
      <Image
        src={"/media/" + file}
        alt=""
        width={size[i][0]}
        height={size[i][1]}
        sizes={eager ? "(max-width: 700px) 92vw, 1000px" : projectThumbSizes[slug][i]}
        quality={80}
        priority={eager && i === 0}
      />
    </div>)}
  </div>;
}

function Work({ lang }: { lang: Language }) {
  const c = copy[lang];
  return <section className="work-section" id="work" aria-labelledby="work-title">
    <div className="wrap project-index">
      <div className="work-views"><p className="overline rule-label">{c.workKicker}</p><a className="map-return" href={pagePath(lang, "explore")}><Icon name="map" />{sections.explore[lang].label}</a></div>
      <div className="section-head">
        <h2 id="work-title">{c.workTitle}<span className="period" aria-hidden="true">.</span></h2>
        <fieldset className="filters"><legend className="sr">{c.filterLabel}</legend>
          {[c.all, ...c.filters].map((label, i) => <label key={label}>
            <input type="radio" name="project-filter" id={"filter-" + (i ? projectSlugs[i - 1] : "all")} defaultChecked={i === 0} />
            <span>{label}</span>
          </label>)}
        </fieldset>
      </div>
      <div className="cards">
        {projectSlugs.map((slug) => {
          const p = projects[slug][lang];
          return <article className={"card card-" + slug} key={slug}>
            <a href={pagePath(lang, slug)} className="project-link">
              <ProjectVisual slug={slug} />
              <div className="card-copy">
                <p className="overline">{p.field}</p><h3>{p.name}</h3>
                <p className="card-summary">{p.summary}</p>
                <span className="project-cta">{c.openProject}<Icon name="forward" /></span>
              </div>
            </a>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

function About({ lang }: { lang: Language }) {
  const c = copy[lang];
  return <section className="wrap about" id="about" aria-labelledby="about-title">
    <div className="about-copy">
      <p className="overline rule-label">{c.aboutKicker}</p><h2 id="about-title">{c.aboutTitle}</h2>
      <p>{c.aboutBody}</p><p>{c.aboutEnd}</p>
      <div className="about-links">{(["experience", "process"] as const).map(id => <a key={id} href={pagePath(lang, id)}>{sections[id][lang].name}<Icon name="forward" /></a>)}</div>
    </div>
    <div className="credentials">
      <div id="skills"><h3>{c.skills}</h3><ul className="tags">{["React", "Next.js", "TypeScript", "JavaScript", "HTML & CSS", "Git"].map((skill) => <li key={skill} lang="en" dir="ltr">{skill}</li>)}</ul></div>
      <div id="journey"><h3>{c.journey}</h3><dl className="milestones">{c.milestones.map(([title, detail]) => <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>)}</dl></div>
    </div>
  </section>;
}

function Contact({ lang }: { lang: Language }) {
  const c = copy[lang];
  return <section id="contact" className="contact-band" aria-labelledby="contact-title">
    <div className="wrap contact-grid">
      <div><p className="overline rule-label">{c.contactKicker}</p><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div>
      <a href={"mailto:" + email} className="email"><bdi>{email}</bdi><Icon name="external" /></a>
    </div>
  </section>;
}

export function Home({ lang }: { lang: Language }) {
  return <><Header lang={lang} /><main id="content" tabIndex={-1}><Hero lang={lang} /><Work lang={lang} /><About lang={lang} /><Contact lang={lang} /></main><Footer lang={lang} /><JsonLd lang={lang} /></>;
}

export function CaseStudy({ lang, slug }: { lang: Language; slug: ProjectSlug }) {
  const c = copy[lang];
  const project = projects[slug];
  const p = project[lang];
  const nextSlug = projectSlugs[(projectSlugs.indexOf(slug) + 1) % projectSlugs.length];
  return <><Header lang={lang} slug={slug} />
    <main className="wrap case-page" id="content" tabIndex={-1}>
      <div className="case-trail"><a className="case-back" href={pagePath(lang) + "#work"}><Icon name="forward" />{c.back}</a><a className="map-return" href={pagePath(lang, "explore")}><Icon name="map" />{walkCopy[lang].back}</a></div>
      <section className="case-intro" aria-labelledby="case-title">
        <div><p className="overline rule-label">{p.field}</p><h1 id="case-title">{p.name}</h1><p className="intro">{p.summary}</p></div>
        <dl className="specs"><div><dt>{c.roleLabel}</dt><dd>{p.role}</dd></div><div><dt>{c.techLabel}</dt><dd><bdi>{project.tools.join(" · ")}</bdi></dd></div></dl>
      </section>
      <ProjectVisual slug={slug} eager />
      <div className="case-notes">
        <section><h2>{c.context}</h2><p>{p.brief}</p></section><section><h2>{c.decision}</h2><p>{p.decision}</p></section>
      </div>
      <section className={"gallery gallery-" + slug} aria-labelledby="gallery-title">
        <h2 id="gallery-title">{c.screens}</h2><div>{project.images.map((file, i) => <figure key={file}>
          <a href={"/media/" + file} aria-label={c.imageOpen + " · " + p.alt[i]}><Image src={"/media/" + file} width={project.size[i][0]} height={project.size[i][1]} alt={p.alt[i]} sizes="(max-width: 700px) 92vw, 46vw" quality={82} /><span><Icon name="external" /></span></a>
          <figcaption>{p.caption[i]}</figcaption>
        </figure>)}</div>
      </section>
      <a className="next-project" href={pagePath(lang, nextSlug)}><span><small className="overline">{c.next}</small><strong>{projects[nextSlug][lang].name}</strong></span><Icon name="forward" /></a>
    </main><Footer lang={lang} /><JsonLd lang={lang} slug={slug} /></>;
}
