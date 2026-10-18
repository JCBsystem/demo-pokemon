# Group 5: Agents and commit gate

Owns: `.claude/agents/`, `.claude/skills/`, `.claude/settings.json`.

## Scope (settled)

1. 2.4.1 Review agent: thin project agent wrapping `/code-review` and `pr-review-toolkit` (installed, local scope) with our standards.
2. 2.4.2 Commit gate: agent hook (`type: "agent"`) on `PreToolUse`, matcher `Bash`, `if: "Bash(git commit *)"`, in `.claude/settings.json`. Blocks with a reason on failure. No shell script.

3. Commit skill: `.claude/skills/commit/SKILL.md`. Runs the same checks as the gate (`vp check`, tests), then commits with a normal message, no AI attribution. The gate and the skill share one checklist so they never disagree.

Test agent is group 3.

## Done when

1. A `git commit` by Claude triggers the gate; a failing check blocks it.
2. The review agent runs on demand.
3. `/commit` runs the checks and commits; a failing check stops before the commit.
4. Report: what the gate checks, and what "our standards" was taken to mean. If unclear, ask before writing.
