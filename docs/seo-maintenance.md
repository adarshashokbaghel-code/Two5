# Two5 SEO maintenance

The site is not deployed by editing these notes. Ship the Next.js app, then use Search Console against **https://www.two5.in**.

## After each release

1. Open `https://www.two5.in/robots.txt`. It should allow `/`, disallow `/api/`, and list `Sitemap: https://www.two5.in/sitemap.xml`.
2. Open `https://www.two5.in/sitemap.xml`. Every `<loc>` should be `https://www.two5.in/...` and should return 200 without a redirect chain.
3. View source on the homepage, one guide, and one research note. Check a single `<title>`, one meta description, one canonical, and JSON-LD that matches the visible copy.
4. Confirm the homepage H1 is still the brand line, and that no page says a round, friend challenge, or leaderboard is live unless it is.

## Search Console

This repository cannot submit the sitemap. After deploy:

1. Use the property that matches `https://www.two5.in/`. Apex `https://two5.in/` redirects there.
2. Add the sitemap URL if it is not already submitted.
3. URL inspection, in this order: `/`, `/about`, `/blog`, the puzzle guides, the two evidence guides, `/research`, `/research/methodology`, `/research/collaborate`, `/contact`.
4. Pages → exclude accidental noindex, soft 404s, and “Crawled – currently not indexed” that stay stuck. A sitemap does not force indexing.
5. Experience → Core Web Vitals, when the report has data. Do not chase a lab score by deleting the hero.

There was no verification file in the repo on 27 October 2026. If verification is DNS-based, leave it. If you add an HTML tag later, put it in the root metadata without removing other tags.

## GA4

No measurement ID is configured. `track()` in `src/lib/analytics.ts` emits a `two5:analytics` event and, if `window.gtag` already exists, forwards the same event.

Events that mean something:

| Event | When it fires |
|---|---|
| `landing_page_view` | Homepage mount |
| `blog_index_view` | Guide index mount |
| `blog_article_view` | A guide mount (`source` is the slug) |
| `waitlist_cta_click` | A waitlist link or button (`source` is the placement) |
| `waitlist_signup_started` | A real submit begins |
| `waitlist_signup_success` | The server accepts the signup |
| `waitlist_signup_error` | Validation or server failure |
| `contact_click` | A mailto link on `/contact` or `/research/collaborate` (`source` is the page) |

Do not count `waitlist_cta_click` as a signup. Do not count `contact_click` as study enrollment. Do not send email addresses, OTPs, or health details as parameters. Search impressions, visits, signups, future gameplay, and research outcomes are separate.

Suggested explorations once GA4 is connected: organic landing page, guide slug, CTA source, and the ratio of signup success to signup started.

## Adding a guide

1. Add a `BlogPost` in `src/content/blog.ts` with a unique `slug`, `seoTitle`, `description`, `published`, and `updated`.
2. Write original examples. Link one existing guide and one real product URL. End with the waitlist, using `ResearchCta` via the article template.
3. Do not mark a Two5 mode as playable.
4. The sitemap and `generateStaticParams` read `blogPosts`. No manual sitemap edit.
5. Add the URL to `public/llms.txt`.
6. If the guide belongs next to a research note, add its slug in `researchGuides`.
7. Build, then check `/blog/[slug]` for one H1, canonical, and Article JSON-LD.

## Adding an evidence guide

1. Follow the guide steps above, and set `ctaHref` to `/about` or `/research/methodology` rather than the waitlist. The template still offers a separate, labelled game-waitlist link.
2. Add every health sentence to the claims table in `docs/research-editorial-policy.md` before the page is published: exact claim, source, population, evidence type, limit, and whether it is fit to say in public.
3. Do not promise prevention, diagnosis, a risk score, an open study, or a partner institution.
4. Link the new guide from the existing evidence guide’s `related` list so it is not an orphan. Do not also create a near-duplicate URL.

## Monthly

- Search Console queries with impressions and weak click-through: adjust the title or description for that URL only.
- Queries you cannot answer: either extend an existing guide or leave the query. Do not open a thin page.
- If a feature ships (a real round, a friend challenge), update the homepage, FAQ, the competitive guide, `llms.txt`, and this map in the same change.

## What not to add

- `FAQPage` markup only to chase a rich result.
- Fake authors, ratings, or social profiles.
- Extra `robots.txt` tokens for bots you have not looked up.
- A second canonical host. www is the one that returns 200.
