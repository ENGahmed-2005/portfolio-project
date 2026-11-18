# Ahmed Kahlout — Creative Developer Portfolio

A bilingual Arabic/English portfolio built with Next.js and TypeScript.

## Main sections

- Home portfolio in English and Arabic
- Interactive portfolio map
- MenuPilot, Khotwa and Rukza case studies
- Experience & education
- Interface lab for bilingual UI decisions
- Downloadable CV, social preview images, sitemap and robots metadata

## Local development

```bash
npm install
npm run dev
```

If Next.js ever reports a missing generated chunk such as `Cannot find module './770.js'`, the source code is usually fine and the local `.next` cache is stale. Run:

```bash
npm run dev:fresh
```

You can also run the checks separately:

```bash
npm run typecheck
npm run build
```

## Deployment

The `main` branch is connected to Vercel. A push to `main` triggers a production deployment.
