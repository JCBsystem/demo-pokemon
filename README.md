# Ash's Pokémon Card Collection

One place for Ash to find any of his 2,138 cards in seconds and keep his favourites close.
Built as four complete apps on one shared data layer, each a different UI direction, so the
client can compare rather than get one guess.

|     | Direction         | Branch                                                                  | Live preview (until 2026-10-25)                        | Build report                          |
| --- | ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------- |
| 1   | Pocket Grid       | [`version-1`](https://github.com/JCBsystem/demo-pokemon/tree/version-1) | https://test-pokemon-a4ef7--version-1-4ekb2crg.web.app | [report](.notes/reports/version-1.md) |
| 2   | Collector's Index | [`version-2`](https://github.com/JCBsystem/demo-pokemon/tree/version-2) | https://test-pokemon-a4ef7--version-2-b5y888b7.web.app | [report](.notes/reports/version-2.md) |
| 3   | Field Guide       | [`version-3`](https://github.com/JCBsystem/demo-pokemon/tree/version-3) | https://test-pokemon-a4ef7--version-3-66f9utxh.web.app | [report](.notes/reports/version-3.md) |
| 4   | Binder            | [`version-4`](https://github.com/JCBsystem/demo-pokemon/tree/version-4) | https://test-pokemon-a4ef7--version-4-txd0tga7.web.app | [report](.notes/reports/version-4.md) |

This branch (`main`) holds the shared base: scaffold, data layer, tests, CI, agent setup and
all planning documents. The UI lives on the four version branches.

## Read first

1. [Evaluation](.notes/evaluation.md): what the client asked for, what we set for ourselves,
   what was delivered, known issues, time.
2. [Time log](.notes/time.md): 4.3 h at the keyboard against a half-day budget, plus 2.7 h of
   agents running on their own, stated separately.
3. [Build reports](.notes/reports/): one per version, same template, with measurements
   (layout shift, frame times, axe, keyboard paths) and a reviewer verdict.
4. The same documents as one web page: https://test-pokemon-a4ef7--report-kh26a8zn.web.app

## Setup

Requirements: Node 22.18 or newer, pnpm 12, and the Vite+ CLI (`vp`).

```sh
curl -fsSL https://vite.plus | bash   # installs vp
git clone https://github.com/JCBsystem/demo-pokemon.git
cd demo-pokemon
git checkout version-1                # or version-2, version-3, version-4
vp install
vp dev                                # app on http://localhost:5173
```

Checks, as run by the commit gate and CI:

```sh
vp check      # format, lint (Oxlint, type-aware, jsx-a11y), types
vp test       # unit tests (Vitest)
pnpm e2e      # Playwright against the production build, axe on every page
vp build      # production build to app/dist
```

## Approach

Decisions first, then code. Everything the apps share was decided and written down in
[`.tasks/init/init-settled.md`](.tasks/init/init-settled.md) before the first line of code,
then split into six parallel groups in [`.tasks/plan/`](.tasks/plan/). Each group ran as a
small team of AI agents: a manager that splits the work, workers that build one task each, and
a reviewer that checks the result against the plan and rejects with reasons. Builds ran in git
worktrees, one per version, so four UIs could be built at once on the same frozen base.

Stack and the reasons:

1. **React 19 + TypeScript strict** (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
   `verbatimModuleSyntax`). Required by the assignment; the strict flags catch the bugs that
   show up with 2,000 rows of real data.
2. **Vite+** for build, format, lint, types and tests in one tool. pnpm workspace with `app/`
   and `test/` so the e2e package never imports app code.
3. **TanStack Router** with code-based routes and view transitions. Every view is a URL,
   including the detail tab (`/card/:id?tab=attacks`), so any screen can be sent to a friend.
4. **TanStack Query** over one static JSON with `staleTime: Infinity`. The collection is
   fetched once; facets, counts and filtered lists are memoised selectors over it.
5. **Zustand `persist`** for the two things that must survive a reload: favourite card ids and
   the last 10 searches. Never card data.
6. **Zod** per-item parsing: a broken card is skipped and logged, the rest of the collection
   still renders.
7. **React Aria Components + Tailwind v4** for accessible behaviour without a component kit.
   `jsx-a11y` lint rules and an axe check on every page in e2e.
8. **Collection hosted as a static file** on Firebase Hosting. The public Pokémon TCG API was
   checked on 2026-10-18 and returned HTTP 500 on 3 of 4 single-card calls, one in 19 s, so the
   app has no runtime dependency on it. Images still come from its CDN with a fallback.
9. **Feel**: no spinners, fixed 5:7 image slots so nothing shifts, a splash only while data is
   pending, animated icons on favourite, search and empty state, reduced motion honoured.

### Trade-offs

1. **Four apps instead of one polished app.** The client asked how the app is put together
   and how it feels; four directions make that comparison concrete. Each one is complete, none
   got the extra polish a single app would have had.
2. **Full JSON up front.** 1.57 MB raw, 226 kB gzip. Simple and cacheable, but the first load
   pays for the whole collection. The planned split (grid index first, details in the
   background) was cut for time.
3. **One JS chunk** of 755–843 kB (235–261 kB gzip) per version. No route-level code
   splitting yet.
4. **Duplicate ids in the collection are kept as rows.** The source file has 302 repeated
   card ids. They are listed as Ash owns them; the detail view shows the first match.
5. **Static hosting, no backend.** If the collection were editable, the production approach
   would be a live store (for example Firestore) with the same selectors on top.

## Not implemented

1. PWA and offline mode, including the planned `reinstall.html` page.
2. Light first payload (grid index first, full data in the background).
3. Route code splitting.
4. Live deploy through the `production` branch. The GitHub Actions workflows exist
   (`.github/workflows/`); only 7-day preview channels have been deployed so far.
5. A human pass in the Chrome extension. Reviewer walk-throughs used Playwright-driven
   Chrome at 390 px and 1280 px with screenshots.
6. Per-version gaps are listed in each build report under "Known gaps".

## AI usage

AI did the typing. The decisions, constraints and quality bar are the author's.

1. **What the author did**: wrote the pre-planning decisions, the action plan, the agent roles
   and rules (`CLAUDE.md`, `.claude/`), chose the stack, data strategy and quality gates,
   reviewed every report, and made every call the agents were not allowed to make. The first prompt, written before any agent ran, is in
   [`.tasks/init/init.md`](.tasks/init/init.md) and quoted in the evaluation.
2. **What the agents did**: researched UI directions on Mobbin and Refero and drew the four
   HTML mockups in `.tasks/mockups/`; built the scaffold, data layer, tests, CI and the four
   apps; reviewed each other's work; wrote the build reports with measurements.
3. **Guard rails**: a commit gate (`.claude/settings.json`, `.claude/skills/commit/`) that runs
   format, lint, types and unit tests before any commit made through Claude Code; a reviewer
   agent per build that rejects with reasons and never fixes; agents could only touch the
   paths their group owned and had to stop and ask on anything not settled.
4. **Disclosure**: the visual design came from agent research and agent-built mockups within
   the author's constraints. It is not hand-drawn by the author.
5. **Tools**: Claude Code with Claude Fable (managers, reviewers) and Claude Opus (workers).
   No AI attribution appears in commits or code by rule.
