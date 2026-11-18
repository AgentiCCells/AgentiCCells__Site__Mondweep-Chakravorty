# Round 2 research: gaps and corrections for the writer

By researcher.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18. Task: live review finding 4 (every detail the site prints has a quote in `research/facts.json`) and finding 3 (the article count). Sources re-read today with curl; new facts F94 to F145, notes in `research/sources.md` section 10. Line numbers are for `data/site.mjs` at commit 63ab22e.

## 1. Not found at source: reword or remove

| Where in data/site.mjs | What it prints | What the source says | Suggestion |
|---|---|---|---|
| HOME.intro[2] (line 266) and COLLAB.intro[0] (line 503) | "a small marketplace for agentic engineering work" | No ruv.sgit.ai page I read says "agentic engineering work". llms.txt: "agent work done by a Ruflo hive under a written mandate per role, with a vault per job that the client keeps, delivered by named providers through a small marketplace" (F105). | "a small marketplace for agent work done under a written mandate" or simply "a small marketplace", cited to F19 and F105. |
| PERSON.status[0] (line 256) | "Mondweep agreed to this public site, as Dinis Cruz told the team on 18 November 2026." | Not a public source: it is Dinis Cruz's word in `team/WORKFLOW.md` ("Yes, he agreed", about 09:58 UTC). No facts.json entry is possible under N1. | Keep, but say where it comes from (the team's brief), as now; do not cite a public source for it. |

## 2. Corrections: the source says something else

| Where in data/site.mjs | Now | Source | Fix |
|---|---|---|---|
| POC.steps, n 2, 5 and 8 (lines 338, 344, 350), and the header comment on line 17 | `at: null` ("null when the article gives none") | The article gives times for all twelve steps: step 2 at 0:14 (F112), step 5 at 0:38 (F115), step 8 at 0:58 (F118). Same article version (v1.2.0) as round 1; research 3.2 had missed them. | Set `at: '0:14'`, `'0:38'`, `'0:58'`. |
| PR.openedText (line 418) | "the evening of 16 October 2026, London time" | "Mondweep Chakravorty opened it at 23:02 the night before." (F128) | "at 23:02 on 16 October 2026, London time" (or "late on 16 October"). |
| SOURCES.mess / .reach / .librarian notes (lines 178, 196, 205) and COLLAB.articles titleNote for Nos. 166, 178, 193 (lines 582, 592, 594) | "Title taken from the address; the full title was not recorded." | Full titles now recorded: F135 (No. 166), F140 (No. 178), F141 (No. 193). | Use the full titles and drop the "not recorded" notes. No. 193's own spelling is "The Librarian's daily brief" (capital L). |
| SOURCES.allowed (No. 175) | Short title "Allowed is not right" | F139: the full title's opening words are "Allowed is not right"; the rest names a person in sources.md section 6. | Keep the short title; the note can say "the opening words of the title". |
| COLLAB.articlesNote (line 597) | "Eleven newsroom articles by Dinis Cruz name Mondweep in their text, between 16 and 18 October 2026." cited to three articles | F145, count by this site on 18 November 2026: 11 of 470 articles name him in their body. | Finding 3: "... by this site's count of the newsroom on 18 November 2026", cited to F145 (source: the articles index). |
| OPEN[3] (internal question) | "The newsroom gives the start and end of the SHA-256 fingerprint (steps 5 and 8)." | The article gives the start and end once, in step 8, and says it is "the same as in step 5". | "The newsroom gives the start and end of the fingerprint at step 8." Minor; not a public page claim. |

## 3. Now covered: which new fact backs which detail

Add these ids to the matching `SOURCES.<id>.facts` lists.

| SOURCES id | New facts | Details they back |
|---|---|---|
| offers | F94, F95, F96, F97 | the twelve item summaries in COLLAB.offers, including t3.medium, m7i.xlarge, g5.xlarge with A10G, "About 2 hours", "Four working days" (also AI.questions "four days") |
| provider | F98, F99, F100, F101 | COLLAB.engagement ("Most clients start small..."), COLLAB.intro[1] second sentence, COLLAB.projectsNote, PERSON.status[1] (monogram MC, as on his provider page), PERSON.contact.subject and HOME.actions mailto |
| ruv-home | F102, F103, F104, F106 | COLLAB.intro[1] first sentence and HOME.highlights[3] ("same four offers"), COLLAB.disclaimer, TALK.text[1] ("one workflow, ruv.sgit"), OPEN[5] (equal split, whoever has the client bills) |
| llms-ruv | F105 | what the marketplace is (see gap 1) |
| next-phase | F107 | COLLAB.timeline 2026-10-21 |
| poc | F108 to F124, F133 | POC.video.url; "story on the left ... terminal on the right"; "in enforce mode" (POC.summary[1]); every POC.steps text and `at`; POC.safeguards titles; POC.limits (not a product, Kestrel a test name, read not run) |
| vault | F125, F134 | POC.vaultText second sentence; article No. 165 |
| policy-door | F126, F127, F132 | POC.gateText, POC.limits[5] (native plugin registration); article No. 163 |
| pr-article | F128, F136 | PR.openedText; article No. 169 |
| pr, ruflo-git | F129 | PR.commits (hashes, exact times with seconds, author; head 6b49d58) |
| pr-page | F130 | PR.pageTitle; "enforce mode" |
| ready | F131 | article No. 142 |
| mess | F135 | article No. 166 title |
| decisions | F137 | article No. 172 |
| policies | F138, F142 | article No. 173 and its 'why' line |
| allowed | F139, F143 | article No. 175 and its 'why' line ("checked them in enforce mode, outside the agent") |
| reach | F140 | article No. 178 title |
| librarian | F141, F144 | article No. 193 and its 'why' line |
| (new: the articles index, https://newsroom.sgit.ai/articles/) | F145 | COLLAB.articlesNote, marked "count by this site" |

## 4. Checked and already covered (no change)

Prices and units (F21 to F25), "Not built yet. Price = £20 platform fee + twice the EC2 cost" (F22, F25), own-key prices (F25), the PR's three commit hashes and minutes (F74, now with seconds in F129), squash commit 332f22e (F75, F91), the talk's time, length and venue (F41), "a hive, a memory and a mandate" (F81), the step titles (F54), the acceptance summary (F55), the fingerprint (F57), the policy rows and capabilities (F58, F77).
