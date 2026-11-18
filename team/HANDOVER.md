# Hand-over: conductor.mondweep-chakravorty@AgentiCCells.dinis, 2026-11-18

## Brief

Started by cells@AgentiCCells.dinis at Dinis Cruz's word (about 09:55 UTC): a site for Mondweep Chakravorty, "Him and our collaboration", with a team of six roles, each with a policy, run in at least two rounds. Mondweep agreed (Dinis, about 09:58 UTC). Every later word from Dinis is in `team/WORKFLOW.md` with its time: the headshot (about 10:46), the long bio cleared (about 10:50), "as good and creative as the other ACC sites" (about 10:55).

## State

- Live: https://mondweep-chakravorty.agenticcells.site (check `/version.json`; v0.1.18 when this was written, then the round 2 report). Two rounds done; reports in `team/rounds/1.md` and `team/rounds/2.md`, with before and after screenshots and the reviewer's verdicts.
- The team: `team/<role>/ROLE.md` and `POLICY.md` for conductor, researcher, designer, writer, developer, reviewer, named `role.mondweep-chakravorty@AgentiCCells.dinis`. Policies are proposals (0.1.0) in the AgentiCCells ABP format, checked by `scripts/abp-check.mjs` inside `validate.mjs`. `team/scopes.json` and `scripts/role-scope.mjs` (in release.sh and CI) fail a commit that touches a path outside its role.
- The facts: `research/sources.md` and `research/facts.json` (126 facts, 25 sources, each with a quote and its read date, 2026-11-18). The words: `data/site.mjs`. The pages are generated at build time by `scripts/generate.mjs`, `scripts/designs.mjs` and `scripts/behind.mjs`; link-preview cards and design previews by `scripts/cards.mjs` (run locally, then rebuild).
- Build-time checks in `scripts/lib.mjs`: the image check (only the supplied headshot, pinned by SHA-256, and the named images made from it); the approval check (F13 and F15 refused; the long bio must cite its source); the people check (no person named but Mondweep Chakravorty, Dinis Cruz and rUv); design parity (each design cites every source the home cites).
- The pages: home, what he has built, proof of concept (the run drawn on a time scale), career, Agentics London, collaboration with Dinis Cruz (offers as published), sources, Use with AI (/ai/, /llms.txt, /index.md, /facts.json), five designs under /d/ with a pop-up, /behind-the-scenes/.

## Open

- For Mondweep, through Dinis: he has not yet reviewed the site. The questions are in OPEN in `data/site.mjs` (also on /ai/): whether Ledger stays the default design; whether to show the partnership terms ruv.sgit.ai publishes (an equal split, whoever has the client bills) and the fingerprint's start and end; his other links (kept off).
- Conductor's decision, for Dinis to reverse: round-report screenshots show the supplied headshot as it appears on the site.
- The talk at Agentic Engineering Live is shown as Dinis's, once, on /collaboration/: the sources do not say Mondweep spoke. The brief listed it under what he built.
- Not verified at source: that rUv merged pull request #4239 (the newsroom says so; the GitHub API was refused from this session; git confirms the squash commit 332f22e authored by Mondweep).
- The build's people check holds the names it refuses in `scripts/lib.mjs` and `research/sources.md`; so the repository names those people in code, never on the site.
- Next round, if Dinis wants one (from the round 2 live review): the career page and /collaboration/ lag behind the home in visual quality.
- Policy gaps (in each POLICY.md): sub-agents inherit every tool of the conductor's session; one signing key for all roles, so the Agent trailer is self-asserted; `dev` is unprotected, so the gates run after a push and before deploy.
- Access: adding the factory and model repositories to this session was refused; their public raw files were read instead.

## How to run another round

Read `team/WORKFLOW.md`. Write the aim at the top of `team/rounds/N.md`, take before screenshots with `node scripts/shots.mjs`, run the roles as sub-agents (researcher if facts are needed, designer, reviewer, writer, developer), each briefed with its ROLE.md and POLICY.md; release with `scripts/release.sh`; reviewer checks live; write the report; one line to cells@AgentiCCells.dinis.
