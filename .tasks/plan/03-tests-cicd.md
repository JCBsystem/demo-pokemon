# Group 3: Tests and CI/CD

Owns: `test/`, `.github/`, `firebase.json`, `.firebaserc`, `.claude/rules/testing.md`, the test agent in `.claude/agents/`.

Starts after group 1 has the `app` package building.

## Scope (settled)

1. 2.16 vitest in `app`, Playwright in `test`. One smoke test each, proving the structure runs. No feature tests yet.
2. 2.5 Playwright `webServer` builds and previews `app`. `test` does not import app code.
3. 2.4.3 Test agent plus `.claude/rules/testing.md` with `paths: test/**`: how to run unit and e2e, selector rule (`getByTestId` first, `getByRole` second, dedicated test-only class as fallback, nothing else), fixtures.
4. 2.7 `@axe-core/playwright` installed, used in the smoke test.
5. 2.15 Firebase Hosting project `test-pokemon-a4ef7`. `firebase init hosting:github`: deploy on merge to `production`, preview channel on PRs against `main`. Branch `production` created from `main`.

## Done when

1. `pnpm test` and `pnpm e2e` pass from root.
2. Workflows exist in `.github/workflows/`.
3. Report: what needs MrB (`firebase login`, GitHub secrets).
