import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async assertInventory() {
    await expect(this.page.url()).toContain("inventory");
    await expect(this.cartLink).toBeVisible();
  }
}
