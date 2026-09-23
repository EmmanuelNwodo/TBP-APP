/**
 * XML serialisation for the sitemap index and the child sitemaps.
 *
 * Everything here is plain string building with strict escaping, so the output
 * stays valid whether or not the XSL stylesheet is reachable - the stylesheet
 * is presentation only and a crawler that ignores it sees standard sitemap XML.
 */

import type { SitemapGroup, SitemapUrl } from "./inventory.ts";
import { latestModified } from "./inventory.ts";

const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const IMAGE_NS = "http://www.google.com/schemas/sitemap-image/1.1";

/** Path of the shared presentation stylesheet. */
export const STYLESHEET_PATH = "/sitemap.xsl";

/** Content type used by every sitemap and by the stylesheet. */
export const XML_CONTENT_TYPE = "application/xml; charset=utf-8";

/**
 * Control characters that XML 1.0 forbids outright. They cannot be escaped -
 * there is no legal representation for them - so the only safe handling is to
 * drop them. A single stray one anywhere in the document makes the whole
 * sitemap unparseable, which is reported as a sitemap that could not be read,
 * so they are removed before escaping rather than trusted not to appear.
 * Tab, newline and carriage return are legal and are kept.
 */
const ILLEGAL_XML_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g;

/**
 * Escape a value for XML text content.
 *
 * This is XML escaping, not HTML escaping and not React escaping: it emits
 * only the five predefined XML entities, which are the only named entities an
 * XML parser understands without a DTD.
 */
export function escapeXml(value: string): string {
  return value
    .replace(ILLEGAL_XML_CHARS, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function header(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<?xml-stylesheet type="text/xsl" href="${STYLESHEET_PATH}"?>`,
  ].join("\n");
}

function urlEntry(entry: SitemapUrl): string {
  const lines = [`    <loc>${escapeXml(entry.loc)}</loc>`];

  if (entry.lastModified) {
    lines.push(`    <lastmod>${escapeXml(entry.lastModified)}</lastmod>`);
  }
  if (entry.changeFrequency) {
    lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
  }
  if (typeof entry.priority === "number") {
    lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
  }
  for (const image of entry.images ?? []) {
    lines.push("    <image:image>");
    lines.push(`      <image:loc>${escapeXml(image.loc)}</image:loc>`);
    lines.push("    </image:image>");
  }

  return `  <url>\n${lines.join("\n")}\n  </url>`;
}

/** Serialise one child sitemap as a `<urlset>`. */
export function renderUrlSet(group: SitemapGroup): string {
  // The image namespace is declared only when the group actually carries
  // image data, so no sitemap advertises a schema it does not use.
  const hasImages = group.urls.some((entry) => (entry.images?.length ?? 0) > 0);
  const namespaces = hasImages
    ? `xmlns="${SITEMAP_NS}" xmlns:image="${IMAGE_NS}"`
    : `xmlns="${SITEMAP_NS}"`;

  return [
    header(),
    `<urlset ${namespaces}>`,
    ...group.urls.map(urlEntry),
    "</urlset>",
    "",
  ].join("\n");
}

/** Serialise the parent index as a `<sitemapindex>`. */
export function renderSitemapIndex(groups: SitemapGroup[], siteUrl: string): string {
  const entries = groups.map((group) => {
    const lines = [`    <loc>${escapeXml(`${siteUrl}/${group.file}`)}</loc>`];
    const modified = latestModified(group);
    // Only a genuine modification date from inside the child is used.
    if (modified) lines.push(`    <lastmod>${escapeXml(modified)}</lastmod>`);
    return `  <sitemap>\n${lines.join("\n")}\n  </sitemap>`;
  });

  return [
    header(),
    `<sitemapindex xmlns="${SITEMAP_NS}">`,
    ...entries,
    "</sitemapindex>",
    "",
  ].join("\n");
}

/**
 * Standard response wrapper for every XML route.
 *
 * The body is encoded to UTF-8 bytes here rather than handed over as a string,
 * so the declared `charset` and the bytes on the wire cannot disagree and the
 * exact length is always advertised - a crawler can then tell a complete
 * document from a truncated one.
 */
export function xmlResponse(body: string, contentType: string = XML_CONTENT_TYPE): Response {
  const encoded = new TextEncoder().encode(body);

  return new Response(encoded, {
    status: 200,
    headers: {
      "content-type": contentType,
      "content-length": String(encoded.byteLength),
      // Matches the CMS revalidation window used elsewhere in the app.
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}

/**
 * The answer when a sitemap's source of truth is temporarily unreadable.
 *
 * Only the article sitemap can reach this state, and only when WordPress is
 * down. Publishing whatever articles happened to load would quietly retire
 * every URL that did not, so the route declines to answer at all: `503` with
 * `Retry-After` is the documented way to tell a crawler "ask again shortly"
 * and it keeps the previously discovered URLs in place. It is deliberately not
 * the framework's HTML error page, and it is never cached.
 */
export function xmlUnavailableResponse(retryAfterSeconds = 300): Response {
  return new Response(null, {
    status: 503,
    headers: {
      "content-type": XML_CONTENT_TYPE,
      "retry-after": String(retryAfterSeconds),
      "cache-control": "no-store",
    },
  });
}
