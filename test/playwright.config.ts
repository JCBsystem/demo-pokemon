import { defineConfig, devices } from "@playwright/test";

const url = "http://localhost:4183";

export default defineConfig({
  testMatch: "**/*.e2e.ts",
  timeout: 60_000,
  retries: 0,
  expect: { timeout: 10_000 },
  use: { baseURL: url },
  projects: [
    {
      name: "laptop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: "pnpm -C ../app build && pnpm -C ../app preview --port 4183 --strictPort",
    url,
    reuseExistingServer: !process.env.CI,
  },
});
