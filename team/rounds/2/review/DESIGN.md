# Round 2 design review

**By:** reviewer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18. **Reviewed:** `team/rounds/2/design/PROPOSAL.md` and `mockups/` (commit 1655806), against `research/facts.json` (126 facts; F09 to F12 and F14 cleared, F13 and F15 not), `CLAUDE.md`, `team/WORKFLOW.md` (Dinis's words at about 10:46, 10:50 and 10:55 UTC) and `team/rounds/2.md`. `board/HOLD.md` absent.
**Checked (C1):** every sentence in the five mock-ups against facts.json; contrast computed (WCAG formula) for 55 colour pairs; each mock-up loaded in Chromium at 390 x 844 and 1366 x 768, with and without JavaScript (scrollWidth, image sizes, link heights). Screenshots in the session scratchpad, not in git.

## Verdicts

| # | Change | Verdict |
|---|---|---|
| 1 | Ledger home first screen | pass with conditions (1 to 8) |
| 2 | The run drawn as the centrepiece | pass with conditions (9 to 13); one factual error |
| 3 | Section rhythm, career band, pull quote | pass with conditions (14 to 16) |
| 4a | Work with him | pass with conditions (17 to 19) |
| 4b | Collaboration timeline strip | pass with conditions (20) |
| 5 | /experience/ as a career page | pass with conditions (14, 21 to 24) |
| 6 | Broadsheet front page | pass with conditions (25, 26) |
| 7 | Run log, two panes | pass with conditions (9, 27) |
| 8 | Blueprint sheet | pass with conditions (28) |
| 9 | Vault doors | pass with conditions (29); still reads as a restyle |
| 10a | Designs pop-up | pass with conditions (30) |
| 10b | Follow-ups 5 and 6 | pass |
| 10c | "How this was made" | pass with conditions (31) |

## The conductor's three positions

- **(a) People check: confirmed, with one challenge.** Allow exactly `/assets/photo/mondweep-chakravorty.png` in `<img>`, `srcset`, CSS `url()` and `og:image`; fail on any other image path that names him and on any other file under `src/assets/photo/`. The challenge: changes 1 and 10a put his face inside generated images (the home, Ledger and possibly /collaboration/ link-preview cards; the Ledger, Broadsheet and Vault previews in the pop-up). Those are images of him at other paths. The check must list them by name as derivatives that `scripts/cards.mjs` renders from that one file only, and fail on any image of him not on that list. Also pin the file's SHA-256 in the check, so the headshot cannot be swapped under the same name.
- **(b) Approval check: confirmed, with additions.** Refuse F13 and F15 by id, and by their distinctive words ("vibe-cast", "builds in public", "mondweep.net", "github.com/mondweep", "LinkedIn"), since neither claim carries the old "needs his approval" marker the current regex keys on. Every `data/site.mjs` entry whose text uses words from F09 to F12 or F14 must list `providers-data` in its `src`; the `providers-data` source must not back F13 or F15. Replace the check, never delete it.
- **(c) Parity check: confirmed.** It stays as it is. The home gains `types` and `providers-data`, so each design must render the five kinds of project and the two career lines, in its own style.

## Conditions for the developer (D) and writer (W)

**Change 1**
1. (W) The serif line uses F02's words: "Enterprise AI leader and agentic systems builder." Then F05: "Through DxSure Ltd he advises on and builds agentic AI systems." No clipped fragments.
2. (W) The third number reads "a community of about 300 engineers, strategists and educators" (F30's own words), "as the chapter's site gave it on 18 November 2026". F30 says "community", not "members". "He co-founded" cites F04.
3. (W) The other three numbers pass as drawn: "12 steps and 3 safeguards" (F54, F123), "#4239, merged into Ruflo on 17 October 2026" (F71), "2 founding providers: him and Dinis Cruz" (F19). Each keeps its marker.
4. (D) Headshot: `width="200" height="200"`, `alt="Mondweep Chakravorty"`, never above 200 CSS px (176 px measured at 1366, 96 px at 390: pass). No `srcset`, no upscaling, no other crop or file. The 6 px border sits inside the 176 px box, as mocked.
5. (D) The focus ring `#B4531A` on the teal field is 2.37:1 (fails 3:1). On dark bands use cream `#F6F1E7` or gold `#E8B04B` (6.1:1).
6. (D) At 390 px the motif crosses the eyebrow and the name (seen in the screenshot). It must not sit behind text at any width: clip it to the area right of the photo, or drop it below 52rem.
7. (D) The header name link is 24 px tall at 1366; make it 44 px. Gold on the teal field (text 6.1:1, rings 6.1:1) passes.
8. (W) `PERSON.status[1]` and the lines on `/behind-the-scenes/`, `/ai/`, `/llms.txt` change as proposed; F100 (his provider page shows initials) stays true and may be kept as a fact about that page.

**Change 2 and the run in every design**
9. (W, D) **Factual error.** Steps 2, 5 and 8 do have video times: 0:14 (F112), 0:38 (F115), 0:58 (F118), recorded in `research/` this round (GAPS.md section 2). Drop the hollow nodes, "no time given", `[ -- ]` and the key line "no time in the video summary" everywhere (changes 2 and 7, proposal condition 4). Place every node at its time.
10. (D, W) The key says plainly: "The results are the run's own summary (step 12, F55); setting each beside a step is this site's reading." The mocked key ("from the run's own summary") does not say this. Same line in the Run log footer.
11. (D) Gold safeguard rings `#B07A12` reach only 2.97:1 on the "check" band (step 11) and 3.05 to 3.15 on the others. Use a darker gold (at least 3:1 on every band, aim 4.5) or a white halo under the ring.
12. (D) SVG text must render at least 13 px. The strip is drawn at 15 px in a 1220-unit box, which renders at about 12 px at 1366 and 10 px at 1024. Scale the type in viewBox units, or show the strip only where it renders at 13 px.
13. (W) The `<desc>` does not give band edges in seconds ("to about 27 seconds"); the phases are this site's grouping, so say that instead.

**Changes 3 and 5: framing**
14. (W) **Reject the heading "From core banking to agentic AI"** (home and /experience/). No source frames his career that way. Use the source's own first and present stops: "From HSBC Global Technology to DxSure Ltd". Any other summary heading goes to Dinis first.
15. (W) Pull quote passes: the text matches F61 word for word, Dinis Cruz's words in his own article No. 164 (F133, 17 October 2026). Keep exactly that text, attributed to him with the `poc` marker. No other pull quote, and no words set as Mondweep's.
16. (D) "His career" and other links that end a paragraph become stand-alone links at least 44 px tall.

**Change 4a**
17. (W) "What happens next": use the sources' words only. Line 2 reads "a suggested starting combination, agreed in the first conversation" (F99), not "a starting point". Line 4 keeps F26's context: "Runs are not automated end to end yet: a person starts, watches and hands over every run." Lines 1 (F20) and 3 (F98) pass. Cite F20 and F98 under `provider`, F26 under `offers`.
18. (D) The sources give no sequence for lines 3 and 4, so make the list bulleted, not numbered, or number only line 1. The heading may stay.
19. (D) The email address link is 26 px tall; give it 44 px. Prices and the "Not built yet" tag match F21 to F25 as drawn.

**Change 4b**
20. (W, D) Start the strip on 16 October, so the talk stays once on the page (round 1 condition 15). Commit times are London time (F74, F128); the merge is 14:59 by rUv (F71).

**Change 5**
21. (W) The card kicker "Teaching" becomes "Mentoring" (F11 says "mentors").
22. (W) The stop labels "First", "Then", "After the MBA" are ours: the list's label says "in the order the source gives" (as mocked). Keep "Later" and "Since September 2024" as the source has them.
23. (W) The note says the source marks the bio as drafted for him to approve, and that Dinis Cruz cleared it on 18 November 2026. Nothing from F13 (the "vibe-cast" lab) or F15 (links) appears.
24. (W) No person is named; the organisations only as F10 names them.

**Changes 6 to 9: the designs**
25. (D) Broadsheet: the vault is used in three steps (5, 8, 11; `POC.vaultText`). Hatch plate 11 too, or reword the key to "the vault is written or restored". Plate labels at least 12 px (now 0.62rem, about 10 px).
26. (D) Broadsheet headshot 132 px (96 at 390): pass. Its figcaption repeats the name next to the `h1`; keep `alt` and drop the caption, or keep the caption and set `alt=""`, not both.
27. (W) Run log: the step 2 detail "unsupported or ambiguous policies fail closed" passes (F112). No `$` prompt, no hash values, kept.
28. (D) Blueprint: the title block (11 px) and grid letters (12 px) are below the proposal's own 13 px rule at drawn size; raise them. The `MC` stamp stays.
29. (Designer, before build) **Vault still looks like a restyle**: four bordered columns of step lists, the same structure as change 2's phase panels, on a dark green ground. Give it a drawn idea of its own (for example, the vault's path drawn: written at 5, read at 8, read and rejected at 11, with the doors as drawn vault doors), and show a new mock-up to the reviewer before the developer builds it. The seal photo (146 px at 1366, 82 at 390, from the 200 px file): pass.

**Change 10**
30. (D) Previews that show his face are on the derivative list of position (a). Badges and Close pass (48 px, gold 9.5:1). The pop-up must still open as a plain link to `/d/` without JavaScript, as today.
31. (W) "How this was made" sits next to "How it is made"; merge them, or give the new box a heading that is not a near-copy. Its facts match `team/WORKFLOW.md`.

## Rules checked and passed

- 390 and 1366 px: scrollWidth equals the viewport in all five mock-ups, with and without JavaScript; nothing needs JavaScript.
- Contrast: all body and badge text at least 5.3:1 (PASS 5.3 on its lightest band, run log text 7.6 to 12, Blueprint 7.7 to 11.9, Vault 7.4 to 10.5, Broadsheet red 7.2). Failures only in conditions 5 and 11.
- People: only Mondweep Chakravorty, Dinis Cruz and rUv. Images: only the one headshot, at most 176 CSS px.
- No em dashes or hype words in the mock-up text. System fonts, no third-party resources.

## Does it meet "as good and creative as the other ACC sites"?

Mostly, yes. The home now has what the model sites have: a colour field, the photograph with an offset block and pinned caption, a very large name, four stat tiles, bands and a serif pull quote. Broadsheet (Plate 1 and a caption column), Run log (story and terminal, as his own video does it, F109) and Blueprint (zones, balloons, a title block) each have a first screen the others do not. Vault does not yet (condition 29). The home's run figure is a placeholder in the mock-up, so the build of change 2 is reviewed on the live site in `LIVE.md`.

## Change 9, revised: verdict

**Pass with conditions.** Reviewed 18 November 2026: `mockups/vault.html` and "Change 9, revised" in `PROPOSAL.md` (commit 8df07b0), against `research/facts.json` and `data/site.mjs` (`POC.vaultText`, `gatedSteps`, `cliSteps`). Playwright at 390 x 844, 1024, 1152 and 1366 x 768, with and without JavaScript. Screenshots stay in the session scratchpad.

**It is now a design of its own.** The run is one round vault door: twelve steps on a clock face, the phases on the rim, the policy gate as a brass ring with doors and gaps, the memory file as a dotted ring, the vault at the centre with save, restore and rejected drawn as paths. No other design draws the run this way (Broadsheet plates, Run log terminal, Blueprint zones). Condition 29 is met.

**Checked and passed.**
- Facts: the twelve titles match F54 and the times match F111 to F122 (0:09 to 1:26). Gate doors on 4, 5, 6, 8 and 11; gaps with dashed command-line arrows on 3 (writes), 9 and 10 (reads), as F126 and F65 say. Safeguard bolts on 4 and 6 at the gate and 11 at the vault (F114, F116, F121, F123). The vault is entered at 5, left at 8 and reached but refused at 11, matching `POC.vaultText`; F125's "touched when you save and when you restore" is quoted and step 11 is drawn as a rejected read, not a use. "As his README says" is backed by F65 and F132. Phases are labelled as this site's grouping.
- Rules: only the one headshot, 200 x 200 file, shown at 126 px at 1366 and 82 px at 390 (under 132), `alt` set, no caption repeating it. No hash values (the step 8 line names SHA-256 only), no "sealed", no em dashes, no hype words, no other person named, no scripts.
- Contrast: all text 7.4:1 or more (phase labels on the rim 7.9 and 9.8, brass labels 9.1, mint 10.5, numbers on filled nodes 8.4); node rings for steps 1, 2, 7 and 12 are 4.8:1 (3:1 needed).
- SVG text: smallest renders at 14 px (dial at 680 px for 680 units; tall drawing 358 px at 390, 480 px at 1024).
- Layout: `scrollWidth` equals the viewport at all four widths; no overlapping labels in either drawing. The step list is the visible text alternative, and each SVG has `<title>` and `<desc>`.

32. (W) Step 11's tag reads "safeguard 3" with no word; make it "safeguard 3: rejected" (F123 "tampered copy rejected"), to match "refused" and "stopped" on 4 and 6.
33. (D) Generate both drawings from `POC.steps`, `gatedSteps`, `cliSteps`, `vaultSteps` and `safeguards` in `scripts/designs.mjs`, as proposed; no hand-placed step list. The design parity check must still see every step, time and tag in the `<ol>`.
34. (D) The key's "passes the policy gate" swatch is a plain line, but the drawing shows a small door on the gate; draw the door in the swatch. Give `.tag.vault` its own style (it has none in the mock-up) so "vault written / read / read, rejected" is distinct from the gate tags.
35. (D) Keep the halo (`paint-order: stroke`) under "vault" and "encrypted": the wheel spokes behind them are 1.8:1 and only decorative. Keep the dial from 72rem only and the tall drawing below it, as mocked.
