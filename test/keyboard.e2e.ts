import { expect, tabTo, test } from "./fixtures";

test("search, pick and open a card with the keyboard only", async ({ page, gotoReady }) => {
  await gotoReady("/");
  const search = page.getByTestId("search-input");
  await tabTo(page, search);
  await expect(search).toBeFocused();
  await page.keyboard.type("pika");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(
    (url) => url.pathname === "/cards" && url.searchParams.get("q") === "pika",
  );

  // Relies on focus staying in the search field after Enter.
  await tabTo(page, page.getByTestId("card-row"));
  const ringVisible = await page.evaluate(() => {
    const style = getComputedStyle(document.activeElement ?? document.body);
    return style.outlineStyle !== "none" || style.boxShadow !== "none";
  });
  expect(ringVisible).toBe(true);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL((url) => url.searchParams.has("card"));

  await tabTo(page, page.getByTestId("preview-open"));
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("page-card")).toBeVisible();

  await tabTo(page, page.getByTestId("tab-attacks"));
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL((url) => url.searchParams.get("tab") === "weaknesses");
});
