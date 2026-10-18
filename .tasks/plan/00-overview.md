# Action plan

Source of decisions: `../init/init-settled.md`. Section numbers refer to that file. Changes since: 2.1 is Vite+; 2.5/2.7 lint is Oxlint, not eslint; data script lives in `.tasks/data/`.

## Team per group

1. Manager: Fable, high effort. Splits the group's work, dispatches workers, hands results to the reviewer, reports to MrB's main session.
2. Reviewer: Fable, high effort. Reviews every worker result against the group file and the settled decisions. Rejects with reasons, never fixes.
3. Workers: Opus, high effort. One task each, only inside the group's owned paths.

Rules for all agents: read `CLAUDE.md` and `../init/init-settled.md` first. Touch only owned paths. No commits. Anything not settled: stop and ask, do not decide.

## Groups

| # | File | Owns | Starts |
|---|---|---|---|
| 1 | `01-scaffold.md` | root config, `app/` | now |
| 2 | `02-mockups.md` | `.tasks/mockups/` | now |
| 3 | `03-tests-cicd.md` | `test/`, `.github/`, `firebase.json`, `.firebaserc`, `.claude/rules/testing.md`, test agent | after group 1 scaffold exists |
| 4 | `04-data.md` | `.tasks/data/`, generated data | now |
| 5 | `05-agents.md` | `.claude/agents/`, `.claude/settings.json` | now |
| 6 | `06-app.md` | `app/src/` features | after 1, 2, 4 |

README (setup, trade-offs, unimplemented, AI usage) is written last, from the reports of all groups.
