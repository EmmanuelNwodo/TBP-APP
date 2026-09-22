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

/** Escape the five XML predefined entities. */
export function escapeXml(value: string): string {
  return value
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

/** Standard response wrapper for every XML route. */
export function xmlResponse(body: string, contentType: string = XML_CONTENT_TYPE): Response {
  return new Response(body, {
    headers: {
      "content-type": contentType,
      // Matches the CMS revalidation window used elsewhere in the app.
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
