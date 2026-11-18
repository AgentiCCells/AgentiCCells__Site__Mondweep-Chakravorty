# Round 2 copy

**By:** writer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18. **Changed:** `data/site.mjs` only.

**Inputs.** `team/rounds/2/research/GAPS.md` (every item for the writer), `team/rounds/2/design/PROPOSAL.md` (the copy each of the ten changes needs), `research/facts.json` (F09 to F12, F14, F94 to F145), and Dinis Cruz's words in `team/WORKFLOW.md`: the headshot (about 10:46 UTC), the long bio cleared (about 10:50 UTC: "Yes the site can use that longer bio from ruv.sgit"), and "as good and creative as the other ACC sites" (about 10:55 UTC). The design review (`team/rounds/2/review/DESIGN.md`, 744b40e) arrived while this copy was being written; every condition marked for the writer is applied (section 3).

## 1. Fixes from GAPS.md

| Gap | Was | Now | Source |
|---|---|---|---|
| 1, "agentic engineering work" | HOME.intro[2], COLLAB.intro[0]: "a small marketplace for agentic engineering work" | "a small marketplace for agent work done under a written mandate per role" | F105 (llms-ruv), F19 |
| 1, PERSON.status[0] | unchanged | kept, with `src: []`; the sentence names its source (Dinis Cruz's word to the team) | team/WORKFLOW.md |
| 2, step times | POC.steps 2, 5, 8: `at: null` | `'0:14'`, `'0:38'`, `'0:58'`; header comment says the article times all twelve steps | F112, F115, F118 |
| 2, PR opened | "the evening of 16 October 2026, London time" | PR.openedText "at 23:02 on 16 October 2026, London time"; PR.summary[0] reworded to match | F128 |
| 2, article titles | Nos. 166, 178, 193 "title taken from the address" | full titles in SOURCES.mess, .reach, .librarian; the "not recorded" notes and titleNotes dropped; short titles now "Who will fix your mess?", "What can your agent reach?", "The Librarian's daily brief" (capital L, as the source spells it) | F135, F140, F141 |
| 2, No. 175 | note "shortened from the address" | note and titleNote: "the opening words of the title; the rest names a person this site does not name" | F139 |
| 2, articlesNote (finding 3) | "Eleven newsroom articles ..." cited to three articles | "By this site's count of the newsroom on 18 November 2026, eleven of its 470 articles name Mondweep in their text, all by Dinis Cruz and dated 16 to 18 October 2026." `kind: 'count by this site'`, cited to the new source `newsroom-index` | F145 |
| 2, OPEN[3] | "start and end ... (steps 5 and 8)" | "start and end of the fingerprint at step 8" | F118 |
| 3, facts map | | every new fact added to its SOURCES id as GAPS.md section 3 lists: offers F94 to F97; provider F98 to F101; ruv-home F102 to F104, F106; llms-ruv F105; next-phase F107; poc F108 to F124, F133; vault F125, F134; policy-door F126, F127, F132; pr-article F128, F136; pr and ruflo-git F129; pr-page F130; ready F131; mess F135; decisions F137; policies F138, F142; allowed F139, F143; reach F140; librarian F141, F144; newsroom-index F145 | |

`providers-data` now also backs F09, F10, F11, F12 and F14 (cleared). F13 and F15 are not used anywhere in the data.

## 2. New exports and fields (for the developer)

All are documented in the top comment of `data/site.mjs`.

- **PHOTO** `{ src: '/assets/photo/mondweep-chakravorty.png', alt: 'Mondweep Chakravorty', width: 200, height: 200, credit }`. PERSON.status[1] now reads: "The only photograph of him on this site is the headshot Dinis Cruz supplied with his agreement on 18 November 2026." (`src: []`, Dinis's word). PERSON.monogram stays for the typographic designs and cards.
- **HOME.hero** (change 1): eyebrow "London. Co-founder, Agentics Foundation London"; line "Enterprise AI leader and agentic systems builder. Through DxSure Ltd he advises on and builds agentic AI systems."; lede "Two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover." (all `provider`); actions "See the proof of concept" (primary) and "Work with him" (`#work`). HOME.actions is unchanged, for anything that still uses it.
- **HOME.numbers** (change 1), each `{ value, label, text, src }`: `12` steps and 3 safeguards [poc]; `#4239` merged into Ruflo on 17 October 2026 [pr-article, pr-page]; `About 300` engineers, strategists and educators, the community of the chapter he co-founded, as its site gave it on 18 November 2026 [provider, london]; `2` founding providers, him and Dinis Cruz [llms-ruv, ruv-home].
- **HOME.career** (changes 3, 5): kicker, heading "From HSBC Global Technology to DxSure Ltd", `headingPlain: 'Career'`, a two-sentence summary [providers-data], link to `/experience/`.
- **POC.resultsNote** and **POC.phasesNote** (change 2, 7): "The results are the run's own summary (step 12); setting each beside a step is this site's reading." and "The four phases are this site's grouping, not the article's. Times are from his video." 
- **HOME.pullQuote** (change 3): Dinis Cruz's words from POC.quote, word for word (F61), with the cite line "Dinis Cruz, in the newsroom article on the proof of concept, 17 October 2026" [poc].
- **WORK** (change 4a): the five kinds of project [types]; four offer groups, one line each, prices as published [offers, llms-ruv], Dedicated compute tagged "Not built yet"; How to enquire (email, label, subject, provider page) [provider]; What happens next, four items in the sources' words, to show as bullets: dates and a quote, no payment (F20); a suggested starting combination, agreed in the first conversation (F99); start small and stop at any step (F98); "Runs are not automated end to end yet: a person starts, watches and hands over every run." (F26); the disclaimer [ruv-home].
- **COLLAB.strip** (change 4b): 16, 17 and 21 October 2026, London times. It starts on 16 October so the talk appears once on the page.
- **CAREER** (change 5): the `/experience/` page. Intro, `pathLabel` "In the order the source gives", a path of five ordered stops (First, Then, After the MBA marked `labelOurs`; Later, Since September 2024 as the source has them) with organisations and the source's words, two cards with kickers "Mentoring" (Johns Hopkins Agentic AI programme) and "Keynote" (CISO London Summit 2025), the seven specialisms as listed, the sectors line, and a two-part note: "From the bio on ruv.sgit.ai, drafted there for him to approve." [providers-data] and "Dinis Cruz cleared it for this site on 18 November 2026." (`src: []`). PAGES['/experience/'] title becomes "Career" (the path stays `/experience/`).
- **DESIGN_IDEAS** (change 10a): the five idea lines from the proposal, keyed by design id. They replace `DESIGNS[].idea` in `scripts/lib.mjs` when the developer wires them.
- **MADE** (change 10c): titled "The team behind this site" (not a near-copy of "How it is made"), three short paragraphs and two links, from the team files (`src: []`).
- **SOURCES['newsroom-index']**: the newsroom's articles index, for the count F145.

## 3. The design review's writer conditions, and our framing

| Condition | Applied |
|---|---|
| 1, serif line | F02 and F05 as whole sentences (HOME.hero.line) |
| 2, the 300 tile | "a community of about 300 engineers, strategists and educators", dated 18 November 2026 |
| 8, PERSON.status[1] | changed; F100 kept under `provider` as a fact about his provider page |
| 9, step times | 0:14, 0:38, 0:58; no "no time given" anywhere in the data |
| 10, 13, results and phases | POC.resultsNote and POC.phasesNote say what is this site's reading |
| 14, heading | "From core banking to agentic AI" dropped; "From HSBC Global Technology to DxSure Ltd" |
| 15, pull quote | F61 word for word, Dinis Cruz, `poc` |
| 17, What happens next | F99 and F26 words; F20, F98 under `provider`, F26 under `offers` |
| 20, strip | starts on 16 October |
| 21, 22, 23, 24, career | "Mentoring"; `pathLabel` and `labelOurs`; the note says drafted for him to approve and cleared by Dinis; no F13 or F15; no person named |
| 27, Run log step 2 | the step text is unchanged |
| 31, MADE heading | "The team behind this site" |

Our framing that stays, marked in comments: the HOME.numbers labels (our wording around the source's numbers), the path labels First, Then and After the MBA (`labelOurs`), and DESIGN_IDEAS (they describe our designs, not him).

## 4. Rules checked

- Every new factual sentence has `src` ids. A script walked every `src` and `*Src` array in the data: every id exists in SOURCES, and every `SOURCES[].facts` id exists in `research/facts.json`.
- People named: Mondweep Chakravorty, Dinis Cruz and rUv only. The long bio adds organisations only (HSBC Global Technology, London Business School, Shell Energy, TalkTalk, Zafin, Jaguar Land Rover, Lotus Technology, DxSure Ltd, Johns Hopkins, CISO London Summit, OWASP), named as the source names them. None is on the list of names to keep out (`forbiddenNames()` in `scripts/lib.mjs`).
- No em dashes, no hype words (`node scripts/validate.mjs` prints OK).
- Not used: F13 (the line about his GitHub lab) and F15 (his own links). They are not cleared.

## 5. OPEN, updated

- [0] The long bio: cleared by Dinis and used as worded; is Mondweep content with the wording, which the source still marks as drafted for him to approve?
- [1] The headshot question now asks which cards and designs carry it (the proposal's open item), in place of "does he approve the photo".
- [3] Fingerprint: "at step 8".
- [9] Only No. 175's title is cut now.

## 6. For the developer and the conductor

- `checkApproval()` in `scripts/lib.mjs` (round 1 condition 14) refuses F14 and any `providers-data` use of F09 to F12. It now fails by design, because Dinis cleared the bio. The proposal (change 5) is to replace it with a check that every sentence from those facts cites `providers-data`, and that F13 and F15 stay out. That is the conductor's call.
- `checkOutput()` matches `<img ... headshot>`. The proposal (change 1) narrows it to allow only `/assets/photo/mondweep-chakravorty.png`.
