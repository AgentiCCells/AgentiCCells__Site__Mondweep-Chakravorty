# Round 1 copy

**By:** writer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18.
**From:** `research/facts.json` and `research/sources.md` (commit 7fea465), the reviewer's conditions in `team/rounds/1/review/DESIGN.md` (commit 9d8dfcf), and the conductor's brief.
**Wrote:** `data/site.mjs`, the single source of every word and fact on the site. Its header comment documents every field added to the brief's shape.

## What is in it

- `SITE`, `SOURCES` (25 sources, each with the facts.json ids it backs in `facts`, and a `note` where the reading had caveats), `PERSON`, `HOME`, `PHASES`, `POC`, `PR`, `EXPERIENCE`, `LONDON`, `COLLAB`, `AI`, `PAGES` (title and description per page, for link previews), `OPEN`.
- Every factual sentence is `{ text, src }`. A check run on 2026-11-18 found 159 source references, all to ids in `SOURCES`, and every `SOURCES.*.facts` id present in facts.json. No em or en dashes; no hype words.

## Choices

- **About him first.** The home, `PERSON.about` and `EXPERIENCE` use only the three sentences of his public provider page (F04 to F06), plus F03. Nothing from the draft long bio (F09 to F12, F14, career history, specialisms) is used, as the brief and reviewer condition 14 require.
- **Phases.** The reviewer's four phases (condition 2): `setup` 1 to 3, `save` 4 to 6 "Save under the policy", `restore` 7 to 10 "Lose it and bring it back", `check` 11 to 12 "Check and conclude". The grouping is ours, not the article's; the comment says so. My first draft used the five phases in the brief; the conductor's later message replaced them.
- **Safeguards** sit on steps 4, 6 and 11, worded as F56. Nothing says they held throughout. `POC.limits` says plainly that Ruflo's command line in steps 3, 9 and 10 bypasses the gate (F65), and includes F55 (semantic recall not validated), F60 and F64.
- **Never "memory deleted".** Only "the project deleted" (F50 wording) and "the original workspace is removed" (step 7).
- **Step texts** are one or two plain sentences from the run article (sources.md 3.2, the same source as F54 and F55), with the video time where the article gives one (`at`).
- **Fingerprint.** No hash values, per reviewer condition 4, although the article does give the first and last characters (sources.md 3.2). Raised in `OPEN`.
- **Policy rows** carry the ABP capability names from the PR article (F77). Matching "read history" to `read.record.history` is my reading of F77; the reviewer should confirm.
- **The talk** is not exported on its own. It sits in `COLLAB.talk` only, as how the marketplace began: Dinis Cruz's talk, at an Agentics Foundation London event, run by the chapter Mondweep co-founded (condition 15). The source says the marketplace was in the next day's article, not necessarily in the talk, so the copy says that. One AI question ("Did he give the talk?") answers "No source says so", to stop AI tools getting it wrong.
- **Merged by rUv** cites `pr-article` only (condition 16); the squash commit and author cite git as well. The 9,625 number is not used; "first commit to mention SGit or an ABP" carries "Per the newsroom".
- **London.** "with five other chapter leaders" (condition 18); no other co-founder named; no agentics.org addresses; rUv as "rUv".
- **Offers** are exactly as offers.json and llms.txt publish them: numbers plus `priceText` with £, units as published, own-key run prices (£9, £17, £40), dedicated compute marked "not built yet", the F20 and F26 notes. Item summaries quote offers.json (sources.md 1.3).
- **Contact** is "Enquire to book", agent@riskmandate.ai, with the subject line ruv.sgit.ai's own button uses.
- **Articles.** The eleven that name him in their body (sources.md 3.2 to 3.12). Four titles (Nos. 166, 175, 178, 193) were not recorded, so they come from the address and carry `titleNote`; No. 175's full title names a person we do not name. The `why` lines for Nos. 175 and 193 rest on quotes in sources.md (3.10, 3.12) that have no fact id.
- **"register interest"** appears once, in the timeline, as the wording ruv.sgit.ai replaced on 21 October 2026.

## Left out, and why

- The draft long bio, specialisms and his own links (mondweep.net, GitHub profile, LinkedIn): not approved by him, or a social network. Raised in `OPEN`.
- The £75-an-hour assumption behind run prices, the equal revenue split and "whoever has the client bills": published, but partnership terms are for Dinis and Mondweep to choose to show. Raised in `OPEN`.
- The companion pull request on SGit-AI__Website__Ruv (status only as of 17 October), the commit count, and the "five worked" caption.
- The headshot (london.agentics.org) and frames of his video.
- "Status" line saying Mondweep agreed to the site has no public source (it is Dinis's word in team/WORKFLOW.md), so it carries `src: []`; the developer may show it on behind the scenes rather than as a fact.
