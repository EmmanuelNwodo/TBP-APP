/**
 * Server-side normalisation of the links inside WordPress article bodies.
 *
 * Published articles contain absolute links written when the site ran on
 * WordPress: apex-domain links, links to the CMS frontend, and WordPress-era
 * paths such as `/our-services/...`. Those are rewritten here, at render time,
 * so the WordPress database is never touched.
 *
 * Only `<a href>` destinations are touched. Media stays untouched: anything
 * under `/wp-content/` (uploads, PDFs, images) and the WordPress admin keep
 * their original absolute URLs, because those still resolve on the CMS origin.
 *
 * This module is pure and dependency-free so the regression tests can import
 * it directly.
 */

import { resolveLegacyPath, normalisePathname } from "./legacy-redirects.ts";

/** The canonical public origin. Passed in so this module stays pure. */
export type NormaliseOptions = {
  siteUrl: string;
  /**
   * Published article slugs. When supplied, a link to an article on the CMS
   * frontend is rewritten to its canonical frontend URL only if the slug is
   * confirmed to exist. When `null`, those links are left untouched rather
   * than guessed at.
   */
  knownSlugs?: Set<string> | null;
};

const FRONTEND_HOSTS = new Set(["buildingpractice.biz", "www.buildingpractice.biz"]);
const CMS_HOST = "blog.buildingpractice.biz";

/** Paths that must keep pointing at the CMS origin. */
function isCmsOwnedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/wp-content/") ||
    pathname.startsWith("/wp-admin/") ||
    pathname.startsWith("/wp-includes/") ||
    pathname.startsWith("/wp-json/") ||
    pathname === "/wp-login.php"
  );
}

const SAFE_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * A scheme that a browser would execute. These are stripped during
 * normalisation so untrusted CMS content cannot inject an executable link.
 */
function hasUnsafeScheme(href: string): boolean {
  const trimmed = href.trim().replace(/[\u0000-\u001F\u007F]/g, "");
  const schemeMatch = /^([a-z][a-z0-9+.-]*):/i.exec(trimmed);
  if (!schemeMatch) return false;
  return !SAFE_SCHEMES.has(`${schemeMatch[1].toLowerCase()}:`);
}

/** The exact malformed email link observed in published content. */
const MALFORMED_EMAIL_PATH = "/info@buildingpractice.biz";

/**
 * Rewrite a single href. Returns the original value when no proven
 * improvement exists, or `null` when the link must be removed as unsafe.
 */
export function normaliseHref(href: string, options: NormaliseOptions): string | null {
  const raw = href.trim();
  if (!raw) return href;

  if (hasUnsafeScheme(raw)) return null;

  // Fragment-only and already-correct relative links are left alone.
  if (raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return href;

  const siteOrigin = new URL(options.siteUrl).origin;

  let parsed: URL;
  try {
    parsed = new URL(raw, `${siteOrigin}/`);
  } catch {
    return href;
  }

  const host = parsed.hostname.toLowerCase();
  const isFrontendHost = FRONTEND_HOSTS.has(host);
  const isCmsHost = host === CMS_HOST;
  const isRelative = !/^[a-z][a-z0-9+.-]*:/i.test(raw) && parsed.origin === siteOrigin;

  // Anything genuinely external keeps its URL.
  if (!isFrontendHost && !isCmsHost && !isRelative) return href;

  // Media, uploads and the WordPress admin must keep resolving on the CMS.
  if (isCmsOwnedPath(parsed.pathname)) return href;

  const suffix = `${parsed.search}${parsed.hash}`;
  const path = normalisePathname(parsed.pathname);

  // The malformed email link published as a path rather than a mailto.
  if (path.toLowerCase() === MALFORMED_EMAIL_PATH) {
    return "mailto:info@buildingpractice.biz";
  }

  // A proven legacy mapping wins for every host we own.
  const mapped = resolveLegacyPath(path);
  if (mapped) return `${siteOrigin}${mapped}${suffix}`;

  if (isFrontendHost) {
    // Already ours: normalise the host (apex -> www) and the trailing slash.
    return `${siteOrigin}${path === "/" ? "/" : path}${suffix}`;
  }

  if (isCmsHost) {
    // A CMS-frontend article link becomes the canonical frontend URL, but only
    // when the slug is confirmed against the published slug list.
    const articleSlug = /^\/([^/]+)$/.exec(path)?.[1];
    if (articleSlug && options.knownSlugs?.has(articleSlug.toLowerCase())) {
      return `${siteOrigin}/${articleSlug.toLowerCase()}${suffix}`;
    }
    // Unproven CMS links are left exactly as published.
    return href;
  }

  return href;
}

const ANCHOR_TAG_PATTERN = /<a\b[^>]*>/gi;
const HREF_ATTRIBUTE_PATTERN = /(\shref\s*=\s*)(["'])(.*?)\2/i;

/**
 * Rewrite every `<a href>` in an article body. Image sources, `srcset`,
 * inline styles and all other markup are left byte-for-byte unchanged.
 */
export function normaliseArticleLinks(html: string, options: NormaliseOptions): string {
  if (!html) return html;

  return html.replace(ANCHOR_TAG_PATTERN, (tag) => {
    const match = HREF_ATTRIBUTE_PATTERN.exec(tag);
    if (!match) return tag;

    const [full, prefix, quote, value] = match;
    const next = normaliseHref(decodeHtmlEntities(value), options);

    // An unsafe link loses its href entirely; the text content survives.
    if (next === null) return tag.replace(full, "");

    if (next === value) return tag;
    return tag.replace(full, `${prefix}${quote}${encodeHtmlAttribute(next)}${quote}`);
  });
}

/** WordPress encodes `&` as `&amp;` inside attributes; decode before parsing. */
function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&#0?38;/g, "&");
}

function encodeHtmlAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
