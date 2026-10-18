import { expect, test } from "./fixtures";

test("favourites survive reload and show on home", async ({ page, checkA11y }) => {
  await page.goto("/card/sm11-56");
  const toggle = page.getByTestId("favourite-toggle");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  await page.goto("/");
  await expect(
    page.getByTestId("favourites").getByTestId("favourite-item").filter({ hasText: "Pikachu" }),
  ).toBeVisible();
  await expect(page.getByTestId("fav-count")).toContainText("1");
  await checkA11y(page);

  await page.goto("/cards?q=eevee");
  const gridToggle = page.getByTestId("favourite-toggle").first();
  await gridToggle.click();
  await expect(gridToggle).toHaveAttribute("aria-pressed", "true");
  await page.goto("/");
  await expect(page.getByTestId("favourite-item")).toHaveCount(2);
  await expect(page.getByTestId("fav-count")).toContainText("2");

  await page.goto("/cards?q=eevee");
  await gridToggle.click();
  await expect(gridToggle).toHaveAttribute("aria-pressed", "false");
  await page.goto("/card/sm11-56");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await page.goto("/");
  await expect(page.getByTestId("favourite-item")).toHaveCount(0);
});
