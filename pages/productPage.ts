import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator(".inventory_details_name");
    this.productDescription = page.locator(".inventory_details_desc");
    this.productPrice = page.locator(".inventory_details_price");
    this.addToCartButton = page.locator(
      ".inventory_details_desc_container button"
    );
    this.backToProductButton = page.locator("#back-to-products");
  }

  async assertProductPage() {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.backToProductButton).toBeVisible();
  }

  async addToCartClick() {
    await this.addToCartButton.click();
  }
}
