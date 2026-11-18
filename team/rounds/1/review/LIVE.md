# Round 1 live review: v0.1.7

**By:** reviewer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18.
**Reviewed:** https://mondweep-chakravorty.agenticcells.site (footer "Version v0.1.7"), against the 42 conditions in `team/rounds/1/review/DESIGN.md`, `team/rounds/1/build/NOTES.md`, `data/site.mjs` and `research/facts.json` / `research/sources.md`.
**How checked (C1):** all 19 URLs fetched with curl (every one HTTP 200: the 16 HTML pages, `/llms.txt`, `/index.md`, `/facts.json`; `/behind-the-scenes/` has one subpage, `/behind-the-scenes/rounds/1/`). Visible text extracted from every page and searched for em and en dashes, hype words, American spellings, email addresses, names, hash values and the wording the design review banned. Playwright (Chromium) on the 16 HTML pages at 390 and 1366 px, with and without JavaScript: `scrollWidth`, `<h1>` count, heading order, target sizes, focus ring on Tab, text contrast by the WCAG formula, third-party resources, the Designs dialog. Every `og:image` fetched with curl. Spot checks of claims against `research/facts.json` and `research/sources.md`, and three against the live sources (ruv.sgit.ai offers.json, the provider page). `board/HOLD.md` does not exist.

## Verdict

**Pass with follow-ups.** No fact without a source, no person beyond Mondweep Chakravorty, Dinis Cruz and rUv, no image of him, contact only `agent@riskmandate.ai`, prices exactly as published, the talk only on `/collaboration/` and as Dinis Cruz's. No horizontal scroll at 390 or 1366 px on any page. Two findings must be fixed before round 2 closes (1 and 2); the rest are small.

## Findings, by severity

| No. | Severity | Page | Finding | Fix | Must fix before round 2 closes |
|---|---|---|---|---|---|
| 1 | medium | `/behind-the-scenes/rounds/1/` | The "before" screenshots of v0.1.2 are published on the live site and show the two claims the design review rejected: "The talk at Agentic Engineering Live, London" as a card under "What he has built", and "Three safeguards held throughout the run" (`r1-before/built-*.jpg`, `r1-before/collaboration-*.jpg`). They are labelled "the live site before round 1", but nothing says those claims were wrong, so a reader can take them as true (conditions 3 and 15). | Add one line under "Before the round": "The first pass had errors corrected in round 1: the talk of 15 October 2026 was Dinis Cruz's, not Mondweep's; the three safeguards were each tested at their own step, not held throughout the run." Keep the screenshots (they are the record). | yes |
| 2 | medium | `/behind-the-scenes/rounds/1/` | The round aim, quoted from `team/rounds/1.md`, lists "the talk" inside "what he has built (... the Ruflo pull request, the talk)". It is the conductor's words, shown as such, but it presents the talk as his work on the live site (condition 15). | Conductor: add a note after the aim in `team/rounds/1.md`, for example "(The talk was Dinis Cruz's; the design review moved it to /collaboration/.)", so the generated page carries it. Do not rewrite the aim. | yes |
| 3 | low | `/collaboration/` | "Eleven newsroom articles by Dinis Cruz name Mondweep in their text" is the researcher's own count (`research/sources.md` 3.1 method), but its markers point to three articles, which do not give the number. CLAUDE.md: mark every number with its source. | "Eleven newsroom articles by Dinis Cruz name Mondweep in their text, by this site's count of the newsroom on 18 November 2026", and cite `/sources/` or the method. | no |
| 4 | low | `/collaboration/`, `/built/`, `/proof-of-concept/` | Some sourced details are in `research/sources.md` but not in a `research/facts.json` quote: the offer descriptions and instance types (t3.medium, m7i.xlarge, g5.xlarge with A10G), "Most clients start small and stop at any step", the PR's first two commit hashes, "story on the left ... terminal on the right", "enforce mode". I checked them: all are in the sources (offers.json, the provider page, sources.md 3.3 and 3.5). | Researcher: add them as facts (or extend the quotes of F21 to F24, F52, F58, F74) so `facts.json` holds every fact the site prints. | no |
| 5 | low | the Designs dialog on every main page other than `/` | The dialog marks the Ledger link (`href="/"`) with `aria-current="page"` on `/collaboration/` and the other main pages, which tells a screen reader that the home page is the current page. | Use `aria-current="true"` (with the visible "You are here") when the current page is not `/`; keep `"page"` on `/` and on each `/d/<id>/`. | no |
| 6 | low | all pages at 390 px | A pair of source markers can break across lines, leaving one marker alone at the start of a line (home "Who he is" `6 7`, `/collaboration/` "Five kinds of project" `3 7`). Cosmetic. | Wrap adjacent markers in one `<span style="white-space:nowrap">`, or join them with a no-break space. | no |
| 7 | note | `/facts.json`, `/index.md` | Both carry the two "How the marketplace began" sentences about Dinis Cruz's talk. They mirror `/collaboration/`, attribute the talk to him, and the build notes only claim the AI question about the talk was left out, so this meets condition 15 in substance. Recorded so nobody reads "once, on /collaboration/" as broken. | None, unless Dinis wants the talk only on the HTML page. | no |

Nothing found at high severity.

## Checks that passed

1. **Screenshots** (`node scripts/shots.mjs --max-height=3000`): no horizontal-overflow warning on any of the six pages at 390 or 1366 px. Files re-encoded afterwards to keep them small (1366 px shots scaled to 1024 px wide; 1.9 MB in all).
2. **Facts.** Every sentence I sampled on every page traces to a source id whose facts are in `research/facts.json` (or to `research/sources.md` for the details in finding 4). Home lede is F05 and F06 wording; proof point as condition 9; step titles, phases (3/3/4/2) and safeguards at steps 4, 6 and 11 as F54 and F56; fingerprint line as condition 4, no hash value on any page or in `/facts.json`; "semantic recall NOT VALIDATED" on `/`, `/proof-of-concept/` and all five designs; "Kestrel" called a test name; "Merged by rUv" cites the newsroom (F71); no commit count; "with five other chapter leaders" (F32 names one co-founder plus four others: correct).
3. **The talk** appears in HTML only on `/collaboration/`, under "How the marketplace began", as Dinis Cruz's, with "No source says Mondweep spoke at the event". Not on `/`, `/built/`, `/ai/`, `/llms.txt` or any design. (Behind-the-scenes: findings 1 and 2.)
4. **Prices** on `/collaboration/` and in `/ai/`: task runs £10 / £20 / £50, own key £9 / £17 / £40; compute £21 / £23 / £36 per 8-hour block, marked "not built yet"; repository £149 / £499 / £1,500 a month; expert time £500 / £1,500 / £5,000. All match F21 to F25 and the live offers.json; GBP excluding VAT; "a person starts, watches and hands over every run" (F26).
5. **People.** Capitalised name pairs in all page text: only Mondweep Chakravorty, Dinis Cruz, and rUv (never "Reuven Cohen"). None of the 17 names in `research/sources.md` section 6 appears.
6. **Images.** No photo of him anywhere. The monogram "MC" stands in on pages, cards and thumbnails; the provider page itself uses an "MC" monogram, so the behind-the-scenes line "as on his provider page" holds.
7. **Contact.** The only outside email address on the site is `agent@riskmandate.ai` (24 times). No agentics.org address, no form. Other addresses are the team's own role names on `/behind-the-scenes/`.
8. **Link previews.** All 16 HTML pages have `og:title`, `og:description` and an absolute `og:image`; all 15 distinct card URLs return 200, `image/png`, 1200x630, 61 to 88 KB. `/d/ledger/` has canonical `/`. The `/collaboration/` card checked by eye: monogram, no photo.
9. **Designs pop-up.** Clicking Designs on `/`, `/collaboration/` and `/d/broadsheet/` opens the `<dialog>` with all five designs and `/d/`; Esc closes it and focus returns to the Designs control. Without JavaScript the same control goes to `/d/`, which lists the five designs as plain links with "Best for".
10. **Accessibility.** One `<h1>` per page, no skipped heading levels, `<main>` and `lang="en-GB"` on every page; one script per page (the dialog enhancement); no third-party script, stylesheet, font or image. Every stand-alone link and button is at least 44 px tall; source markers carry a 44 by 44 px absolutely positioned hit area (condition 13). Tab shows a 3 px solid focus outline in each design's focus colour (Ledger #B4531A, Run log #F2C14E, Vault #8FD3B8 checked). Every text node meets 4.5:1 (3:1 for large text) on all 15 distinct pages at 1366 px. `scrollWidth` equals the viewport at 390 and 1366 px on all 16 pages, with and without JavaScript.
11. **Wording.** No em or en dashes and no hype words in the visible text of any page or of `/llms.txt`, `/index.md`, `/facts.json`; no American spellings; none of the banned design-review wording ("sealed", "throughout", "REV:", invented commands).

## After: screenshots of v0.1.7

Taken 2026-11-18 with `node scripts/shots.mjs --max-height=3000`; top 3000 px of tall pages, 1366 px shots scaled to 1024 px wide.

| Page | 390 px | 1366 px |
|---|---|---|
| `/` | [after/home-390.jpg](after/home-390.jpg) | [after/home-1366.jpg](after/home-1366.jpg) |
| `/proof-of-concept/` | [after/proof-of-concept-390.jpg](after/proof-of-concept-390.jpg) | [after/proof-of-concept-1366.jpg](after/proof-of-concept-1366.jpg) |
| `/collaboration/` | [after/collaboration-390.jpg](after/collaboration-390.jpg) | [after/collaboration-1366.jpg](after/collaboration-1366.jpg) |
| `/d/` | [after/d-390.jpg](after/d-390.jpg) | [after/d-1366.jpg](after/d-1366.jpg) |
| `/d/runlog/` | [after/d_runlog-390.jpg](after/d_runlog-390.jpg) | [after/d_runlog-1366.jpg](after/d_runlog-1366.jpg) |
| `/behind-the-scenes/` | [after/behind-the-scenes-390.jpg](after/behind-the-scenes-390.jpg) | [after/behind-the-scenes-1366.jpg](after/behind-the-scenes-1366.jpg) |

## For Dinis (through the conductor)

- Unchanged from the design review: whether Mondweep has approved the long bio (F09 to F12, F14). It stays off the site, and the build refuses it.
- Mondweep has not yet reviewed any version of the site (the site says so on `/behind-the-scenes/`).
