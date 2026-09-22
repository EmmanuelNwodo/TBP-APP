import test from "node:test";
import assert from "node:assert/strict";

import { __dedupePostsForTests as dedupePosts, normaliseSlug } from "../src/lib/blog.ts";

test("slugs are normalised to a single canonical form", () => {
  assert.equal(normaliseSlug("Some-Slug"), "some-slug");
  assert.equal(normaliseSlug("  some-slug  "), "some-slug");
  assert.equal(normaliseSlug("/some-slug/"), "some-slug");
});

test("posts repeated across pagination windows are dropped by id", () => {
  const deduped = dedupePosts([
    { id: 1, slug: "a" },
    { id: 2, slug: "b" },
    { id: 1, slug: "a" },
  ]);
  assert.deepEqual(deduped.map((p) => p.id), [1, 2]);
});

test("a repeated slug under a different id is also dropped", () => {
  const deduped = dedupePosts([
    { id: 1, slug: "construction-vs-project-management-differences" },
    { id: 9, slug: "Construction-VS-Project-Management-Differences" },
  ]);
  assert.equal(deduped.length, 1, "case-different duplicates must collapse to one URL");
});

test("posts without a usable slug are discarded", () => {
  const deduped = dedupePosts([
    { id: 1, slug: "" },
    { id: 2, slug: "   " },
    { id: 3, slug: "real" },
  ]);
  assert.deepEqual(deduped.map((p) => p.slug), ["real"]);
});

test("ordering is preserved for the entries that survive", () => {
  const deduped = dedupePosts([
    { id: 5, slug: "e" },
    { id: 3, slug: "c" },
    { id: 5, slug: "e" },
    { id: 1, slug: "a" },
  ]);
  assert.deepEqual(deduped.map((p) => p.id), [5, 3, 1]);
});

test("card requests never ask WordPress for article bodies", async () => {
  const { CARD_FIELDS, ARTICLE_FIELDS } = await import("../src/lib/blog.ts");

  assert.ok(!CARD_FIELDS.includes("content"), `CARD_FIELDS must not request content: ${CARD_FIELDS}`);
  assert.equal(
    CARD_FIELDS,
    "id,slug,date,modified,title,excerpt,_links,_embedded",
    "card fields must stay limited to what a card renders plus the embed links",
  );

  // The embed only populates _embedded when _links is requested too.
  assert.ok(CARD_FIELDS.includes("_links"));
  assert.ok(CARD_FIELDS.includes("_embedded"));

  // Only the article route may ask for a body.
  assert.ok(ARTICLE_FIELDS.includes("content"));
  assert.ok(ARTICLE_FIELDS.startsWith(CARD_FIELDS));
});
