# SEO post-deployment checklist

Actions that **cannot** be performed from this repository. Nothing in this list
has been done — every item is outstanding.

The code changes in this branch are inert until step 1 and step 4 are
completed: the application falls back to the correct origin on its own, but the
environment variable makes the intent explicit and survives future edits.

---

## 1. Vercel — environment variable

- [ ] Project → **Settings → Environment Variables** → add:

  ```
  NEXT_PUBLIC_SITE_URL = https://www.buildingpractice.biz
  ```

  Scope: **Production**.

- [ ] Optionally add the same variable to **Preview** with a preview-specific
      value, or leave it unset there. The resolver in `src/lib/seo.ts` ignores
      `*.vercel.app` values, so preview deployments can never publish a preview
      URL as a production canonical.
- [ ] Do **not** set it to a value with a trailing slash or a path; the
      resolver strips them, but the stored value should be clean.

## 2. Vercel — domain configuration

- [ ] Project → **Settings → Domains**. Confirm **`www.buildingpractice.biz`
      is the primary domain** and `buildingpractice.biz` is configured to
      redirect to it.
- [ ] Current measured behaviour (before any change):

  | Request | Response |
  | --- | --- |
  | `http://buildingpractice.biz/` | `308` → `https://buildingpractice.biz/` |
  | `https://buildingpractice.biz/` | `308` → `https://www.buildingpractice.biz/` |
  | `http://www.buildingpractice.biz/` | `308` → `https://www.buildingpractice.biz/` |
  | `https://www.buildingpractice.biz/` | `200` |

- [ ] The first row is a two-hop chain. Where Vercel permits, collapse
      `http://buildingpractice.biz` into **one** redirect straight to
      `https://www.buildingpractice.biz`, preserving path and query.
- [ ] Re-test after the change:

  ```bash
  curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" \
    "http://buildingpractice.biz/services/leading-architectural-design-firm-in-nigeria?utm_source=test"
  ```

  Expect a single hop directly to
  `https://www.buildingpractice.biz/services/leading-architectural-design-firm-in-nigeria?utm_source=test`.

## 3. Review the code changes

- [ ] Review this branch's diff (nothing has been committed or pushed).
- [ ] Merge and let Vercel build.

## 4. Redeploy

- [ ] Trigger a production deployment **after** step 1, so the build picks up
      `NEXT_PUBLIC_SITE_URL`.
- [ ] Watch the build log for `[cms]` lines. They indicate CMS read failures.
      The build no longer depends on per-article CMS reads, so these should be
      rare; if the sitemap route logs one, investigate before announcing the
      sitemap in Search Console.

## 5. Verify the live deployment

Run each of these against production and confirm the expected value.

- [ ] **Canonical + Open Graph on the homepage**

  ```bash
  curl -s https://www.buildingpractice.biz/ \
    | grep -Eio '<link rel="canonical"[^>]*>|<meta property="og:url"[^>]*>'
  ```

  Expect `https://www.buildingpractice.biz` — **not** `thebuildingpractice.com`.

- [ ] **No trace of the dead host anywhere in the homepage HTML**

  ```bash
  curl -s https://www.buildingpractice.biz/ | grep -c "thebuildingpractice.com"
  ```

  Expect `0`.

- [ ] **JSON-LD origin and single business entity**

  ```bash
  curl -s https://www.buildingpractice.biz/ \
    | grep -o 'application/ld+json' | wc -l
  ```

  Then view source and confirm every `@id` and `url` uses
  `https://www.buildingpractice.biz`, and that only one organisation entity
  (`#organization`) is declared.

- [ ] **robots.txt**

  ```bash
  curl -s https://www.buildingpractice.biz/robots.txt
  ```

  Expect exactly:

  ```
  User-Agent: *
  Allow: /
  Disallow: /admin
  Disallow: /api/

  Sitemap: https://www.buildingpractice.biz/sitemap.xml
  ```

- [ ] **Sitemap host and size**

  ```bash
  curl -s https://www.buildingpractice.biz/sitemap.xml \
    | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' > /tmp/live-sitemap.txt
  wc -l < /tmp/live-sitemap.txt                                   # total
  sort -u /tmp/live-sitemap.txt | wc -l                           # unique
  grep -c "thebuildingpractice.com" /tmp/live-sitemap.txt || true  # expect 0
  grep -vc "^https://www.buildingpractice.biz/" /tmp/live-sitemap.txt || true  # expect 0
  ```

- [ ] **Representative URL inspection** — for each of `/`, `/services`,
      `/services/leading-architectural-design-firm-in-nigeria`, `/blog`, `/blog/page/2`, and one
      article: confirm `200`, one `<h1>`, a self-referencing canonical on the
      `www` host, and no `noindex`.

- [ ] **Redirects**

  ```bash
  for p in /blog/why-you-need-an-architect-in-nigeria /about-us /contact-us \
           /our-services /news /portfolio/promasidor /team/uche-anyanwu; do
    curl -s -o /dev/null -w "%{http_code} -> %header{location}   $p\n" \
      "https://www.buildingpractice.biz$p"
  done
  ```

  Each should be a single permanent hop to its mapped destination.

- [ ] **404 behaviour**

  ```bash
  curl -s -o /dev/null -w "%{http_code}\n" \
    https://www.buildingpractice.biz/this-does-not-exist
  curl -s https://www.buildingpractice.biz/this-does-not-exist \
    | grep -io '<meta name="robots"[^>]*>'
  ```

  Expect `404` and exactly one `noindex` directive.

- [ ] **Diagnostic endpoint removed**

  ```bash
  curl -s -o /dev/null -w "%{http_code}\n" \
    https://www.buildingpractice.biz/test-wordpress
  ```

  Expect `404`.

## 6. Google Search Console

- [ ] Confirm the verified property covers `https://www.buildingpractice.biz`
      (a Domain property covers all hosts; a URL-prefix property must match the
      `www` host exactly).
- [ ] **Sitemaps** → submit `https://www.buildingpractice.biz/sitemap.xml`.
- [ ] Remove any previously submitted sitemap that references
      `thebuildingpractice.com`, if one is listed.
- [ ] Use **URL Inspection → Test live URL** on:
      - `https://www.buildingpractice.biz/`
      - `https://www.buildingpractice.biz/services`
      - `https://www.buildingpractice.biz/blog`
      - two or three representative articles

      Confirm each reports the canonical as the `www` URL and that indexing is
      allowed.
- [ ] Only after those tests come back clean, use **Request indexing** for the
      homepage, the services hub, the blog archive and a few representative
      articles. Do not mass-request; the sitemap handles the rest.

## 7. WordPress (only after the above is verified)

- [ ] Work through `docs/HEADLESS-WORDPRESS-INDEXING-ACTIONS.md`.
- [ ] Do not start it until step 5 confirms the Next.js canonicals are live and
      correct. Applying `noindex` on WordPress while the frontend still
      canonicalises to a dead domain would de-index both copies.

## 8. Follow-up monitoring

- [ ] After ~1 week: Search Console → **Pages** report. Watch for
      "Duplicate, Google chose a different canonical" resolving on the `www`
      property.
- [ ] After ~2–4 weeks: confirm `blog.buildingpractice.biz` pages are dropping
      out of the index and the `www` equivalents are being indexed.
- [ ] Re-run the sitemap crawl and confirm the article count matches the
      published count in WordPress.
