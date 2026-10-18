---
paths:
  - "test/**"
---

# Testing

1. Unit: Vitest via Vite+. Run from root: `pnpm test` (`vp test`).
2. Unit files live in `app/test/**/*.test.ts(x)`, mirroring the source file names; fixtures in `app/test/fixtures/`. Import `test`/`expect` from `vite-plus/test`, never from `vitest`.
3. E2e: Playwright in the `test/` workspace package. Run from root: `pnpm e2e` (`pnpm -C test e2e`, which runs `playwright test`).
4. Playwright `webServer` builds and previews `app` (production build) on http://localhost:4173. Chromium only.
5. E2e files: `test/*.e2e.ts`. Never `.spec.ts` or `.test.ts`; root Vitest would pick those up.
6. `test/` never imports app code.
7. Selectors: `getByTestId` first, `getByRole` second. A dedicated test-only CSS class (for example `.e2e-card-image`) allowed where an element cannot carry a test id. No Tailwind utility strings, CSS chains, text, or XPath selectors.
8. Page roots carry `data-testid="page-home"`, `page-cards`, `page-card`.
9. Every page test runs `new AxeBuilder({ page }).analyze()` from `@axe-core/playwright`; violations must be empty.
10. Fixtures: shared Playwright fixtures go in `test/fixtures.ts` via `test.extend`. Tests then import `test`/`expect` from `./fixtures`, not `@playwright/test`. None exist yet.
11. Lint: root `vp check` covers `test/` too.
