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
by MrB; the constraints, plan, agent roles, review loop, data decisions and quality bar are.
The four UIs are rough and unpolished: a consequence of the half-day limit, not the thing
being shown. What is shown is control of the output: decisions before code, a written plan,
agents building inside it, a reviewer per build and a commit gate. Four independent runs from
one plan gave four apps with the same architecture, the same untouched data layer, the same
quality bar and the same test coverage.

## 3. What the author did himself

Everything below was written by MrB before any agent ran. It is the whole brief the agents
worked from. The agents' job was to challenge it (`.tasks/init/init-agent-feedback.md`),
MrB settled every point (`.tasks/init/init-settled.md`), then the plan (`.tasks/plan/`) and
the builds followed. The author's own work: the stack, the data strategy, the agent roles and
gates, the quality bar, every decision the agents were not allowed to take, and the review of
every report.

The first prompt, verbatim (`.tasks/init/init.md`):

> We are going to do an assignment. Read assignment.txt in this folder.
>
> Then let's talk about the setup.
>
> My first thoughts are:
>
> We do this with Vite plus vanilla React in TypeScript, strict mode on. We shall skip shadcn this time to avoid the normal AI look. We will use headless UI components to speed things up, React Aria or Radix UI, and Tailwind.
> We shall use Dribbble, Refero, and Mobbin to do some research on the UI. We shall also do 4 different HTML mockups before we start building.
> We shall create 3 agents: 1 review agent, standard code review using Claude review commands; 1 agent that is a gate on commit, it should be invoked on commits and shall validate our code standards, for example our tests shall never have weak selectors, the readme is up to date, and so on; and 1 test agent that knows how to run and build our tests according to our standards.
>
> We shall create a monorepo with pnpm workspaces. Keep it simple, one repo with sub-projects, no Turborepo:
>
> - app (Vite, React, vitest for unit tests)
> - test (Playwright for e2e)
>
> We shall build mobile first, but it must also look good in a desktop browser.
> We shall build the app a11y compatible.
> We shall use animated icons to lift the UI a bit. We are time limited, so there is not much time to do anything advanced. Where suited, for example https://animate-ui.com/docs/icons, but not in all places.
> We shall use the View Transition API where suited, and most if not all views should have URL params for direct linking.
> We shall build this with an app feeling, so loading states and component rendering must feel native, no generic spinners or shifting UI while loading.
> We shall use a splash screen (if this takes time, it should have some kind of animation) while loading init data. If needed, the data cache, we might not need it, or fast static can be used.
> We shall use TanStack Query with fixed keys as the data layer. It fetches data once and the cached data is reused in all components. We add Zustand only if we need to expand or transform the data. Then TanStack feeds Zustand. Otherwise we use React Context.
> We shall use Zod for the data types. We should parse the incoming JSON doc but not validate the whole doc. If one item is broken, we don't want to invalidate the whole doc. Load the doc, type check one item at a time; a broken item/object we skip, console.log the error, and add a comment about sending to Sentry or a similar solution.
> We shall build this as a PWA with offline support. The data loaded in the JSON should be stored and reused. Important: add a /reinstall.html, a page that is not in the service worker precache. It unregisters the service worker, clears all caches, and reloads. Used when a PWA install gets stuck.
> We will host on Firebase. Create a CI/CD flow with GitHub Actions. Merge to the production branch deploys to Firebase. PRs get a Firebase preview channel if time allows.
> We shall use Playwright for e2e and vitest for unit tests.
>
> I have set up a git repo and a Firebase project.
>
> This is my first thought. Read the assignment, and this. Then let's talk about this.
> Create an init-agent-feedback.md in an easy to read format.
> Start with a short summary of the test and what you think it should include, then each of my "we shall" should be the context, then your comment.
> Also at the end, add any questions/thoughts you have.
> Then I will go through this one more time and we create an action plan from there.
>
> Remember we are not jr devs vibe coding a random app. We work in a structured and reusable pattern with 100% control.
> You are the orchestrator agent. Use subagents when needed. Your context is valuable and needs to be kept low.

## 4. What was delivered

Four branches, each a complete app from the same data layer (commit `183472d`). No ranking;
all four are offered. Preview channels expire 2026-10-25. Each version has a distinct phone
layout and a distinct laptop layout; view the previews at both sizes.

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

## 5. Known issues

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

## 6. Time

From `.notes/time.md`:

|                                                                         | Minutes     |
| ----------------------------------------------------------------------- | ----------- |
| MrB at keyboard (init 122 + with agents 164, minus 30 tooling friction) | 256 (4.3 h) |
| Agents running autonomously (afternoon 29 + overnight 135)              | 164 (2.7 h) |

Budget was half a day (4 h). MrB's time is 4.3 h. The autonomous agent run is stated
separately and is not counted as MrB's time. Reading reports, this evaluation and the
submission email are not counted.

## 7. Verdict

1. Every functional deliverable in the assignment is built four times over, each with
   measured evidence (CLS, frame times, axe, keyboard paths) in its report.
2. The process goal held: decisions before code, parallel agent teams in worktrees, a
   reviewer per build, a commit gate on every Claude-made commit, one data layer untouched
   by all four UIs, no AI attribution in the repository.
3. Two submission requirements are still open: the README and a client-facing entry point
   on `main`. Three settled items were cut for time: PWA, light first payload, code splitting.
