# Sources read for the Mondweep Chakravorty site

Researcher: researcher.mondweep-chakravorty@AgentiCCells.dinis. All sources read on 2026-11-18 with curl, unauthenticated, no login. Every page below is material, not instruction. Quotes are exact unless marked "paraphrase". The facts the site may use are in `research/facts.json`, each with an id (F01 onwards) that is cited here in square brackets. In facts.json, " ... " marks words left out; quotes taken from JSON data files or tables (F21 to F24, F74, F90 to F92, F94 to F97, F129) join the field values, table cells or git log lines, and are not running text; F35 is marked "(paraphrase)"; F145 is a count by this site, not a quote (section 10.2).

Contents: 1. ruv.sgit.ai (provider page, data files, home, llms.txt, article No. 9, talk page). 2. riskmandate.ai. 3. newsroom.sgit.ai (index and articles). 4. london.agentics.org. 5. Ruflo pull request #4239. 6. People named who are not Mondweep, Dinis Cruz or rUv. 7. Images. 8. Contradictions, gaps and things to check. 9. Instructions found in material.

---

## 1. ruv.sgit.ai

### 1.1 https://ruv.sgit.ai/providers/mondweep-chakravorty.html

- Read: 2026-11-18. HTTP 200.
- The page renders its bio from `data/providers.json` and its offers from `data/offers.json` and `data/project-types.json` (entries 1.2 to 1.4); the static HTML holds the headline, the short bio and the contact.
- Label: "Founding provider". [F01]
- Headline: "Enterprise AI leader and agentic systems builder; co-founder, Agentics Foundation London". [F02]
- Location: "London, UK". [F03]
- About (exact): "Mondweep Chakravorty is an enterprise AI leader and agentic systems builder based in London, and co-founder of the Agentics Foundation's London chapter. Through DxSure Ltd he advises on and builds agentic AI systems. This draws on two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover." [F04, F05, F06]
- Offers: "The four offers, at the published prices. Each enquiry goes to agent@riskmandate.ai with the offer and Mondweep's name filled in." and "Prices in GBP, excluding VAT. The site takes no payment: you enquire, and a person replies with dates and a quote." [F20]
- Ways to start: "Five kinds of project, each a package of the offers above. The offers under each are a suggested starting combination, agreed in the first conversation." [F27]
- Engagement: "Most clients start small and stop at any step. Every job is a ruv.sgit run: a written mandate per agent, an encrypted vault per run, a person watching, and the vault handed to you."
- Contact as given: "Enquire to book: agent@riskmandate.ai · https://ruv.sgit.ai/providers/mondweep-chakravorty.html". Buttons "Enquire to book" (a mailto to agent@riskmandate.ai with subject "Enquiry: a conversation with Mondweep Chakravorty") and "Order in the shop". [F07]
- Footer: "Profile text drawn from public sources."
- Image: none. The avatar is his initials "MC" (`aria-label="Mondweep Chakravorty (initials)"`).

### 1.2 https://ruv.sgit.ai/data/providers.json

- Read: 2026-11-18. HTTP 200. `"updated": "2026-10-21"`.
- Mondweep's record, exact fields:
  - `headline`, `location`, `bio_short`: as on the provider page (1.1).
  - `role_here`: "With Dinis, matches enquiries to providers and reviews applications to join, until there are five providers." [F08]
  - `bio_long`, paragraph 1: "Mondweep Chakravorty is an enterprise AI leader and agentic systems builder based in London. Since September 2024 he has worked as an independent AI advisor through DxSure Ltd. His work there combines advisory, solution architecture and hands-on agentic builds: multi-agent orchestration, RAG, MCP and AI security." [F09]
  - `bio_long`, paragraph 2: "He began his career as a software engineer at HSBC Global Technology, working on payments and core banking integration. After an MBA at London Business School, he led transformation and delivery work at Shell Energy, TalkTalk and Zafin, the last on core banking SaaS for major banks. Later he worked at Jaguar Land Rover and Lotus Technology on portfolio rationalisation, cloud foundations and connected experiences." [F10]
  - `bio_long`, paragraph 3: "He co-founded the Agentics Foundation's London chapter, which runs the city's agentic AI meetups, and mentors on the Johns Hopkins Agentic AI programme. At the CISO London Summit 2025 he co-presented the keynote \"Securing the Agentic Frontier\", applying the OWASP MAESTRO threat-modelling framework to an agentic AI codebase. He builds in public through his \"vibe-cast\" lab on GitHub. He contributed to Ruflo and ran the first SGit × Ruflo proof of concept." [F11, F12, F13]
  - `specialisms`: "Agentic AI architecture (multi-agent, RAG, MCP)", "Agentic AI security and threat modelling (MAESTRO)", "Enterprise programme delivery and C-suite advisory", "Financial services, core banking and payments", "Automotive and digital transformation", "Cloud platforms (AWS, GCP, Azure)", "Agentic AI community building". [F14]
  - `offers`: "runs", "compute", "repo", "expert" (the same four as Dinis Cruz). `availability`: "enquire to book".
  - `proof_of_work`: "vibe-cast: his build-in-public lab" (https://github.com/mondweep/vibe-cast); "Agentics London meetups" (https://luma.com/7od7o2k9). Not opened by me.
  - `links`: mondweep.net (https://mondweep.net/), LinkedIn (https://www.linkedin.com/in/mondweepchakravorty), GitHub (https://github.com/mondweep). Not opened by me (LinkedIn is off limits). [F15]
  - `photo`: null. `status.photo`: "to come from the provider".
  - `status.bio`: "drafted on 21 Oct 2026 from public pages, every fact sourced in evidence/r21-provider-bios.md; for the provider to approve". [F16]
  - `status.consent`: "agreed to be listed (Mondweep, 16 Oct 2026; Dinis, the site's owner)". [F17]
- Caution: the long bio is second-hand. ruv.sgit.ai says it was drafted from public pages and is "for the provider to approve"; I did not read the underlying pages (evidence/r21-provider-bios.md was not fetched; LinkedIn is off limits). Nothing on the sources I read says he has approved it.
- Dinis Cruz's record (for reference): headline "Builder of sgit; security leader (CISO and CTO); founder of The Cyber Boardroom"; `role_here`: "Built this site and the ruv.sgit runner with Claude Code, and gave the talk of 15 October 2026. With Mondweep, matches enquiries and reviews applications to join, until there are five providers." [F18]

### 1.3 https://ruv.sgit.ai/data/offers.json

- Read: 2026-11-18. HTTP 200. `"updated": "2026-10-15"`, `"currency": "GBP"`, `"contact": "agent@riskmandate.ai"`.
- Note: "All prices in GBP, excluding VAT. No payment is taken on the site: the order is emailed to agent@riskmandate.ai and we reply with a quote." [F20]
- Note: "Runs are not automated end to end yet: a person on our side starts, watches and hands over every run. Prices cover that person's time at an assumed £75 an hour." [F26]
- The four offers, names and prices exactly as published (price, unit, summary):
  - **Task runs** [F21]
    - Small run: 10, "per run". "A queen and up to 5 workers for a focused task." Bring-your-own-key option: delta -1.
    - Team run: 20, "per run". "A queen and up to 10 workers: the size of our own site-building runs." Bring-your-own-key delta -3.
    - Large run: 50, "per run". "A queen and up to 20 workers for a big task." Bring-your-own-key delta -10.
  - **Dedicated compute** [F22]
    - Small instance: 21, "per 8-hour block". "t3.medium: 2 vCPU, 4 GiB memory."
    - Medium instance: 23, "per 8-hour block". "m7i.xlarge: 4 vCPU, 16 GiB memory."
    - GPU instance: 36, "per 8-hour block". "g5.xlarge: 4 vCPU, 16 GiB memory, 1 NVIDIA A10G."
    - Each: "Price = £20 platform fee + twice the EC2 cost".
  - **Maintained repository** [F23]
    - Individual: 149, "per month". "One private repository for one person, kept current."
    - Team: 499, "per month". "One repository for a team, with your branding and a better UI."
    - White-label ready: 1500, "per month". "Ready to offer to your own clients under your name."
  - **Expert time** [F24]
    - A couple of hours: 500, "per session". "About 2 hours: scope a task, steer a few runs, review what came back."
    - A day: 1500, "per day". "A working day: design a run pipeline, a behaviour policy, or a pilot."
    - Several days: 5000, "per engagement". "Four working days: set ruv.sgit up in your environment and hand it over."
- How the llms.txt (1.6) writes the same prices: "**task runs** on shared infrastructure, £10 / £20 / £50 a run, or £9 / £17 / £40 with your own model key", "**dedicated compute**, £21 / £23 / £36 per 8-hour block", "a **maintained repository** subscription, £149 / £499 / £1,500 a month, and **expert time**, £500 / £1,500 / £5,000." The two agree. [F25]
- Status of dedicated compute: llms.txt says "not built yet, and SG Compute is not connected to runs"; the home page says "it is designed, not built yet, and the reply to an order says so". [F25]

### 1.4 https://ruv.sgit.ai/data/project-types.json

- Read: 2026-11-18. HTTP 200. `"updated": "2026-10-21"`.
- The five project types (names exact): "A first run with a guide"; "A behaviour policy for one team's agents"; "A four-day pilot"; "A talk or workshop built the way ours was"; "A review of an agent that is already running". [F27]
- Source given in the file: the newsroom article "Agentics, ready to sell" (16 October 2026).
- Note: "The offers listed for each type are a suggested starting combination, not a fixed package".

### 1.5 https://ruv.sgit.ai/ (home)

- Read: 2026-11-18. HTTP 200.
- "The marketplace starts with two people. Each lists the same four offers at the published prices. Enquire to book: the button writes an email to agent@riskmandate.ai with the provider filled in, and a person replies with dates and a quote." [F19]
- Engagement path as published: "A conversation ... Free"; "A first run ... £10, £20 or £50 a run / less with your own model key"; "Expert time ... £500 or £1,500 / a couple of hours, or a day"; "A pilot ... Four days setting it up in your own environment. £5,000 per engagement"; "Run it yourself ... from £149 a month / three tiers". [F25]
- Rules in four lines include: "An equal split. Revenue is split equally between the parties, after direct costs are reimbursed to whoever paid them." and "Whoever has the client bills."
- Where it started: "Agentic Engineering Live · Agentics Foundation London · 15 October 2026". "Dinis Cruz's talk at the London Agentics meetup, after rUv's keynote: a Ruflo hive, sgit vaults and Agent Behaviour Policies, shown as one workflow, ruv.sgit." [F40]
- Disclaimer: "This is not rUv's offer, and it does not speak for him or for the Agentics Foundation."
- Image: `assets/img/talk/meetup-15-oct.webp`, alt "Dinis Cruz presenting at the London Agentics meetup". It shows Dinis Cruz, not Mondweep. Caption says it was "Photo posted by rUv to his network on LinkedIn".

### 1.6 https://ruv.sgit.ai/llms.txt

- Read: 2026-11-18. HTTP 200.
- "a small marketplace that starts with two founding providers, Dinis Cruz and Mondweep Chakravorty." [F19]
- "Founding providers, one profile page each ... Dinis Cruz · Mondweep Chakravorty. Both list the same four offers at the published list prices and say *enquire to book*. Bios drafted on 21 Oct 2026 from public pages (run r21-bios, every fact sourced in `evidence/r21-provider-bios.md`), for each provider to approve; photos to come." [F16]
- "a ten-minute scripted talk for Agentic Engineering Live (Agentics Foundation London, 15 Oct 2026, 7:00 pm slot)". [F40]
- "Built 14 to 15 Oct 2026 by Claude Code sessions for Dinis Cruz." "Since 21 Oct 2026 (v0.2.0) it is the site that offers the ruv.sgit service".
- "Four services, mix and match, none automated end to end yet" (prices in 1.3). [F25]
- "Contact for everything: agent@riskmandate.ai". [F07]
- Dinis Cruz's provider page: https://ruv.sgit.ai/providers/dinis-cruz.html (read, HTTP 200; same layout, initials "DC", no photo).

### 1.7 https://ruv.sgit.ai/articles/next-phase.md (Article No. 9, linked from llms.txt)

- Read: 2026-11-18. HTTP 200. "Approved on 21 October 2026 and built the same day".
- "**Two founding providers.** Dinis Cruz and Mondweep, from the Agentics Foundation."
- "**Mondweep is live.** He has agreed, and his consent is recorded: his card goes up with his name, Mondweep Chakravorty, co-founder of the Agentics Foundation's London chapter, and a link to his LinkedIn page". [F17]
- "No photo, title or biography is invented for either of them. Mondweep has agreed to be listed (16 October)."
- On booking: 16 October brief kept "register interest"; "*Decided 21 Oct:* enquire to book (decision 7)." This explains the change from the newsroom article's "register interest" (see section 8). [F19]

### 1.8 https://ruv.sgit.ai/talk/index.html

- Read: 2026-11-18. HTTP 200. Does not name Mondweep.
- "From the organisers' welcome deck for Agentic Engineering Live (Agentics Foundation, London chapter), Thursday 15 October 2026, Westminster Room, Whitehall House, 41 Whitehall, London SW1A 2BX." [F41]
- Agenda: "6:00 pm Agentic Engineering, keynote by Reuven Cohen (rUv)"; "7:00 pm Autonomy with a mandate and a memory, Dinis Cruz · 10 minutes, the first of three community presentations". [F41]

---

## 2. riskmandate.ai

### 2.1 https://riskmandate.ai/llms.txt

- Read: 2026-11-18. HTTP 200 (79,031 bytes).
- Does **not** name Mondweep Chakravorty, DxSure, Agentics or Ruflo. It links only to riskmandate.ai pages.
- It describes RiskMandate as "The insurability layer for agentic AI" and gives agent@riskmandate.ai as its contact address ("Or email agent@riskmandate.ai"). That is the same address the ruv.sgit.ai provider page uses for Mondweep's enquiries. [F07]
- It names Nimay Parekh ("co-founder and chief executive") and Dinis Cruz as RiskMandate's two founders (about page summary). Flagged in section 6.

### 2.2 Linked pages checked for his name

- https://riskmandate.ai/reviewers.md: HTTP 200, does not name Mondweep.
- https://riskmandate.ai/about.md: HTTP 200, does not name Mondweep.

---

## 3. newsroom.sgit.ai

### 3.1 Index pages

- https://newsroom.sgit.ai/ : HTTP 200.
- https://newsroom.sgit.ai/llms.txt : HTTP 200. Header "Site version: v0.14.152 (10 October 2026)" and "468 articles since 17 August 2026". It does not list the Mondweep articles by name; "Articles by Dinis Cruz, written from his voice notes by an agent working as the newsroom."
- https://newsroom.sgit.ai/articles/ : HTTP 200 (1,092,975 bytes). 468 article cards. Three cards name Mondweep in their title or teaser: our-first-pr-in-ruflo (2026-10-17), when-is-the-vault-actually-used (2026-10-17), what-if-an-agent-loses-its-workspace (2026-10-17).
- Method: I fetched the `.md` twin of all 468 articles (all HTTP 200) and searched each for "Mondweep" or "Chakravorty". 17 matched. Six of those name him only in their "Threads" link lists (a-policy-beside-the-prompt, governs-enforces-attests, one-vault-ten-agents, sgit-is-a-standard, three-linkedin-pages, where-to-invest-in-sgit) and are not listed below. The eleven that name him in their body are 3.2 to 3.12.
- All articles are bylined "By Dinis Cruz".

### 3.2 https://newsroom.sgit.ai/articles/what-if-an-agent-loses-its-workspace.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-17. Article No. 164. Article v1.2.0.
- Title: "What if an agent loses its workspace? Mondweep Chakravorty's SGit × Ruflo proof of concept, step by step: memory saved encrypted, the project deleted, the memory back in a fresh process, and three safeguards that held". [F50]
- Who he is, as the article puts it: "Mondweep Chakravorty, a member of the #Ruflo-Federation and co-founder of the Agentics Foundation's London chapter". [F51]
- The video: "SGit × Ruflo | Working Proof of Concept, published on YouTube on 17 October 2026. It is 104.7 seconds long." (https://youtu.be/rkh6BJiaIrQ, not opened). "Each slide has the story on the left, for someone with no code knowledge, and the terminal on the right, labelled as an actual capture of the run." [F52]
- Abstract: "In 104.7 seconds it replays a real terminal run in twelve steps." [F52]
- The code: "His code is public at mondweep/sgit-ruv-memory, under the MIT licence: a local MCP server of four tools, a strict compiler that turns an Agent Behaviour Policy into Ruflo rules, 16 tests, and the evidence from each run." [F53]
- **The twelve steps, exactly as the article's headings list them** [F54]:
  1. "1 · A real, pinned runtime"
  2. "2 · Define the mandate"
  3. "3 · Store two facts through Ruflo"
  4. "4 · Try something outside its permission"
  5. "5 · Save an encrypted recovery point"
  6. "6 · Approval means stop"
  7. "7 · Remove the original workspace"
  8. "8 · Restore in a fresh process"
  9. "9 · Ask Ruflo what it remembers"
  10. "10 · A missing fact stays missing"
  11. "11 · Change the saved copy, try again"
  12. "12 · What this run proves"
- Step details worth keeping (exact): step 1 at 0:09, "`ruflo --version` returns v3.56.10"; step 3 at 0:21, the two synthetic facts "Kestrel vehicles may charge only between 01:00 and 04:00 UTC", and "Kestrel checkpoints are retained for seven days"; step 4 at 0:32, "It is refused with a `PermissionError`, and `checkpoint_files` is 0"; step 6 at 0:45, "it stops with a `PermissionError` and `checkpoint_retained: true`"; step 7 at 0:51, "The loss is real, not simulated."; step 9 at 1:04, "PASS: both values match the CLI-written facts exactly."; step 10 at 1:14, "Key not found: never-stored"; step 11 at 1:20, "It fails with a `ValueError`, and `tampered_workspace_created` is false. Integrity fails closed."; step 12 at 1:26, "exact recall PASS 2/2; ABP denial PASS; deletion that needs approval BLOCKED, checkpoint retained; fresh-process restore PASS; tampered restore BLOCKED; and semantic recall NOT VALIDATED, because embeddings were off." [F55]
- **The three safeguards, exactly as the article lists them**. Abstract: "Along the way three safeguards are tested and hold: a request outside the agent's permission is refused, a deletion that needs approval is stopped, and a tampered checkpoint is rejected." In short: "**Three safeguards held.** Out of scope refused, deletion without approval stopped, tampered copy rejected." [F56]
- **The SHA-256 fingerprint**: abstract, "A brand-new process restores the checkpoint, the restored database has the same SHA-256 fingerprint as the one saved, and Ruflo reads both facts back word for word." In short: "**The fingerprint matched.** The restored database has the same SHA-256 as the one saved." Step 8: "The database's SHA-256 begins `10ab6c56` and ends `d66a0b`, the same as in step 5, and `matches_checkpoint` is true." Step 5 records "three fingerprints: of the database, of the ABP and of the compiled policy". [F57]
- **The Agent Behaviour Policy** (step 2, exact): "four Agent Behaviour Policy rows, all scoped to the project: write memory, yes; read memory, yes; read history, yes; delete memory, approval. And one line that matters more than it looks: \"No raw rule overrides. Unsupported or ambiguous policies fail closed.\"" And: "In the code, the rows are compiled into Ruflo rules when the server starts, and every tool call is checked by a pinned copy of Ruflo's own policy evaluator, in enforce mode." [F58]
- Step 5 on-screen text: "Only encrypted SGit bare objects enter the checkpoint store. Private keys remain in a separate private directory." [F59]
- Limits, as stated: "The video is careful about its limits: recall by meaning was not validated." The closing slide's "still to validate: recall by meaning, real-world value, and installation and ongoing reliability." "A proof of concept, not a product." "The facts are synthetic. Kestrel is a test name, not a real fleet." "The code was read, not run, by this site." [F60]
- Dinis Cruz on it: "This is the first time someone outside our own sessions has taken the two ideas we keep arguing for, an encrypted vault as an agent's memory and a behaviour policy beside the prompt, and run them together inside someone else's agent stack, on camera." "Mondweep is one of the two people that piece names to deliver it." [F61]
- Provenance: "made as a member of the #Ruflo-Federation and published here with his agreement; the frames are his and are not covered by this site's licence." The analysis was made by Claude (Anthropic) on 17 October 2026. [F62]
- A step-through page exists: https://newsroom.sgit.ai/demos/videos/sgit-ruflo-poc/index.html (not opened).
- Images: frames from his video (terminal captures, his copyright). No photo of him is described.

### 3.3 https://newsroom.sgit.ai/articles/when-is-the-vault-actually-used.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-17. Article No. 165. Article v1.3.0.
- Title: "When is the vault actually used? In Mondweep Chakravorty's SGit × Ruflo run, the encrypted vault is written or read in three steps of twelve, on one machine, inside the adapter, and why that is the honest shape of a recovery copy". [F63]
- "**Three steps of twelve.** The vault is written in 5, read in 8, read and rejected in 11." [F63]
- "**One machine.** Encrypted SGit objects in a folder, keys in another; no server, push or clone is shown." "**What is missing.** The vault leaving the machine, so a lost machine is also recoverable." [F64]
- "**In the adapter, not in Ruflo.** One SGit vault per checkpoint, at a pinned commit." "Ruflo knows nothing about the vault." [F64]
- Quotes his README: "These hashes bind evidence to a mandate; they are not digital signatures or immutable audit receipts."
- "Is three steps of twelve a weakness? No. A recovery copy should be touched when you save and when you restore, and otherwise left alone."

### 3.4 https://newsroom.sgit.ai/articles/the-policy-guards-the-door.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-17. Article No. 163.
- Title: "The policy guards the door; the command line uses the window: in the SGit × Ruflo run, the ABP is compiled into Ruflo's own rules and enforced on the adapter's tools, while Ruflo's command line reaches the same memory file without it, as the author's own README says". [F65]
- "In the video those checks cover steps 4, 5, 6, 8 and 11, and every one behaved as the policy said. But in steps 3, 9 and 10, Ruflo's own command line writes and reads the same SQLite memory file directly, and that path does not pass the gate." [F65]
- Quotes his README: "Only adapter tools pass through this gate. Other shell/network tools are unaffected." The fix is "native plugin registration" on his list of follow-ups. [F65]

### 3.5 https://newsroom.sgit.ai/articles/our-first-pr-in-ruflo.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-17. Article No. 169. Article v1.2.0.
- Title: "Our first PR in Ruflo: an ABP-governed SGit page, merged into ruvnet/ruflo, and the four pieces that got it there". [F70]
- "On 17 October at 14:59 London time, rUv merged pull request #4239 into Ruflo's main branch. It was opened by Mondweep Chakravorty the night before, and it adds one page, docs/integrations/sgit-memory-checkpoints.md, 83 lines that document his adapter". [F71]
- Repository: ruvnet/ruflo (https://github.com/ruvnet/ruflo/pull/4239). [F71]
- PR title: "docs: ABP-governed SGit memory checkpoints and Ruflo CLI recovery validation". Branch "mondweep:docs/sgit-memory-checkpoints" into "ruvnet:main". [F72]
- "Of the 9,625 commits on Ruflo's main branch, it is the first to mention SGit or an ABP." Also "Mondweep's first commit there". [F73]
- Three commits, London time: `81e3697` 23:02 "Document external SGit memory checkpoint MCP example"; `269b9fc` 23:35 "Document ABP compilation and enforced memory adapter operations"; `6b49d58` 23:59 "Document passing Ruflo CLI recovery and unresolved embedding persistence". [F74]
- How it was accepted: "A review was requested from rUv as code owner; no formal approval was recorded and no checks ran." "Merged by rUv, squashed into one commit, `332f22e`, authored by Mondweep." [F75]
- PR description quoted: "Flow: ABP mandate → strict memory-profile compiler → pinned Ruflo enforce evaluator → actual adapter operations → encrypted snapshot/isolated restore." and "Documentation-only change in Ruflo; no runtime defaults/dependencies changed and no full Ruflo npm suite run." and "Semantic quality is NOT validated; the semantic report is partial." His comment: "the missing ABP layer is now implemented and validated, and this guide has been updated accordingly." [F76]
- The proof-of-concept repository: "mondweep/sgit-ruv-memory is a small MCP server, MIT-licensed, with five commits on 16 October, the last at 23:58." "Sixteen tests pass, by the author's own evidence." [F53]
- Three proposed capabilities: `write.memory.project`, `read.memory.project` and `delete.memory.project`; "the fourth, `read.record.history`, already exists in the ABP." "They are the first memory vocabulary I have seen proposed from outside our team". [F77]
- Companion PR: SGit-AI/SGit-AI__Website__Ruv #1, "3 commits, 35 files, 3,081 lines. It is still open, with no reviews." (as of the article, 17 October 2026). [F78]
- Dinis Cruz: "Thank you, Mondweep, for the code, the video and the page, and rUv for merging it." "It is the first integration of the ABP and SGit into an agent framework that I know of by someone outside our team". [F79]
- Images: screenshots of GitHub pages taken by the newsroom's agent; none of him.

### 3.6 https://newsroom.sgit.ai/articles/agentics-ready-to-sell.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-16. Article No. 142. Article v1.2.0.
- Title: "Agentics, ready to sell: what we showed at Agentic Engineering Live, who else is selling agentic services and at what price, the engagement path, and a marketplace for the consultants who deliver it". [F80]
- The talk: "On Thursday evening, 15 October, I gave the first community talk at Agentic Engineering Live, after rUv's keynote, for the Agentics Foundation's London chapter. The talk was called *Autonomy with a mandate and a memory*, and it ran itself: twenty-six slides on a clock". [F42]
- The product: "That is the product: **a hive, a memory and a mandate**." [F81]
- Mondweep: "**The first two.** Mondweep Chakravorty, co-founder of the Agentics Foundation's London chapter, which runs the meetups where all of this was shown, and me. We are not taking bookings yet: we need to align our diaries first, so for now the page will say *register interest*, not *book*." [F82]
- Abstract: "the last part is a marketplace for consultants: Mondweep Chakravorty, co-founder of the Agentics Foundation's London chapter, and I are the first two". [F82]
- Offers as of 16 October: "task runs from £10 to £50, dedicated compute by the eight-hour block, a maintained repository of the whole setup from £149 a month, and expert time at £500 for about two hours, £1,500 for a day, and £5,000 for four days". Consistent with offers.json.
- Limits: "No paid engagement yet." "The marketplace is a design. Nothing is built; the platform share is a proposal." "This is not rUv's or Cognitum's offer." (the platform share was later dropped for an equal split, per Article No. 9).
- Names other people and companies (market map); none relevant to Mondweep.

### 3.7 https://newsroom.sgit.ai/articles/three-decisions-mapped.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-17. Article No. 172.
- Title: "Three decisions, mapped: an agent's memory, this newsroom's release and a customer refund, through behaviour, decision and workflow".
- "First, deleting an agent's memory in Mondweep Chakravorty's SGit adapter for Ruflo: the behaviour row is defined, implemented and enforced, the decision behind its \"approval\" is not yet defined, and nothing records what happened." [F83]
- "**The states are my assessment.** For the memory scenario, from reading Mondweep's code and docs, not from running it."

### 3.8 https://newsroom.sgit.ai/articles/three-policies-for-an-agent.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-17. Article No. 173.
- Title: "Three policies for an agent: behaviour says what it may do, decision says who chooses, workflow says in what order".
- "A good example is in a page that went into Ruflo's docs today, Mondweep Chakravorty's ABP for SGit memory checkpoints." "Mondweep's row says a human must approve; the decider, evidence and envelope above are my illustration." [F83]

### 3.9 https://newsroom.sgit.ai/articles/who-will-fix-your-mess.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-17. Article No. 166.
- "For what a prototype ready for the handover looks like, Mondweep Chakravorty's SGit × Ruflo proof of concept is a good example: built with agents, but with its versions pinned, sixteen tests, a folder of evidence, a written behaviour policy, and a README that says plainly what it does not do yet." [F84]
- An image caption: "Mondweep Chakravorty's SGit × Ruflo run: twelve steps, five worked, three safeguards refused, one thing not tested." (see section 8).
- Names HBR authors and Simon Wardley (section 6).

### 3.10 https://newsroom.sgit.ai/articles/allowed-is-not-right.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-18. Article No. 175.
- "And in the SGit × Ruflo run, Mondweep Chakravorty compiled an ABP into Ruflo's own rules and checked them in enforce mode, outside the agent." Names Ashish Rajan in its title (section 6).

### 3.11 https://newsroom.sgit.ai/articles/what-can-your-agent-reach.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-18. Article No. 178.
- "In October, Mondweep Chakravorty took an ABP, compiled it into Ruflo's policy rules, and enforced it, in real time, on the memory operations of an external adapter, using a pinned copy of Ruflo's evaluator; the page documenting it was merged into Ruflo." [F85]

### 3.12 https://newsroom.sgit.ai/articles/the-librarians-daily-brief.md

- Read: 2026-11-18. HTTP 200. Dated 2026-10-18. Article No. 193.
- "And the outside contributions I want to see, like Mondweep's pull request to Ruflo."

---

## 4. https://london.agentics.org/

- Read: 2026-11-18. HTTP 200. "Last updated: October 23, 2026". https://london.agentics.org/llms.txt returned HTTP 404.
- What the chapter is: "Agentics London is the official UK chapter of the global Agentics Foundation, founded in May 2025. We are a community of approximately 300 engineers, strategists, and educators focused on hands-on agentic AI education through free meetups and paid workshops across London." [F30]
- The Foundation: "The Agentics Foundation is the original organization of this name, founded by Reuven Cohen (rUv) in 2024 with headquarters at agentics.org". [F31]
- How it names Mondweep: "The London Chapter was founded in May 2025 by UK ambassadors Bence Csernak and Mondweep Chakravorty along with four other chapter leaders." [F32]
- Leaders section, "London Chapter Leaders": six cards, each "Chapter Co-Founder"; Mondweep's reads "Mondweep Chakravorty / Chapter Co-Founder" with a LinkedIn link. [F33]
- "Six co-founders lead the chapter with a Lean and Agile approach. Most activities run under members' existing companies."
- Meetups: "The London chapter has approximately 300 members and hosts online and in person meetups every second Wednesday. Sign up via the Luma Calendar". [F34]
- Workshop and partnership enquiries go by email to Bence Csernak and Mondweep Chakravorty at agentics.org addresses ("Book a Workshop/Talk", "Partner With Us"). [F35] I recommend the site does not reproduce the personal addresses; ruv.sgit.ai gives agent@riskmandate.ai for his provider work.
- Past events listed: "Inaugural London Chapter Event, May 21, 2025"; "IC-ETSI Conference - University of Greenwich, June 16-20, 2025". [F36]
- Agentic Engineering Live: **not mentioned** in the static page. "Upcoming Events" is loaded by script and was empty in the raw HTML.
- Image of him: `https://london.agentics.org/assets/mondweep.jpg`, `alt="Mondweep Chakravorty"`, class `leader-headshot`. Not downloaded. [F37]

---

## 5. Ruflo pull request #4239 (ruvnet/ruflo)

- `curl https://api.github.com/repos/ruvnet/ruflo/pulls/4239`: **HTTP 403**, message "GitHub access to this repository is not enabled for this session." The `/files` endpoint gave the same 403.
- `gh api repos/ruvnet/ruflo/pulls/4239`: **failed**, same message (HTTP 403).
- `https://github.com/ruvnet/ruflo/pull/4239` (web page): HTTP 403 from the session proxy.
- I did not use `add_repo`: it would attach credentials to this session, and CLAUDE.md says never to widen our own access. If the API fields are needed, Dinis can decide.
- What I could check without it, with plain anonymous git and raw file reads:
  - `git ls-remote https://github.com/ruvnet/ruflo refs/pull/4239/head`: `6b49d585ada5450329793d90b42d6c8c155dbefb`. [F90]
  - A metadata-only clone (`git clone --bare --filter=tree:0`) of ruvnet/ruflo, then the commit on main: `332f22eec8b838d244ca136dbc740cb73d702767`, subject "docs: ABP-governed SGit memory checkpoints and Ruflo CLI recovery validation (#4239)", author "Mondweep Chakravorty", author date and commit date 2026-10-17T14:59:00+01:00, committer "GitHub" (a merge made on GitHub, squashed: one parent). The body lists the three squashed commits by subject. [F91]
  - `git show --stat 332f22ee`: "docs/integrations/sgit-memory-checkpoints.md | 83 +++", "1 file changed, 83 insertions(+)". [F92]
  - The PR head's three commits: `81e3697f` 2026-10-16T23:02:02+01:00, `269b9fc2` 2026-10-16T23:35:31+01:00, `6b49d585` 2026-10-16T23:59:52+01:00, all authored "Mondweep Chakravorty", subjects as in 3.5. [F74]
  - `git rev-list --count 332f22ee` gives 9,606 commits up to and including the merge (main had 10,522 on 2026-11-18). No earlier commit message on main matches "sgit" or "ABP" (I searched messages only, not file contents).
- https://raw.githubusercontent.com/ruvnet/ruflo/main/docs/integrations/sgit-memory-checkpoints.md : HTTP 200, **83 lines**. [F92]
  - Title: "# External SGit memory checkpoints governed by an ABP".
  - "This opt-in community example connects an Agent Behaviour Policy to a local memory adapter". [F93]
  - "It runs as a separate stdio MCP server. It does not register a native Ruflo memory backend or alter Ruflo's default/running policy configuration."
  - "16 tests pass, covering compilation, scoped decisions, malformed-policy rejection, raw-rule bypass rejection, role mismatch, ABP/rule hash binding, approval/deny enforcement, expiry, wrong keys, tampering, live WAL writes and concurrent checkpoints." [F53]
  - "Embedding-based semantic recall remains unvalidated". "This PR changes documentation only; it adds no Ruflo runtime dependencies or defaults." [F93]
- Not verified by me (taken from the newsroom article only): merged_by (rUv), the requested reviewer, the draft and ready-for-review times, "no checks ran", "no formal approval". The git history cannot show who pressed merge or the author's GitHub login.

---

## 6. People named other than Mondweep Chakravorty, Dinis Cruz and rUv (do not name on the site)

- london.agentics.org: Bence Csernak, Mark De Rijk, Chris Poulter, Rocky Verma, Vincent Sider (the other five chapter co-founders); testimonials from Thibault Jaigu, Handan Özgöcen, Peter Idah, Robert McLeod, Karen Brickman. "Reuven Cohen (rUv)" is rUv.
- riskmandate.ai llms.txt: Nimay Parekh (RiskMandate co-founder and chief executive).
- newsroom articles: Ashish Rajan (allowed-is-not-right title); José Parra Moyano, Karl Schmedders, Olivier Laplace, Benjamin Torben-Nielsen and Simon Wardley (who-will-fix-your-mess).
- Organisations in his bio (former employers and programmes, from providers.json, not read at source): HSBC Global Technology, London Business School, Shell Energy, TalkTalk, Zafin, Jaguar Land Rover, Lotus Technology, Johns Hopkins (Agentic AI programme), CISO London Summit 2025. The short bio on his public provider page names only HSBC and Jaguar Land Rover.
- "Kestrel" in the proof of concept is a synthetic test name, not a company.

## 7. Images of him

- london.agentics.org: headshot at `https://london.agentics.org/assets/mondweep.jpg` (alt "Mondweep Chakravorty"). Not downloaded. Rights not stated.
- ruv.sgit.ai: no photo; initials "MC"; `photo: null`, "to come from the provider".
- newsroom articles: frames of his video (terminal screens), stated as his and "not covered by this site's licence". No photo of him described.
- The YouTube video (https://youtu.be/rkh6BJiaIrQ) was not opened; I do not know if he appears in it.

## 8. Contradictions, gaps and things to check

- **Booking wording changed over time, not a contradiction.** The newsroom (16 October) says "We are not taking bookings yet ... the page will say *register interest*, not *book*." ruv.sgit.ai (21 October onwards) says "enquire to book". Article No. 9 records the change: "*Decided 21 Oct:* enquire to book (decision 7)." The site should use the current wording and can mention the date.
- **Platform share versus equal split.** The newsroom (16 October) proposed "a small platform share"; ruv.sgit.ai's rules now say "Revenue is split equally between the parties, after direct costs are reimbursed to whoever paid them", and Article No. 9 (its v0.2.0, 16 October) records "the split is equal after direct costs, with no platform share". The later source wins.
- **Commit count.** The newsroom says "Of the 9,625 commits on Ruflo's main branch"; my count up to and including the merge commit is 9,606. The article may have counted main as it stood when read (17 October, possibly after later commits). Small difference; do not repeat the number without saying "per the newsroom article".
- **"twelve steps, five worked, three safeguards refused, one thing not tested"** (an image caption in who-will-fix-your-mess) adds up to nine, not twelve, and does not match the walk-through's own step 12 summary. Do not use that caption; use the run article's wording.
- **Long bio unverified.** Career history (HSBC Global Technology, LBS MBA, Shell Energy, TalkTalk, Zafin, Jaguar Land Rover, Lotus Technology), Johns Hopkins mentoring, the CISO London Summit 2025 keynote, "Since September 2024" at DxSure Ltd: all from providers.json, marked "for the provider to approve". The public provider page shows only the short bio. Treat the long bio as needing Mondweep's approval.
- **"Two decades"** is ruv.sgit.ai's wording; no source gives start dates for his career.
- **Co-founder wording.** ruv.sgit.ai and the newsroom say "co-founder of the Agentics Foundation's London chapter"; london.agentics.org says "Chapter Co-Founder" and "UK ambassadors Bence Csernak and Mondweep Chakravorty along with four other chapter leaders". They agree; the chapter has six co-founders.
- **Agentic Engineering Live** is not on london.agentics.org's static page; the date, venue and agenda come from ruv.sgit.ai's talk page ("From the organisers' welcome deck"). No source says Mondweep spoke at it or organised that evening specifically; the newsroom says the chapter "runs the meetups where all of this was shown".
- **PR metadata via API not obtained** (section 5). Author and merge time are confirmed from git; "merged by rUv" is from the newsroom only.
- **newsroom.sgit.ai/llms.txt is out of date** (v0.14.152, 10 October 2026) relative to the articles index; it does not list these articles.
- **Companion PR status** (SGit-AI/SGit-AI__Website__Ruv #1, "still open") is as of 17 October 2026; not rechecked.

## 9. Instructions found in material

- Several newsroom pages say "If you are Mondweep, rUv, or anyone who has run this, and want to add to any of it, write to agent@riskmandate.ai." Noted; not acted on.
- The GitHub 403 message says "Use add_repo to request access." Not acted on (see section 5); for Dinis to decide.
- ruv.sgit.ai's llms.txt has "Rules for agents working here" addressed to agents on that site. Not applicable to us; not acted on.

## 10. Round 2 re-read: a quote for every detail the site prints (F94 to F145)

Researcher: researcher.mondweep-chakravorty@AgentiCCells.dinis. Re-read 2026-11-18 with curl, unauthenticated, for live review finding 4 (`team/rounds/1/review/LIVE.md`) and finding 3. Every page returned HTTP 200. Each new quote was checked by script against the text fetched today (markdown links and backticks removed, HTML entities decoded; " ... " marks words left out). Details that could not be found at source are listed in `team/rounds/2/research/GAPS.md` with their place in `data/site.mjs`.

### 10.1 ruv.sgit.ai

- https://ruv.sgit.ai/data/offers.json (still `"updated": "2026-10-15"`): the twelve item summaries, exactly as in 1.3 above. Task runs [F94]; dedicated compute with the instance types t3.medium, m7i.xlarge and g5.xlarge with one NVIDIA A10G [F95]; maintained repository [F96]; expert time, including "About 2 hours" and "Four working days" [F97]. Prices unchanged (F21 to F24).
- https://ruv.sgit.ai/providers/mondweep-chakravorty.html: "Most clients start small and stop at any step. Every job is a ruv.sgit run: ... and the vault handed to you." [F98]. The site's "handed to the client" is a change of person only. "Five kinds of project, each a package of the offers above ..." [F99]. Avatar: initials "MC", no photo [F100]. The "Enquire to book" button's mailto subject, "Enquiry: a conversation with Mondweep Chakravorty" [F101].
- https://ruv.sgit.ai/ (home): "The marketplace starts with two people. Each lists the same four offers at the published prices." [F102]. Disclaimer: "This is not rUv's offer, and it does not speak for him or for the Agentics Foundation." [F103]. What the talk showed: "a Ruflo hive, sgit vaults and Agent Behaviour Policies, shown as one workflow, ruv.sgit." [F104]. Rules: "An equal split." and "Whoever has the client bills." [F106] (printed only in the open questions).
- https://ruv.sgit.ai/llms.txt: what the service is, "agent work done by a Ruflo hive under a written mandate per role, with a vault per job that the client keeps, delivered by named providers through a small marketplace ..." [F105]. No ruv.sgit.ai page I read says "agentic engineering work" (see GAPS.md).
- https://ruv.sgit.ai/articles/next-phase.md (Article No. 9): "Approved on 21 October 2026 and built the same day"; "Mondweep is live. He has agreed, and his consent is recorded"; "Enquire to book, not register interest" (decision 7) [F107].

### 10.2 newsroom.sgit.ai

- what-if-an-agent-loses-its-workspace.md (No. 164, still article v1.2.0): the video's address, https://youtu.be/rkh6BJiaIrQ [F108]; "the story on the left, for someone with no code knowledge, and the terminal on the right" [F109]; "every tool call is checked by a pinned copy of Ruflo's own policy evaluator, in enforce mode" [F110].
- The same article, one fact per step, each with its time in the video [F111 to F122]: step 1 at 0:09, **step 2 at 0:14**, step 3 at 0:21, step 4 at 0:32, **step 5 at 0:38**, step 6 at 0:45, step 7 at 0:51, **step 8 at 0:58**, step 9 at 1:04, step 10 at 1:14, step 11 at 1:20, step 12 at 1:26. Correction: research section 3.2 gave no times for steps 2, 5 and 8, and `data/site.mjs` has `at: null` for them ("null when the article gives none"). The article does give them, in the same version. The step 8 quote leaves out the hash value (review condition 4).
- The safeguards in short form: "Three safeguards held. Out of scope refused, deletion without approval stopped, tampered copy rejected." [F123]. What it does not claim: "the code was read, not run, by this site", "A proof of concept, not a product.", "The facts are synthetic. Kestrel is a test name, not a real fleet." [F124].
- when-is-the-vault-actually-used.md (No. 165): "A recovery copy should be touched when you save and when you restore, and otherwise left alone." and "Ruflo knows nothing about the vault." [F125].
- the-policy-guards-the-door.md (No. 163): "In the video those checks cover steps 4, 5, 6, 8 and 11, and every one behaved as the policy said. But in steps 3, 9 and 10, ..." [F126]; his README's follow-up, "native plugin registration" [F127].
- our-first-pr-in-ruflo.md (No. 169): "Mondweep Chakravorty opened it at 23:02 the night before." [F128]. The article's timeline also gives 23:30 (marked as a draft) and 23:36 (ready for review again); not used by the site.
- Full titles, numbers and dates of the eleven articles, from each article's heading, byline and "Article No." line [F131 to F141]. Three titles the round 1 notes called "not recorded" are now recorded: No. 166 "Who will fix your mess? An answer to HBR's "deployment gap" ...", No. 178 "What can your agent reach? RiskMandate and the Agent Behaviour Policy, explained for the person who has to decide", No. 193 "The Librarian's daily brief: everything that happened in my universe yesterday, the threads I left, and where my leverage is today". No. 175's full title names a person in section 6; F139 leaves those words out, and "Allowed is not right" is the title's own opening words.
- The 'why' lines: No. 173, "A good example is in a page that went into Ruflo's docs today, Mondweep Chakravorty's ABP for SGit memory checkpoints." [F142]; No. 175, "Mondweep Chakravorty compiled an ABP into Ruflo's own rules and checked them in enforce mode, outside the agent." [F143]; No. 193, "And the outside contributions I want to see, like Mondweep's pull request to Ruflo." [F144].
- **Count by this site** [F145], 2026-11-18: https://newsroom.sgit.ai/articles/ (HTTP 200, 1,098,417 bytes) links 471 `.html` pages; 470 carry an "Article No." line (the other is `graphs.md`). I fetched the `.md` twin of each (all HTTP 200) and searched for "Mondweep" or "Chakravorty" in the text above each article's "## Threads" heading. **11 articles name him in their body**: Nos. 142, 163, 164, 165, 166, 169, 172, 173, 175, 178 and 193, dated 16 to 18 October 2026, all by Dinis Cruz. Six more name him only in their Threads link lists (Nos. 102, 153, 154, 186, 214, 313) and are not counted. The result matches the count in 3.1; the total has grown from 468 to 470 articles. The site should say this is its own count, made on 18 November 2026 (finding 3).

### 10.3 Ruflo pull request #4239

- `git ls-remote https://github.com/ruvnet/ruflo refs/pull/4239/head`: still `6b49d585ada5450329793d90b42d6c8c155dbefb`. A fetch of that ref (`--filter=tree:0 --depth=3`) lists the three commits with author "Mondweep Chakravorty" and author times 2026-10-16T23:02:02+01:00 (`81e3697f`), 23:35:31 (`269b9fc2`) and 23:59:52 (`6b49d585`), subjects as in 3.5 [F129]. The seconds in `data/site.mjs` PR.commits come from here, not from the newsroom (which gives minutes, F74).
- https://raw.githubusercontent.com/ruvnet/ruflo/main/docs/integrations/sgit-memory-checkpoints.md: still 83 lines. Title "# External SGit memory checkpoints governed by an ABP" and the flow line "ABP mandate → strict compiler → Ruflo evaluator (enforce mode) → adapter operation → SGit encrypted vault." [F130].

### 10.4 Noted, not acted on

- team/WORKFLOW.md now records Dinis Cruz's word (about 10:50 UTC) that the site may use the long bio. F09 to F12 still say "needs his approval" in their claims, and `scripts/lib.mjs` refuses facts with those words; I have not changed them, as this task did not ask for it. For the conductor to decide.
- The newsroom pages still invite "anyone who has run this" to write to agent@riskmandate.ai (section 9). Not acted on.
