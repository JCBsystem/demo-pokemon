# Group 4: Data

Owns: `.tasks/data/` (one-off script, not shipped) and its output. `../init/ash_collection.json` is never edited.

## Scope (settled)

1. 3.1 Collection JSON hosted as static files, no runtime API dependency.
2. 3.2 Build script generates minified files from the original. Nothing by hand.
3. 2.13 Zod schema for the fields rendered. Per-item `safeParse`, failures collected and logged once as a group, good items kept. Types inferred from the schema.

## Steps, in order

1. Audit. Read all 2138 items. Report what is not clean: missing fields, duplicates, inconsistent values, broken image URLs, anything odd. Numbers and examples. Change nothing. **Stop and ask MrB.**
2. Clean, only as MrB decides after step 1.
3. Trim. Script emits the minified files per 3.2. Exact split (grid index vs full) is a question for MrB before building.
4. Ready for use. Output lands where `app` serves it (path agreed with group 1).

## Done when

1. Script runs from root with one command.
2. Output files exist, sizes reported raw and gzip.
3. README notes: pipeline and why.
