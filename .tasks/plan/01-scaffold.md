# Group 1: Scaffold

Owns: root config files, `app/`.

## Scope (settled)

1. 2.1 Vite+ (`vite-plus`, `vp` CLI), React 19, TypeScript strict (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`). Static files only.
2. 2.5 pnpm workspace: `pnpm-workspace.yaml`, `tsconfig.base.json`, one lint config at root. Package `app`. Package `test` is created by group 3.
3. 2.2 Tailwind v4, React Aria Components. No shadcn.
4. 2.7 Lint is Vite+ Oxlint, not eslint (MrB, 2026-10-18: Vite+ toolchain, no old slow lint). jsx-a11y rules enabled in Oxlint.
5. 2.9 TanStack Router, `defaultViewTransition: true`. Routes: `/`, `/cards`, `/card/:id`. Empty pages.
6. 2.12 TanStack Query (`staleTime: Infinity`) and Zustand with `persist`, installed and wired at the root, no features.

## Done when

1. `pnpm install`, `pnpm build`, `pnpm lint`, `pnpm typecheck` pass from root.
2. The three routes render empty pages.
3. Report: versions installed, anything that did not work.

## Vite+ facts (checked 2026-10-18 against viteplus.dev, not training data)

1. `vp` v1.3.0 installed at `~/.local/share/vite-plus/bin`. Agent shells must `export PATH="$HOME/.local/share/vite-plus/bin:$PATH"`.
2. Scaffold: `vp create vite:monorepo --package-manager pnpm`, then app from `vp create vite:application` or `vp create vite -- --template react-ts`. Read https://viteplus.dev/guide/create and /guide/monorepo first; docs do not list generated files, so inspect the output.
3. Lint: Oxlint. Config lives in the `lint` block of root `vite.config.ts`; no `.oxlintrc.json`. `plugins` overwrites the default set (`eslint`, `typescript`, `unicorn`, `oxc`), so list those plus `react` and `jsx-a11y`. Enable `typeAware` and `typeCheck`. Docs: https://viteplus.dev/guide/lint, https://oxc.rs/docs/guide/usage/linter/plugins.html.
4. Commands: `vp check` (fmt + lint + types), `vp build`, `vp test` (Vitest), `vp run -r build`, `vp -C app dev`. `defaultPackage` in root config picks the app.
5. Scaffold with `--no-hooks`. Decided 2026-10-18: no Vite+ Git hooks, the Claude agent commit gate (2.4.2) is the only gate. Never run `vp config --hooks`.
