# The Building Practice — website architecture

## 1. Purpose

This document is the human-readable map of the **current Next.js frontend**. It
records every public route, the H1 each route renders, its canonical URL, the
data source behind it, its indexability and the child sitemap it belongs to.

It describes the live Next.js application only. It is not a map of the former
WordPress frontend, which is now a headless content source.

Generated against commit `1d2ad08` plus the service-as-firm migration.

## 2. Canonical production domain

```text
https://www.buildingpractice.biz
```

Resolved once in `src/lib/seo.ts` from `NEXT_PUBLIC_SITE_URL`, falling back to
the value above. Preview hosts, the CMS host and the retired
`thebuildingpractice.com` are rejected by that resolver and can never become a
canonical origin.

The headless CMS at `https://blog.buildingpractice.biz` supplies article content
and media. It never appears as a page canonical or as a page `<loc>`; it appears
only inside genuine `<image:loc>` elements in the article sitemap.

## 3. Route and naming conventions

| Convention | Rule |
| --- | --- |
| Trailing slash | None. Next.js normalises `/path/` to `/path` (`trailingSlash` left at its default). |
| Case | Lowercase, hyphen-separated. |
| Service URLs | `/services/leading-[service-name]-firm-in-nigeria` — the deterministic slugified form of that page's complete H1. |
| Slug derivation | `slugifyH1()` in `src/lib/services.ts`: lowercase, `&` becomes `and`, punctuation dropped, spaces become hyphens, repeated hyphens collapsed. |
| Articles | Root-level `/{wordpress-slug}`; the WordPress slug is never altered. |
| Projects and team | `/projects/{slug}`, `/team/{id}` — unchanged by this migration. |
| H1 rule | Exactly one rendered `<h1>` per page, present in the initial server HTML. |

## 4. Route tree

```text
/                                   Home
/about                              About
/services                           Services hub
/services/[slug]                    23 service pages (firm-focused)
/projects                           Projects hub
/projects/[slug]                    63 project pages
/team                               Team hub
/team/[slug]                        43 team profiles
/locations                          Locations index (single page; no detail routes)
/reviews                            Reviews
/careers                            Careers
/contact                            Contact
/privacy                            Privacy policy
/blog                               Blog archive (page 1)
/blog/page/[page]                   Blog pagination (crawlable, not in the sitemap)
/[slug]                             WordPress articles
/admin, /admin/*                    Administrative — noindex, disallowed
/api/*                              API route handlers — disallowed
/robots.txt  /sitemap.xml  /sitemap.xsl
/page-sitemap.xml  /service-sitemap.xml  /project-sitemap.xml
/team-sitemap.xml  /article-sitemap.xml
```

## 5. Standalone pages (11)

| Page type | Page name | Rendered H1 | Canonical URL | Data source | Indexability | Sitemap |
| --- | --- | --- | --- | --- | --- | --- |
| Standalone | Home | An Architectural Firm in Nigeria for Thoughtful, Enduring Design | `https://www.buildingpractice.biz/` | Page component | indexable | page-sitemap.xml |
| Standalone | About | Shaping Spaces That Inspire & Endure | `https://www.buildingpractice.biz/about` | Page component | indexable | page-sitemap.xml |
| Hub | Services | Comprehensive Architectural & Construction Solutions | `https://www.buildingpractice.biz/services` | `src/data/services.json` | indexable | page-sitemap.xml |
| Hub | Projects | Discover Our Building Icons | `https://www.buildingpractice.biz/projects` | `src/data/projects.json` | indexable | page-sitemap.xml |
| Hub | Team | Meet Our Expert Team | `https://www.buildingpractice.biz/team` | `src/data/team.json` | indexable | page-sitemap.xml |
| Standalone | Reviews | What People Say About Us | `https://www.buildingpractice.biz/reviews` | `src/data/reviews.json` | indexable | page-sitemap.xml |
| Standalone | Careers | Build the Future With Us | `https://www.buildingpractice.biz/careers` | Page component | indexable | page-sitemap.xml |
| Standalone | Contact | Let us Build Together (rendered: "Let's Build Together") | `https://www.buildingpractice.biz/contact` | Page component | indexable | page-sitemap.xml |
| Index | Locations | Find Us Across Nigeria | `https://www.buildingpractice.biz/locations` | Page component | indexable | page-sitemap.xml |
| Standalone | Privacy policy | Privacy Policy | `https://www.buildingpractice.biz/privacy` | Page component | indexable | page-sitemap.xml |
| Archive | Blog | Insights & Inspiration | `https://www.buildingpractice.biz/blog` | WordPress REST API | indexable | page-sitemap.xml |

## 6. Services

### Service pages (23)

| Page type | Page name | Rendered H1 | Canonical URL | Data source | Indexability | Sitemap |
| --- | --- | --- | --- | --- | --- | --- |
| Service | Architectural Design | Leading Architectural Design Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-architectural-design-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Interior Design | Leading Interior Design Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-interior-design-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Construction Management | Leading Construction Management Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-construction-management-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Construction Consultation | Leading Construction Consultation Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-construction-consultation-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Building Construction | Leading Building Construction Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-building-construction-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Project Management | Leading Project Management Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-project-management-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Urban Development | Leading Urban Development Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-urban-development-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Green Building Advisory | Leading Green Building Advisory Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-green-building-advisory-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Real Estate Development | Leading Real Estate Development Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-real-estate-development-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | 3D Visualisation | Leading 3D Visualisation Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-3d-visualisation-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Structural Engineering & Design | Leading Structural Engineering & Design Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-structural-engineering-and-design-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | MEP Coordination | Leading MEP Coordination Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-mep-coordination-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Construction Cost Estimation | Leading Construction Cost Estimation Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-construction-cost-estimation-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Renovation & Remodelling | Leading Renovation & Remodelling Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-renovation-and-remodelling-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Facility Management | Leading Facility Management Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-facility-management-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Site Planning & Landscape Design | Leading Site Planning & Landscape Design Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-site-planning-and-landscape-design-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Building Permits & Regulatory Compliance | Leading Building Permits & Regulatory Compliance Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Construction Supervision | Leading Construction Supervision Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-construction-supervision-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Feasibility Studies | Leading Feasibility Studies Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-feasibility-studies-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Land Surveying | Leading Land Surveying Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-land-surveying-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Environmental Impact Assessment | Leading Environmental Impact Assessment Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-environmental-impact-assessment-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Building Certification | Leading Building Certification Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-building-certification-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |
| Service | Space Planning | Leading Space Planning Firm in Nigeria | `https://www.buildingpractice.biz/services/leading-space-planning-firm-in-nigeria` | `src/data/services.json` | indexable | service-sitemap.xml |

### Service migration matrix (23)

| Old service name | Old URL | Final H1 | Final canonical URL | Status |
| --- | --- | --- | --- | --- |
| Architectural Design | `/services/architectural-design` | Leading Architectural Design Firm in Nigeria | `/services/leading-architectural-design-firm-in-nigeria` | renamed |
| Interior Design | `/services/interior-design` | Leading Interior Design Firm in Nigeria | `/services/leading-interior-design-firm-in-nigeria` | renamed |
| Construction Management | `/services/construction-management` | Leading Construction Management Firm in Nigeria | `/services/leading-construction-management-firm-in-nigeria` | renamed |
| Construction Consultation | `/services/construction-consultation` | Leading Construction Consultation Firm in Nigeria | `/services/leading-construction-consultation-firm-in-nigeria` | renamed |
| Building Construction | `/services/building-construction` | Leading Building Construction Firm in Nigeria | `/services/leading-building-construction-firm-in-nigeria` | renamed |
| Project Management | `/services/project-management` | Leading Project Management Firm in Nigeria | `/services/leading-project-management-firm-in-nigeria` | renamed |
| Urban Development | `/services/urban-development` | Leading Urban Development Firm in Nigeria | `/services/leading-urban-development-firm-in-nigeria` | renamed |
| Green Building Advisory | `/services/green-building-advisory` | Leading Green Building Advisory Firm in Nigeria | `/services/leading-green-building-advisory-firm-in-nigeria` | renamed |
| Real Estate Development | `/services/real-estate-development` | Leading Real Estate Development Firm in Nigeria | `/services/leading-real-estate-development-firm-in-nigeria` | renamed |
| 3D Visualisation | `/services/3d-visualization` | Leading 3D Visualisation Firm in Nigeria | `/services/leading-3d-visualisation-firm-in-nigeria` | renamed |
| Structural Engineering & Design | `/services/structural-engineering` | Leading Structural Engineering & Design Firm in Nigeria | `/services/leading-structural-engineering-and-design-firm-in-nigeria` | renamed |
| MEP Coordination | `/services/mep-coordination` | Leading MEP Coordination Firm in Nigeria | `/services/leading-mep-coordination-firm-in-nigeria` | renamed |
| Construction Cost Estimation | `/services/construction-cost-estimation` | Leading Construction Cost Estimation Firm in Nigeria | `/services/leading-construction-cost-estimation-firm-in-nigeria` | renamed |
| Renovation & Remodelling | `/services/renovation-remodeling` | Leading Renovation & Remodelling Firm in Nigeria | `/services/leading-renovation-and-remodelling-firm-in-nigeria` | renamed |
| Facility Management | `/services/facility-management` | Leading Facility Management Firm in Nigeria | `/services/leading-facility-management-firm-in-nigeria` | renamed |
| Site Planning & Landscape Design | `/services/site-planning-landscape` | Leading Site Planning & Landscape Design Firm in Nigeria | `/services/leading-site-planning-and-landscape-design-firm-in-nigeria` | renamed |
| Building Permits & Regulatory Compliance | `/services/building-permits` | Leading Building Permits & Regulatory Compliance Firm in Nigeria | `/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria` | renamed |
| Construction Supervision | `/services/construction-supervision` | Leading Construction Supervision Firm in Nigeria | `/services/leading-construction-supervision-firm-in-nigeria` | renamed |
| Feasibility Studies | `/services/feasibility-studies` | Leading Feasibility Studies Firm in Nigeria | `/services/leading-feasibility-studies-firm-in-nigeria` | renamed |
| Land Surveying | `/services/land-surveying` | Leading Land Surveying Firm in Nigeria | `/services/leading-land-surveying-firm-in-nigeria` | renamed |
| Environmental Impact Assessment | `/services/environmental-impact` | Leading Environmental Impact Assessment Firm in Nigeria | `/services/leading-environmental-impact-assessment-firm-in-nigeria` | renamed |
| Building Certification | `/services/building-certification` | Leading Building Certification Firm in Nigeria | `/services/leading-building-certification-firm-in-nigeria` | renamed |
| Space Planning | `/services/space-planning` | Leading Space Planning Firm in Nigeria | `/services/leading-space-planning-firm-in-nigeria` | renamed |

### Redirect matrix (23)

| Retired URL | Final canonical URL | Redirect type | Reason |
| --- | --- | --- | --- |
| `/services/architectural-design` | `/services/leading-architectural-design-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/interior-design` | `/services/leading-interior-design-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/construction-management` | `/services/leading-construction-management-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/construction-consultation` | `/services/leading-construction-consultation-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/building-construction` | `/services/leading-building-construction-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/project-management` | `/services/leading-project-management-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/urban-development` | `/services/leading-urban-development-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/green-building-advisory` | `/services/leading-green-building-advisory-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/real-estate-development` | `/services/leading-real-estate-development-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/3d-visualization` | `/services/leading-3d-visualisation-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/structural-engineering` | `/services/leading-structural-engineering-and-design-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/mep-coordination` | `/services/leading-mep-coordination-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/construction-cost-estimation` | `/services/leading-construction-cost-estimation-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/renovation-remodeling` | `/services/leading-renovation-and-remodelling-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/facility-management` | `/services/leading-facility-management-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/site-planning-landscape` | `/services/leading-site-planning-and-landscape-design-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/building-permits` | `/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/construction-supervision` | `/services/leading-construction-supervision-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/feasibility-studies` | `/services/leading-feasibility-studies-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/land-surveying` | `/services/leading-land-surveying-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/environmental-impact` | `/services/leading-environmental-impact-assessment-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/building-certification` | `/services/leading-building-certification-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |
| `/services/space-planning` | `/services/leading-space-planning-firm-in-nigeria` | 308 permanent | Service-as-firm repositioning |

## 7. Projects

63 project-detail pages at `/projects/{slug}`, sourced from
`src/data/projects.json`. All indexable, all in `project-sitemap.xml`. No
project URL changed in this migration.

## 8. Team

43 team profiles at `/team/{id}`, sourced from `src/data/team.json` (ordered by
`src/data/team-roster.json`). All indexable, all in `team-sitemap.xml`. No team
URL changed in this migration.

## 9. Locations

`/locations` is a **single index page** listing the firm's offices. It is in
`page-sitemap.xml`.

**There are no location-detail pages and no service-location pages.**

```text
Location-detail pages:        0
Service-location pages:       0
City-specific service pages:  0
```

No `/locations/[slug]` route exists, none was created, and there is no location
sitemap. Service H1s name Nigeria only — no city is used to qualify a service.

## 10. WordPress articles

| Aspect | Value |
| --- | --- |
| Public URL | `https://www.buildingpractice.biz/{slug}` (root level) |
| Route | `src/app/(site)/[slug]/page.tsx` |
| Source | `https://blog.buildingpractice.biz/wp-json/wp/v2` |
| Count at last verification | 286 published |
| Canonical | Always the frontend URL; never the CMS host |
| `lastmod` | Genuine WordPress `modified_gmt` |
| Images | Genuine featured-image URLs in `<image:loc>` (201 of 286) |
| Generation | On demand with `dynamicParams`, then cached (ISR, 300 s) |
| Sitemap | `article-sitemap.xml` |

Article URLs were not changed by this migration.

## 11. Dynamic-route collision protection

Articles share the root namespace with the application's own routes, so a
WordPress slug such as `services` would resolve to the services hub rather than
to the article. Two layers handle this, and no third, competing implementation
was added:

1. **Next.js route precedence** — a concrete route (`/services`, `/sitemap.xml`)
   always wins over the dynamic `/[slug]` route.
2. **Sitemap reserved-path filter** — `isReservedRootPath()` in
   `src/lib/sitemap/inventory.ts` drops a colliding article from
   `article-sitemap.xml`, so the sitemap can never advertise a URL that renders
   a different page. The existing `assertInventoryIsSound()` duplicate check
   remains the backstop and throws if two groups ever claim one URL.

Reserved root paths: `about`, `admin`, `api`, `article-sitemap.xml`, `blog`,
`careers`, `contact`, `locations`, `page-sitemap.xml`, `privacy`,
`project-sitemap.xml`, `projects`, `reviews`, `robots.txt`,
`service-sitemap.xml`, `services`, `sitemap.xml`, `sitemap.xsl`, `team`,
`team-sitemap.xml`.

## 12. Grouped XML sitemaps

`/sitemap.xml` is a `<sitemapindex>` listing five children. It was not rebuilt,
renamed or redesigned by this migration; only the service destinations changed.

| Sitemap | URLs | Contents |
| --- | ---: | --- |
| `page-sitemap.xml` | 11 | Standalone pages and hubs |
| `service-sitemap.xml` | 23 | Final firm-focused service URLs |
| `project-sitemap.xml` | 63 | Project detail pages |
| `team-sitemap.xml` | 43 | Team profiles |
| `article-sitemap.xml` | 286 | WordPress articles (plus 201 image entries) |
| **Total** | **426** | Unique canonical URLs |

`robots.txt` references only `https://www.buildingpractice.biz/sitemap.xml`.
Every sitemap carries the `/sitemap.xsl` processing instruction.

Blog pagination (`/blog/page/2` to `/blog/page/24`) is crawlable through links
on `/blog` but is deliberately **not** listed in the sitemap, preserving the
verified 426-URL inventory.

## 13. Counts by content type

| Content type | Count | Indexable | Sitemap |
| --- | ---: | --- | --- |
| Standalone pages and hubs | 11 | Yes | page-sitemap.xml |
| Service pages | 23 | Yes | service-sitemap.xml |
| Project pages | 63 | Yes | project-sitemap.xml |
| Team profiles | 43 | Yes | team-sitemap.xml |
| WordPress articles | 286 | Yes | article-sitemap.xml |
| Location-detail pages | 0 | — | — |
| Service-location pages | 0 | — | — |
| **Total indexable URLs** | **426** | | |

## 14. Validation results

Verified against a local production build of this migration:

| Check | Result |
| --- | --- |
| All 23 final service URLs | HTTP 200 |
| H1 per service page | Exactly 1, matching the service record |
| Canonical | Self-referencing on every service page |
| Open Graph URL | Equals the canonical on every service page |
| Schema `Service.name` | Equals the rendered H1 on all 23 |
| Schema and breadcrumb URLs | Equal the canonical on all 23 |
| Metadata `noindex` | None on any service page |
| `X-Robots-Tag` | Absent on all service responses |
| Initial HTML | Minimum 3,300 characters of server-rendered text |
| All 23 retired URLs | Single 308 direct to the final URL |
| Redirect chains and loops | None |
| `service-sitemap.xml` | 23 URLs, all final, no duplicates |
| Combined sitemap | 426 URLs, 426 unique |
| Retired URLs in any sitemap | 0 |
| Off-canonical or CMS-host page `<loc>` | 0 |

## 15. Intentionally excluded or non-indexable routes

| Route | Status | Reason |
| --- | --- | --- |
| `/admin`, `/admin/blog`, `/admin/login` | noindex | Administrative; `robots: index:false`, disallowed in robots.txt |
| `/api/careers/apply`, `/api/health` | excluded | Route handlers; disallowed in robots.txt |
| `/blog/page/[page]` | indexable, not in sitemap | Crawlable via links; kept out to preserve the verified inventory |
| `/services/{retired-slug}` (23) | redirected | 308 permanent to the final firm URL |
| WordPress-era URLs (`/our-services/*`, `/portfolio/*`, `/team/{full-name}`) | redirected | `src/lib/legacy-redirects.ts` |
| Unmapped WordPress-era URLs | excluded (404) | Listed in `docs/LEGACY-URL-REVIEW.md` |
| 404 responses | noindex | Single unambiguous directive |

## 16. Known external actions

Nothing in this document has been deployed. Outstanding items live in
`docs/SEO-POST-DEPLOYMENT-CHECKLIST.md` and
`docs/HEADLESS-WORDPRESS-INDEXING-ACTIONS.md`. Specific to this migration:

1. Deploy, then confirm all 23 final service URLs return 200 in production.
2. Confirm each of the 23 retired service URLs returns a single 308 to its final
   URL in production.
3. In Search Console the sitemap address is unchanged, so resubmission is
   optional; use URL Inspection on several final service URLs instead.
4. Expect a temporary ranking fluctuation while the 23 URL changes are
   reprocessed. The permanent redirects preserve accumulated signals.
5. WordPress article bodies still contain links to WordPress-era service URLs.
   These are rewritten at render time by `src/lib/blog-content.ts`; the CMS
   database is not modified.
