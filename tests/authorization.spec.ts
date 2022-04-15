import { test } from "@playwright/test";
import { InventoryPage } from "../pages/inventoryPage";
import { LoginPage } from "../pages/loginPage";

test.describe("Authorization tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open();
  });

  test("Login. Positive case", async () => {
    await loginPage.signIn("standard_user", "secret_sauce");
    await inventoryPage.assertInventory();
  });

  test("Login. Negative case", async () => {
    await loginPage.signIn("some user", "wrong password");
    await loginPage.assertErrorMessage();
  });

  test("Close error message", async () => {
    await loginPage.signIn("some user", "wrong password");
    await loginPage.closeErrorMessageClick();
    await loginPage.assertCloseErrorMessage();
  });
});
