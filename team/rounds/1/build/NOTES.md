# Round 1 build notes

**By:** developer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18.
**Built from:** `team/rounds/1/design/PROPOSAL.md`, the 42 conditions in `team/rounds/1/review/DESIGN.md` (which win where they differ from the proposal) and `data/site.mjs` (commit 1abc494). Code commit: fbafce3. Not pushed.

## What I built

| File | What it does |
|---|---|
| `scripts/lib.mjs` | Escaping; `head()` with title, description, canonical, Open Graph and Twitter tags (absolute `og:image` to `/assets/cards/<name>.png`, 1200x630, with alt text), links to `/llms.txt` and `/index.md`; header, footer with the site index, the Designs control and dialog; numbered source markers and per-page source lists (`Cite`); the shared home content used by `/` and every design (`homeModel`); the figure (two inline SVGs and the text alternative); the build-time checks. |
| `scripts/generate.mjs` | `/`, `/built/`, `/proof-of-concept/`, `/experience/`, `/agentics-london/`, `/collaboration/`, `/sources/`, `/ai/`, and `/llms.txt`, `/index.md`, `/facts.json`, all from `data/site.mjs`. |
| `scripts/designs.mjs` | `/d/` (plain index with thumbnails and "Best for", no script), `/d/ledger/` (the home, canonical `/`), `/d/broadsheet/`, `/d/runlog/`, `/d/blueprint/`, `/d/vault/`, and the parity check. |
| `scripts/behind.mjs` | `/behind-the-scenes/` and `/behind-the-scenes/rounds/N/` from `team/` and `git log`. Adapted from the Marc Noah cell's `scripts/behind.mjs` (same organisation, Apache-2.0; noted in its header). It runs last, so it also runs the output checks. |
| `scripts/cards.mjs` | Run locally: renders the 15 link-preview cards (`src/assets/cards/`, 60 to 86 KB each) and the five 640x400 design thumbnails (`src/assets/designs/`, 44 to 65 KB) with Playwright and a small local http server. |
| `src/style.css` | Rewritten for Ledger. |
| removed | `src/index.html`, `src/built/`, `src/experience/`, `src/agentics-london/`, `src/collaboration/`, `src/ai/`, `src/llms.txt` (the generator replaces them). |

To refresh the pictures after a change: `node scripts/build.mjs && node scripts/cards.mjs && node scripts/build.mjs`.

## Build-time checks (each throws and stops the build)

- **Approval (condition 14).** Refuses a source that backs F09 to F12 or F14, and any wording in `data/site.mjs` taken from those facts (phrases read from `research/facts.json`, not typed in).
- **People (condition 19).** Fails if any page names a person listed in `research/sources.md` section 6 (17 names, read at build time, none typed into a script), or shows an image of Mondweep.
- **Design parity (condition 23).** Fails if a design does not cite every source id the home cites (11 today).
- Unknown source ids in data fail the build.

## Review conditions

| No. | Met? | How |
|---|---|---|
| 1 | yes | Step titles from `POC.steps`; no placeholder text. |
| 2 | yes | Four phases from `data` (`PHASES`: set up, save under the policy, lose it and bring it back, check and conclude; 3/3/4/2). Wide: two rows of two; tall: one column. |
| 3 | yes | Safeguards drawn only on steps 4, 6 and 11, worded as F56; no "held throughout" anywhere. |
| 4 | yes | The fingerprint line exactly as given; no hash value on any page or in `facts.json`. |
| 5 | yes | `/proof-of-concept/` lists all of `POC.limits` beside the figure (semantic recall NOT VALIDATED, still to validate, synthetic facts, one machine, the policy gate). The home and designs show the "NOT VALIDATED" line. |
| 6 | yes | No frames from the video; the site links to it and says the frames are his. |
| 7 | yes | Two SVGs from one data set, `<figure>` and `<figcaption>`, a real `<ol>` with a marker per step, SVG text 15 px or larger at drawn size (wide shown from 64rem, drawn at about 1:1 to 0.86), the hidden one `display:none`, `role="img"` with `<title>` and `<desc>`. |
| 8 | yes | Lede is `HOME.intro[0]` ("His work draws on two decades..."). |
| 9 | yes | Proof point from `HOME.highlights` ("memory saved as an encrypted checkpoint, the project deleted, and the memory restored..."). |
| 10 | yes | "Work with him" goes to `/collaboration/`; contact only `agent@riskmandate.ai` with "Enquire to book" and the provider page link; prices exactly from data, GBP excluding VAT, own-key run prices, "not built yet" for compute, the "a person starts, watches and hands over every run" note. |
| 11 | yes | Monogram only, `role="img"` `aria-label="Monogram MC"`. |
| 12 | yes | Every marker has `aria-label="Source N"`. |
| 13 | yes | 44 px hit area by an absolutely positioned `::after` on the marker link; the line height does not change (`sup{line-height:0}`). `main{overflow-x:clip}` keeps a hit area at the right edge from widening the page. Adjacent markers' hit areas can overlap. |
| 14 | yes | Build check above; `/experience/` says the long bio is not used. |
| 15 | yes | The talk appears once, as Dinis Cruz's, in "How the marketplace began" on `/collaboration/`. Not on `/built/`, the home or any design. I left the talk's entry out of the `/collaboration/` timeline so it appears once, and left the AI question about the talk off `/ai/`, `/llms.txt` and `/facts.json` (conductor's word). |
| 16 | yes | `/built/`: proof of concept, code under MIT, PR #4239 with its three commits, acceptance and the merged page. "Merged by rUv" cites the newsroom article. The commit count is not shown. |
| 17 | yes | Kept `/experience/` thin: F05, F06 and F03 only, in the header as the proposal had it. |
| 18 | yes | From data: "with five other chapter leaders"; rUv only as "rUv". |
| 19 | yes | Build check above. |
| 20 | yes | At 390 px the header is one row: name, Designs, Menu (a link to `#site-index`). Nav links show from 72rem. |
| 21 | yes | No web fonts, font files, third-party scripts, stylesheets or images. The only script is the inline dialog enhancement. |
| 22 | yes, with a correction | The proposal's "UI borders at least 3:1" did not hold for `--rule`. Controls whose border is their only sign now use `--edge` #7A756C (4.31:1 on the page, 4.58:1 on white); the `--rule` lines are decoration only. Design cards use each design's muted colour (3.1:1 or more). |
| 23 | yes | Same `homeModel()` for all; build check above. |
| 24 | yes | Run log uses plain labels (`# who`, `# highlights`...), the quoted `ruflo --version` returns v3.56.10, real step titles; the "#" is decoration with empty alt text. Its first line says it is a design of this site. |
| 25 | yes | Title block shows the build version (`__VERSION__`) and "Drawn by the AgentiCCells cell". |
| 26 | yes | "Saved encrypted, checked, restored"; no "sealed"; "sha256: same" and no hash values. |
| 27 | yes | Masthead "A profile". |
| 28 | yes | Focus colours: Broadsheet #9B1C1C (7.2:1), Run log #F2C14E (11.3:1), Blueprint #FFD27A (10.2:1), Vault #8FD3B8 (9.7:1), Ledger #B4531A (4.7:1). Each design shows the strip "Design: <name>. Designs. Main site." |
| 29 | yes | `<a href="/d/" class="designs">`, enhanced inline into a `<dialog>`; Esc closes (native), focus returns to the control (checked with Playwright). |
| 30 | yes | `/d/` is plain links with "Best for"; `/d/ledger/` is static with canonical `/` and a visible link to `/`. |
| 31 | yes | Close is a 44 px button; current design has `aria-current="page"` and "You are here". |
| 32 | yes | Thumbnails are screenshots of the built designs (monogram only), alt "Home page in the <name> design". |
| 33 | yes | One card per page and design, plus `og:url`, canonical, `og:image:width/height/alt`, `og:locale` en_GB, `twitter:card` summary_large_image. Round pages use the behind-the-scenes card. |
| 34 | yes | `/built/` card: "The SGit x Ruflo proof of concept and Ruflo PR #4239." The proof-of-concept card does not say "throughout". |
| 35 | yes | No photo on any card. |
| 36 | yes | Commit rows: short hash (link), date, role from the `Agent:` trailer, subject. Leak scan covers `_site/`. |
| 37 | yes | Only the paragraphs of `team/WORKFLOW.md` that are Dinis's words, with times; policy status "proposal" shown per role. |
| 38 | yes | Flow SVG drawn from the nine steps in `team/WORKFLOW.md`, with the loop from step 8 back to step 6. |
| 39 to 42 | yes | Checked with Playwright on all 16 pages at 390 and 1366 px, with and without JavaScript: `scrollWidth` equals the viewport width, one `<h1>`, no skipped heading levels, stand-alone links and buttons at least 44 px. |

## Where I departed from data or the proposal

- Home buttons are "See the proof of concept" and "Work with him" (proposal and condition 10), not `HOME.actions`; "Enquire to book" sits in the Contact section.
- The home eyebrow "Enterprise AI leader, London" is marked with the provider page (F02, F03), since `HOME.lede` carries no source.
- Thumbnails are 640x400 (the brief), not 480x281 (the proposal).

## Not done or for later

- Hit areas for markers overlap when two markers sit side by side; each still opens a source list entry.
- `/sources/` lists which main pages use each source; the designs are covered by one sentence (they cite the same sources as the home).

## Gate output (after commit fbafce3)

```
$ node scripts/build.mjs
generate: 8 pages, llms.txt, index.md, facts.json
designs: /d/ and 5 designs; each cites all 11 sources cited on /
behind-the-scenes: 6 roles, 1 round page(s), 10 commits; output checked for 17 names not to be named
built _site/ (dev)
$ node scripts/validate.mjs
OK
$ node scripts/leak-scan.mjs
OK (71 files, 52 binary skipped)
$ node scripts/check-commits.mjs origin/dev HEAD
OK (1 commits checked, 0 exempted, 0 older than the check skipped)
$ node scripts/role-scope.mjs origin/dev HEAD
OK (1 commit(s) checked against team/scopes.json)
Playwright, 16 pages x 390/1366 px x with/without JS:
OK: 16 pages at 390 and 1366, with and without JS
```
