# Round 1 design review

**By:** reviewer.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18.
**Reviewed:** `team/rounds/1/design/PROPOSAL.md` (commit 6b84898) and its six mock-ups, against `research/facts.json` and `research/sources.md` (commit 7fea465), `CLAUDE.md`, `team/WORKFLOW.md` and `team/reviewer/POLICY.md`.
**How checked (C1):** read every line of the proposal and the mock-up source; matched each claim to a fact id; recomputed every contrast ratio with the WCAG formula (all text ratios in section 1.3 and section 2 are correct to 0.1); searched for em and en dashes (none) and hype words (none). `board/HOLD.md` does not exist.

## Verdicts

| Rank | Change | Verdict | Conditions |
|---|---|---|---|
| 1 | Figure of the twelve-step run | pass with conditions | 1 to 7 |
| 2 | Home first screen with "MC" monogram | pass with conditions | 8 to 11 |
| 3 | Numbered source markers and source lists | pass with conditions | 12 to 14 |
| 4 | Page structure: nine pages, one header | pass with conditions | 15 to 20 |
| 5 | Type and colour tokens, system fonts only | pass with conditions | 21, 22 |
| 6 | Five designs under /d/ | pass with conditions | 23 to 28 |
| 7 | Designs pop-up and /d/ index | pass with conditions | 29 to 32 |
| 8 | Link previews, one PNG per page | pass with conditions | 33 to 35 |
| 9 | Behind the scenes | pass with conditions | 36 to 38 |
| 10 | Accessibility rules | pass with conditions | 39 to 42 |

Rejected outright: the talk at Agentic Engineering Live as one of "what he has built" (proposal "Facts" paragraph, section 1.1 `/built/`, section 2 "the talk", section 4 `/built/` card "a talk in London"). See condition 15. Nothing else is rejected.

## Conditions the developer must meet

### The figure (rank 1)

1. **Real steps, not placeholders.** Draw the twelve step titles from `data/site.mjs`, worded as F54 gives them. No "Step N wording" text may ship.
2. **Phases: replace Save / Delete / Restore and the 4/4/4 split.** "Delete" misleads: the deletion in step 6 is the one that was *stopped*; what happens in step 7 is the original workspace being removed. Use four phases, each step's `phase` field one of these ids:
   - `setup`, "Set up": 1 A real, pinned runtime; 2 Define the mandate; 3 Store two facts through Ruflo.
   - `save`, "Save under the policy": 4 Try something outside its permission; 5 Save an encrypted recovery point; 6 Approval means stop.
   - `restore`, "Lose it and bring it back": 7 Remove the original workspace; 8 Restore in a fresh process; 9 Ask Ruflo what it remembers; 10 A missing fact stays missing.
   - `check`, "Check and conclude": 11 Change the saved copy, try again; 12 What this run proves.
   Split 3/3/4/2. Wide layout: four columns, or two rows of two; the tall layout keeps one column.
3. **Safeguards sit on their steps, not as rails "held from step 1 to step 12".** No source says they ran the whole length, and F65 says Ruflo's own command line (steps 3, 9, 10) does not pass the policy gate. Mark each safeguard at its step, with F56 wording: S1 "a request outside the agent's permission is refused" at step 4; S2 "a deletion that needs approval is stopped" at step 6; S3 "a tampered checkpoint is rejected" at step 11. Remove "held throughout the run" from both SVGs, the `<desc>` and the text list.
4. **Fingerprint line:** "SHA-256 of the database saved at step 5 = SHA-256 after the restore at step 8" (F57, F63). No hash value anywhere: no source gives one.
5. **Show the limits beside the figure:** step 12's summary as F55 gives it, including "semantic recall NOT VALIDATED, because embeddings were off"; plus F60 (still to validate) and F64 (the vault stays on one machine). The facts are synthetic ("Kestrel" is a test name, sources.md section 6); say so if the facts are shown.
6. **No frames from his video** (F62: the frames are his and not under any licence we hold). The figure is drawn by us from F54 to F57 and F63.
7. Keep the build notes of section 1.6 (two SVGs from one data set, `<figure>` with `<figcaption>`, a real `<ol>` of the twelve steps with source markers, text 14 px or larger, the hidden SVG `display:none`).

### Home (rank 2)

8. Lede: keep to F05 and F06 wording, "drawing on two decades in financial services, automotive, energy and technology" (F06 says "draws on"; "after" changes the claim).
9. Proof point "Agent memory saved, deleted, restored" is wrong: memory was not deleted. Use "Agent memory saved encrypted, the project deleted, the memory restored in a fresh process with the same SHA-256 fingerprint" (F50, F57), or a shorter cut of those words.
10. "Work with him" links to `/collaboration/`. That page gives contact only as `agent@riskmandate.ai` with the words "Enquire to book" (F07) and a link to https://ruv.sgit.ai/providers/mondweep-chakravorty.html. Never the chapter's agentics.org addresses (F35), never a form. Prices only as F20 to F26 give them, in GBP excluding VAT, with "dedicated compute is not built yet" (F25) and "a person starts, watches and hands over every run" (F26). The BYOK run prices (F25) appear if run prices appear.
11. Monogram only, as drawn (`role="img"`, `aria-label`). No image of him from london.agentics.org (F37) or anywhere else; only the headshot Dinis supplies, and only when Dinis says so.

### Sources (rank 3)

12. Every marker in the mock-up's facts list needs `aria-label="Source N"` (the three in `.facts` lack it).
13. The 44 px hit area on markers must not change the line height of running text: use a positioned `::after` on the link, or treat in-text markers under the WCAG 2.5.8 inline exception and keep them at least 24 by 24 px. State which in the build notes.
14. Long-bio facts F09 to F12 and specialisms F14 come from text "for the provider to approve" (F16, sources.md section 8). Do not publish them unless Dinis confirms Mondweep approved them; the generator should refuse a fact flagged as needing approval.

### Pages (rank 4)

15. **The talk.** "Autonomy with a mandate and a memory" (15 October 2026) was Dinis Cruz's talk (F41, F42). Nothing may present it as Mondweep's talk, list it under "What he has built", or say he spoke. It may appear once, on `/collaboration/`: the marketplace began after Dinis Cruz's talk at Agentic Engineering Live, an Agentics Foundation London event, and the London chapter Mondweep co-founded runs the meetups where it was shown (F40, F82).
16. `/built/` covers the proof of concept (F50 to F65), PR #4239 (F70 to F79, F90 to F93) and the code under MIT (F53). The commit count only as "9,625, per the newsroom article" (sources.md section 8). "Merged by rUv" is from the newsroom only; cite F71, not the git facts.
17. `/experience/`: with condition 14, only F05 and F06 remain. Either fold it into the home and drop the page (four header links, easier at 390 px), or keep it with F05, F06 and F03 only. Proposal choice, but no unapproved bio.
18. `/agentics-london/`: F30 to F34, F36. Do not name the other co-founders (F32 names one; write "with five other chapter leaders"). rUv only as "Reuven Cohen (rUv)" or "rUv" (F31).
19. People named anywhere on the site: Mondweep Chakravorty, Dinis Cruz, rUv. No other person (sources.md section 6 lists the names to keep out).
20. Menu at 390 px stays a link to `#site-index`; header must not wrap at 390 px with the name on two lines and two buttons.

### Tokens (rank 5)

21. No web fonts, no font files, no third-party scripts, stylesheets or images. Every `<link>`, `<script>` and `src` same-origin.
22. Rule colours fail 3:1 (`#DDD8CE` on `#FAF8F4` is 1.34; Vault `#3A4A43` on `#13201C` is 1.79). Fine for decoration, but any border that is the only sign of a control (cards, the outline button) must reach 3:1, or the control must be identifiable by its text. Correct the proposal's claim "UI borders at least 3:1" in the build notes.

### Five designs (rank 6)

23. The five are genuinely distinct in type, colour and layout: accepted. Each `/d/<id>/` home must carry the same facts and sources as `/`, generated from the same data. Add a build check: every fact id cited on `/` is cited on each `/d/<id>/`.
24. Run log: no invented commands. `sgit checkpoint --policy abp` is not in any source. Use plain labels (`# who`, `# what he built`) or only commands the sources quote (`ruflo --version` returns v3.56.10). Its step lines use the real step titles; "step 12/12 restore" is wrong (restore is step 8).
25. Blueprint title block: "REV: 0.2" is invented; use the site version from the build. "DRAWN: site team" becomes "Drawn by the AgentiCCells cell" or similar.
26. Vault: drop "sealed" from the card and panels ("Sealed, checked, restored"). His README says the hashes "are not digital signatures" (sources.md 3.3). Use "Saved encrypted, checked, restored". No hash values; "sha256: same" is fine.
27. Broadsheet masthead "A profile", never a paper's name: accepted.
28. Each design defines its own focus colour at 3:1 or more on its background, and shows the strip "Design: <name>. [Designs] [Main site]".

### Chooser (rank 7)

29. The mock-up's Designs control is a `<button onclick>`; build it as the proposal says, `<a href="/d/">`, enhanced by one small same-origin or inline script to open the `<dialog>`. Without JavaScript it must reach `/d/`.
30. `/d/` lists all five as plain links with the "Best for" line, no script. `/d/ledger/` is a static page with `<link rel="canonical" href="/">` and a visible link to `/`; no JS redirect.
31. Close button 44 px (it uses `.btn`, fine); the current design marked with `aria-current="page"` and visible text.
32. Thumbnails show the monogram, never a likeness, with the alt text proposed.

### Link previews (rank 8)

33. One 1200x630 PNG per page and per design, same-origin, absolute `og:image` URL, the tags listed in section 4, plus `og:url` and `<link rel="canonical">`.
34. The `/built/` card: replace "and a talk in London" with "and Ruflo PR #4239" only (condition 15). The `/proof-of-concept/` card must not say safeguards held "throughout".
35. No photo on any card until Dinis supplies the headshot and says where it goes.

### Behind the scenes (rank 9)

36. Commit list shows short hash, the role from the `Agent:` trailer and the subject only. No author emails, no full trailers, no secrets; run the leak scan over the generated page.
37. Dinis's words with the time given, from `team/WORKFLOW.md`; policies shown with status "proposal".
38. The flow SVG matches the nine steps of `team/WORKFLOW.md` (it does); keep the loop from live review to build.

### Accessibility (rank 10)

39. All ten rules in section 6 hold on every page and every design, including 44 px stand-alone targets and a visible focus ring.
40. No horizontal scroll at 390 px on every page and design (`scrollWidth === 390`); I will check this live at 390 and 1366 px in `LIVE.md`.
41. One `<h1>` per page, no skipped levels, landmarks as listed; `lang="en-GB"`.
42. Every page works without JavaScript; the only script is the dialog enhancement.

## For Dinis (through the conductor)

- Whether Mondweep has approved the long bio (F09 to F12, F14); until then it stays off the site.
- Whether he wants Ledger as the default.
