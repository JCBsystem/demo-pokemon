import { expect, test } from "./fixtures";

for (const path of ["/", "/cards", "/card/base1-58"]) {
  test(`${path} renders and has no axe violations`, async ({ gotoReady, checkA11y }) => {
    await expect(await gotoReady(path)).toBeVisible();
    await checkA11y();
  });
}
