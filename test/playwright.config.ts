import { defineConfig, devices } from "@playwright/test";

const url = "http://localhost:4181";

export default defineConfig({
  testMatch: "**/*.e2e.ts",
  timeout: 90_000,
  expect: { timeout: 10_000 },
  use: { baseURL: url },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm -C ../app build && pnpm -C ../app preview --port 4181 --strictPort",
    url,
    reuseExistingServer: !process.env.CI,
  },
});
