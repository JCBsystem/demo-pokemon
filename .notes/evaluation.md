# Evaluation: Ash's Pokémon Card Collection

Written 2026-10-19 after the four builds. Source documents: `.tasks/init/assignment.txt`
(what the client asked for), `.tasks/init/init-settled.md` (what we set for ourselves),
`.tasks/plan/` (how the work was split), `.notes/reports/version-N.md` (what each build
did, with measurements), `.notes/time.md` (time spent).

## 1. What the client wanted

From the assignment:

1. A homepage as Ash's starting point.
2. Navigation between pages.
3. A list or grid with search and filters kept in the URL, shareable.
4. A detail view for one card, tabs for attacks, weaknesses, legalities.
5. One personal touch that survives a reload.
6. Works on phone and laptop, keyboard usable, sensible loading and empty states.
7. React and TypeScript.
8. A public Git repo with a README: setup, approach and trade-offs, unimplemented features.
9. A URL to the app or a video.
10. Half a day. Document what did not fit instead of building it.
11. AI assistants allowed, code quality judged, "the design must be your own".

Judged on how the app is put together and how it feels to use.

## 2. What we set for ourselves

The showcase is the process: planning, an agentic build flow with review gates, code
quality and structure. Not the visual design. Everything was decided up front in
`init-settled.md` before any code, then split into six parallel groups in `.tasks/plan/`
and run by manager / reviewer / worker agent teams with a commit gate that runs format,
lint, types and unit tests before every commit.

Settled and delivered on every branch:

1. Vite+ monorepo (`app` + `test`), React 19, TypeScript strict with
   `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`.
2. React Aria Components + Tailwind v4, no component kit.
3. TanStack Router with view transitions, every view linkable (`/cards?...`, `/card/:id?tab=`).
4. TanStack Query (`staleTime: Infinity`) over one static JSON, memoised selectors,
   data fetched once. Zustand `persist` for favourites and the last 10 searches only.
5. Zod per-item parsing: broken cards skipped and logged, good cards kept.
6. Collection hosted as a static file on Firebase Hosting (the public API was unreliable:
   HTTP 500s and 19 s responses when checked).
7. No spinners, fixed 5:7 image slots, splash only while data is pending, reduced motion
   honoured, animated icons on favourite / search / empty state.
8. Playwright e2e against the production build with an axe check on every page, Vitest
   unit tests, Oxlint with jsx-a11y, GitHub Actions workflows for PR previews and live deploy.
9. Four distinct UI directions as HTML mockups, each built as a full app on its own branch.

Settled and not delivered (on any branch):

1. PWA, offline, `reinstall.html` (settled 2.14).
2. Light first payload: grid index first, full data in the background (settled 3.2).
   Every version loads the full 1.57 MB (226 kB gzip) JSON up front.
3. Route code splitting. Every version ships one JS chunk of 755–843 kB (235–261 kB gzip).
4. Live deploy through the `production` branch. The workflow exists; nothing has been merged.
5. README with setup, approach, trade-offs, unimplemented features and AI usage (settled 1.11
   and assignment deliverable). Planned as the last step from the build reports, not written yet.

Design disclosure: the four mockups came from Mobbin / Refero research executed by agents,
and the UIs were built by agents inside the settled constraints. The design is not hand-drawn
by MrB. The constraints, plan, agent roles, review loop, data decisions and quality bar are.

## 3. What was delivered

Four branches, each a complete app from the same data layer (commit `183472d`). No ranking;
all four are offered. Preview channels expire 2026-10-25.

|                                                                                                                              | 1 Pocket Grid                                          | 2 Collector's Index                                     | 3 Field Guide                                          | 4 Binder                                               |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| Branch @ commit                                                                                                              | `version-1` @ ed19a63                                  | `version-2` @ cbcb98c                                   | `version-3` @ 1a40301                                  | `version-4` @ 74941db                                  |
| Preview                                                                                                                      | https://test-pokemon-a4ef7--version-1-4ekb2crg.web.app | https://test-pokemon-a4ef7--version-2-b5y888b7.web.app  | https://test-pokemon-a4ef7--version-3-66f9utxh.web.app | https://test-pokemon-a4ef7--version-4-txd0tga7.web.app |
| Report                                                                                                                       | `.notes/reports/version-1.md`                          | `version-2.md`                                          | `version-3.md`                                         | `version-4.md`                                         |
| Homepage, navigation, URL filters, detail tabs, favourites + recent searches persist, phone + laptop, loading + empty states | Done                                                   | Done                                                    | Done                                                   | Done                                                   |
| Keyboard usable                                                                                                              | Done                                                   | Done                                                    | Done                                                   | Partial (phone dock last in tab order)                 |
| No spinners, no layout shift, splash only while pending                                                                      | Done                                                   | Done                                                    | Partial (splash is text, not a skeleton)               | Done                                                   |
| Animated icons, view transitions, reduced motion                                                                             | Done                                                   | Done                                                    | Done                                                   | Done                                                   |
| 2000+ cards smooth                                                                                                           | Done (`content-visibility`)                            | Partial (100-row paging, append frame grows to ~330 ms) | Done (`content-visibility`)                            | Done (binder pages, 18 pockets in DOM)                 |
| Format, lint, types (`vp check`)                                                                                             | pass                                                   | pass                                                    | pass                                                   | pass                                                   |
| Unit tests                                                                                                                   | 31                                                     | 31                                                      | 27                                                     | 31                                                     |
| E2e tests (axe on every page)                                                                                                | 26                                                     | 13                                                      | 23 + 1 skipped                                         | 26                                                     |
| Main JS chunk (gzip)                                                                                                         | 755 kB (235)                                           | 843 kB (261)                                            | 796 kB (250)                                           | 788 kB (247)                                           |
| Reviewer verdict                                                                                                             | PASS after 1 fix round                                 | PASS after 2 fix rounds                                 | PASS after 1 fix round                                 | PASS                                                   |

Common to all: 2,138 cards, 121 sets, duplicates in the collection kept as separate rows
(a decision made during the overnight run; detail view shows the first match).

## 4. Known issues

Per version, top three from each report (full lists in the reports):

1. Pocket Grid: detail back link returns to plain `/cards`, losing filters; all 2,138 tiles
   in the DOM with two tab stops each and no skip link; the mockup's "Recently viewed" row
   was dropped because the frozen store holds only favourites and searches.
2. Collector's Index: scroll restore on back works only within the first 100-row page;
   keyboard End leaves focus off-screen while pages append; a `?card=` deep link beyond
   row 100 is highlighted but not scrolled into view.
3. Field Guide: recent-search buttons sit in the tab order while the search field has
   focus (grid is ~16 Tabs away); splash is a sentence plus a pulsing rule, not a layout
   skeleton; fonts self-hosted instead of Google Fonts.
4. Binder: phone dock renders after `main`, so Cards is ~46 Tabs from home; `ui/hero.ts`
   is a module singleton written imperatively for the card → detail hero; facet counts in
   the filter sheet are whole-collection next to a filtered "View N".

Cross-version:

1. README missing (assignment deliverable). `main` holds only the plan documents; a client
   opening `main` sees no app until a README points at the four branches or one is merged.
2. One large JS chunk and the full JSON on first load everywhere (settled 3.2 not done).
3. animate-ui's core package does not type-check under `exactOptionalPropertyTypes`;
   versions 1 and 4 vendored the three icons by hand, versions 2 and 3 added the package.
4. "Transition was skipped" unhandled rejection from the browser's View Transition API when
   two navigations land within ~200 ms (versions 3 and 4, seen once each).
5. `.firebase/` deploy cache untracked and unignored on versions 1–3.
6. Version-2's commit was made with `git -C`, which skipped the Claude commit-gate hook. The
   main session re-ran `vp check` and `vp test` on the committed tree afterwards: both pass.
7. Reviewer walk-throughs used Playwright-driven Chrome at 390 px and 1280 px with
   screenshots, not the Chrome extension (needed a browser choice while MrB was away).
8. Browser-side confirmation of the live previews by a person has not been done yet.

## 5. Time

From `.notes/time.md`:

|                                                                         | Minutes     |
| ----------------------------------------------------------------------- | ----------- |
| MrB at keyboard (init 122 + with agents 164, minus 30 tooling friction) | 256 (4.3 h) |
| Agents running autonomously (afternoon 29 + overnight 135)              | 164 (2.7 h) |

Budget was half a day (4 h). MrB's time is 4.3 h. The autonomous agent run is stated
separately and is not counted as MrB's time. Reading reports, this evaluation and the
submission email are not counted.

## 6. Verdict

1. Every functional deliverable in the assignment is built four times over, each with
   measured evidence (CLS, frame times, axe, keyboard paths) in its report.
2. The process goal held: decisions before code, parallel agent teams in worktrees, a
   reviewer per build, a commit gate on every Claude-made commit, one data layer untouched
   by all four UIs, no AI attribution in the repository.
3. Two submission requirements are still open: the README and a client-facing entry point
   on `main`. Three settled items were cut for time: PWA, light first payload, code splitting.
