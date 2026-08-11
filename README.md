# The Building Practice — Website

Next.js (App Router, TypeScript) rebuild of The Building Practice Ltd.'s website. This re-platforms the previous static-HTML site (kept for reference in `../old_app`) with the same look, content, and behavior, on modern infrastructure: server-rendered pages, `next/image` with a lazy-load skeleton preloader, and typed data layers for the team roster and blog.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DB + Blob credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

- `src/app` — routes (App Router). Each route owns a `page.module.css` scoped to it.
- `src/components` — `layout/` (header, footer, splash, theme toggle), `ui/` (LazyImage, Skeleton), `sections/` (homepage/interactive widgets), `admin/` (blog CMS pieces).
- `src/hooks` — the client-side behaviors (scroll header, mobile nav, carousels, counters, filter tabs).
- `src/lib` — typed data accessors (`team.ts`, `blog.ts`), the MySQL pool (`db.ts`), and resume storage (`resume-storage.ts`).
- `src/data` — `team.json`/`team-roster.json` (generated, see below) and `blog.json` (ported from the old site's CMS data).
- `scripts/extract-team.mjs` — one-off migration script that parses `../old_app/team/*.html` into `src/data/team.json`. Not part of the build; re-run only if the source HTML changes: `npm run extract-team`.

## Environment variables

See `.env.example`. `DB_*` configures the MySQL connection used by the careers application form; `BLOB_READ_WRITE_TOKEN` is required for resume uploads via Vercel Blob.

## Notes carried over intentionally from the old site

- The admin CMS (`/admin/login`, `/admin/blog`) is a demo: a hardcoded client-side password check and blog edits stored only in `localStorage`, no server persistence. This matches the old site's behavior as-is, not a gap.
- The public contact form validates client-side but does not submit anywhere (matches the old site). The careers application form is the one real backend-integrated flow.
