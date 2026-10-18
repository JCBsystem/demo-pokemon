# Init settled: Ash's Pokémon Card Collection

Result of the pre-planning review of `init-agent-feedback.md`.
Same structure. Each item is either **Settled** or **Open** (open items point to section 3).

---

## 1. Summary of the assignment

Build a small React + TypeScript web app where Ash can find any card in his collection in seconds and keep favourites close. Judged on how the app is put together, how it feels to use, and code quality. AI assistants allowed, but the design must be our own. Anything not built is documented in the README.

### What the deliverable must include

1. A homepage that works as the starting point (favourites pinned, quick search, entry points to browse).
2. Navigation between pages (tabs or menu).
3. A list or grid with search and filtering, state kept in the URL so a filtered view is a shareable link.
4. A detail view for one card, split into tabs (attacks, weaknesses, legalities), shareable by link.
5. One personal touch that survives reload (favourites).
6. Works on phone and laptop, usable from the keyboard, sensible loading and empty states.
7. A public Git repo with a README: setup, approach and trade-offs, unimplemented features.
8. A live URL (Firebase Hosting) or a video demo.

### Beyond the minimum

1. Recent searches persisted locally.
2. Browse facets: sets, types, rarities, each with counts, each a filtered link into the grid. Set names: decided in detailed planning, not here.
3. Zero layout shift: fixed card aspect ratio (images are 245x342, roughly 5:7) and skeletons that match the final layout.
4. README section on how AI was used. Decided in detailed planning, not here.

---

## 2. Decisions per "we shall"

### 2.1 Vite + vanilla React + TypeScript, strict mode

**Settled.** React 19, Vite react plugin. Base tsconfig: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`. No Next, no SSR, static files only.

### 2.2 Headless UI and Tailwind, no shadcn

**Settled.** React Aria Components (one headless library, not two). Tailwind v4. No shadcn.

### 2.3 UI research and 4 HTML mockups

**Settled.** Research on Dribbble, Refero and Mobbin. MCPs to be installed by MrB before this step. Four mockups in distinct directions, each a single static HTML file with Tailwind from CDN.

### 2.4 Three agents: review, commit gate, test

1. Review agent: **Settled.** Thin project agent in `.claude/agents/` wrapping `/code-review` and `pr-review-toolkit` with our standards.
2. Commit gate: **Settled.** Claude Code agent hook (`type: "agent"`) on `PreToolUse`, matcher `Bash`, `if: "Bash(git commit *)"`, in `.claude/settings.json`. No shell script. Blocks the commit with a reason on failure. Only fires on commits made by Claude, so all commits go through Claude. Agent hooks are marked experimental in the docs.
3. Test agent: **Settled.** Project agent plus `docs/testing-standards.md` (how to run unit and e2e, selector rules, fixtures). Selector rule: **Settled.** `getByTestId` first, `getByRole` second. A dedicated test-only CSS class (for example `.e2e-card-image`) allowed where an element cannot carry a test id. No Tailwind utility strings, CSS chains, text, or XPath selectors. Enforced by lint.

### 2.5 pnpm workspace monorepo

**Settled.** Packages `app` (Vite, React, vitest) and `test` (Playwright). Root: `pnpm-workspace.yaml`, `tsconfig.base.json`, one eslint config. Playwright `webServer` builds and previews `app`, so e2e runs against the production build. No shared package; e2e does not import app code.

### 2.6 Mobile first, good on desktop

**Settled.** Breakpoints and navigation placement come from the mockups. Same routes and URL params on every viewport.

### 2.7 a11y

**Settled.** React Aria for behaviour, `eslint-plugin-jsx-a11y` in lint, `@axe-core/playwright` check per page, `prefers-reduced-motion` respected by every animation.

### 2.8 Animated icons

**Settled.** animate-ui icons (pulls in `motion`, confirm at setup). Candidate spots: favourite toggle, search field, empty state. Honour reduced motion.

### 2.9 View Transition API and URL params

**Settled.** All views linkable by URL, including detail tab (`/card/:id?tab=attacks`). Favourites stay local, not in the URL. Router: **Settled.** TanStack Router, `defaultViewTransition: true`.

### 2.10 App feeling, no spinners, no layout shift

**Settled.** Fixed aspect ratio image slots, skeletons matching final dimensions, grid virtualized or `content-visibility: auto`, filters update the URL without remount, designed error and empty states.

### 2.11 Splash screen

**Settled.** Splash shows only while data is actually pending, never a minimum display time. Animation decided after measuring first load with the optimized data (section 4.2).

### 2.12 TanStack Query, Zustand, Context

1. **Settled.** TanStack Query, `staleTime: Infinity`, fixed keys. Derived views (facets, counts, filtered lists) are memoized selectors over query data.
2. **Settled.** Favourites and recent searches in a Zustand store with the `persist` middleware (localStorage). The store holds only favourite card IDs and recent search strings, never card data. Cards are looked up by ID from TanStack Query. No React Context for state.

### 2.13 Zod, per-item parsing

**Settled.** Top level parsed as `z.array(z.unknown())`, each item `safeParse`d against the card schema, failures collected and logged once as a group (comment for Sentry), good items kept. Schema covers the fields we render. TypeScript types inferred from the schema.

### 2.14 PWA, offline, /reinstall.html

**Settled.** `vite-plugin-pwa`. Precache app shell and the generated data files. Card images runtime cached (CacheFirst, expiration cap), never precached. `reinstall.html` in `public/`, excluded from precache glob and added to `navigateFallbackDenylist`, covered by one e2e test.

### 2.15 Firebase Hosting and GitHub Actions

**Settled.** Firebase project `test-pokemon-a4ef7`. Remote `origin` = `git@github.com:JCBsystem/demo-pokemon.git` (set). `firebase init hosting:github` for merge deploy and PR preview workflows. Production branch: **Settled.** `main` is the work branch. New branch `production` is the deploy branch; merge `main` into `production` deploys to Firebase Hosting. PRs against `main` get preview channels.

### 2.16 Playwright e2e, vitest unit

**Settled.** Unit: schema parsing (good item, broken item skipped), filter and search selectors, favourites store. E2e: search to detail, filter link round trip through the URL, favourite survives reload, keyboard-only path through the grid, axe check per page, reinstall page. Selector rule enforced by lint.

---

## 3. Open questions

1. ~~Data source~~ **Settled, see section 4.**
2. ~~Router~~ **Settled, see 2.9.** TanStack Router.
3. ~~Production branch~~ **Settled, see 2.15.** `production` deploys, `main` is work.
4. ~~Set names~~ **Deferred to detailed planning.** JSON has no set data, only the id prefix (for example `base3`).
5. ~~README AI statement~~ **Deferred to detailed planning.**
6. ~~Commit gate~~ **Settled, see 2.4.**
7. ~~Weak selector rule~~ **Settled, see 2.4.3.** Test id first, role second, dedicated test class as fallback, nothing else.
8. ~~Favourites storage~~ **Settled, see 2.12.**

---

## 4. Data source

### 4.1 API vs JSON

**Settled.** Host the collection JSON ourselves on Firebase Hosting as static files, fetched via TanStack Query. No runtime dependency on the Pokémon TCG API.

Facts checked 2026-10-18:

1. The API has no collection concept (cards, sets, types, subtypes, supertypes, rarities only).
2. `ash_collection.json` (2138 cards) is the only source of Ash's collection.
3. The API was unreliable: 3 of 4 single-card calls HTTP 500, one 19s, `/sets` timed out, 50-ID batch 32s.
4. Image CDN `images.pokemontcg.io` answered under 0.1s every time. Broken-image fallback still needed.

README notes a live store with subscription (for example Firestore) as the production approach if the collection were editable.

### 4.2 File size and optimization

| Version | Raw | Gzip |
|---|---|---|
| Original file | 2.7 MB | 255 KB |
| Minified | 1.6 MB | 226 KB |
| Grid-only index | 384 KB | 34 KB |

**Settled.**

1. Original `ash_collection.json` stays unchanged in the repo as source of truth.
2. A build script generates optimized, minified files from it. Nothing edited by hand.
3. README documents the pipeline and why.
4. Light first payload, full data loaded in the background. Exact split (grid index vs first slice) decided in planning.
