import AxeBuilder from "@axe-core/playwright";
import { test as base, expect, type Page } from "@playwright/test";

type Fixtures = { checkA11y: (page: Page) => Promise<void> };

export const test = base.extend<Fixtures>({
  // oxlint-disable-next-line no-empty-pattern -- Playwright requires a destructured first argument
  checkA11y: async ({}, run) => {
    await run(async (page) => {
      const { violations } = await new AxeBuilder({ page }).analyze();
      const report = violations
        .map((v) => {
          const node = v.nodes[0];
          return `${v.id}: ${v.help}\n  ${node?.html ?? ""}\n  ${JSON.stringify(node?.target ?? [])}`;
        })
        .join("\n");
      expect(violations, `axe violations:\n${report}`).toEqual([]);
    });
  },
});

export { expect };
