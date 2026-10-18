---
name: commit
description: Run the commit checks, then commit the current work with a plain message and no AI attribution.
disable-model-invocation: true
argument-hint: "[message]"
---

Invoking `/commit` is the user saying to commit.

## Checks

Run from the repo root, in order, one command per Bash call, no `&&`, `;` or `$(...)`. Stop on the first failure.

1. `vp check` exits 0.
2. `vp test` exits 0. A missing `vp`, `package.json` or `app/` is a failure, not a skip.
3. The commit message has no AI attribution: no `Co-Authored-By`, `Claude` or `Generated` anywhere, trailers included, case-insensitive.

The commit gate in `.claude/settings.json` runs these same checks on every `git commit`.

## Steps

1. Pick the message: `$ARGUMENTS` if given, else a short imperative line derived from the diff. No attribution, no trailers.
2. Run the checks above with that message.
3. On any failure, stop before staging. Show the failing command and its last ~15 lines of output. Do not commit.
4. On pass, stage with `git add -A`, or only the files relevant to the work if unrelated changes are present.
5. Commit with `git commit -m "<message>"`. If the gate blocks, show its reason and stop.
