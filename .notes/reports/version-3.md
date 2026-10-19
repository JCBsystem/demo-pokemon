# Build report: version-3 (Field Guide)

Branch: `version-3` · Preview: https://test-pokemon-a4ef7--version-3-66f9utxh.web.app · Commit: 1a40301 · Reviewer verdict: PASS

## 1. Checks

| Check                                                                      | Result                                                                                                                                                    |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vp check`                                                                 | `pass: All 62 files are correctly formatted (157ms, 12 threads)` / `pass: Found no warnings, lint errors, or type errors in 47 files (512ms, 12 threads)` |
| `vp test` (27 tests)                                                       | `Test Files  5 passed (5)` / `Tests  27 passed (27)`                                                                                                      |
| `pnpm e2e` (12 tests × 2 projects laptop + mobile = 24, axe on every page) | `1 skipped` / `23 passed (1.3m)` (the skip is the keyboard test on mobile, by design)                                                                     |
| Build size (gzip, main chunk)                                              | `dist/assets/index-DMxq9w8U.js   796.01 kB │ gzip: 249.81 kB` (css 28.28 kB │ gzip 6.29 kB) — known (b)                                                   |

## 2. Deliverables (assignment)

| #   | Deliverable                                             | Status | Note                                                                                                                                                                                                                                                   |
| --- | ------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Homepage as starting point (favourites, search, browse) | Done   | `routes/home/HomePage.tsx`: "2,138 cards, 121 sets." hero + big search, No. 1 pinned favourites (lead card + numbered list), No. 2 browse columns Sets/Types/Rarities with counts and thumbnails, "All 121 sets →".                                    |
| 2   | Navigation between pages                                | Done   | Masthead text nav Home · Cards (`shell/Masthead.tsx`), active underline, "← Cards" on detail, title links home.                                                                                                                                        |
| 3   | Grid with search + filters in the URL (shareable)       | Done   | `/cards?q=…&set=…&rarity=…&type=…&sort=…`, repeated keys for multi-select; opening the copied URL in a new tab restores count, chips and tokens (walk-through step 3).                                                                                 |
| 4   | Detail view with tabs (attacks, weaknesses, legalities) | Done   | React Aria `Tabs`; `?tab=weaknesses                                                                                                                                                                                                                    | legalities` persists across reload, attacks is the paramless default. Abilities, rules and resistances also shown. |
| 5   | Favourites survive reload                               | Done   | Zustand persist key `store` holds ids only; hearts stay pressed after reload, home shows "2 pinned".                                                                                                                                                   |
| 6   | Recent searches survive reload                          | Done   | Last 10, added on submit/pick only; panel on focus of any search field with numbered list and Clear.                                                                                                                                                   |
| 7   | Phone + laptop                                          | Done   | 390: 2-column grid, horizontally scrolling chip row, stacked detail; 1280: 4-column grid, centred masthead with search, tabs beside the card, 3 browse columns.                                                                                        |
| 8   | Keyboard usable                                         | Done   | Tab reaches every control, Enter opens a card, arrows move tabs, Back returns; visible 2px ink ring on every stop, including the grid card link (fixed in round 1: `grid-item` padding/negative margin keeps the ring inside the contained paint box). |
| 9   | Loading and empty states                                | Done   | Splash "Opening the field guide…" only while the fetch is pending; designed error state with retry (e2e); empty state "Nothing filed here" with animated folder icon and Clear all filters; not-found page for `/card/base1-4`.                        |

## 3. Feel (settled 2.8, 2.10, 2.11)

| Item                                            | Status  | Note                                                                                                                                                                                                                                                               |
| ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| No spinners, skeletons match final layout       | Partial | No spinner. The splash is a sentence plus a pulsing rule, not a layout-matching skeleton of the page; the masthead is stable across the swap. Acceptable, noted (gap 2).                                                                                           |
| No layout shift (fixed card aspect ratio)       | Done    | `card-slot` fixed 5:7 (`aspect-ratio: 5/7`, wash background). Measured: 16 captions moved 0/16 when images arrived, slot 169×236.6 before and after, CLS 0 (mobile) / 0.0027 unchanged (laptop). Broken image keeps the slot (384×537.6, "No image · Pikachu").    |
| Splash only while data pending                  | Done    | `Shell.tsx` gates on `isPending`; with `cards.json` delayed 2 s the splash shows at ~100 ms and is removed as soon as the page mounts (step 8).                                                                                                                    |
| Animated icons (favourite, search, empty state) | Done    | animate-ui `Heart` (bounce on press), `Search` (wiggle on focus/hover), `FolderOpen` (on view) via `AnimateIcon`.                                                                                                                                                  |
| View transitions between routes                 | Done    | `defaultViewTransition: true`; grid→detail runs `::view-transition-group(card-hero)` plus root (measured with `document.getAnimations()`); filter/tab navigations use `viewTransition: false`.                                                                     |
| Reduced motion respected                        | Done    | `<MotionConfig reducedMotion="user">`, `::view-transition-*` animation none under `prefers-reduced-motion`, `motion-safe:` on transitions. Under emulated reduce: icons static, VT rule present. Masthead scroll-linked shrink is not gated (scroll-driven, fine). |
| 2000+ cards scroll smooth                       | Done    | `grid-item` `content-visibility: auto` + `contain-intrinsic-size`; all 2,138 figures mounted, scrolled 355k px (390) / 245k px (1280) at ~60 fps in headless Chrome.                                                                                               |

## 4. Reviewer walk-through (Chrome)

Phone 390px and laptop 1280px. One line per step: what was done, what happened.

Chrome extension tools could not be used (two browsers connected, no selection possible from a subagent). Walk-through ran in real Chrome via Playwright (`channel: "chrome"`, which loads images.pokemontcg.io; plain headless Chromium cannot) with screenshots under `/private/tmp/claude-501/-Users-mrb-Documents-Projects-demo-pokemon/f4c2e5d4-1ddc-426a-9295-21b470e29fbe/scratchpad/review-v3/`.

1. Home: 390 — kicker "Field guide · 2,138 cards", two-line serif title, Home · Cards tabs, h1 "2,138 cards, 121 sets.", big serif search, "0 pinned" with the empty copy, browse tiles with 3 fanned thumbnails and 121/11/13 counts; on scroll the title shrinks to 21.6px and the kicker collapses (header 84px). No console errors.
   1280 — centred masthead with the small search on the right, hero centred in a 3xl column, three browse columns with counts and "All 121 sets →"; shrink on scroll to 21.6px (header 106px). No console errors.
2. Search "char" → grid: 390 — typed in the home search, Enter → `/cards?q=char`, "16 results", 16 figures in 2 columns, live field pre-filled "char", token "Name: char ×" + Clear all; the recent panel lists "char" afterwards.
   1280 — same URL and count, 4 columns, chips wrap on one row; recent panel lists "char".
3. Filter by set + rarity, copy URL, open in new tab: 390 — Set popover → xy1, Rarity popover → Rare → `/cards?set=xy1&rarity=Rare`, 1 result, triggers "Set · 1" / "Rarity · 1"; new tab from that URL: 1 result, tokens `Set: xy1`, `Rarity: Rare`, triggers show the counts.
   1280 — identical result and round trip (same URL, 1 result, two tokens, both triggers at "· 1").
4. Open a card, switch tabs, copy URL, reload: 390 — pointerdown set `viewTransitionName: card-hero` on the grid slot and `::view-transition-group(card-hero)` animated into the hero; card stacked above the tabs; Weaknesses → `/card/gym1-61?tab=weaknesses`, reload keeps Weaknesses selected (panel "Water ×2"); Legalities lists the three formats; Attacks drops the param.
   1280 — same transition and URL behaviour; tabs sit beside the card in the 5/7 grid.
5. Favourite two cards, reload, back to home: 390 — hearts on Blaine's Charmander and Charjabug fill red with the bounce, reload keeps both `aria-pressed=true`, home "2 pinned": lead card with the big name and round heart, row 02 for the second; `localStorage.store = {favourites:[gym1-61,sm1-51], recentSearches:[char]}`.
   1280 — same; lead card left, numbered list right of the vertical rule.
6. Keyboard only: tab to grid, open card, back: 390 — 13 Tabs reach `card-link`, Enter opens `/card/gym1-61`, Back returns to `/cards?q=char`; 2px ink ring visible around the card (round 1 fix verified with a 2× crop), as on the heart, nav links, chips and tabs.
   1280 — 16 Tabs (the recent-searches buttons of both search fields add stops), Enter and Back as above, ring visible around the card (2× crop).
7. Empty search result: 390 — "zzz" in the live field → `/cards?q=zzz`, "0 results", "Nothing filed here / No cards match these filters." with the folder icon and Clear all filters → `/cards`, 2,138 results; scrolling this short page settles without jitter.
   1280 — same copy and recovery, title stays 21.6px after scrolling the short page.
8. Slow network (throttled) first load: 390 — `cards.json` delayed 2 s: masthead (kicker "Field guide", no count yet) + "Opening the field guide…" with the pulsing rule at ~100 ms, home mounted at ~2.4 s, splash element removed; no flash of an empty page.
   1280 — splash at ~140 ms, page at ~2.4 s, splash removed.

Also checked: console — only the known (a) `Transition was skipped. New ViewTransition started` on laptop; after round 1 a warm reload of `/`, `/cards`, `/cards?q=char`, `/card/sm11-56?tab=legalities`, `/cards?q=zzz` and `/card/base1-4` at both widths logs no errors, warnings or 4xx (font preload warnings and the `favicon.ico` 404 are gone; `/favicon.svg` serves 200). Recent-searches panel opens on focus of any field with numbered serif entries and Clear. `/cards?q=pikachu`: 19 rows, 14 distinct ids, count 19 — duplicates all listed; `/card/sm11-56` shows "×2 in the collection", grid shows "· ×2" in the meta line. `/card/base1-4`: "Card not found." with id and ← Cards, title "Card not found · …". Image arrival: no caption movement (section 3). Round 1 re-check: masthead search on `/cards?set=xy1&type=Fire&rarity=Rare` + "a" → `/cards?set=xy1&type=Fire&rarity=Rare&q=a` (filters kept, `replace`, live field pre-filled "a"); from home → `/cards?q=eevee` with the view transition. Grid item padding 12px / margin -12px, intrinsic size 316/426px vs measured 342.6px (two-line caption) / 427.2px. Hover lift `translate: 0 -4px` on the slot at both widths, shadow intact. "1 result" singular.

## 5. Fidelity to mockup

Matches `.tasks/mockups/03.html`: paper/ink/mute/rule/wash/accent tokens, Fraunces light display + Instrument Sans body, sticky masthead with kicker, two-tone serif title, text nav with underline, laptop 3-column masthead grid with the small search, home hero and big serif search, "No. 1 — Pinned favourites" / "No. 2 — Browse" section rules with notes, lead favourite + numbered list with a left rule at lg, browse tiles (wash, fanned thumbnails, count top-right, "Browse by" label) and big-type facet rows with counts, "All 121 sets →", cards page kicker/h1, chip row, active tokens, result count in serif 3xl + Sort, 2/4-column captioned grid with hearts top-right, empty state copy, detail header (meta kicker, 6xl/8xl name, round heart, HP · type dots · subtype · Illus.), 5/7 grid with flavour text caption and text tabs, panel rows, masthead title shrink on scroll.

Deviations:

1. Set and Rarity are React Aria multi-select popovers (`FacetPicker.tsx`) instead of the mockup's single native `<select>` chips — justified (contract: multi-select, React Aria for every control, URL repeated keys).
2. Chip row wraps at lg (`lg:flex-wrap` in `Filters.tsx`) instead of always scrolling — justified, all 11 type chips fit at 1280 and nothing is hidden.
3. Fonts self-hosted latin subsets instead of the Google Fonts link — known (c).
4. Sets shown as codes — known (d).
5. Sort shown as a React Aria `Select` button "Name A–Z ▾" rather than a native select — justified (contract).
6. Detail adds an "×N in the collection" line, abilities/rules in Attacks and Resistances in Weaknesses; empty state adds the animated folder icon; grid captions show "· ×N" — additions required by the contract/settled 2.8, consistent with the style.
7. Active-token label is `text-ink/70` instead of `text-mute` — justified (contrast on the wash pill).
8. Splash and error pages do not exist in the mockup; they reuse the kicker + serif pattern — consistent.
9. Masthead search on `/cards` keeps the active filters and replaces history (round 1), matching the mockup's `search()`.

## 6. Known gaps

Numbered. What is missing or weak, in priority order.

1. `app/src/ui/SearchField.tsx`: the recent-searches buttons are in the tab order whenever a search field has focus-within, so on laptop the grid is 16 Tabs away (masthead field + page field each add Clear and the recent entries). Consider `tabIndex={-1}` on the entries with arrow-key handling, or opening the list only on ArrowDown.
2. `app/src/shell/LoadStates.tsx`: the splash is a sentence plus a pulsing rule, not a skeleton matching the page layout (settled 2.10). Low priority; the masthead is stable and the swap is fast.
3. `app/src/routes/card/CardPage.tsx`: `document.title` is set in a `useEffect` while the other routes use `head()` in `main.tsx` (locked for workers). Manager: add `head` to the card route or drop the two `head()`s for consistency.
4. `app/src/shell/Masthead.tsx`: active nav is computed from `pathname.startsWith("/card")` rather than `Link activeProps` as the contract specifies; behaviour is right, convention is not.
5. `app/src/index.css` `grid-item`: `contain-intrinsic-size` 316px (390) is below a two-line-caption item (342.6px measured), so the scrollbar is a slight estimate until items render; harmless.
6. `app/src/routes/cards/CardsPage.tsx`: `result-count` uses the undeferred list while the grid renders `useDeferredValue(cards)`, so a fast keystroke can show the new count over the old grid for a frame. Not observed in use.
7. Known (a): "Transition was skipped. New ViewTransition started" uncaught rejection when two navigations land within ~200 ms (TanStack Router + `ViewTransition.ready`); seen once on laptop. Accepted by the manager.
8. Known (b): single 796 kB / 250 kB gzip chunk, no code splitting. Accepted by the manager.

## 7. Files

Top-level structure of `app/src/` after this build, one line per folder.

- `app/src` — `main.tsx` (routes, router with custom search parse/stringify, query client), `store.ts` (Zustand persist: favourite ids, recent searches), `index.css` (fonts, tokens, kicker/card-slot/grid-item/masthead utilities, reduced-motion VT rule)
- `app/src/data` — `schema.ts` (zod card + setCode), `selectors.ts` (facets, filterCards, cardById), `cardsSearch.ts` (URL search types, parse/stringify, sortByHp), `copies.ts` (countById, useCopies), `useCards.ts` (single query + memoized hooks)
- `app/src/shell` — `Shell.tsx` (MotionConfig, splash/error/outlet gate), `Masthead.tsx` (sticky header, nav, laptop search), `LoadStates.tsx` (Splash, LoadError)
- `app/src/ui` — `CardImage.tsx` (5:7 slot, lazy, fallback), `CardMeta.tsx`, `FavouriteButton.tsx` (ToggleButton + Heart), `SearchField.tsx` (RAC SearchField + recent panel), `TypeDot.tsx`
- `app/src/ui/icons` — animate-ui `heart.tsx`, `search.tsx`, `folder-open.tsx`
- `app/src/routes` — one folder per route
- `app/src/routes/home` — `HomePage.tsx`, `Favourites.tsx`, `Browse.tsx`
- `app/src/routes/cards` — `CardsPage.tsx`, `Filters.tsx`, `FacetPicker.tsx`, `chips.ts`, `CardGrid.tsx`, `EmptyState.tsx`
- `app/src/routes/card` — `CardPage.tsx`, `CardTabs.tsx`, `Panels.tsx`, `tabs.ts`
