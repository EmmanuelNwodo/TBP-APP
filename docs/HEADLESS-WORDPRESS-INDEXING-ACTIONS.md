# Headless WordPress — indexing actions

**Status:** not yet applied. Every step below is manual work in the WordPress
admin at `https://blog.buildingpractice.biz/wp-admin/`.

**Do not start these steps until** the corrected Next.js canonical host is
deployed and verified live (see `SEO-POST-DEPLOYMENT-CHECKLIST.md`). Applying
`noindex` to WordPress while the Next.js pages still canonicalise to a
non-existent domain would remove both copies from the index at once.

---

## 1. Why this is needed

The site runs headless: WordPress is the CMS and media origin, Next.js is the
public presentation layer. But the WordPress frontend is currently also fully
public:

| Check | Current state |
| --- | --- |
| `https://blog.buildingpractice.biz/<slug>/` | `200 OK`, full HTML article |
| Its canonical tag | Points at itself (`blog.buildingpractice.biz`) |
| Its robots meta | `index, follow` |
| `robots.txt` | Yoast block sets `User-agent: * / Disallow:` (nothing blocked) |
| `sitemap_index.xml` | Published, listing posts, pages, portfolio and team |

So every article exists at two indexable, self-canonical URLs. Google must pick
one, and nothing currently tells it to prefer the Next.js URL.

The goal is: **the CMS keeps serving data and media; it stops serving
*indexable pages*.**

---

## 2. What must keep working

These are the parts of WordPress the live site depends on. None of them may be
blocked or redirected.

| Path | Why it must stay reachable | How to verify |
| --- | --- | --- |
| `/wp-json/` | The REST API is the only source of article data for Next.js | `curl -s -o /dev/null -w "%{http_code}" "https://blog.buildingpractice.biz/wp-json/wp/v2/posts?per_page=1"` → `200` |
| `/wp-content/uploads/` | Every article image and PDF is served from here and is referenced directly in rendered pages | `curl -I` any image URL from a live article → `200` |
| `/wp-admin/` | Editors publish here | Log in normally |
| `/wp-login.php` | Admin authentication | Log in normally |

A `noindex` directive on an image or on the REST API is harmless to
functionality but unnecessary; the important thing is that **nothing blocks
them**.

---

## 3. Preventing the WordPress frontend from competing

### 3.1 The correct instrument: `noindex, follow` on frontend HTML

Apply `noindex, follow` to the public **HTML pages** of the WordPress frontend:
posts, pages, portfolio items, team items, and the category, tag, author and
date archives.

`follow` (not `nofollow`) is deliberate: it lets crawlers keep following the
links out of those pages while dropping the pages themselves from the index.

With Yoast SEO installed, this is configured per content type rather than by
hand-editing templates:

1. **Yoast SEO → Settings → Content types**
   For *Posts*, *Pages*, and each custom type (*Portfolio*, *Team*, and any
   other public type listed):
   set **"Show X in search results?"** to **Off**.
   That makes Yoast emit `<meta name="robots" content="noindex, follow" />` on
   those pages.
2. **Yoast SEO → Settings → Categories & tags**
   Set *Categories*, *Tags* and any custom taxonomy to **Off** as well, unless
   a specific archive is deliberately kept.
3. **Yoast SEO → Settings → Advanced → Archives**
   Disable the *author* and *date* archives (Yoast then serves them as
   `noindex`, or 404s them, depending on the setting).

If Yoast is ever removed, the equivalent is a `wp_head` filter that prints
`noindex, follow` for `is_singular()` and archive requests only — never for
REST requests (`wp_is_json_request()`), and never as an `X-Robots-Tag` applied
to the whole host.

### 3.2 What NOT to do

- **Do not** put `Disallow: /` in `robots.txt` as the duplicate-content fix.
  A blocked URL cannot be crawled, so Google never reads the `noindex` and the
  URL can linger in the index as a "blocked but indexed" entry. Blocking also
  risks catching `/wp-content/uploads/` and `/wp-json/` and breaking the live
  site. `noindex` requires crawlability to work.
- **Do not** add a cross-domain canonical from `blog.buildingpractice.biz` to
  `www.buildingpractice.biz` *and* `noindex` at the same time. The two are
  contradictory: a canonical says "index the other URL and merge signals into
  it", `noindex` says "drop this one". Google may propagate the `noindex` to
  the canonical target. **Pick one instrument — use `noindex, follow`.**
- **Do not** password-protect or IP-restrict the whole CMS host: that breaks
  the REST API and the media the frontend needs.
- **Do not** redirect the WordPress frontend to the Next.js frontend at the
  server level. A blanket redirect will also catch `/wp-json/` and
  `/wp-content/` unless very carefully scoped, and a mistake there takes the
  live site's content and images down.

### 3.3 Only if a canonical is preferred over `noindex`

If, after review, the decision is to consolidate signals via canonical tags
rather than de-index, then apply **cross-domain canonicals only**, and leave
the pages `index`:

- In Yoast, set the canonical URL per post to the matching Next.js URL.
- Verify each canonical target returns `200` on `www.buildingpractice.biz`
  *before* publishing it. A canonical pointing at a 404 or a redirect is
  ignored, and an unverified canonical combined with `noindex` is the failure
  mode described above.

This route is more work and slower to take effect. `noindex, follow` is the
recommended option.

---

## 4. The WordPress XML sitemap

Once `https://www.buildingpractice.biz/sitemap.xml` is live and correct, it is
the authoritative sitemap. The Yoast sitemap actively works against it by
submitting the CMS URLs for indexing.

1. **Yoast SEO → Settings → Site features → XML sitemaps** → switch **Off**.
2. Confirm `https://blog.buildingpractice.biz/sitemap_index.xml` now returns
   `404`.
3. Yoast's `robots.txt` block contains a `Sitemap:` line referencing it. After
   disabling the sitemap, check `https://blog.buildingpractice.biz/robots.txt`
   and make sure it no longer advertises a sitemap that 404s.
4. In Google Search Console, for the `blog.buildingpractice.biz` property,
   remove the submitted `sitemap_index.xml`.

Note that turning content types to "Off" in step 3.1 already removes them from
the Yoast sitemap, so if the sitemap is kept for any reason it will shrink
rather than disappear.

---

## 5. Verification

Run these after each change. All are read-only.

```bash
# 1. REST API still serves data (must be 200 and return JSON)
curl -s -o /dev/null -w "wp-json: %{http_code}\n" \
  "https://blog.buildingpractice.biz/wp-json/wp/v2/posts?per_page=1"

# 2. Media still served (substitute a real uploads URL from a live article)
curl -s -o /dev/null -w "uploads: %{http_code}\n" \
  "https://blog.buildingpractice.biz/wp-content/uploads/2020/12/mandila.jpg"

# 3. A frontend article is now noindex (expect: noindex, follow)
curl -s "https://blog.buildingpractice.biz/top-15-architectural-firms-in-nigeria/" \
  | grep -io '<meta name="robots"[^>]*>'

# 4. No X-Robots-Tag is being applied to the API
curl -sI "https://blog.buildingpractice.biz/wp-json/wp/v2/posts?per_page=1" \
  | grep -i "x-robots-tag" || echo "no X-Robots-Tag on API (correct)"

# 5. Yoast sitemap is gone
curl -s -o /dev/null -w "sitemap_index: %{http_code}\n" \
  "https://blog.buildingpractice.biz/sitemap_index.xml"

# 6. robots.txt still allows crawling (needed for noindex to be seen)
curl -s "https://blog.buildingpractice.biz/robots.txt"
```

Expected results:

| Check | Expected |
| --- | --- |
| 1 | `200` |
| 2 | `200` |
| 3 | `noindex, follow` |
| 4 | no `X-Robots-Tag` header |
| 5 | `404` |
| 6 | no `Disallow: /`; uploads and `wp-json` not blocked |

Then, in the browser, log into `/wp-admin/` and open one post in the editor to
confirm nothing about the admin experience changed.

Finally, in Search Console (`blog.buildingpractice.biz` property), use URL
Inspection on one article and confirm it reports the page as excluded by
`noindex` once recrawled. De-indexing takes days to weeks; do not re-apply
changes impatiently.

---

## 6. Rollback

Every step above is a settings toggle, so rollback is immediate and does not
touch content or the database.

| Symptom | Action |
| --- | --- |
| Next.js articles stop loading / blog archive empty | Check `/wp-json/` returns `200`. If it does not, undo any robots, security-plugin or server rule added in this session — the REST API must never be blocked. |
| Article images disappear | Check a `/wp-content/uploads/` URL returns `200`. Undo any rule affecting `wp-content`. |
| Cannot log in to `/wp-admin/` | Undo any access restriction added to the host. None of the steps above should touch authentication. |
| Wrong content types were set to `noindex` | Yoast SEO → Settings → Content types → switch the affected type back **On**. The directive disappears on the next page render. |
| Sitemap needed again | Yoast SEO → Settings → Site features → XML sitemaps → **On**. |

Because the recommended instrument is `noindex` rather than blocking, a
mistake is recoverable: re-enabling indexing restores the pages once they are
recrawled. Blocking in `robots.txt` is harder to reverse cleanly, which is a
further reason not to use it.

---

## 7. Sequencing summary

1. Deploy the corrected Next.js canonical host. **Verify it live.**
2. Confirm representative Next.js articles return `200` with a canonical on
   `https://www.buildingpractice.biz`.
3. Only then apply §3.1 (`noindex, follow` on WordPress frontend HTML).
4. Then apply §4 (disable the Yoast sitemap).
5. Run §5 verification.
6. Monitor Search Console coverage for both properties over the following
   weeks.
