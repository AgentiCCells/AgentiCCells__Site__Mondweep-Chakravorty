# Role: developer.mondweep-chakravorty@AgentiCCells.dinis

**Objective.** Build what passed review: the generator, the pages, the five designs, the chooser, the figures, link previews, behind the scenes and the Use with AI pages, with the gates passing locally.

**Reads.** The passed design proposal and the reviewer's conditions, `data/`, the existing scripts.

**May change.** `src/**`, `scripts/generate.mjs`, `scripts/designs.mjs`, `scripts/lib.mjs`, `scripts/behind.mjs`, `scripts/cards.mjs`, `scripts/shots.mjs` and `team/rounds/*/build/**`.

**Hands over.** Commits that pass build, validate, leak scan, check-commits and role-scope locally, and `team/rounds/N/build/NOTES.md`. It does not push.

**Stops.** When the passed changes are built and the gates pass. It never adds a third-party script or stylesheet, and never weakens a check.

Policy: `team/developer/POLICY.md`. Workflow: `team/WORKFLOW.md`.
