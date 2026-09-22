# Legacy URL review — unresolved WordPress-era URLs

Every URL below exists (or existed) on the WordPress side but has **no proven
destination** in the current Next.js site. None of them is redirected: guessing
a destination would send visitors and crawlers to content that does not answer
their intent, and the project rule is to map only what can be proven.

They currently resolve to a `404`. That is the correct interim behaviour — a
404 is honest, and it is reversible once a destination is decided.

**How the mapped entries were proven:** WordPress URLs were enumerated from the
live `page-sitemap.xml`, `portfolio-sitemap.xml` and `gva_team-sitemap.xml`,
plus the absolute links actually embedded in published article bodies.
Destinations were matched against `src/data/projects.json`, `src/data/team.json`
and `src/data/services.json`. Anything that did not match unambiguously is
listed here instead of in `src/lib/legacy-redirects.ts`.

---

## 1. Service pages with no current equivalent

These `/our-services/*` pages describe offerings that have no matching page in
`src/data/services.json`.

| Legacy URL | Note |
| --- | --- |
| `/our-services/architectural-building-fire-safety-consultants-in-nigeria/` | "Architectural Fire Consultancy" appears as an expertise item on `/about` but has no service page. Either add the service page or decide the nearest destination. |
| `/our-services/architectural-consultancy-services-in-nigeria/` | Ambiguous between `construction-consultation` and `architectural-design`. |
| `/our-services/office-design-services-in-nigeria/` | Ambiguous between `interior-design` and `space-planning`. |
| `/our-services/high-rise-architecture-firm-for-modern-living-and-workspaces-in-nigeria/` | No high-rise-specific service page. |
| `/our-services/midrise-architecture-firm-for-modern-living-and-workspaces-in-nigeria/` | No mid-rise-specific service page. |
| `/building-planning-consultation-firm-in-lagos/` | Ambiguous between `building-permits` and `construction-consultation`. |

## 2. Location-qualified service pages — **hold for the service-as-firm task**

These are "architecture firm in `<place>`" pages. They have no present-day
equivalent, and they are precisely the URLs the upcoming service-as-firm
restructuring is expected to address. **Do not map them in isolation** — decide
them as part of that migration so they are not redirected twice.

| Legacy URL |
| --- |
| `/our-services/architecture-firm-in-nigeria/` |
| `/our-services/architecture-firm-in-lagos/` |
| `/our-services/architecture-firm-in-lagos-island/` |
| `/our-services/architecture-firm-in-lagos-mainland/` |
| `/our-services/architecture-firm-in-ikeja/` |
| `/our-services/architecture-firm-in-abuja/` |
| `/our-services/architecture-firm-in-portharcourt/` |
| `/our-services/architecture-firm-in-kaduna/` |
| `/our-services/architecture-firm-in-enugu-2/` (also linked as `/architecture-firm-in-enugu/`) |
| `/our-services/architecture-firm-in-ibadan-2/` (also linked as `/architecture-firm-in-ibadan/`) |

Note the `-2` suffix duplicates: article bodies link to both the suffixed and
unsuffixed forms, so whichever destination is chosen must cover both.

## 3. Portfolio entries with no matching project

Present in `portfolio-sitemap.xml`, absent from `src/data/projects.json`.

| Legacy URL | Note |
| --- | --- |
| `/portfolio/adeyemi-lawson/` | No matching project title. |
| `/portfolio/air-peace-hotel/` | No matching project title. |
| `/portfolio/alleys-house/` | No matching project title. |
| `/portfolio/balarabe-musa/` | No matching project title. |
| `/portfolio/beechwood/` | No matching project title. |
| `/portfolio/dr-tundes-residence-ikorodu/` | No matching project title. |
| `/portfolio/iju-hills/` | Two Iju projects exist (`odunayo-s-house-iju-lagos`, `williams-house-iju-lagos`); neither is clearly "Iju Hills". |
| `/portfolio/nspri-gatehouse/` | Plausibly `nspri-main-entrance-ilorin-kwara-state`, but "gatehouse" → "main entrance" is inference, not proof. |
| `/portfolio/noun-ikorodu-auditorium-and-academic-staff-building/` | Two NOUN Ikorodu projects exist; neither matches "auditorium and academic staff building". |
| `/portfolio/okafors-house-vgc/` | No matching project title. |
| `/portfolio/proposed-hospital/` | No matching project title. |
| `/portfolio/proposed-office-ikeja/` | No matching project title. |
| `/portfolio/regent-terraces/` | `klm-terraces-ilupeju-lagos` exists but is a different name. |
| `/portfolio/samir/` | No matching project title. |
| `/portfolio/sura-mojaji/` | No matching project title. |
| `/portfolio/thompson/` | No matching project title. |

**Suggested resolution:** for any of these that still has traffic or backlinks,
either restore the project into `src/data/projects.json` or map it to the
closest genuine project. Check Search Console / analytics before deciding.

## 4. Project landing pages under `/projects/`

Referenced from article bodies, not present in the Next.js site.

| Legacy URL | Note |
| --- | --- |
| `/projects/hospitality-real-estate-development-in-nigeria/` | Reads as a service/landing page, not a project. Possibly `/services/real-estate-development`. |
| `/projects/retail-real-estate-development-in-nigeria/` | As above. |
| `/projects/commercial-real-estate-development-in-nigeria/` | As above. |
| `/projects/industrial-real-estate-development-in-nigeria/` | As above. |
| `/projects/residential-real-estate-development-in-nigeria/` | As above. |

These were left unmapped because they sit under `/projects/` but read as
service landing pages; the correct destination depends on what they actually
contained.

## 5. Team profile with no matching member

| Legacy URL | Note |
| --- | --- |
| `/team/adewale-aleem/` | No matching name in `src/data/team.json`. Likely a former member. |

## 6. Taxonomy and feed URLs

The Next.js site has no category, tag, author or date archives, so there is no
equivalent destination.

| Pattern | Current | Note |
| --- | --- | --- |
| `/category/<slug>/` | `404` | No archive routes exist. Decide whether to build them or return `410 Gone`. |
| `/tag/<slug>/` | `404` | Thin archives; likely safe to leave as `404`/`410`. |
| `/author/<slug>/` | `404` | As above. |
| `/feed/` | `404` | No RSS feed is published by the Next.js site. Consider adding one, or leave. |
| `/404-2/`, `/test/` | `404` | WordPress scaffolding. Leave as `404`. |

## 7. Decision guidance

Before mapping anything above:

1. Pull the last 12 months of Search Console data for
   `blog.buildingpractice.biz` and the `www` property.
2. Keep only URLs with real impressions, clicks or referring links.
3. For each kept URL, identify a destination that genuinely answers the same
   intent. If none exists, the honest options are to **create** the page or to
   leave the `404`.
4. Add proven mappings to `src/lib/legacy-redirects.ts` — never inline in a
   component. The table is also consumed by the in-body article link rewriter,
   so one entry fixes both the HTTP redirect and the links inside articles.
5. Re-run `npm test` (the redirect table has chain, loop and duplicate guards).

**Do not** bulk-redirect this list to `/services`, `/projects` or the homepage.
Redirecting many unrelated URLs to one hub is treated as a soft 404 and gains
nothing.
