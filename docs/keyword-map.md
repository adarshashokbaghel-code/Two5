# Two5 keyword map

Status: **hypothesis**. No keyword tool was connected, so this file has no search volumes, difficulty scores, CPCs, or traffic forecasts. Validate queries in Google Search Console after the pages have been live long enough to collect impressions. Prefer the query report over this list when they disagree.

Cannibalization rule: one URL owns one intent. Research notes explain a Two5 category and its limits. Guides teach a puzzle type with original examples. The homepage owns the brand and the waitlist.

## Clusters

### Brand

| Primary | Secondaries | Intent | URL | Index now |
|---|---|---|---|---|
| Two5 | Two5 brain games, Two5 waitlist, give your brain a run | Brand | `/` | Yes |

Title: `Two5 — Give your brain a run`  
Description: the `siteConfig.description` string (waitlist, Numbers and Logic first, later categories named as later).  
H1: `TWO5 Give your brain a run.`

### Number sequences

| Primary | Secondaries | Intent | URL |
|---|---|---|---|
| number sequence puzzles | number pattern puzzles, missing number puzzles, number sequence reasoning, number puzzles with answers | Informational | `/blog/number-sequence-puzzles` |

Do not also target this cluster with `/research/numbers`. That note targets “what Numbers practice is and is not.”

### Logic deduction

| Primary | Secondaries | Intent | URL |
|---|---|---|---|
| logic puzzles with answers | logical reasoning puzzles, deduction puzzles, logic problems with solutions, reasoning challenges | Informational | `/blog/logic-puzzles-with-answers` |

`/research/logic` stays on the product note.

### Adult math reasoning

| Primary | Secondaries | Intent | URL |
|---|---|---|---|
| math puzzles for adults | mathematical reasoning puzzles, number challenge games, maths problem solving | Informational | `/blog/math-puzzles-for-adults` |

Held on purpose: “maths puzzles for college students” is not a separate URL. The adult guide already speaks to students and professionals without a duplicate page.

### Algorithms without code

| Primary | Secondaries | Intent | URL |
|---|---|---|---|
| algorithm puzzles | computer science puzzles, computational thinking problems, programming logic puzzles | Informational | `/blog/algorithm-puzzles` |

`/research/computer-science` states that this category is a later expansion.

### Competitive framing

| Primary | Secondaries | Intent | URL |
|---|---|---|---|
| competitive brain games | brain challenge games, online puzzle challenges, logic challenge games | Discovery | `/blog/competitive-brain-games` |

“Challenge your friends” and “leaderboard” are mentioned only as **not shipped**. Do not build URLs for those queries until the feature exists.

### Product notes (existing)

| URL | Primary job | Do not target |
|---|---|---|
| `/research/numbers` | What a Numbers score can and cannot mean | The sequence how-to |
| `/research/logic` | Deduction practice and transfer limits | The puzzle set |
| `/research/computer-science` | Planned CS rounds | The paper algorithms |
| `/research/memory-visual` | Recall practice and limits | A memory-game doorway |

### Not mapped to a new page

These were considered and refused until there is a real feature or a distinct article:

- multiplayer brain games, head to head puzzle games, brain game leaderboard, daily brain challenges
- brain games for college students as its own URL
- a page per game mode (Number Sprint, Logic Grid, and so on)

## Internal links

- Homepage `#guides` → the five puzzle guides, then the two evidence guides as a separate list.
- Each guide → one or two sibling guides, one product URL (`/research/...` or `/#how`), and `/#waitlist`.
- Research notes → the guides in `guidesForResearch`.
- Anchors are the article title or “guides” / “Join the waitlist”. No repeated exact-match footers.

## How to validate

1. Search Console → Performance → filter page to each URL above.
2. Keep a query on a URL when that URL already answers it.
3. If `/research/numbers` and the sequence guide compete for the same query, tighten titles rather than adding a third page.
4. Revisit this file when a category actually ships. Then, and only then, consider a mode page with something to play.

## Evidence and trust

These queries share a topic but not an intent. Keep them on separate URLs.

| Primary | Secondaries | Intent | URL | Why this URL |
|---|---|---|---|---|
| Two5 about | what is Two5, Two5 mission, Two5 research direction | Brand trust | `/about` | Product, audience, and the claims Two5 refuses. Mission is this page. There is no `/mission`. |
| how Two5 reads evidence | research-informed game design, evaluating cognitive training claims | Methodology | `/research/methodology` | The filter for a public health sentence. Not a study result. |
| brain games cognitive training research | cognitive training evidence, near transfer far transfer, do brain games work | Research explainer | `/blog/what-research-says-about-brain-games` | What official sources support, with populations named. |
| can brain games prevent dementia | brain games and dementia evidence, do puzzles prevent Alzheimer's | Health question | `/blog/can-brain-games-prevent-dementia` | Direct answer: no for ordinary games, including Two5. |
| Two5 research collaboration | — | Contact | `/research/collaborate` | Email only. No open trial. |
| contact Two5 | hello@mentr.in | Contact | `/contact` | The mailbox already used on the legal pages. |

`/research` stays the category-note index. It must not be rewritten to target “brain games and dementia.” That question belongs to the prevention guide.

Cannibalization to avoid:

- Do not add `/mission`. About already holds near, medium, and long-term goals.
- Do not add a second “do brain games work” article. The research guide owns that question. The prevention guide owns the disease-outcome question.
- Do not point health-information titles at the waitlist as the primary button. Those posts use `ctaHref` for the evidence or about page. The waitlist stays a second, labelled game link.

Validation status: hypothesis. No Search Console impressions were available in this repository on 27 October 2026. Sources for the scientific sentences are the WHO 2019 guideline, NIA prevention and cognitive-health pages, Simons et al. 2016, Owen et al. 2010, and the NIH 10 February 2026 ACTIVE follow-up note. URLs are on the articles. Search volumes were not collected.
