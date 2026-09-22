import test from "node:test";
import assert from "node:assert/strict";

import { normaliseArticleLinks, normaliseHref } from "../src/lib/blog-content.ts";

const SITE = "https://www.buildingpractice.biz";
const knownSlugs = new Set(["why-you-need-an-architect-in-nigeria", "building-a-high-rise-nigeria"]);
const opts = { siteUrl: SITE, knownSlugs };

test("apex-domain links are moved to the canonical www origin", () => {
  assert.equal(
    normaliseHref("https://buildingpractice.biz/contact", opts),
    `${SITE}/contact`,
  );
});

test("legacy WordPress paths are mapped through the central table", () => {
  assert.equal(
    normaliseHref("https://buildingpractice.biz/our-services/", opts),
    `${SITE}/services`,
  );
  assert.equal(
    normaliseHref(
      "https://buildingpractice.biz/our-services/architectural-planning-design-documentation-firm-in-nigeria/",
      opts,
    ),
    `${SITE}/services/architectural-design`,
  );
  assert.equal(normaliseHref("https://buildingpractice.biz/contact-us/", opts), `${SITE}/contact`);
});

test("CMS frontend article links are rewritten only when the slug is confirmed", () => {
  assert.equal(
    normaliseHref("https://blog.buildingpractice.biz/why-you-need-an-architect-in-nigeria/", opts),
    `${SITE}/why-you-need-an-architect-in-nigeria`,
  );

  const unverified = "https://blog.buildingpractice.biz/an-article-we-cannot-confirm/";
  assert.equal(normaliseHref(unverified, opts), unverified);
});

test("without a slug list, CMS article links are left untouched rather than guessed", () => {
  const href = "https://blog.buildingpractice.biz/why-you-need-an-architect-in-nigeria/";
  assert.equal(normaliseHref(href, { siteUrl: SITE, knownSlugs: null }), href);
});

test("WordPress media and admin URLs are never rewritten", () => {
  const media = "https://blog.buildingpractice.biz/wp-content/uploads/2025/08/BUILDING-CODE-COMPLIANCE.pdf";
  const image = "https://buildingpractice.biz/wp-content/uploads/2020/12/mandila.jpg";
  const admin = "https://blog.buildingpractice.biz/wp-admin/post.php?post=11047&action=edit";
  const api = "https://blog.buildingpractice.biz/wp-json/wp/v2/posts";

  assert.equal(normaliseHref(media, opts), media);
  assert.equal(normaliseHref(image, opts), image);
  assert.equal(normaliseHref(admin, opts), admin);
  assert.equal(normaliseHref(api, opts), api);
});

test("external links are preserved exactly", () => {
  for (const href of [
    "https://www.google.com/maps",
    "https://www.linkedin.com/company/the-building-practice-ltd/",
    "mailto:info@buildingpractice.biz",
    "tel:+2349049721840",
    "#section",
  ]) {
    assert.equal(normaliseHref(href, opts), href);
  }
});

test("query strings and fragments survive rewriting", () => {
  assert.equal(
    normaliseHref("https://buildingpractice.biz/our-services/?utm_source=news#top", opts),
    `${SITE}/services?utm_source=news#top`,
  );
});

test("the malformed email link becomes a real mailto", () => {
  assert.equal(
    normaliseHref("https://buildingpractice.biz/info@buildingpractice.biz", opts),
    "mailto:info@buildingpractice.biz",
  );
  assert.equal(normaliseHref("/info@buildingpractice.biz", opts), "mailto:info@buildingpractice.biz");
});

test("unsafe schemes are rejected", () => {
  assert.equal(normaliseHref("javascript:alert(1)", opts), null);
  assert.equal(normaliseHref("JavaScript:alert(1)", opts), null);
  assert.equal(normaliseHref("data:text/html;base64,PHNjcmlwdD4=", opts), null);
});

test("only anchor hrefs are rewritten inside article HTML", () => {
  const html = [
    '<p>See <a href="https://buildingpractice.biz/our-services/">our services</a>.</p>',
    '<img src="https://blog.buildingpractice.biz/wp-content/uploads/a.jpg" alt="x" />',
    '<a href="https://blog.buildingpractice.biz/wp-content/uploads/b.pdf">Download</a>',
  ].join("");

  const out = normaliseArticleLinks(html, opts);

  assert.ok(out.includes(`href="${SITE}/services"`), "legacy service link rewritten");
  assert.ok(
    out.includes('src="https://blog.buildingpractice.biz/wp-content/uploads/a.jpg"'),
    "image source untouched",
  );
  assert.ok(
    out.includes('href="https://blog.buildingpractice.biz/wp-content/uploads/b.pdf"'),
    "PDF link untouched",
  );
});

test("an unsafe anchor loses its href but keeps its text", () => {
  const out = normaliseArticleLinks('<a href="javascript:alert(1)">click</a>', opts);
  assert.ok(!out.includes("javascript:"), "unsafe scheme removed");
  assert.ok(out.includes("click"), "link text preserved");
});

test("encoded ampersands in hrefs are handled without corruption", () => {
  const html = '<a href="https://buildingpractice.biz/our-services/?a=1&amp;b=2">x</a>';
  const out = normaliseArticleLinks(html, opts);
  assert.ok(out.includes(`href="${SITE}/services?a=1&amp;b=2"`), out);
});

test("rewriting never emits the dead domain", () => {
  const html = '<a href="https://buildingpractice.biz/our-services/">x</a>';
  assert.ok(!normaliseArticleLinks(html, opts).includes("thebuildingpractice.com"));
});
