# Init feedback: Ash's Pokémon Card Collection

Written by the orchestrator agent after reading `assignment.txt` and `init.md`.
Format: summary first, then each "we shall" quoted as context followed by my comment, then open questions at the end.

---

## 1. Summary of the assignment

Build a small React + TypeScript web app where Ash can find any card in his collection in seconds and keep favourites close. Judged on how the app is put together, how it feels to use, and code quality. AI assistants allowed, but the design must be our own. The assignment asks that anything not built is documented in the README.

### What the deliverable must include

1. A homepage that works as the starting point (favourites pinned, quick search, entry points to browse).
2. Navigation between pages (tabs or menu).
3. A list or grid with search and filtering, state kept in the URL so a filtered view is a shareable link.
4. A detail view for one card, split into tabs (attacks, weaknesses, legalities), shareable by link.
5. One personal touch that survives reload (favourites).
6. Works on phone and laptop, usable from the keyboard, sensible loading and empty states.
7. A public Git repo with a README: setup, approach and trade-offs, unimplemented features.
8. A live URL (Firebase Hosting) or a video demo.

### What I think it should include beyond the minimum

1. Recent searches persisted locally (the assignment hints at it under "Come back later").
2. Browse facets: sets, types, rarities, each with counts, each a filtered link into the grid.
3. Zero layout shift: fixed card aspect ratio (TCG API images are 245x342, roughly 5:7) and skeletons that match the final layout.
4. A README section that states plainly how AI was used, since the assignment calls it out and judges code quality.

---

## 2. Comments on each "we shall"

### 2.1 Vite + vanilla React + TypeScript, strict mode

> We do this with Vite plus vanilla React in TypeScript, strict mode on.

Agree. Suggest `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` and `verbatimModuleSyntax` in the base tsconfig. React 19 with the Vite react plugin. No Next, no SSR, nothing to host but static files.

### 2.2 Skip shadcn, use headless UI (React Aria or Radix) and Tailwind

> We shall skip shadcn this time to avoid the normal AI look. We will use headless UI components to speed things up, React Aria or Radix UI, and Tailwind.

Agree on skipping shadcn. Pick one headless library before scaffolding, not both. My recommendation is React Aria Components: keyboard and screen reader behaviour is the strongest out of the box, which directly serves the "usable from the keyboard" deliverable, and it has Tabs, SearchField, ComboBox, Dialog, Select and ListBox, which is the full set we need. Radix is lighter but needs more manual keyboard wiring for lists and search. Tailwind v4.

### 2.3 Dribbble, Refero, Mobbin research plus 4 HTML mockups

> We shall use Dribbble, Refero, and Mobbin to do some research on the UI. We shall also do 4 different HTML mockups before we start building.

Agree. Mobbin is available as an MCP in this session, so a subagent can pull real app screens for search, grid, detail and favourites patterns without me spending context. Dribbble and Refero have no MCP here, so that research is manual on your side or a browser-driven subagent. Suggest the four mockups cover distinct directions (for example dense list-like, card-and-image led, search-first, browse-first) so the comparison is a real decision. Each mockup should be a single static HTML file with Tailwind from CDN so it is throwaway and opens straight in a browser.

### 2.4 Three agents: review, commit gate, test

> We shall create 3 agents: 1 review agent ... 1 agent that is a gate on commit ... 1 test agent that knows how to run and build our tests according to our standards.

Agree, with one correction. The review agent largely exists already: `/code-review` and the `pr-review-toolkit` agents are installed. A thin project agent in `.claude/agents/` that wraps them with our standards is enough.

The commit gate is better as a hook than as an agent. A deterministic pre-commit (lefthook or a plain git hook) running `tsc --noEmit`, eslint with `eslint-plugin-playwright` and `eslint-plugin-jsx-a11y`, vitest, and a README freshness check is reproducible and never flaky. An LLM agent on every commit is non-deterministic. If you want Claude involved, a Claude Code `PreToolUse` hook on `git commit` can run the same script and block on failure. My recommendation is the deterministic hook.

The test agent is a good fit as a project agent plus a short `docs/testing-standards.md` it reads: how to run unit and e2e, selector rules (`getByRole` and `getByTestId` only, no CSS or text selectors), where fixtures live.

All three can be written by subagents in parallel while the app is scaffolded, which keeps the main context small.

### 2.5 pnpm workspace monorepo: app + test

> We shall create a monorepo with pnpm workspaces. Keep it simple ... app (Vite, React, vitest for unit tests), test (Playwright for e2e)

Agree. Root holds `pnpm-workspace.yaml`, a shared `tsconfig.base.json`, one eslint config, lefthook. The `test` package needs a Playwright `webServer` entry that builds and previews `app`, so e2e runs against the production build in CI. No shared package needed; types stay in `app` and the e2e tests do not import app code.

### 2.6 Mobile first, good on desktop

> We shall build mobile first, but it must also look good in a desktop browser.

Agree, assignment requirement. Breakpoints and navigation placement per viewport come out of the mockups, not decided here. One rule up front: same routes and same URL params on every viewport, so a link shared from a phone opens the same view on a laptop.

### 2.7 a11y compatible

> We shall build the app a11y compatible.

Agree, assignment says keyboard usable. React Aria carries most of it. Add `eslint-plugin-jsx-a11y` in the lint gate and one Playwright test per page running `@axe-core/playwright`. Respect `prefers-reduced-motion` for every animation, including view transitions and animated icons.

### 2.8 Animated icons

> We shall use animated icons to lift the UI a bit ... for example https://animate-ui.com/docs/icons, but not in all places.

Agree. animate-ui icons are copy-paste components built on `motion`, so they pull that dependency in; confirm at setup. Suggested spots: the favourite toggle, the search field, the empty state. Must honour reduced motion.

### 2.9 View Transition API and URL params on views

> We shall use the View Transition API where suited, and most if not all views should have URL params for direct linking.

Agree. URL state is an assignment requirement for the grid. Extend it to the detail view tab (`/card/:id?tab=attacks`) so a friend lands on the same tab. Favourites stay local, not in the URL. Router choice drives both: React Router v7 has a `viewTransition` flag on links and navigations, which makes grid-to-detail image morphs a one-line change. See question 2.

### 2.10 App feeling, no generic spinners, no shifting UI

> We shall build this with an app feeling, so loading states and component rendering must feel native, no generic spinners or shifting UI while loading.

Agree, assignment judges feel and asks for sensible loading states. Concrete rules: every image slot has a fixed aspect ratio box, skeletons match final card dimensions, the grid is virtualized or uses `content-visibility: auto` so 1000+ cards do not jank, and filters update the URL without a full remount. Error and empty states are designed screens, not text.

### 2.11 Splash screen with animation while loading init data

> We shall use a splash screen (if this takes time, it should have some kind of animation) while loading init data.

Agree, with a measurement step. Whether it is visible at all depends on the data source decision (question 1). If the file ships bundled or precached, repeat visits may resolve before a splash can render, and a forced minimum display time would feel like a fake delay. Recommendation: a splash that shows only while the query is actually pending, never a minimum display time. Decide on the animation after measuring first load with the real file.

### 2.12 TanStack Query with fixed keys, Zustand only if needed, otherwise Context

> We shall use TanStack Query with fixed keys as the data layer ... We add Zustand only if we need to expand or transform the data. Then TanStack feeds Zustand. Otherwise we use React Context.

Agree, with a refinement. TanStack Query with `staleTime: Infinity` and one fixed key for the collection is right. Derived views (sets, types, rarities, counts, filtered lists) should be memoized selectors over the query data, not copied into a store.

Favourites and recent searches are client state that must survive reload. That is exactly Zustand with the `persist` middleware, and it is simpler than Context plus hand-rolled localStorage. So the split is: TanStack for the collection, Zustand persist for user state, no Context except maybe theme. TanStack does not need to feed Zustand.

### 2.13 Zod, parse per item, skip broken items

> We shall use Zod for the data types. We should parse the incoming JSON doc but not validate the whole doc ... a broken item/object we skip, console.log the error, and add a comment about sending to Sentry.

Agree. Parse the top level as `z.array(z.unknown())`, then `safeParse` each item against the card schema, collect failures, log them once as a group, and keep the good ones. Card schema should be strict only on the fields we render and `passthrough` on the rest so a new API field never breaks the app. Infer the TypeScript type from the schema, one source of truth.

### 2.14 PWA with offline, cached JSON, /reinstall.html

> We shall build this as a PWA with offline support ... add a /reinstall.html, a page that is not in the service worker precache. It unregisters the service worker, clears all caches, and reloads.

Agree. Supports "Come back later ... on his phone". Use `vite-plugin-pwa`. Precache the app shell and the JSON if it ships as a static file. Card images come from the TCG CDN; runtime cache them with CacheFirst and an expiration cap, never precache them.

`reinstall.html` goes in `public/` and needs two settings to actually work: exclude it from the precache glob, and add it to the workbox `navigateFallbackDenylist`, otherwise the SPA fallback serves `index.html` for that URL. Easy to get wrong, so one e2e test should hit it.

### 2.15 Firebase Hosting, GitHub Actions, preview channels

> We will host on Firebase. Create a CI/CD flow with GitHub Actions. Merge to the production branch deploys to Firebase. PRs get a Firebase preview channel if time allows.

Agree. Firebase project `test-pokemon-a4ef7` (display name demo-pokemon) exists and the CLI is logged in. No `firebase.json` or `.firebaserc` yet. `firebase init hosting:github` generates both workflows (merge deploy and PR preview) and the service account secret in one go, so preview channels come out of the same step as the merge deploy. The GitHub repo `JCBsystem/demo-pokemon` exists and is public; the local clone has no remote set, so adding `origin` is a setup step.

### 2.16 Playwright e2e, vitest unit

> We shall use Playwright for e2e and vitest for unit tests.

Agree. Unit: schema parsing (good item, broken item skipped), filter and search selectors, the favourites store. E2e: search to detail, filter link round trip through the URL, favourite survives reload, keyboard-only path through the grid, axe check per page, reinstall page. Selector rule enforced by lint, not by review.

---

## 3. Questions and thoughts

1. **Data source: API or JSON?** Static JSON shipped with the app, live Pokémon TCG API, or JSON with API as fallback. This decides offline behaviour, the splash, the cache strategy and where the Zod boundary sits. My recommendation is static JSON only; the assignment allows it and the app then works fully offline. **Answered, see section 4.**
2. **Router.** React Router v7 or TanStack Router? Not covered in your list. My recommendation is React Router v7: view transitions are a flag on the link, URL search params have a built-in hook, and it is the most documented option for a reviewer reading the code.
3. **Production branch name.** You wrote "merge to the production branch". Only `main` exists. Is `main` the production branch, or do you want a separate `production` branch with `main` as integration?
4. **Project `claude.md` is lowercase.** It loads on macOS because the filesystem is case-insensitive. Rename to `CLAUDE.md` so it also loads in a Linux CI container or a subagent worktree. **Done in commit `e3508f2`. Remote `origin` set to `git@github.com:JCBsystem/demo-pokemon.git`.**
5. **README AI statement.** The assignment says the design must be our own and code quality is judged. I suggest the README has a short section on how AI was used (orchestration, subagents, review) so it reads as deliberate, not hidden.

---

## 4. Pre-planning findings: data source

Checked on 2026-10-18 against the live API and the provided file.

### 4.1 API vs JSON

1. The Pokémon TCG API has no collection concept. Endpoints are cards, sets, types, subtypes, supertypes and rarities only. It cannot tell us which cards Ash owns.
2. `ash_collection.json` (2138 cards) is the only source of Ash's collection. The assignment names it as the source.
3. The API was unreliable during testing: 3 of 4 single-card calls returned HTTP 500, one took 19s, `/sets` timed out, a 50-ID batch query took 32s.
4. The image CDN (`images.pokemontcg.io`) is separate from the API and answered in under 0.1s every time. Still needs a broken-image fallback.

**Decision:** host the collection JSON ourselves on Firebase Hosting as a static file, fetched via TanStack Query. No runtime dependency on the API, so a review session cannot break because the API is down. A live store with subscription (for example Firestore) is noted for the README as the production approach if the collection were editable.

### 4.2 File size and optimization

| Version | Raw | Gzip |
|---|---|---|
| Original file | 2.7 MB | 255 KB |
| Minified (whitespace removed) | 1.6 MB | 226 KB |
| Grid-only index (id, name, supertype, subtypes, types, rarity, hp, small image) | 384 KB | 34 KB |

**Decision:** optimize the data. Rules:

1. The original `ash_collection.json` stays unchanged in the repo as the source of truth.
2. A build script generates the optimized files from it. Nothing is edited by hand.
3. Output is minified.
4. The README documents the pipeline and why.

**Loading strategy, to decide in planning:**

1. Grid index first (about 34 KB gzip) for home and grid, full data loaded in the background or per card for the detail view.
2. Preload a small first slice (for example favourites plus the first visible cards), then load the rest in the background.
