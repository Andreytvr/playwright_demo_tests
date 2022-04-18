import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async open() {
    await this.page.goto("/inventory.html");
  }

  async assertInventory() {
    await expect(this.page.url()).toContain("inventory");
    await expect(this.cartLink).toBeVisible();
  }

  async openProduct(productName: string) {
    await this.page
      .locator(`.inventory_item_name:has-text("${productName}")`)
      .click();
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator(
        `.inventory_item:has-text("${productName}") button:has-text("Add to cart")`
      )
      .click();
  }

  async removeProductClick(productName: string) {
    await this.page
      .locator(
        `.inventory_item:has-text("${productName}") button:has-text("Remove")`
      )
      .click();
  }
}
