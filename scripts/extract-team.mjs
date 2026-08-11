// One-off migration script: parses old_app/team/*.html profile pages into
// src/data/team.json. Not part of the build — re-run only if the source
// HTML changes: `npm run extract-team`.
//
// Every profile page shares one template (see plan doc); this walks each
// section in document order, bucketing content by the preceding
// `h2.section-title` heading text rather than assuming fixed positions,
// since array lengths (timeline entries, tags, etc.) vary per person.

import { load } from "cheerio";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const teamDir = path.join(__dirname, "..", "..", "old_app", "team");
const publicImagesDir = path.join(__dirname, "..", "public", "images");
const outPath = path.join(__dirname, "..", "src", "data", "team.json");

const files = readdirSync(teamDir).filter((f) => f.endsWith(".html") && !f.includes("backup"));

const iconOf = (el, $) => {
  const classes = $(el).find("i").first().attr("class")?.split(/\s+/) ?? [];
  return classes.find((c) => c.startsWith("bx-") || c.startsWith("bxs-") || c.startsWith("bxl-")) ?? "";
};
const textOf = (el, $) => $(el).clone().find("i").remove().end().text().trim();

function parseProfile(html, id) {
  const $ = load(html);

  const name = $(".profile-name").first().text().trim();
  const title = $(".profile-title").first().text().trim();
  const initials = $(".profile-image-fallback").first().text().trim();
  const photoSrc = $(".profile-image img").first().attr("src") ?? "";
  const photoRelative = photoSrc.replace(/^\.\.\/images\//, "");
  // Some profiles reference a photo file that was never actually shipped
  // (a pre-existing broken-image defect, same as the blog posts) — the old
  // site's own fallback in that case is the initials avatar, so mirror that
  // by leaving photo empty rather than a link that will 404.
  const photo = existsSync(path.join(publicImagesDir, photoRelative)) ? `/images/${photoRelative}` : "";

  const infoSections = $(".profile-info-section");
  let email = "";
  let phone = "";
  let location = "";
  infoSections.each((_, section) => {
    const titleText = $(section).find(".profile-info-title").text().trim().toLowerCase();
    $(section)
      .find(".profile-info-item")
      .each((_, item) => {
        const text = textOf(item, $);
        if (titleText.includes("contact")) {
          const mailto = $(item).find('a[href^="mailto:"]').attr("href");
          const tel = $(item).find('a[href^="tel:"]').attr("href");
          if (mailto) email = mailto.replace("mailto:", "");
          if (tel) phone = tel.replace("tel:", "");
        } else if (titleText.includes("location") && !location && text) {
          location = text;
        }
      });
  });

  const quickStats = $(".quick-stat")
    .map((_, el) => ({
      number: $(el).find(".quick-stat-number").text().trim(),
      label: $(el).find(".quick-stat-label").text().trim(),
    }))
    .get();

  const leadQuote = textOf($(".content-intro .lead").get(0), $);

  const bioParagraphs = $(".content-intro")
    .nextUntil(".section-divider, h2.section-title")
    .filter("p")
    .map((_, el) => $(el).text().trim())
    .get();

  const philosophyQuote = $(".quote-box p").first().text().trim();

  const socials = {
    linkedin: $('.profile-quick-contact a[title="LinkedIn"]').attr("href") ?? "",
    twitter: $('.profile-quick-contact a[title="Twitter"]').attr("href") ?? "",
    instagram: $('.profile-quick-contact a[title="Instagram"]').attr("href") ?? "",
  };

  // Walk h2.section-title headings in order, bucketing what follows each one.
  const sections = {};
  $("h2.section-title").each((_, h2) => {
    const heading = $(h2).text().trim().replace(/\s+/g, " ");
    const content = $(h2).nextUntil("h2.section-title, .content-footer");
    sections[heading] = content;
  });

  const findSection = (needle) => {
    const key = Object.keys(sections).find((k) => k.toLowerCase().includes(needle));
    return key ? sections[key] : null;
  };

  const competencies = [];
  const competenciesBlock = findSection("core competencies");
  competenciesBlock?.filter(".expertise-tags").first().find(".tag").each((_, el) => {
    competencies.push({ icon: iconOf(el, $), label: textOf(el, $) });
  });

  const highlights = [];
  const highlightsBlock = findSection("professional highlights");
  highlightsBlock?.filter(".stats-grid").first().find(".stat-card").each((_, el) => {
    highlights.push({
      icon: iconOf(el, $),
      number: $(el).find(".stat-number").text().trim(),
      label: $(el).find(".stat-label").text().trim(),
    });
  });

  const careerTimeline = [];
  const careerBlock = findSection("career journey");
  careerBlock?.filter(".career-timeline").first().find(".timeline-item").each((_, el) => {
    careerTimeline.push({
      period: textOf($(el).find(".timeline-period").get(0), $),
      title: textOf($(el).find(".timeline-title").get(0), $),
      company: textOf($(el).find(".timeline-company").get(0), $),
      description: $(el).find(".timeline-description").text().trim(),
    });
  });

  const education = [];
  const eduBlock = findSection("education");
  eduBlock?.filter(".career-timeline").first().find(".timeline-item").each((_, el) => {
    education.push({
      period: textOf($(el).find(".timeline-period").get(0), $),
      degree: textOf($(el).find(".timeline-title").get(0), $),
      institution: textOf($(el).find(".timeline-company").get(0), $),
      description: $(el).find(".timeline-description").text().trim(),
    });
  });

  const certifications = [];
  const developmentBullets = [];
  const devBlock = findSection("professional development");
  const devLists = devBlock?.filter("ul.styled-list") ?? [];
  devBlock?.find("ul.styled-list").each((i, ul) => {
    const items = $(ul)
      .find("li")
      .map((_, li) => {
        const strong = $(li).find("strong").text().trim();
        const full = textOf(li, $);
        return { strong, full };
      })
      .get();
    if (i === 0) {
      items.forEach(({ strong, full }) => {
        const detail = full.replace(strong, "").trim().replace(/^-\s*/, "").trim();
        certifications.push({ title: strong || full, detail });
      });
    } else {
      items.forEach(({ full }) => developmentBullets.push(full));
    }
  });
  void devLists;

  const keyStrengths = [];
  const strengthsBlock = findSection("key strengths");
  strengthsBlock?.filter(".stats-grid").first().find(".stat-card").each((_, el) => {
    keyStrengths.push({
      icon: iconOf(el, $),
      title: $(el).find(".strength-title").text().trim(),
      description: $(el).find(".strength-description").text().trim(),
    });
  });

  const projectExperience = [];
  const projectTags = [];
  const expBlock = findSection("professional experience");
  expBlock?.filter("ul.styled-list").first().find("li").each((_, li) => {
    const strong = $(li).find("strong").text().trim();
    const full = textOf(li, $);
    const description = full.replace(strong, "").trim().replace(/^-\s*/, "").trim();
    projectExperience.push({ icon: iconOf(li, $), title: strong || full, description });
  });
  expBlock?.filter(".expertise-tags").first().find(".tag").each((_, el) => {
    projectTags.push(textOf(el, $));
  });

  const missing = [];
  if (!name) missing.push("name");
  if (!careerTimeline.length) missing.push("careerTimeline");
  if (!education.length) missing.push("education");
  if (!highlights.length) missing.push("highlights");

  return {
    record: {
      id,
      name,
      title,
      photo,
      initials,
      email,
      phone,
      location,
      quickStats,
      leadQuote,
      bioParagraphs,
      philosophyQuote,
      competencies,
      highlights,
      careerTimeline,
      education,
      certifications,
      developmentBullets,
      keyStrengths,
      projectExperience,
      projectTags,
      socials,
    },
    missing,
  };
}

const team = [];
const warnings = [];

for (const file of files) {
  const id = file.replace(/\.html$/, "");
  const html = readFileSync(path.join(teamDir, file), "utf-8");
  const { record, missing } = parseProfile(html, id);
  team.push(record);
  if (missing.length) warnings.push(`${id}: missing ${missing.join(", ")}`);
}

team.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(outPath, JSON.stringify(team, null, 2) + "\n");

console.log(`Wrote ${team.length} team members to ${path.relative(process.cwd(), outPath)}`);
if (warnings.length) {
  console.log(`\n${warnings.length} profile(s) with gaps worth checking:`);
  warnings.forEach((w) => console.log(" -", w));
}
