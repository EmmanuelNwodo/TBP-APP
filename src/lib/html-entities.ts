/**
 * HTML entity decoding for plain-text CMS fields.
 *
 * WordPress runs every stored string through `wptexturize()` and its kses
 * filters before exposing it on the REST API, so `post.title.rendered`,
 * category names and the Yoast metadata arrive *HTML-encoded* even though the
 * site renders them as plain text: an ampersand comes back as `&#038;`, a
 * curly apostrophe as `&#8217;`, a quote as `&quot;`. Those strings are then
 * interpolated into JSX, `<title>`, Open Graph tags and JSON-LD, all of which
 * escape their input again, so the raw entity text ends up visible to the
 * reader.
 *
 * This module turns such a field back into the plain text the CMS author
 * typed. It is pure, dependency-free and DOM-free so it runs identically in a
 * server component, a route handler and the regression tests.
 *
 * It is deliberately *not* used on article bodies: decoding entities inside
 * real markup would turn escaped `&lt;` sequences into live tags. Only fields
 * that are plain text by contract are passed through it.
 */

/**
 * Named entities WordPress actually emits in titles, category names and
 * metadata. Anything outside this set is covered by the numeric forms below;
 * an unrecognised name is left untouched rather than guessed at.
 */
const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  hellip: "…",
  bull: "•",
  middot: "·",
  laquo: "«",
  raquo: "»",
  copy: "©",
  reg: "®",
  trade: "™",
  deg: "°",
  plusmn: "±",
  frac12: "½",
  frac14: "¼",
  frac34: "¾",
  times: "×",
  divide: "÷",
  euro: "€",
  pound: "£",
  yen: "¥",
  cent: "¢",
  sect: "§",
  para: "¶",
  dagger: "†",
  prime: "′",
  Prime: "″",
  shy: "­",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
};

/** `&name;`, `&#1234;` or `&#x1F600;`. */
const ENTITY_PATTERN = /&(#[0-9]{1,7}|#[xX][0-9a-fA-F]{1,6}|[a-zA-Z][a-zA-Z0-9]{1,31});/g;

/**
 * Code points that must never be produced: the null character, the surrogate
 * range (which cannot stand alone in a well-formed string) and anything past
 * the Unicode maximum. Such an entity is left in its encoded form.
 */
function fromCodePoint(codePoint: number): string | null {
  if (!Number.isFinite(codePoint)) return null;
  if (codePoint <= 0 || codePoint > 0x10ffff) return null;
  if (codePoint >= 0xd800 && codePoint <= 0xdfff) return null;
  return String.fromCodePoint(codePoint);
}

/**
 * Decode the HTML entities in a plain-text value.
 *
 * The replacement is a single pass, so a literally-escaped entity survives
 * intact: `&amp;#038;` decodes to the text `&#038;` and is not decoded twice
 * into `&`.
 */
export function decodeHtmlEntities(value: string): string {
  if (!value || !value.includes("&")) return value;

  return value.replace(ENTITY_PATTERN, (match, body: string) => {
    if (body.charCodeAt(0) === 35 /* # */) {
      const isHex = body[1] === "x" || body[1] === "X";
      const digits = isHex ? body.slice(2) : body.slice(1);
      const codePoint = Number.parseInt(digits, isHex ? 16 : 10);
      return fromCodePoint(codePoint) ?? match;
    }

    return NAMED_ENTITIES[body] ?? match;
  });
}

/** Remove HTML tags, decode entities and normalise whitespace. */
export function htmlToPlainText(html: string): string {
  return collapseWhitespace(decodeHtmlEntities(stripTags(html)));
}

/** Strip tags only; entities are left encoded so `&lt;` cannot become a tag. */
export function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Collapse every run of whitespace - including the non-breaking spaces and
 * thin spaces that decoding can introduce - into a single ordinary space.
 */
export function collapseWhitespace(value: string): string {
  return value.replace(/[\s  -   　]+/g, " ").trim();
}
