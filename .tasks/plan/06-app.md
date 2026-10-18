# Group 6: App features

Owns: `app/src/`. Not planned yet.

Starts after group 1 (scaffold), group 2 (mockup picked by MrB) and group 4 (data ready).

Split into groups with MrB at that point. Deliverables to cover are in `../init/init-settled.md` section 1 and 2.8, 2.10, 2.11, 2.14.

MrB, 2026-10-18: the app has a clear data layer. Collection fetched once (TanStack Query, `staleTime: Infinity`), reused by every component through selectors. No refetching, no component-level fetches, no API abuse. Code quality is judged.
