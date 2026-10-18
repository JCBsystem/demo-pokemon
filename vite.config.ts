import { defineConfig } from "vite-plus";

export default defineConfig({
  defaultPackage: "./app",
  fmt: {
    ignorePatterns: [
      "**/dist/**",
      ".tasks/**",
      ".claude/**",
      ".playwright-mcp/**",
      "app/public/data/**",
      "firebaseConfig.json",
      "CLAUDE.md",
    ],
  },
  lint: {
    plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "jsx-a11y"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
      "react/rules-of-hooks": "error",
      "react/only-export-components": ["warn", { allowConstantExport: true }],
    },
    ignorePatterns: ["**/dist/**", ".tasks/**", ".claude/**", ".playwright-mcp/**"],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
