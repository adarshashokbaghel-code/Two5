# Two5 information architecture

Date: 27 October 2026. This describes the repository after the research-led pages were added. It does not describe production until that revision is deployed. Rankings, indexing, and AI citations are not claimed.

Canonical host: `https://www.two5.in`. Apex `https://two5.in` 308-redirects there. There is no `/mission` URL. The near-term, medium-term, and long-term direction is a section of `/about`, because a second page would answer the same question.

## What each public page is for

| URL | Audience | Job | Index |
|---|---|---|---|
| `/` | Players and brand search | Say what Two5 is, show the first screen as the game, offer the waitlist | Yes |
| `/about` | Anyone checking the brand | Product truth, who it is for now, longer direction, claims refused | Yes |
| `/blog` | Puzzle and research readers | Index of guides | Yes |
| `/blog/number-sequence-puzzles` | Puzzle intent | Worked number sequences | Yes |
| `/blog/logic-puzzles-with-answers` | Puzzle intent | Worked logic puzzles | Yes |
| `/blog/math-puzzles-for-adults` | Puzzle intent | Worked mathematical reasoning | Yes |
| `/blog/algorithm-puzzles` | Students and technical readers | Algorithm puzzles without requiring code | Yes |
| `/blog/competitive-brain-games` | People comparing challenge formats | What a fair scored challenge is, without a superiority claim | Yes |
| `/blog/what-research-says-about-brain-games` | Research readers | Training vs games vs mental activity, with limits | Yes |
| `/blog/can-brain-games-prevent-dementia` | Health-information seekers | Direct answer that ordinary games, including Two5, do not prevent dementia | Yes |
| `/research` | People learning the categories | Four category notes. Not a clinic | Yes |
| `/research/numbers`, `/logic`, `/computer-science`, `/memory-visual` | Category readers | What that category is meant to practise, and what a score is not | Yes |
| `/research/methodology` | Anyone judging a health sentence | How Two5 reads evidence | Yes |
| `/research/collaborate` | Researchers and accessibility specialists | Email interest. No enrollment | Yes |
| `/contact` | Anyone with a question | `hello@mentr.in`, the address already on the legal pages | Yes |
| `/privacy`, `/terms`, `/cookies` | Legal | Existing policies | Yes |
| `/api/*` | — | Waitlist endpoint | Disallow in robots |

Permanent redirects already in `next.config.ts`: `/research/daily` → `/research/memory-visual`, `/research/versus` → `/research/numbers`.

Not created, on purpose: `/mission`, per-game URLs, “for students,” “for seniors,” leaderboard, or multiplayer landings. Those would either duplicate a page or describe a feature that is not live.

## Journeys

Puzzle search → a puzzle guide (answer in the HTML) → a related guide or a category note → homepage product explanation → waitlist.

Student or professional search → algorithm or reasoning guide → category note or “how it works” → waitlist.

Research search → the research guide or `/research/methodology` → About for the direction → collaboration email if they work in the field, or the waitlist only if they want the game.

Health-information search → the dementia guide. The primary button goes to About, not the waitlist. Sources and the “see a clinician” line come before any game signup. The waitlist on that page is labelled as game news.

## Internal links

- Homepage `#guides` lists the five puzzle guides, then the two evidence guides under a separate label, plus one link to `/about`.
- Footer: Play, Arenas, How it works, FAQs, Guides, Research, About, Contact, and the legal pages.
- Puzzle guides link to sibling guides, a product URL, and the waitlist.
- Evidence guides link to each other, the competitive guide, methodology, and About. Their primary button is not the waitlist.
- Category notes link to the puzzle guides in `researchGuides`. They do not link the health guides, because a category note is not a clinical page.
- Research index links to methodology and collaboration and says there is no open study.
- About links to methodology, the category index, collaboration, and the waitlist.

## Indexability

All of the URLs in the table above are in `src/app/sitemap.ts` except `/api`. `src/app/robots.ts` allows `/`, disallows `/api/`, and lists `Sitemap: https://www.two5.in/sitemap.xml`. The 404 sets `noindex`. Root layout does not force `index, follow` onto every response.

`public/llms.txt` repeats the public URLs and the limits (no playable rounds, no medical benefit, no open trial). It is a summary for anyone who fetches it. It is not a ranking system.

## Structured data

Organization and WebSite are in the root layout. About, contact, methodology, and collaboration add WebPage and BreadcrumbList through `InfoPage`. Guides add Article. Author is the organization. No Person, review, rating, address, award, or clinical study is in the graph.

## Accessibility notes

This is not a claim that the site is WCAG conformant or suitable for people living with dementia.

Already in the CSS: a visible `:focus-visible` outline, and `prefers-reduced-motion` handling. Body text on the paper pages is 16px with relaxed line height. Buttons used for the waitlist and primary article actions are 48px tall.

Not done, and not claimed:

- A screen-reader pass.
- Measured contrast ratios.
- Testing with older adults.
- An adjustable-difficulty game, because rounds are not playable.
- A statement that the interface is clinically appropriate.

The waitlist does not ask health questions. Game scores, when they exist, must not be described as a diagnosis or a dementia-risk number.

## Measurement

`track()` in `src/lib/analytics.ts` does not send email or health fields. `waitlist_signup_success` fires only after the server accepts the signup. `contact_click` fires when someone uses the mailto link on Contact or Collaboration. A click on “Read the evidence standard” is an ordinary link, not a waitlist event.

Search impressions, visits, waitlist signups, future product use, and research outcomes are different numbers. None of them is evidence that Two5 changes cognitive health.
