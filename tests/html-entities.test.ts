import test from "node:test";
import assert from "node:assert/strict";

import {
  collapseWhitespace,
  decodeHtmlEntities,
  htmlToPlainText,
  stripTags,
} from "../src/lib/html-entities.ts";
import { __mapPostForTests as mapPost, __mapSummaryForTests as mapSummary } from "../src/lib/blog.ts";

/**
 * The live regression: this exact title was published on
 * /edge-leed-sustainability-investors-developers-in-nigeria with the raw
 * `&#038;` visible in the H1, the browser tab and the social cards.
 */
const ENCODED_TITLE =
  "Why EDGE &#038; LEED Sustainability Are Useful For Investors And Developers In Nigeria";
const DECODED_TITLE =
  "Why EDGE & LEED Sustainability Are Useful For Investors And Developers In Nigeria";

test("the published EDGE & LEED title decodes to a clean ampersand", () => {
  assert.equal(decodeHtmlEntities(ENCODED_TITLE), DECODED_TITLE);
  assert.ok(!decodeHtmlEntities(ENCODED_TITLE).includes("&#038;"));
});

test("the entities WordPress emits most often are decoded", () => {
  assert.equal(decodeHtmlEntities("Design &amp; Build"), "Design & Build");
  assert.equal(decodeHtmlEntities("Design &#038; Build"), "Design & Build");
  assert.equal(decodeHtmlEntities("Nigeria&#8217;s architects"), "Nigeria’s architects");
  assert.equal(decodeHtmlEntities("A &quot;green&quot; building"), 'A "green" building');
  assert.equal(decodeHtmlEntities("It&#39;s here"), "It's here");
  assert.equal(decodeHtmlEntities("Cost &ndash; value"), "Cost – value");
  assert.equal(decodeHtmlEntities("Read more&hellip;"), "Read more…");
  assert.equal(decodeHtmlEntities("&#x26; hex form"), "& hex form");
});

test("an unknown or malformed entity is left exactly as it was", () => {
  assert.equal(decodeHtmlEntities("&notarealentity;"), "&notarealentity;");
  assert.equal(decodeHtmlEntities("Q&A without a semicolon"), "Q&A without a semicolon");
  assert.equal(decodeHtmlEntities("&#xD800;"), "&#xD800;");
  assert.equal(decodeHtmlEntities("&#0;"), "&#0;");
  assert.equal(decodeHtmlEntities("&#99999999;"), "&#99999999;");
});

test("decoding is a single pass, so an escaped entity survives as text", () => {
  assert.equal(decodeHtmlEntities("&amp;#038;"), "&#038;");
});

test("tags are stripped before entities are decoded, so no markup can appear", () => {
  // `&lt;script&gt;` is text the author typed, not a tag: decoding it must not
  // produce anything a consumer could mistake for markup it should run.
  assert.equal(htmlToPlainText("<b>Bold</b> &lt;script&gt;"), "Bold <script>");
  assert.equal(stripTags("<b>Bold</b> &lt;em&gt;"), "Bold &lt;em&gt;");
});

test("decoded non-breaking space collapses into ordinary whitespace", () => {
  assert.equal(htmlToPlainText("<p>EDGE&nbsp;&amp;&nbsp;LEED</p>"), "EDGE & LEED");
  assert.equal(collapseWhitespace("  a \n b c  "), "a b c");
});

test("mapSummary hands consumers a decoded title, excerpt and category", () => {
  const summary = mapSummary({
    id: 1,
    date: "2025-05-01T00:00:00",
    modified: "2025-05-02T00:00:00",
    slug: "edge-leed-sustainability-investors-developers-in-nigeria",
    title: { rendered: ENCODED_TITLE },
    excerpt: { rendered: "<p>EDGE &#038; LEED explained for Nigeria&#8217;s investors.</p>" },
    _embedded: {
      "wp:term": [[{ id: 4, name: "Design &amp; Build", slug: "design-build", taxonomy: "category" }]],
    },
  });

  assert.equal(summary.title, DECODED_TITLE);
  assert.equal(summary.excerpt, "EDGE & LEED explained for Nigeria’s investors.");
  assert.equal(summary.category, "Design & Build");
});

test("mapPost decodes the Yoast metadata but never touches the article body", () => {
  const body =
    '<p>Costs &amp; savings</p><a href="https://buildingpractice.biz/?a=1&amp;b=2">link</a>';

  const post = mapPost({
    id: 2,
    date: "2025-05-01T00:00:00",
    slug: "edge-leed-sustainability-investors-developers-in-nigeria",
    title: { rendered: ENCODED_TITLE },
    excerpt: { rendered: "<p>Summary</p>" },
    content: { rendered: body },
    yoast_head_json: {
      title: `${ENCODED_TITLE} | The Building Practice`,
      description: "EDGE &#038; LEED certification for Nigerian developers.",
    },
  });

  assert.equal(post.title, DECODED_TITLE);
  assert.equal(post.seoTitle, `${DECODED_TITLE} | The Building Practice`);
  assert.equal(post.seoDescription, "EDGE & LEED certification for Nigerian developers.");

  // The body keeps its markup and its escaped entities byte-for-byte.
  assert.equal(post.content, body);
});

test("a post with no title or category still maps to safe defaults", () => {
  const summary = mapSummary({ id: 3, date: "2025-05-01T00:00:00", slug: "no-title" });

  assert.equal(summary.title, "");
  assert.equal(summary.category, "Architecture");
});
