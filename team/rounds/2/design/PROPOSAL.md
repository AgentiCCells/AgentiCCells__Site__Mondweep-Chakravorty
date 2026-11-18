# Round 2 design proposal

**By:** designer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18. **Status:** proposal, for the reviewer's verdict in `team/rounds/2/review/DESIGN.md`.

**Brief.** The round aim in `team/rounds/2.md`, widened at about 10:55 UTC by Dinis's words: "Can you make it look and good and creative as the other ACC sites?" Also on the record in `team/WORKFLOW.md`: the headshot (Dinis, about 10:46 UTC, `src/assets/photo/mondweep-chakravorty.png`, 200 x 200, the only image of him allowed) and the long bio from ruv.sgit.ai, cleared for use (Dinis, about 10:50 UTC; facts F09 to F12 and F14).

**What I looked at (C1).** The live site, which reports **v0.1.9** in its footer (the brief said v0.1.8), with Playwright at 390 x 844 and 1366 x 768: `/`, `/proof-of-concept/`, `/collaboration/`, `/d/`, `/d/broadsheet/`, `/d/runlog/`, `/d/blueprint/`, `/d/vault/`, `/behind-the-scenes/`, first screen and full page. The model sites at the same sizes: marc-noah.agenticcells.site (home, and its Designs pop-up opened) and yiheng-wang.agenticcells.site (home). Files read: `team/rounds/1.md`, `1/review/LIVE.md`, `1/build/NOTES.md`, `1/review/DESIGN.md`, `data/site.mjs`, `research/facts.json` (F09 to F15), `scripts/generate.mjs`, `designs.mjs`, `lib.mjs`. Screenshots stay in the session scratchpad, not in git.

## What the live site shows today

- **The four other designs read as one page restyled.** At 1366 px every first screen is the same stack: eyebrow, name, the lede, two buttons, four highlight cards. The run, which is what makes him distinct, starts below the first screen on all four (Broadsheet at about 2,000 px, Run log at about 1,500 px). At 390 px the four differ only in colour.
- **The home is correct but quiet.** A 240 px teal circle with "MC", body-size type, no colour field, no image, and no number on the first screen. The model sites lead with a photograph, a very large name (Marc Noah: a two-line name at about 7rem) and a strong band of colour. Yiheng Wang adds four stat tiles under the hero, a drawn diagram of her team, and a framed photo with a pinned caption card. Marc Noah alternates full-bleed dark bands, uses a large serif pull quote, and its pop-up shows six large previews with a "Showing" badge.
- **"Work with him" is spread out.** On the home, the offers sit inside "With Dinis Cruz" and the contact sits in a separate section. On `/collaboration/` the reader passes three paragraphs before the offers, and the five kinds of project come after four price tables.
- **At 390 px** the home spends about 100 px on the monogram before the eyebrow. Blueprint's title block stacks six rows (about 250 px) above anything else. Run log opens with a two-line notice that repeats the strip above it.

## The ten changes, ranked

Each change can be built, reviewed and released on its own. Where a change has parts (4, 10), each part can also ship alone. Mock-ups are small HTML files in `mockups/`; their CSS is written to be lifted. Every word in them comes from `data/site.mjs` or from F09 to F12 and F14. Markers appear as `[n]`.

| Rank | Change | Pages | Mock-up |
|---|---|---|---|
| 1 | Ledger home first screen: colour field, his headshot, big type, a drawn motif, four numbers | `/`, `/d/ledger/`, home card | `mockups/home.html` (top) |
| 2 | The run drawn as the centrepiece: a 104.7 s scale, phase bands, safeguard rings, results | `/`, `/proof-of-concept/` | `mockups/run-figure.html` |
| 3 | Section rhythm on the home: bands, a career summary, a pull quote of Dinis Cruz | `/` | `mockups/home.html` (middle) |
| 4 | Work with him (4a), and the collaboration timeline strip (4b) | `/`, `/collaboration/` | `mockups/home.html` (bottom); ASCII below |
| 5 | /experience/ becomes a career page, from the cleared bio | `/experience/`, two lines on `/` and each design | `mockups/experience.html` |
| 6 | Broadsheet: a front page, with the run as Plate 1 and a caption column | `/d/broadsheet/` | `mockups/designs.html` |
| 7 | Run log: story on the left, the run's log on the right | `/d/runlog/` | `mockups/designs.html` |
| 8 | Blueprint: one drawn sheet, phases as zones, safeguards as balloons | `/d/blueprint/` | `mockups/designs.html` |
| 9 | Vault: the run as four checkpoint doors, his photo in the seal | `/d/vault/` | `mockups/designs.html` |
| 10 | Designs pop-up with large previews (10a), review follow-ups 5 and 6 (10b), "How this was made" (10c) | every page; `/behind-the-scenes/` | `mockups/dialog.html`; text below |

Rules for all ten: system fonts only (no font files), no third-party scripts, styles or images, no image of him other than the one headshot, text contrast at least 4.5:1 (3:1 for large text), stand-alone targets at least 44 px, no horizontal scroll at 390 or 1366 px. I loaded every mock-up at 390 and 1366 px: `scrollWidth` equals the viewport width in all of them.

---

### 1. Ledger home first screen

**Why.** Dinis asked for a site as good as the model sites, and for the home to show his face. Today the first screen has no picture, no colour and no number.

**What.** See `mockups/home.html`, the first block.
- A full-bleed colour field, `--field:#0F3D42` (deep teal, from Ledger's accent) with `--field-ink:#F6F1E7` (about 11:1). The header sits on the field.
- **Headshot**: shown at 176 x 176 CSS px (never more than the file's 200 px), square, with a 6 px cream border and a gold block offset behind it. A small caption card, "London", is pinned to it. `alt="Mondweep Chakravorty"`, `width="200" height="200"`, not lazy (it is on the first screen). Below 52rem it drops to 96 px, sits above the eyebrow, and the caption card is hidden.
- **Type**: the name at `clamp(3rem,9vw,6.75rem)`, weight 800, set on two lines. Under it, one serif line at about 2rem: "Enterprise AI leader. Advises on and builds agentic AI systems, through DxSure Ltd." [provider]. Then the existing lede words, shortened to their second sentence: "Two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover." [provider].
- **A drawn motif**, decorative (`aria-hidden`): one line through twelve small nodes in four arcs (3, 3, 4, 2), gold rings on nodes 4, 6 and 11, two small vault squares at 5 and 8 joined by a dotted gold arc. It is the run, abstracted, drawn by us in inline SVG (about 1.5 KB). It sits behind the right half and never under text at 1366 px. At 390 px it is cut to its top half at 50% opacity.
- **Four numbers** in a row (two by two at 390 px), each sourced: "12 steps and 3 safeguards" [poc]; "#4239, merged into Ruflo on 17 October 2026" [pr-article, pr-page]; "About 300 members of the Agentics London chapter he co-founded" [provider, london]; "2 founding providers of ruv.sgit.ai: him and Dinis Cruz" [llms-ruv, ruv-home].
- The eyebrow becomes "London. Co-founder, Agentics Foundation London" [provider]. The buttons become pills: gold "See the proof of concept", outline "Work with him".
- **Cards.** The home card and the `/d/ledger/` card carry the headshot at 200 px on the 1200 x 630 card (never scaled up), beside the name on the same teal field; `og:image:alt` gains "with a photograph of him". The `/collaboration/` card may carry it too (reviewer's call). The other topic cards keep the "MC" monogram.

**What changes elsewhere (writer, developer).**
- `PERSON.status[1]` ("No photo of him is used...") and the matching lines on `/behind-the-scenes/`, `/ai/`, `/llms.txt` become: "The only photograph of him on this site is the headshot Dinis Cruz supplied with his agreement on 18 November 2026." The OPEN item about the headshot closes.
- **The people check** in `lib.mjs` (`checkOutput`, now `/<img[^>]+(?:mondweep\.jpg|headshot)/`) must not be switched off. Proposal: allow exactly `/assets/photo/mondweep-chakravorty.png` and fail on any other `<img>` or CSS `url()` whose path names him, and on any image file under `src/assets/photo/` other than that one. That is at least as strict as today. The conductor decides, since it is a gate.

**At 390 px.** Header, then photo (96 px) with the eyebrow beside it, the name in two lines at about 3rem, the serif line, the lede, both buttons. The first two numbers show at the foot of the first screen (checked in the mock-up).

### 2. The run drawn as the centrepiece

**Why.** The run is his strongest proof. Today's figure is a correct grid of boxes; it does not show time, results or the vault.

**What.** See `mockups/run-figure.html`. One figure, from `POC.steps`, `POC.safeguards`, `POC.results`, `POC.vaultSteps` and `POC.fingerprint`, in two parts:
1. **A time strip** (inline SVG, `role="img"`, `<title>`, `<desc>`), shown from 64rem. Its x axis is his video, 0 to 104.7 s, ticked at 0:00, 0:30, 1:00 and 1:30. Four phase bands are tinted behind it. Twelve numbered nodes sit at their `at` times. **Steps 2, 5 and 8 have no time in the source**: they are drawn hollow with a dashed edge, between their neighbours, and the key says "no time in the video summary". Gold rings mark steps 4, 6 and 11. A dashed arc from 5 to 8 reads "same SHA-256". Results sit under the nodes: PASS (4), BLOCKED (6), PASS (8), PASS 2/2 (9), BLOCKED (11), "NOT VALIDATED: recall by meaning" (12).
2. **The steps as a real `<ol>`** of four phase panels: four columns from 64rem, one vertical list below. Each step shows its number, title, video time (or "no time given"), and badges: "Safeguard 1: refused" and so on, "vault: written / read / read and rejected", PASS / BLOCKED / NOT VALIDATED. This list is the text alternative, visible to everyone, so nothing is only in the SVG.

Caption: the fingerprint line exactly as now, "Times are from his video. The phases are this site's grouping."

**Must hold (round 1 conditions 2 to 7).** Safeguards only on 4, 6 and 11. No "throughout". No hash values. The limits list stays beside the figure on `/proof-of-concept/`. **Placing each result on its step is ours**, and the key says so: the results are the run's own summary (step 12) and the step texts support each placing (4 refused, 6 stopped, 8 restore, 9 both facts match, 11 tampered, 12 recall by meaning). Colours: PASS `#1E6B3A`, BLOCKED `#9B1C1C` and NOT VALIDATED `#6B5310`, white text on each, every one above 6:1. Each badge also carries its word, so colour is never the only sign.

**Where.** On the home (inside the "proof of concept" band of change 3) and at the top of `/proof-of-concept/`, replacing `runSvg('wide'|'tall')` there. The `/proof-of-concept/` link-preview card is redrawn from the time strip.

### 3. Section rhythm on the home

**Why.** The home is one long column of the same weight. The model sites alternate bands, cards and one large quote.

**What.** See `mockups/home.html`, middle. The order after the first screen:
1. **Career** (white band, two columns): "From core banking to agentic AI" (heading wording to confirm with the writer) and the two-line summary from change 5, linking to `/experience/`.
2. **The proof of concept** (page colour): change 2's figure, two lines of summary, the "NOT VALIDATED" line, the link.
3. **Pull quote** (full-bleed ink band `#1C1B19`, serif italic at about 2rem): `POC.quote`, Dinis Cruz's words, attributed: "Dinis Cruz, in the newsroom article on the proof of concept, 17 October 2026" [poc]. Only his words are set as a pull quote. None are presented as Mondweep's.
4. **Merged into Ruflo** and **Agentics Foundation, London** as two cards side by side (stacked at 390).
5. **Work with him** (change 4a), in a white band.
6. **With Dinis Cruz**, shortened to the intro and a link to `/collaboration/` (the offers move into change 4a, so they are not shown twice).

Section headings use the kicker plus a large heading pattern (`.kicker` at 0.8rem, caps, accent; `h2` at `clamp(1.9rem,4vw,2.8rem)`, weight 800).

### 4. Work with him (4a), and the collaboration timeline strip (4b)

**4a. Why.** An enterprise reader wants three things in one place: what to ask for, what it costs, how to start. Today those sit in three places.

**What.** See `mockups/home.html`, the last block. Two columns (one at 390 px):
- **Left.** "Five kinds of project" as a numbered list (`COLLAB.projects`) [types]. Then "The four offers, as published (GBP, excluding VAT)", one line each [offers, llms-ruv]:
  - Task runs: £10, £20 or £50 a run; £9, £17 or £40 with your own model key.
  - Dedicated compute (tag: Not built yet): £21, £23 or £36 per 8-hour block.
  - Maintained repository: £149, £499 or £1,500 a month.
  - Expert time: £500 for about 2 hours, £1,500 for a day, £5,000 for four days.
- **Right, a teal panel.** "How to enquire": agent@riskmandate.ai in large type, then "Enquire to book" (mailto, existing subject) and "His provider page". Under it, "What happens next", **only what the sources say**:
  1. A person replies with dates and a quote. The site takes no payment. [provider]
  2. The offers under each kind of project are a starting point, agreed in the first conversation. [provider, types]
  3. Most clients start small and stop at any step. [provider]
  4. A person starts, watches and hands over every run. [offers]

  Then the disclaimer: "ruv.sgit.ai says of itself: this is not rUv's offer..." [ruv-home].

**Where.** On the home, as section 5 of change 3, replacing today's "Contact" section and the offers list inside "With Dinis Cruz". On `/collaboration/`, directly after the first intro paragraph, replacing "How to enquire". The full price tables stay further down `/collaboration/`, under "The four offers, as published". In each of the four designs, the same content in that design's own style (its offers block becomes this block).

**Parity check.** The home will now cite `types`. Each design must render the five kinds of project too, or the design parity check fails, which is what it is for. Add `work: { projects, offers, next }` to `homeModel()`.

**4b. Why.** The collaboration moved fast, in one week. A strip shows that at a glance.

**What.** On `/collaboration/` only, under the 4a block. A horizontal strip from 64rem and a vertical one below. It shows the entries of `COLLAB.timeline` dated 15 to 21 October 2026:

```
 15 Oct        16 Oct                         17 Oct                           21 Oct
   o------------o------------------------------o--------------------------------o
 How the       Marketplace introduced;        His video published and          "Register interest" becomes
 marketplace   he and Dinis Cruz named its    walked through step by step.     "enquire to book"; his provider
 began (link)  first two providers.           PR #4239 merged at 14:59         page goes live.
               PR #4239 commits, 23:02 to     London time, by rUv.
               23:59 London time.
```

- **The 15 October node does not restate the talk** (round 1 condition 15: the talk appears once). It shows the date and a link, "How the marketplace began", to `#c-talk` on the same page. If the reviewer prefers, the strip starts on 16 October.
- Each node is an `<li>` with `<time datetime>` and its sources. The existing full "Timeline" list stays lower on the page and keeps the May 2025 entry.
- Not on the home (the talk must not appear there).

### 5. /experience/ becomes a career page

**Why.** Dinis cleared the long bio (about 10:50 UTC). It is the strongest material for an enterprise reader, and `/experience/` is thin today.

**What.** See `mockups/experience.html`. Worded as the source gives it, every item citing `providers-data` [F09 to F12, F14]:
- A teal header: "Career", the heading, and one sentence: began as a software engineer at HSBC Global Technology; an independent AI advisor through DxSure Ltd since September 2024.
- **A career path, not a dated timeline.** The source gives an order ("began... After an MBA... Later...") and only two dates (September 2024; 2025), so the path shows five ordered stops labelled First, Then, After the MBA, Later, Since September 2024: HSBC Global Technology (software engineer, payments and core banking integration); London Business School (an MBA); Shell Energy, TalkTalk, Zafin (led transformation and delivery work; at Zafin, core banking SaaS for major banks); Jaguar Land Rover, Lotus Technology (portfolio rationalisation, cloud foundations, connected experiences); DxSure Ltd (advisory, solution architecture, hands-on agentic builds: multi-agent orchestration, RAG, MCP and AI security). It is horizontal from 56rem and vertical below.
- Two cards: "Johns Hopkins Agentic AI programme: he mentors on the programme" and "CISO London Summit 2025: he co-presented the keynote 'Securing the Agentic Frontier', applying the OWASP MAESTRO threat-modelling framework to an agentic AI codebase".
- "Specialisms, as listed": the seven items of F14 as tiles.
- The existing sectors line (F03) stays.
- A note: "From the bio on ruv.sgit.ai, drafted there for him to approve; Dinis Cruz cleared it for this site on 18 November 2026."

**Two-line summary** on the home (change 3, Career band) and in each design: "He began as a software engineer at HSBC Global Technology. After an MBA at London Business School he led transformation and delivery at Shell Energy, TalkTalk and Zafin, then worked at Jaguar Land Rover and Lotus Technology. Since September 2024 he has been an independent AI advisor through DxSure Ltd." [providers-data]

**What changes elsewhere.**
- The approval check (round 1 condition 14), which refuses F09 to F12 and F14, no longer matches Dinis's word. Proposal: replace it, do not delete it. The new check requires every sentence drawn from those facts to cite `providers-data`, and still refuses F13 and F15 (not cleared). The conductor decides.
- The `providers-data` source note in `data/site.mjs` and the OPEN item change with it.
- Organisations named only as the source names them. No person is named.

### 6. Broadsheet: a front page, with the run as Plate 1

**What.** See `mockups/designs.html`, first block. The first screen at 1366 px is a newspaper front page in three columns under the masthead "A profile" and a dateline ("London", "The SGit × Ruflo run, in twelve steps", "Facts read 18 November 2026"):
- **Left (4/12).** Kicker, the name at about 4.6rem serif, the **headshot** as a 132 px square, floated with a rule and the caption "Mondweep Chakravorty", and the standfirst in italic.
- **Centre (5/12).** "Plate 1. Memory saved, the project deleted, the memory back": a 4 x 3 plate of twelve numbered squares, big serif numerals, each labelled with its phase. The safeguard steps (4, 6, 11) are solid red `#9B1C1C` with white text. The vault steps (5, 8) are hatched. A key line sits under the plate.
- **Right (3/12).** "The steps": a numbered caption column with the twelve titles. The three safeguard outcomes (refused, stopped, rejected) are in red bold.

The rest of the page keeps its columns, now ordered: Who he is, Career (two lines), the proof of concept text, Merged into Ruflo, London, Work with him (4a), sources.

**Text alternative.** The caption column is the real `<ol>`, and the plate has `aria-describedby` pointing to it. Plate labels are words, not colour alone.

**At 390 px.** Masthead, kicker, name, the photo at 96 px floated right of the standfirst, then the plate (4 x 3, about 80 px cells), then the caption list.

### 7. Run log: story on the left, the run's log on the right

**What.** See `mockups/designs.html`, second block. His video puts "the story on the left, for someone with no code knowledge, and the terminal on the right" [poc]. This design does the same.
- **Left pane.** "# a design of this site; nothing here runs" (round 1 condition 24, shortened to one line), the name, three sourced lines, both buttons.
- **Right pane, a terminal.** A title bar, "sgit-ruflo run, 12 steps, video 104.7 s". Then twelve log lines, one `<li>` each, in the form `[0:32] 04/12 save Try something outside its permission ... PASS`, with a dim second line for the detail ("safeguard 1: refused, PermissionError"; "vault: written"; "Key not found"; "ruflo --version returns v3.56.10").
  - **Times** are `POC.steps[].at`, his **video** times, never presented as clock times. Steps 2, 5 and 8 show `[ -- ]`. The footer says: "[mm:ss] is the time in his video; [ -- ] means the video summary gives none. Results from the run's own summary, set beside the step they describe."
  - **Results**: PASS in green `#7EE2A8`, BLOCKED in `#FF8A80`, NOT VALIDATED in `#F2C14E`, all at least 7:1 on `#0E1116`.
- No invented commands, no `$` prompt, no hash values. No photo: this design stays typographic, as the conductor allowed.

**At 390 px.** The panes stack, so the story comes first and the log starts on the first screen. The phase column is hidden (the phase is in the step's detail). Lines wrap inside their grid cell, so nothing scrolls sideways.

### 8. Blueprint: one drawn sheet

**What.** See `mockups/designs.html`, third block. The first screen is the drawing:
- A heading row: the name (h1) and "Sheet 01 of 01: the SGit × Ruflo run".
- **One framed sheet** (inline SVG, about 6 KB), with grid references A to D across and 1 to 3 down. It has **four dashed zones** (Zone A Set up, Zone B Save under the policy, Zone C Lose it, bring it back, Zone D Check, conclude) holding the twelve step boxes, with short titles where the full title does not fit. A **dimension line** from 05 to 08 reads "SHA-256 05 = 08". **Three balloons**, S1, S2 and S3, sit on leaders to steps 04, 06 and 11. A **Notes** block gives the three safeguards and "Recall by meaning: NOT VALIDATED (embeddings off)".
- **The title block**, bottom right: subject, the "MC" stamp (kept: this design is typographic), drawn by the AgentiCCells cell, 12 steps and 3 safeguards, `__VERSION__`, facts read.
- At 390 px a **tall sheet** (360 x 640): zones stacked, balloons at the right margin, the dimension line on the left edge, a one-line title block.

**Text alternative.** `<title>` and `<desc>`, plus a "Schedule of steps" table under the sheet (number, full title, zone, safeguard), the drawing's natural text form. SVG text is at least 13 px at drawn size. The short box titles never stand alone, because the schedule gives the full ones.

**Also.** Today's six-row title block at 390 px goes. The version and the facts-read date move into the sheet's title block.

### 9. Vault: four checkpoint doors

**What.** See `mockups/designs.html`, fourth block.
- **Hero row.** The **headshot inside the seal**: the existing double gold ring, now 152 px with the photo cropped round inside it, 88 px at 390. Then kicker, the name in serif, and one sourced line ("He saved an agent's memory as an encrypted checkpoint, deleted the project, and brought the memory back in a fresh process." [poc]; the writer may keep `POC.summary[0]` word for word). On the right, a status plate in mono: "checkpoint: encrypted / policy: ABP, enforce mode / sha256 at 5 = sha256 at 8" (no hash values; round 1 condition 26 wording).
- **Four doors** in a row (stacked at 390), one per phase. Each is a bordered panel with a dial ring drawn top right, "Door 1" to "Door 4", the phase name and its steps. Chips: "safeguard 1/2/3" in gold on 4, 6 and 11; "vault written", "vault read", "vault read, rejected" in green on 5, 8 and 11.
- Under the doors: `POC.vaultText` ("The vault is used in three steps of twelve...") [vault].

The "Checkpoint 1 to 6" section labels below are renamed to plain headings, so "checkpoint" keeps one meaning on the page.

**Text alternative.** The doors are an `<ol>` of `<ol>`s, so the panels are the text.

### 10. Designs pop-up with large previews (10a), review follow-ups 5 and 6 (10b), "How this was made" (10c)

**10a. Pop-up.** See `mockups/dialog.html`. A dark panel, three columns of large 16:10 previews (two at 56rem, one at 34rem), the name with a gold "Showing" badge on the current design and "Main site" on Ledger, one line on the idea, a 48 px round Close button top right, and a sixth tile, "All designs, as a page" (`/d/`). The previews are regenerated by `scripts/cards.mjs` after changes 1 and 6 to 9, at 1366 x 854 scaled to 960 x 600, so each shows a real first screen. The image `alt` becomes empty, because the name is the link text (today's alt repeats it). The new idea lines:
- Ledger: "A colour field, his photograph and the run drawn on the home page."
- Broadsheet: "A newspaper front page: the run as Plate 1, with a caption column."
- Run log: "Story on the left, the run's log on the right, with video times and results."
- Blueprint: "One drawn sheet: the phases as zones, the safeguards as balloons."
- Vault: "The run as four checkpoint doors, with the vault steps marked."

These lines also update `DESIGNS[].idea` and `/d/`.

**10b. Review follow-ups 5 and 6.**
- *5:* `designsDialog(current, path)` puts `aria-current="page"` only when the link is the page being viewed (`/` on the home, `/d/<id>/` on a design). On the other main pages the Ledger tile gets `aria-current="true"`, and its visible badge reads "Showing" (not "You are here").
- *6:* in `Cite.m()`, when two or more markers are adjacent, wrap them in `<span class="mks">` with `white-space:nowrap`, and put a word joiner (U+2060) before the first `<sup>`, so a marker never starts a line alone. The mock-ups use `sup{white-space:nowrap}`.

**10c. "How this was made"** on `/behind-the-scenes/`, a short boxed note at the top, before today's "How it is made" (which stays). Proposed words, all from `team/` files:

> **How this was made.** Six AI agents made this site: a conductor, which briefs the others and is the only one that publishes, and a researcher, designer, writer, developer and reviewer, which the conductor runs as sub-agents in one Claude Code session. Each has a role file and an Agent Behaviour Policy. They work in rounds: research, design, a review of the design, copy, build, release, a review of the live site, and a report. Every release passes gates first: the validator, the leak scan, the commit check and the check of which files each agent may change. Dinis Cruz instructs the team, and Mondweep Chakravorty approves every change about him through Dinis. More about AgentiCCells: [agenticcells.ai](https://agenticcells.ai) and [hub.agenticcells.site](https://hub.agenticcells.site).

Links are plain text links at least 44 px tall. The note says nothing about either site beyond its address.

---

## For the reviewer: conditions I expect

1. No fact beyond `data/site.mjs` and F09 to F12 and F14. The heading "From core banking to agentic AI" is a summary heading for the writer to confirm or replace.
2. The headshot only at `/assets/photo/mondweep-chakravorty.png`, never above 200 CSS px, `alt="Mondweep Chakravorty"`. No other image of him. The people check is narrowed, not removed (change 1).
3. The talk stays once, on `/collaboration/`. The strip's 15 October node only links to it (4b).
4. Result placements on steps are marked as ours (changes 2 and 7). Video times are labelled as video times. Steps 2, 5 and 8 say "no time given".
5. Pull quotes only of Dinis Cruz's words, attributed (change 3).
6. The approval check is replaced as in change 5, on the conductor's word.
7. Every design still cites every source the home cites. `types` and `providers-data` join the home.

## Open for Dinis or Mondweep (through the conductor)

- Whether the `/collaboration/` card and the Broadsheet and Vault cards carry the headshot (proposed: home and Ledger cards yes; the others reviewer's call).
- Whether "From core banking to agentic AI" is acceptable as a heading.
- Whether to link mondweep.net and github.com/mondweep (F15; not cleared, not proposed).
