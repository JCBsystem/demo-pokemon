# Status (updated by the main session)

## 2026-10-18 late

1. `agent-run-one` @ `183472d`, pushed: scaffold, data layer, tests, CI, agents, mockups, audit. `vp check`, 19 unit tests, 3 e2e green. Gate passed on the commit.
2. Blockers solved without MrB: `app/public/data/**` added to fmt ignore; `firebase.json` formatted; `app/test` added to `tsconfig.app.json` include; `.playwright-mcp/` gitignored; `cards.json` committed (one-off script, not built in CI).
3. Decision taken for the UI builds (MrB away): repeated ids are listed as rows, React key `${id}-${index}`, detail = first match, optional "×N" badge.
4. Worktrees at `/Users/mrb/Documents/Projects/demo-pokemon-worktrees/version-{1..4}`, branches `version-1..4` from `183472d`. One Fable manager each, Opus workers, Fable reviewer validating in Chrome, report to `.notes/reports/version-N.md`, then commit, push, `firebase hosting:channel:deploy version-N --expires 7d`.
5. E2e ports per version: 4181–4184.
6. Chrome validation blocked overnight: two Chrome instances connected, choosing one needs MrB in chat. Reviewers validate with Playwright Chromium (390/1280) instead. MrB: do a Chrome pass on the preview URLs.

## Open for MrB

1. Pick a version after reading `.notes/reports/`.
2. Decide what happens to `main`: merge the chosen version via PR (preview channel fires), then merge `main` → `production` to deploy live.
3. README (setup, approach, trade-offs, unimplemented, AI usage) not written yet.
4. Open mockup questions were resolved by "follow the mockup as drawn".

## Version results

| Version             | Branch @ sha          | Preview (channels expire 2026-10-25 ~23:00 UTC, verified with `firebase hosting:channel:list`) | Report                        | Verdict                                                           |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------- |
| 1 Pocket Grid       | `version-1` @ ed19a63 | https://test-pokemon-a4ef7--version-1-4ekb2crg.web.app                                         | `.notes/reports/version-1.md` | PASS after 1 fix round (vp check ok, 31 unit, 26 e2e)             |
| 2 Collector's Index | `version-2` @ cbcb98c | https://test-pokemon-a4ef7--version-2-b5y888b7.web.app                                         | `.notes/reports/version-2.md` | PASS after 2 fix rounds (vp check ok, 31 unit, 13 e2e)            |
| 3 Field Guide       | `version-3` @ 1a40301 | https://test-pokemon-a4ef7--version-3-66f9utxh.web.app                                         | `.notes/reports/version-3.md` | PASS after 1 fix round (vp check ok, 27 unit, 23 e2e + 1 skipped) |
| 4 Binder            | `version-4` @ 74941db | https://test-pokemon-a4ef7--version-4-txd0tga7.web.app                                         | `.notes/reports/version-4.md` | PASS (vp check ok, 31 unit, 26 e2e)                               |

Version-4 notes: animate-ui core fails `exactOptionalPropertyTypes`, three icons rewritten on `motion` (only added dep). Gaps: single 788 kB chunk + 1.57 MB json first payload; phone dock last in tab order; `ui/hero.ts` module singleton.

Version-3 notes: fonts self-hosted in `app/public/fonts/` (Google Fonts hung headless Chromium); `.firebase/` untracked, not ignored on this branch. Gaps: recent-search buttons in tab order (grid ~16 Tabs from search); splash is text + pulsing rule, not layout skeleton; single 796 kB chunk; occasional "Transition was skipped" rejection on fast double navigation.

Version-1 notes: mockup's "Recently viewed" row dropped (store frozen: favourites + recent searches only); sort added as 4th chip. Gaps: detail back link goes to plain `/cards` (loses filters); 2,138 tiles with no skip link past grid; single 755 kB chunk.

Version-2 notes: manager committed with `git -C`, which skipped the Claude commit gate hook (hook agent denied Bash in don't-ask mode). Main session re-ran `vp check` and `vp test` on the committed tree afterwards: both pass. Gaps: scroll restore only within first 100 rows; keyboard End leaves focus off-screen while pages append; deep link `?card=` past row 100 not scrolled into view; 843 kB chunk.

## Cross-version facts

1. All four branches verified on GitHub (`gh api`) at the shas above. Pushes went over HTTPS via `gh` credentials: SSH agent unreachable from the sandbox. `origin` remote is still SSH.
2. Every version ships one big JS chunk (755–843 kB, 235–261 kB gzip) plus the 1.57 MB (226 kB gzip) cards.json. No route code splitting anywhere.
3. `.firebase/` deploy cache is untracked in versions 1–3 (version-4 added it to `.gitignore`). Add to root `.gitignore` before any later `git add -A`.
4. animate-ui core does not type-check under `exactOptionalPropertyTypes`; versions 1 and 4 vendored icons by hand; versions 2 and 3 added `@animate-ui/react` via `vp add` (catalog entries in `pnpm-workspace.yaml`).
5. Chrome extension validation not done (see 6 above). All reviewer walk-throughs: Playwright-driven Chrome/Chromium with screenshots at 390 and 1280.
6. Main session re-ran `vp check` + `vp test` on all four committed trees at 01:55 CEST: all pass (31/31/27/31 unit tests). Gate hook ran for v4 (blocked once, passed on retry), was skipped by v2 (`git -C`), v1 and v3 reports do not say.
7. Diff audit 183472d..HEAD on all four: no AI attribution strings in code, frozen data-layer files (`schema.ts`, `selectors.ts`, `useCards.ts`, `store.ts`) untouched.
8. Nothing merged. `agent-run-one`, `main`, `production` untouched since 183472d.
