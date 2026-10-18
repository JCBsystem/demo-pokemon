import type { Locator } from "@playwright/test";
import { expect, test } from "./fixtures";

const selected = (chip: Locator) =>
  expect
    .poll(
      async () =>
        (await chip.getAttribute("aria-pressed")) ?? (await chip.getAttribute("data-selected")),
    )
    .toBe("true");

const count = (locator: Locator) =>
  expect.poll(async () => Number((await locator.textContent())?.replace(/\D/g, "")));

test("filters load from the URL, update it, round trip and clear", async ({
  page,
  context,
  checkA11y,
}) => {
  await page.goto("/cards?type=Fire&type=Water&rarity=Common&sort=hp");
  const chip = (type: string) => page.getByTestId("filter-type-option").filter({ hasText: type });
  await selected(chip("Fire"));
  await selected(chip("Water"));
  await expect(page.getByTestId("filter-rarity")).toContainText(/Common|1/);
  await expect(page.getByTestId("sort-select")).toContainText("HP");
  await count(page.getByTestId("result-count")).toBeGreaterThan(0);
  await checkA11y(page);

  await chip("Grass").click();
  await expect(page).toHaveURL(/type=Grass/);

  const url = page.url();
  const total = await page.getByTestId("result-count").textContent();
  const second = await context.newPage();
  await second.goto(url);
  await expect(second.getByTestId("result-count")).toHaveText(total ?? "");
  await second.close();

  await chip("Fire").click();
  await expect(page).not.toHaveURL(/type=Fire/);

  await page.getByTestId("filter-set").click();
  await page
    .getByTestId("filter-set-list")
    .getByRole("option", { name: /^xy1\b/ })
    .click();
  await expect(page).toHaveURL(/set=xy1/);
  await page.keyboard.press("Escape");
  // Water, Grass, Common, xy1
  await expect(page.getByTestId("active-filter")).toHaveCount(4);

  await page.getByTestId("clear-filters").first().click();
  await expect(page).not.toHaveURL(/[?&](q|type|set|rarity)=/);
  await expect(page.getByTestId("result-count")).toHaveText(/2,?138/);
});

test("empty state clears filters", async ({ page, checkA11y }) => {
  await page.goto("/cards?q=zzzz");
  await expect(page.getByTestId("empty-state")).toBeVisible();
  await checkA11y(page);
  await page.getByTestId("empty-state").getByTestId("clear-filters").click();
  await expect(page).toHaveURL(/\/cards$/);
  await expect(page.getByTestId("result-count")).toHaveText(/2,?138/);
});
