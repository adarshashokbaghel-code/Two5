import { blogPosts } from "@/content/blog";
import { keywordRecords } from "@/content/seo/keywords";
import { publishedSeoPages, seoPages } from "@/content/seo/pages";
import type { SeoPage } from "@/content/seo/types";

const existingPaths = new Set<string>([
  "/",
  "/categories/numbers",
  "/blog",
  "/research",
  "/research/numbers",
  "/research/methodology",
  "/roadmap",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
]);

/** Links the Numbers arena page renders. The orphan check starts here. */
export const numbersArenaLinks = [
  { href: "/numbers/games/target-25", label: "How Target 25 works" },
  { href: "/numbers/games/sequence", label: "How Sequence works" },
  { href: "/numbers/games/pinpoint", label: "How Pinpoint works" },
  { href: "/numbers/sequences", label: "Sequence challenges" },
  { href: "/numbers/puzzles/make-25-from-8-3-6-and-1", label: "Make 25 from 8, 3, 6 and 1" },
  { href: "/numbers/guides/mental-estimation-techniques", label: "Mental estimation techniques" },
] as const;

const bannedClaims = [/improves iq/i, /raises iq/i, /prevents dementia/i, /increases intelligence/i, /proven to boost/i];
const placeholders = /\b(lorem ipsum|todo|tbd|placeholder|xxx)\b/i;

function words(text: string) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3),
  );
}

function jaccard(a: Set<string>, b: Set<string>) {
  let shared = 0;
  a.forEach((word) => {
    if (b.has(word)) shared += 1;
  });
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

function body(page: SeoPage) {
  return [
    page.introduction,
    ...page.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
    page.challenge?.prompt ?? "",
    page.challenge?.answer ?? "",
    ...(page.challenge?.steps ?? []),
    ...(page.faq?.flatMap((item) => [item.question, item.answer]) ?? []),
  ].join(" ");
}

function isKnownPath(href: string, pages: SeoPage[]) {
  if (existingPaths.has(href)) return true;
  return pages.some((page) => page.path === href);
}

export function validateSeoCatalog() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const pages = seoPages;
  const published = publishedSeoPages();
  const paths = new Set<string>();
  const primaries = new Map<string, string>();

  for (const post of blogPosts) {
    primaries.set(post.primaryKeyword.toLowerCase(), `/blog/${post.slug}`);
  }
  primaries.set("number games", "/categories/numbers");

  if (pages.length !== published.length) {
    errors.push("Only published, indexable pages belong in seoPages. Hold drafts in keywordRecords.");
  }

  for (const page of pages) {
    if (!/^\/numbers\/[a-z0-9-/]+$/.test(page.path) || page.path.endsWith("/")) {
      errors.push(`${page.id} has an invalid path ${page.path}`);
    }
    if (paths.has(page.path)) errors.push(`Duplicate path ${page.path}`);
    paths.add(page.path);

    const primary = page.primaryKeyword.toLowerCase();
    const owner = primaries.get(primary);
    if (owner && owner !== page.path) errors.push(`${page.path} reuses the primary keyword owned by ${owner}`);
    primaries.set(primary, page.path);

    if (page.h1.trim().length < 8) errors.push(`${page.path} is missing a meaningful H1`);
    if (page.metaTitle.length < 20 || page.metaTitle.length > 60) {
      errors.push(`${page.path} meta title length is ${page.metaTitle.length}`);
    }
    if (page.metaDescription.length < 80 || page.metaDescription.length > 170) {
      errors.push(`${page.path} meta description length is ${page.metaDescription.length}`);
    }
    if (page.introduction.length < 80) errors.push(`${page.path} introduction is too short`);
    if (body(page).length < 400) errors.push(`${page.path} does not have substantial body copy`);
    if (placeholders.test(body(page))) errors.push(`${page.path} still has placeholder copy`);
    if (bannedClaims.some((pattern) => pattern.test(body(page)))) {
      errors.push(`${page.path} includes an unsupported ability claim`);
    }
    if (page.pageType === "puzzle" && (!page.challenge || page.challenge.steps.length < 2)) {
      errors.push(`${page.path} is a puzzle without a checked solution`);
    }
    if (page.pageType === "collection" && (!page.listing || page.listing.length < 2)) {
      errors.push(`${page.path} is a collection without a visible list`);
    }
    if (!isKnownPath(page.parentPath, pages)) errors.push(`${page.path} parent is unknown: ${page.parentPath}`);

    for (const link of [...page.related, ...(page.listing ?? [])]) {
      if (!link.href.startsWith("/")) errors.push(`${page.path} has a non-internal link ${link.href}`);
      if (!isKnownPath(link.href, pages)) errors.push(`${page.path} links to an unknown path ${link.href}`);
      if (link.href === page.path) errors.push(`${page.path} links to itself`);
    }

    for (const reference of page.references ?? []) {
      if (!reference.href.startsWith("https://doi.org/") && !reference.href.startsWith("https://")) {
        errors.push(`${page.path} has a reference without a URL`);
      }
    }

    const keyword = keywordRecords.find(
      (record) => record.primaryKeyword.toLowerCase() === primary && record.targetUrl === page.path,
    );
    if (!keyword || !keyword.indexable || keyword.status !== "published") {
      errors.push(`${page.path} is missing a published keyword record for its primary keyword`);
    }
  }

  const titles = new Set<string>();
  for (const page of pages) {
    const title = page.h1.toLowerCase();
    if (titles.has(title)) errors.push(`Duplicate H1: ${page.h1}`);
    titles.add(title);
  }

  const bodies = pages.map((page) => ({ path: page.path, words: words(body(page)) }));
  for (let i = 0; i < bodies.length; i += 1) {
    for (let j = i + 1; j < bodies.length; j += 1) {
      const score = jaccard(bodies[i].words, bodies[j].words);
      if (score >= 0.72) errors.push(`${bodies[i].path} and ${bodies[j].path} are near-duplicates (${score.toFixed(2)})`);
      else if (score >= 0.55) warnings.push(`${bodies[i].path} and ${bodies[j].path} overlap (${score.toFixed(2)})`);
    }
  }

  const seen = new Set<string>(numbersArenaLinks.map((link) => link.href));
  const queue = [...seen];
  while (queue.length > 0) {
    const href = queue.shift() as string;
    const page = pages.find((item) => item.path === href);
    if (!page) continue;
    const next = [page.parentPath, ...page.related.map((link) => link.href), ...(page.listing ?? []).map((link) => link.href)];
    for (const candidate of next) {
      if (!pages.some((item) => item.path === candidate) || seen.has(candidate)) continue;
      seen.add(candidate);
      queue.push(candidate);
    }
  }
  for (const page of published) {
    if (!seen.has(page.path)) errors.push(`${page.path} is not reachable from the Numbers arena`);
  }
  for (const link of numbersArenaLinks) {
    if (!published.some((page) => page.path === link.href)) {
      errors.push(`Arena link ${link.href} does not match a published page`);
    }
  }

  for (const record of keywordRecords) {
    if (record.indexable && record.status === "published" && record.targetUrl) {
      if (!published.some((page) => page.path === record.targetUrl)) {
        errors.push(`Keyword “${record.keyword}” points at unpublished ${record.targetUrl}`);
      }
    }
    if (record.status === "refused" && record.indexable) {
      errors.push(`Refused keyword “${record.keyword}” is marked indexable`);
    }
  }

  return { errors, warnings };
}

export function assertSeoCatalog() {
  const { errors, warnings } = validateSeoCatalog();
  if (warnings.length > 0 && process.env.NODE_ENV !== "production") {
    console.warn("[seo]", warnings.join("\n"));
  }
  if (errors.length > 0) {
    throw new Error(`SEO catalog failed validation:\n${errors.join("\n")}`);
  }
}
