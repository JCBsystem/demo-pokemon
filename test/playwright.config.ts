import { defineConfig, devices } from "@playwright/test";

const url = "http://localhost:4182";

export default defineConfig({
  testMatch: "**/*.e2e.ts",
  use: { baseURL: url },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm -C ../app build && pnpm -C ../app preview --port 4182 --strictPort",
    url,
    reuseExistingServer: !process.env.CI,
  },
});
