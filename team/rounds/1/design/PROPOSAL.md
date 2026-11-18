# Round 1 design proposal

**By:** designer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18.
**Status:** proposal, for the reviewer's verdict in `team/rounds/1/review/DESIGN.md`. Nothing here is built.

**What I looked at (C1).** The live first pass v0.1.2 at https://mondweep-chakravorty.agenticcells.site (screenshots in `team/rounds/img/r1-before/`: home, built, collaboration at 390 and 1366 px). The model sites https://marc-noah.agenticcells.site (home, `/d/`, the Designs pop-up markup, `/behind-the-scenes/`, its Open Graph tags) and https://yiheng-wang.agenticcells.site (home). Reference screenshots at 390 and 1366 px are in the session scratchpad only, not in the repository.

**Facts.** I use only the facts in the brief: enterprise AI leader and agentic systems builder in London; co-founder of the Agentics Foundation's London chapter; advises on and builds agentic AI systems through DxSure Ltd; two decades in financial services, automotive, energy and technology; with Dinis Cruz, one of the two founding providers on ruv.sgit.ai; the SGit x Ruflo proof of concept (Ruflo agent memory saved as an encrypted SGit checkpoint under an Agent Behaviour Policy, the project deleted, the memory restored in a fresh process with the same SHA-256 fingerprint; twelve steps; three safeguards); merged Ruflo pull request #4239; a talk at Agentic Engineering Live in London. Every line of copy in the mock-ups is a placeholder for the writer's sourced text in `data/`. Where the mock-ups show "Step 5 wording" or "Safeguard 2 wording", the researcher supplies the text.

**What the first pass gets wrong (from the screenshots).** It is a readable single column, but: a dashed "Placeholder: headshot" box sits in the first screen; there is no picture of the proof of concept at all, only a four-item list that calls itself twelve steps; sources are a grey line at the foot rather than markers tied to each claim; the 390 px header wraps the menu onto two lines and its links are under 44 px tall; no designs, no chooser, no link previews, no behind the scenes.

---

## Ranked changes

Each change is small enough to build and review on its own. Rank 1 matters most to a visitor deciding whether to work with him.

| Rank | Change | Mock-up |
|---|---|---|
| 1 | The figure of the twelve-step run with three safeguards, on its own page | `mockups/run-figure-wide.svg`, `mockups/run-figure-tall.svg` |
| 2 | New home first screen with the "MC" monogram, no placeholder box | `mockups/home.html` |
| 3 | Numbered source markers and a source list on every page | ASCII in section 1.5 |
| 4 | Page structure: nine pages and one header | ASCII in section 1.1 |
| 5 | Type and colour tokens (system fonts only) | section 1.3 |
| 6 | Five designs under /d/ | `mockups/designs.html` |
| 7 | The Designs pop-up and the /d/ index | `mockups/home.html` (press Designs) |
| 8 | Link previews: one 1200x630 PNG per page | `mockups/og-home.svg` |
| 9 | Behind the scenes | `mockups/bts-flow.svg`, ASCII in section 5 |
| 10 | Accessibility rules, checked on every page | section 6 |

---

## 1. The main site (the default design, "Ledger")

### 1.1 Information architecture

Nine pages. The header carries five of them; the rest are in the footer index on every page.

| Path | Title | Purpose | In header |
|---|---|---|---|
| `/` | Mondweep Chakravorty | who he is in one screen, three proof points, two actions | name link |
| `/built/` | What he has built | the proof of concept (summary, link to its page), PR #4239, the talk | yes |
| `/proof-of-concept/` | SGit x Ruflo proof of concept | the figure, what it shows, the three safeguards in words | yes, "Proof of concept" |
| `/experience/` | Experience | two decades across four sectors; DxSure Ltd | yes |
| `/agentics-london/` | Agentics Foundation, London | the chapter he co-founded | yes |
| `/collaboration/` | With Dinis Cruz | founding providers on ruv.sgit.ai, the offers exactly as published, the articles | yes, "With Dinis Cruz" |
| `/sources/` | Sources | every source with URL and date read, and which pages use it | footer |
| `/ai/` (+ `/llms.txt`, `/index.md`) | Use with AI | plain-text copies of every page for AI tools | footer |
| `/behind-the-scenes/` | Behind the scenes | team, policies, flow, commits, round reports | footer |
| `/d/` and `/d/<id>/` | Designs | the five designs | Designs button |

```
HEADER (every page, every design)
[Mondweep Chakravorty]   What he has built  Proof of concept  Experience  Agentics London  With Dinis Cruz   [Designs]
390 px:  [Mondweep / Chakravorty]                                               [Designs] [Menu]
         Menu is a link to #site-index (the footer index), so it works without JavaScript.

FOOTER (every page)
 Site index: Home . What he has built . Proof of concept . Experience . Agentics London .
             With Dinis Cruz . Sources . Use with AI . Behind the scenes . Designs
 Version v0.1.N . Code Apache-2.0, text CC BY 4.0 . Made by the AgentiCCells cell (link to behind the scenes)
```

### 1.2 The home's first screen

Mock-up: `mockups/home.html` (open it at 390 and 1366 px; checked: no horizontal scroll at either width).

```
1366 px                                                         
+-------------------------------------------------------------------------+
| Mondweep Chakravorty     built  proof  experience  agentics  dinis [Designs]
+-------------------------------------------------------------------------+
| ENTERPRISE AI LEADER, LONDON                                  .-----.    |
| Mondweep Chakravorty            (64 px, bold)                /  MC   \   |
| Builds and advises on agentic AI systems through DxSure     |  240px |   |
| Ltd, after two decades in financial services ... [1]         \       /   |
| [See the proof of concept]  [Work with him]                   '-----'    |
|-------------------------------------------------------------------------|
| SGit x Ruflo              | Agentics Foundation      | ruv.sgit.ai       |
| memory saved, deleted,    | co-founder of the        | one of the two    |
| restored, same print [2]  | London chapter [1]       | founding providers|
+-------------------------------------------------------------------------+

390 px
+------------------------------+
| Mondweep        [Designs][Menu]
| Chakravorty                  |
|------------------------------|
| (MC) 80 px disc              |
| ENTERPRISE AI LEADER, LONDON |
| Mondweep                     |
| Chakravorty   (40 px)        |
| Builds and advises on ... [1]|
| [See the proof of concept]   |
| [Work with him]              |
|------------------------------|
| SGit x Ruflo ...         [2] |
```

- "Work with him" goes to `/collaboration/`, where his offers and contact appear exactly as his provider page on ruv.sgit.ai gives them. No email address in the first screen.
- The placeholder headshot box goes. The monogram stands in silently; behind the scenes says the headshot is awaited.

### 1.3 Type and colour tokens

System font stacks only. No web fonts, no font files, no third-party scripts or stylesheets, no analytics.

```css
:root{
  --sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --serif: Charter, "Bitstream Charter", "Sitka Text", Cambria, Georgia, serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;

  --step--1: .875rem;  --step-0: 1.0625rem;  --step-1: 1.25rem;
  --step-2: 1.625rem;  --step-3: 2.25rem;    --step-4: clamp(2.5rem, 6vw, 4rem);
  --leading: 1.6;  --measure: 38rem;
  --space: .25rem .5rem 1rem 1.5rem 2.5rem 4rem;   /* --s1 .. --s6 */

  /* Ledger palette; contrast on --bg measured with the WCAG formula */
  --bg:#FAF8F4;  --surface:#FFFFFF;  --rule:#DDD8CE;
  --ink:#1C1B19;      /* 16.2:1 */
  --muted:#4A4740;    /*  8.7:1 */
  --accent:#1D5C63;   /*  7.2:1; white on accent 7.6:1 */
  --focus:#B4531A;    /* focus ring, 3px, non-text contrast above 3:1 on bg and surface */
}
```

Headings: `--sans`, weight 700, letter-spacing -0.02em at `--step-3` and up. Body at `--step-0`, line length at most `--measure`. Numbers, hashes and step numbers (for example "#4239", "SHA-256") in `--mono`.

### 1.4 The monogram "MC"

```
   .------.        Disc in --accent, letters in white (7.6:1), system sans 700,
  /        \       letter-spacing -0.04em. Built in HTML and CSS (or inline SVG in
 |   MC     |      the OG cards), never an image file, never a likeness.
  \        /       role="img" aria-label="Monogram MC". 240 px at 1366, 80 px at 390.
   '------'        Each design restyles it (see section 2).
```

When Dinis supplies the headshot, the same slot takes it (same size, round crop, alt text from Dinis). Until then there is no image of him anywhere, including OG cards and design thumbnails.

### 1.5 How sources are cited

```
Builds and advises on agentic AI systems through DxSure Ltd.[1]     <- <sup><a href="#src-1">1</a></sup>
...
-------------------------------------------------------------
Sources for this page                                         <- <section id="sources"><h2>
 1. Mondweep Chakravorty, provider page, ruv.sgit.ai. Read 2026-11-18.   [back to text]
 2. <article title>, newsroom.sgit.ai. Read <date>.
 Full list: /sources/
```

- Markers are numbered per page, in order of first use; the same source keeps its number within a page. The marker is a link with `aria-label="Source 1"` and a 44 px tall hit area (padding, not a bigger glyph).
- Each list entry: title, site, date read, a link out, and a "back" link to the first marker.
- `/sources/` lists every source once, with the pages that cite it. All of it comes from `research/facts.json`; the generator numbers the markers, nobody types them.

### 1.6 The figure: the twelve-step run with three safeguards

Mock-ups: `mockups/run-figure-wide.svg` (1366 px) and `mockups/run-figure-tall.svg` (390 px).

Structure (fixed now): **12 steps in 3 phases, and 3 safeguards that run the whole length.** The phase names Save, Delete, Restore come from the brief's own summary; the split of steps between phases (4/4/4 in the mock-up) is a layout placeholder until the researcher records the step wording. The generator draws from data, so any split (for example 5/2/5) works.

```
WIDE (min-width 48rem): three phase columns, steps top to bottom inside each

 1. Save                    2. Delete               3. Restore
 memory saved as an         the project is          fresh process, same
 encrypted SGit checkpoint  deleted                 SHA-256 fingerprint
 (1) step ...               (5) step ...            (9)  step ...
 (2) step ...        -->    (6) step ...     -->    (10) step ...
 (3) step ...               (7) step ...            (11) step ...
 (4) step ...               (8) step ...            (12) step ...
 [======== Safeguard 1 ............................ held from step 1 to 12 ]
 [======== Safeguard 2 ............................ held from step 1 to 12 ]
 [======== Safeguard 3 ............................ held from step 1 to 12 ]
 Fingerprint: SHA-256 at the save step = SHA-256 at the restore step

TALL (below 48rem): one column; the safeguards become three thin
vertical rails down the left edge, so "held throughout" stays visible

 |||  1. Save
 |||  memory saved, as an encrypted SGit checkpoint
 |||  (1) step ...
 |||  ...
 |||  3. Restore
 |||  (12) step ...
 Held throughout the run:  | S1 ...  | S2 ...  | S3 ...
```

Build notes:
- Two inline SVGs generated from the same data; CSS shows one by width, the other gets `display:none` (so it is out of the accessibility tree). Text is 14 px or larger at both widths; the tall one has a 360 viewBox so it is drawn at about 1:1 on a 390 px phone.
- The figure is a `<figure>` with a `<figcaption>` and, directly below, the same twelve steps and three safeguards as a real `<ol>` and `<ul>` (the text alternative, and what Use with AI copies). The SVG has `role="img"`, a `<title>` and a `<desc>`.
- Colours from tokens (steps on `--surface`, numbers on `--accent`, safeguard rails `#E4EEEF` with an `--accent` outline). Each design re-skins the same SVG with its own tokens.
- Each step's wording carries a source marker in the list below the figure, not inside the SVG.

---

## 2. Five designs under /d/

**Decision: the default is one of the five.** Ledger is served at `/` and also listed at `/d/ledger/` (which redirects with a link to `/`, or carries `<link rel="canonical" href="/">`). The other four live at `/d/<id>/`. This keeps one system for every main page and four alternatives that only restyle the home.

Each design's home shows the same facts as `/`: name, the one-line role, DxSure Ltd and the four sectors, Agentics London, ruv.sgit.ai with Dinis Cruz, the proof of concept (with a version of the figure), PR #4239, the talk, the same source markers and list. All use the system stacks of section 1.3. All contrast ratios below are measured on the design's background.

Mock-up of the five first screens: `mockups/designs.html`.

| Id | Name | Idea (one line) | Palette (text contrast) | Type | Layout | Mood |
|---|---|---|---|---|---|---|
| `ledger` | Ledger (default) | A calm consultancy page: one screen says who he is and what to read next. | bg #FAF8F4, ink #1C1B19 (16.2), muted #4A4740 (8.7), teal #1D5C63 (7.2) | sans | one column of 38rem with a monogram disc on the right; three proof points in a row | quiet, trustworthy |
| `broadsheet` | Broadsheet | A newspaper profile: masthead, headline, two columns, the figure as a full-width plate. | newsprint #F4F1EA, ink #161513 (16.2), grey #4B4740 (8.2), red #9B1C1C (7.2) | serif body and headlines, sans for kickers | masthead rule, three columns at 1366, one at 390; drop cap "M" in place of the disc | considered, editorial |
| `runlog` | Run log | The site as a terminal session: each section is a command and its output; the twelve steps are log lines. | #0E1116, text #D7DEE8 (14.0), grey #9AA6B5 (7.7), green #7EE2A8 (12.0), amber #F2C14E (11.3) | mono throughout | one 80-character column; `$ whoami`, `$ sgit checkpoint`, `step 01/12 ...`, `$ cat sources` | precise, technical |
| `blueprint` | Blueprint | An engineering drawing set: each page is a sheet with a title block; the run is the main drawing. | blue #0F2A4A, white #F2F7FF (13.5), pale #B8CCE6 (8.8), cyan #7CC4FF (7.7), yellow #FFD27A (10.2) | sans headings, mono labels | 24 px grid ground, framed sheet, title block (sheet 01 of 09, subject, steps 12, safeguards 3) | exact, engineered |
| `vault` | Vault | Sealed, checked, restored: content sits in panels like checkpoints, each with its fingerprint line. | green-black #13201C, cream #ECE6D8 (13.5), stone #B9B2A2 (8.0), brass #D9B26A (8.4), mint #8FD3B8 (9.7) | serif headings, sans body, mono seals | monogram as a brass seal with a double ring; facts in bordered panels; footer as a "seal" line | secure, deliberate |

Notes per design:
- **runlog** must not look like a fake product. Its commands are labels only (no blinking cursor, no typing animation), and it says in its first line that it is a design of this site. Source markers appear as `[1]`.
- **blueprint** keeps the grid faint (#1C3A60 lines) so text contrast is unaffected; the title block is real text, not an image.
- **vault** reuses the brief's own words (encrypted checkpoint, Agent Behaviour Policy, same SHA-256) for its panel labels; it shows no hash values, since none are in the sources.
- **broadsheet** masthead reads his name or "A profile", never an invented paper name.
- Every design shows a strip at the top: "Design: Broadsheet. [Designs] [Main site]".

---

## 3. The chooser

### 3.1 The Designs button and pop-up

Mock-up: `mockups/home.html`, press "Designs".

```
[Designs] (header, every page, every design, 44 px tall, pill outline)
     |
     v  <dialog id="designs" aria-labelledby="dh">  (showModal; Esc and Close button close it)
+----------------------------------------------------------+
| Designs                                                  |
| The same facts and sources, laid out five ways. All designs
| +------------+ +------------+ +------------+             |
| | thumbnail  | | thumbnail  | | thumbnail  |   1366: 3 across
| | Ledger     | | Broadsheet | | Run log    |   390: 1 across,
| | calm ...   | | newspaper  | | terminal   |   dialog full width
| +------------+ +------------+ +------------+             |
| +------------+ +------------+                            |
| | Blueprint  | | Vault      |      current design marked "You are here"
| +------------+ +------------+                            |
| [Close]                                                  |
+----------------------------------------------------------+
```

- The button is a real `<a href="/d/">` enhanced by a few lines of inline script to open the dialog; without JavaScript it goes to `/d/`.
- Each card: thumbnail, name, one-line idea; the whole card is one link. The current design has `aria-current="page"` and a visible "You are here".
- Focus moves into the dialog on open and back to the button on close (native `<dialog>` behaviour); the backdrop dims the page at 50%.
- Thumbnails: a PNG of each design's home at 1366x800, scaled to 480x281, generated by `scripts/shots.mjs` at build time, with `alt="Home page in the <name> design"`, `loading="lazy"`, width and height set. They show the monogram, never a photo.

### 3.2 The /d/ index

The same cards as a plain page: heading "Designs", one paragraph ("The same facts and sources, five ways. Ledger is the main site."), a grid of the five cards, and under each a line "Best for: ..." in plain words. No script needed.

---

## 4. Link previews

One 1200x630 PNG per page, typographic, made from SVG at build time (`scripts/cards.mjs`), no photo. Mock-up: `mockups/og-home.svg`.

```
+------------------------------------------------------------+  teal bar on top
| ENTERPRISE AI LEADER, LONDON                     (  MC  )   |
| Mondweep                                                   |
| Chakravorty            (84 px)                             |
| <one line per page, below>                                 |
|------------------------------------------------------------|
| mondweep-chakravorty.agenticcells.site            <page>   |
+------------------------------------------------------------+
```

| Page | Kicker | Big line | One line |
|---|---|---|---|
| `/` | Enterprise AI leader, London | Mondweep Chakravorty | Agentic AI systems, built and advised on through DxSure Ltd. |
| `/built/` | What he has built | Mondweep Chakravorty | The SGit x Ruflo proof of concept, Ruflo PR #4239 and a talk in London. |
| `/proof-of-concept/` | SGit x Ruflo | Agent memory, saved and restored | 12 steps, 3 safeguards, the same SHA-256 fingerprint. (A small version of the figure's three phase blocks replaces the monogram.) |
| `/experience/` | Experience | Mondweep Chakravorty | Two decades in financial services, automotive, energy and technology. |
| `/agentics-london/` | Agentics Foundation | London chapter | Co-founded by Mondweep Chakravorty. |
| `/collaboration/` | With Dinis Cruz | Founding providers on ruv.sgit.ai | Mondweep Chakravorty and Dinis Cruz. |
| `/sources/` | Sources | Every fact, with its source | Each with its URL and the date it was read. |
| `/ai/` | Use with AI | This site as plain text | llms.txt and Markdown copies of every page. |
| `/behind-the-scenes/` | Behind the scenes | How this site is made | The team, its policies, every round and every commit. |
| `/d/` and each `/d/<id>/` | Designs | <design name> | <its one-line idea>, drawn in that design's palette. |

Tags per page: `og:title`, `og:description`, `og:image` (absolute URL), `og:image:width` 1200, `og:image:height` 630, `og:image:alt` (the card's words in a sentence), `og:locale` en_GB, `twitter:card` summary_large_image. Text on cards meets the same contrast as the pages.

---

## 5. Behind the scenes

`/behind-the-scenes/` (one page with an in-page index) plus `/behind-the-scenes/rounds/<n>/` per round. Everything is read from the repository at build time.

```
Behind the scenes
How this site is made, by whom and in what order.
[How it is made] [The team] [The flow] [Rounds] [Every commit]

How it is made     2 short paragraphs: AI agents of AgentiCCells write it from one
                   facts file; Dinis Cruz instructs; Mondweep approves through Dinis.
                   Dinis's words, with the time given (from team/WORKFLOW.md).
The team           6 cards: role name, what it does, what it may change, what it
                   must never do (3 lines from its POLICY.md, in plain words),
                   link to ROLE.md and POLICY.md on GitHub. Status "proposal" shown.
The flow           inline SVG of the 9 steps of a round, with the loop from live
                   review back to build (mockups/bts-flow.svg: vertical at 390,
                   two rows of boxes at 1366). The two review steps are shaded.
Rounds             one card per round: aim, what changed, reviewer verdict,
                   before/after screenshot pair, link to the full report.
Every commit       from git log, grouped by round (round boundaries from the tags
                   or team/rounds/N.md dates):
                     Round 1  (18 Nov 2026)
                       abc1234  designer  Round 1 design proposal
                       ...      researcher  ...
                   short hash (mono, links to GitHub), the Agent: trailer's role as
                   a small label, the subject line. Newest round first; each round
                   is a <details> open for the latest only.
```

---

## 6. Accessibility rules (every page, every design)

1. **Targets:** every link and button that stands alone is at least 44x44 px (header links, Designs, Menu, cards, source markers by padding). Links inside running text are exempt but keep underlines.
2. **Focus:** a 3 px `--focus` outline with 3 px offset on `:focus-visible`, never removed; each design defines its own focus colour with at least 3:1 against its background. A "Skip to content" link first in the page.
3. **Contrast:** body text at least 4.5:1 and large text at least 3:1 (all palettes above measure 7:1 or more for text); UI borders and the figure's lines at least 3:1. Checked by script on every design's tokens.
4. **Headings:** one `<h1>` per page, no skipped levels; the dialog has its own `<h2>`. Landmarks: `header`, `nav aria-label="Main"`, `main`, `footer`.
5. **No horizontal scroll at 390 px:** checked by the reviewer with `document.documentElement.scrollWidth === 390` on every page and design (the mock-ups pass). Long tokens such as `docs/...` paths and hashes get `overflow-wrap:anywhere`.
6. **Motion:** none needed; any transition sits inside `prefers-reduced-motion: no-preference`.
7. **Language and text:** `lang="en-GB"`; the figure has a text equivalent; the monogram is labelled; thumbnails and OG images have alt text.
8. **Works without JavaScript:** Menu and Designs fall back to links; the only script is the few inline lines that open the dialog.

---

## Open questions for Dinis (through the conductor)

- The phase names (Save, Delete, Restore) and the split of the twelve steps between them depend on the researcher's record of the run.
- Whether Mondweep prefers the default to be Ledger or one of the other four.
- The headshot: once supplied, it replaces the monogram on `/` and in the home OG card only, unless Dinis says otherwise.
