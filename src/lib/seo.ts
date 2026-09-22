/**
 * Canonical origin for the public Next.js frontend.
 *
 * This is the single source of truth for every absolute URL the site emits:
 * canonical tags, `metadataBase`, Open Graph / Twitter URLs, JSON-LD `url` and
 * `@id` values, breadcrumbs, the XML sitemap and the `Sitemap:` line in
 * robots.txt. Nothing else in the repository may hard-code a production origin.
 */

/** Used whenever the environment does not supply a usable production origin. */
const FALLBACK_SITE_URL = "https://www.buildingpractice.biz";

/**
 * Hostnames that must never become a production canonical, even if they are
 * present in the environment. Vercel injects preview URLs into the build
 * environment, and a preview origin silently leaking into canonical tags would
 * de-index the production site.
 */
function isNonCanonicalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return (
    host.endsWith(".vercel.app") ||
    host.endsWith(".vercel.sh") ||
    host.endsWith(".now.sh") ||
    // The WordPress CMS origin is never the public canonical host.
    host === "blog.buildingpractice.biz" ||
    // The previously hard-coded origin does not exist in DNS. Blocking it here
    // means it cannot be reintroduced through the environment either.
    host === "thebuildingpractice.com" ||
    host === "www.thebuildingpractice.com"
  );
}

/**
 * Resolve the canonical origin from `NEXT_PUBLIC_SITE_URL`, falling back to the
 * known production origin. An empty, malformed, non-HTTP(S) or preview value is
 * rejected rather than used, and any trailing slash or path is discarded so the
 * result is always a bare origin such as `https://www.buildingpractice.biz`.
 */
function resolveSiteUrl(rawValue: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  const raw = rawValue?.trim();
  if (!raw) return FALLBACK_SITE_URL;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return FALLBACK_SITE_URL;
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return FALLBACK_SITE_URL;
  if (!parsed.hostname) return FALLBACK_SITE_URL;
  if (isNonCanonicalHost(parsed.hostname)) return FALLBACK_SITE_URL;

  // `URL.origin` already drops any path, query, hash and trailing slash.
  return parsed.origin;
}

/** Exported for the regression tests; not used by application code directly. */
export const __resolveSiteUrlForTests = resolveSiteUrl;

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "The Building Practice Ltd.";
export const DEFAULT_OG_IMAGE = "/images/bp.png";

/** The verified public contact address used in metadata and structured data. */
export const SITE_CONTACT_EMAIL = "info@buildingpractice.biz";

/** Build an absolute URL on the canonical origin. The only URL builder in use. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
