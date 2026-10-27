# Two5 SEO audit

Audit date: 27 October 2026. Source of truth: this repository and the live host behaviour checked the same day.

**Addendum, same day.** About, contact, evidence standards, collaboration, and two sourced health guides were added after this inventory. The current route list, journeys, and indexability decisions are in `docs/seo-architecture.md`. Claims rules are in `docs/research-editorial-policy.md`. Do not treat the tables below as the full site if they omit those URLs.

Nothing here promises rankings, indexing, AI citations, or traffic.

## Architecture

- Next.js 16.4.3, App Router, React 19.
- Public UI is server-rendered. The homepage sections are client components, but their copy is in the initial render.
- Production hostname is **https://www.two5.in**. `https://two5.in` returns **308** to the www host (Vercel). The repository previously set canonicals and the sitemap to `https://two5.in`, which is a redirect. Canonicals now use `https://www.two5.in`.
- Trailing slashes are off (Next.js default). Do not add a second URL style.
- There is no Google Search Console verification meta tag or HTML file in the repo or on the live homepage HTML fetched on 27 October 2026. Do not invent one.
- There is no GA4 or GTM snippet. `src/lib/analytics.ts` records product events and forwards them to `gtag` only when a tag is already on the page.

## What the product actually is

Two5 is a competitive brain-challenge game **in development**. The website’s job is explanation plus the waitlist.

- First categories being built: Numbers (Number Sprint, Sequence Hunt, Target Number) and Logic (Pattern Breaker, Hidden Rule, Logic Grid).
- Next expansion, not first release: Computer Science and Memory & Visual.
- Not available on the site: playable rounds, friend challenges, leaderboards, a launch date.
- Audience described on the site: people who like puzzles and reasoning, including college students and working professionals. Not a course.

## Route inventory

| URL | Page type | Intent | Primary keyword | Index | Canonical | Schema | Conversion |
|---|---|---|---|---|---|---|---|
| `/` | Homepage | Brand, discovery, conversion | Two5 | Index | `https://www.two5.in/` | Organization, WebSite, WebPage | Waitlist |
| `/blog` | Guide index | Informational | puzzle guides | Index | `https://www.two5.in/blog` | WebPage, BreadcrumbList, CollectionPage | Waitlist via articles |
| `/blog/number-sequence-puzzles` | Guide | Informational | number sequence puzzles | Index | same path on www | Article, WebPage, BreadcrumbList | Waitlist |
| `/blog/logic-puzzles-with-answers` | Guide | Informational | logic puzzles with answers | Index | same | Article, WebPage, BreadcrumbList | Waitlist |
| `/blog/math-puzzles-for-adults` | Guide | Informational | math puzzles for adults | Index | same | Article, WebPage, BreadcrumbList | Waitlist |
| `/blog/algorithm-puzzles` | Guide | Informational | algorithm puzzles | Index | same | Article, WebPage, BreadcrumbList | Waitlist |
| `/blog/competitive-brain-games` | Guide | Discovery | competitive brain games | Index | same | Article, WebPage, BreadcrumbList | Waitlist |
| `/research` | Category notes index | Product explanation | Two5 categories | Index | `/research` | CollectionPage | Waitlist from notes |
| `/research/numbers` | Research note | Product + informational | numerical reasoning practice | Index | `/research/numbers` | Article, WebPage, BreadcrumbList | Waitlist |
| `/research/logic` | Research note | Product + informational | logic puzzles practice | Index | `/research/logic` | Article, WebPage, BreadcrumbList | Waitlist |
| `/research/computer-science` | Research note | Product + informational | computer science puzzles | Index | `/research/computer-science` | Article, WebPage, BreadcrumbList | Waitlist |
| `/research/memory-visual` | Research note | Product + informational | memory and visual challenges | Index | `/research/memory-visual` | Article, WebPage, BreadcrumbList | Waitlist |
| `/privacy` | Legal | Trust | privacy policy | Index | `/privacy` | WebPage, BreadcrumbList | None |
| `/terms` | Legal | Trust | terms | Index | `/terms` | WebPage, BreadcrumbList | None |
| `/cookies` | Legal | Trust | cookies | Index | `/cookies` | WebPage, BreadcrumbList | None |
| `/api/*` | Private | — | — | Not for indexing | — | None | — |
| Unknown URLs | 404 | — | — | noindex | — | None | Link home |

Redirects already in `next.config.ts` (permanent): `/research/daily` → `/research/memory-visual`, `/research/versus` → `/research/numbers`. Left in place.

No separate arena, game, about, or contact URLs. The homepage sections and research notes already cover the categories. New thin landing pages were not created.

Secondary keywords, titles, and links are in `docs/keyword-map.md`.

## Technical findings

### Fixed in this change

- Canonical origin moved to `https://www.two5.in` (`src/config/site.ts`). `metadataBase` follows that value.
- Root layout no longer forces every URL to canonicalize to `/`. The homepage sets its own canonical. Other public pages set theirs.
- Root layout no longer emits `index, follow` on top of the 404 `noindex`. A real `not-found` page asks for `noindex`.
- `src/app/robots.ts` allows `/`, disallows `/api/`, and points at the absolute sitemap. No extra bot tokens.
- Sitemap includes the guide index and five articles, keeps research and legal URLs, and uses www. `lastModified` is a content date, not “now” on every deploy.
- Live `/robots.txt` on 27 October 2026 was a **soft 404** (HTML 404 with a title). It will be a real file after this build is deployed.
- Live sitemap URLs used `https://two5.in/...`, which redirect. They will match the canonical host after deploy.
- Research index Open Graph text no longer mentions a daily problem or sending a challenge as if those were live.
- Privacy contact line now cites `https://www.two5.in`.

### Left alone

- No GSC verification file was present, so none was overwritten.
- No GA measurement ID was invented.
- Homepage visual system (Outfit, dark sections, hero line) was kept. A Guides section was added under the FAQ. The hero H1 is still “TWO5 Give your brain a run.”
- The document title on the homepage is now “Two5 — Give your brain a run” so it matches the H1. The previous title was “Two5 — Play a sharper game”.

### FAQ schema

The homepage FAQ is real and visible. `FAQPage` JSON-LD was **not** added. Google has limited FAQ rich results, and the markup would not match a result we can honestly expect. The questions stay in the HTML.

### Structured data

| Route | Types |
|---|---|
| All pages | Organization and WebSite in the root layout, with stable `@id`s |
| Homepage | WebPage |
| Guides index | WebPage, BreadcrumbList, CollectionPage |
| Each guide | WebPage, BreadcrumbList, Article |
| Research index | CollectionPage |
| Each research note | WebPage, BreadcrumbList, Article |
| Legal pages | WebPage, BreadcrumbList |

Author is the Two5 organization. No person, review, rating, or sameAs profile was invented.

Schema was not submitted to Google’s Rich Results Test from this environment. Syntax is JSON-LD in the page HTML. Validity is not the same as rich-result eligibility.

## GEO and AEO

Implemented:

- One definition of Two5, repeated on the homepage Guides section, guide index, `llms.txt`, and the competitive-brain-games article: what it is, who it is for, what is first, what is later, what you can do today (waitlist).
- Guides open with a direct answer, then headings, original examples, and sources where a factual claim needs one.
- `public/llms.txt` lists public URLs and says rounds are not playable. It is not a ranking factor.
- `robots.txt` does not cloak and does not add unofficial AI-crawler directives. `User-agent: *` may fetch public pages. `/api/` stays disallowed. Search indexing, AI answers, and model training are different things; this file does not try to settle training policy.

Not done:

- No per-bot allow/deny list. Add one only after reading that bot’s current docs and deciding a policy.
- No claim that any guide will be cited.

## Competitors looked at

Checked on 27 October 2026, as public pages, not as a rank tracker:

- Puzzle Baron runs a monthly logic high-score challenge where difficulty and speed affect points (`https://logic.puzzlebaron.com/contest1.php`). That is live scored play. Two5 is not.
- Puzzlelands and several “brain speed” leaderboard sites sell daily puzzles plus ranks. Their leaderboards are their product. Copying that UI or those puzzles would be both thin and inaccurate.
- The Simons et al. 2016 review is the source we cite when rejecting “brain training raises unrelated ability.”

No search volumes, keyword difficulty, or “we outrank X” claims.

## Internal links

- Homepage Guides section links to all five articles.
- Footer links to Guides and Research.
- Each guide links to related guides, the relevant research note or homepage section, and the waitlist.
- Each research note links to the matching guides.
- Research index links to `/blog`.
- No audience doorway pages (no separate “for students” URL).

## Validation

See the engineering report for the commands actually run after implementation. Deploy is separate: these files are local until they ship.

## Manual steps

1. Deploy this revision.
2. In Google Search Console, confirm the property is `https://www.two5.in/` (the host that returns 200).
3. Submit `https://www.two5.in/sitemap.xml` if that property does not already have it.
4. Inspect the homepage, `/blog`, and the five guides. Do not request indexing for `/api` or the 404.
5. If GA4 is wanted, add the existing tag. Events already call `gtag` when it exists. Do not put email addresses in event parameters.
