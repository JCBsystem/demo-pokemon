import { defineConfig, devices } from "@playwright/test";

const url = "http://localhost:4184";

export default defineConfig({
  testMatch: "**/*.e2e.ts",
  use: { baseURL: url },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm -C ../app build && pnpm -C ../app preview --port 4184 --strictPort",
    url,
    reuseExistingServer: !process.env.CI,
  },
});
