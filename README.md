# Vitor Martinho — Portfolio

Personal portfolio for Vitor Martinho, Senior Microsoft Fabric & BI Engineer.

**Live:** https://vitordib-portfolio.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for scroll and entrance animations
- Deployed on [Vercel](https://vercel.com)

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Editing content

All copy lives in a single file: `src/content/site.ts`. Contact details, projects,
experience, awards and education are plain TypeScript objects — change them there and
every section updates.

To replace the downloadable CV, drop a new PDF at `public/Vitor_Martinho_CV.pdf`
(or update `site.cv` if you rename it).

## Structure

```
src/
  app/
    layout.tsx           metadata, fonts, JSON-LD structured data
    page.tsx             section composition
    globals.css          design tokens, keyframes, utilities
    opengraph-image.tsx  generated social preview card
    icon.svg             favicon
    robots.ts sitemap.ts SEO routes
  components/            one file per section + shared UI primitives
  content/site.ts        all site copy
```

## Notes

- Animations respect `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.
- `experimental.useTypeScriptCli` is enabled because the project uses TypeScript 7.
- `npm audit` reports advisories in `postcss` and `sharp`, both transitive build-time
  dependencies of Next.js itself. Fixing them requires downgrading Next, so they are
  intentionally left alone.
