# Build report: version-N (<direction name>)

Branch: `version-N` · Preview: <url> · Commit: <sha> · Reviewer verdict: PASS / FAIL

## 1. Checks

| Check                         | Result |
| ----------------------------- | ------ |
| `vp check`                    |        |
| `vp test` (n tests)           |        |
| `pnpm e2e` (n tests, axe)     |        |
| Build size (gzip, main chunk) |        |

## 2. Deliverables (assignment)

| #   | Deliverable                                             | Status | Note |
| --- | ------------------------------------------------------- | ------ | ---- |
| 1   | Homepage as starting point (favourites, search, browse) |        |      |
| 2   | Navigation between pages                                |        |      |
| 3   | Grid with search + filters in the URL (shareable)       |        |      |
| 4   | Detail view with tabs (attacks, weaknesses, legalities) |        |      |
| 5   | Favourites survive reload                               |        |      |
| 6   | Recent searches survive reload                          |        |      |
| 7   | Phone + laptop                                          |        |      |
| 8   | Keyboard usable                                         |        |      |
| 9   | Loading and empty states                                |        |      |

## 3. Feel (settled 2.8, 2.10, 2.11)

| Item                                            | Status | Note |
| ----------------------------------------------- | ------ | ---- |
| No spinners, skeletons match final layout       |        |      |
| No layout shift (fixed card aspect ratio)       |        |      |
| Splash only while data pending                  |        |      |
| Animated icons (favourite, search, empty state) |        |      |
| View transitions between routes                 |        |      |
| Reduced motion respected                        |        |      |
| 2000+ cards scroll smooth                       |        |      |

## 4. Reviewer walk-through (Chrome)

Phone 390px and laptop 1280px. One line per step: what was done, what happened.

1. Home:
2. Search "char" → grid:
3. Filter by set + rarity, copy URL, open in new tab:
4. Open a card, switch tabs, copy URL, reload:
5. Favourite two cards, reload, back to home:
6. Keyboard only: tab to grid, open card, back:
7. Empty search result:
8. Slow network (throttled) first load:

## 5. Fidelity to mockup

What matches `.tasks/mockups/0N.html`, what deviates and why.

## 6. Known gaps

Numbered. What is missing or weak, in priority order.

## 7. Files

Top-level structure of `app/src/` after this build, one line per folder.
