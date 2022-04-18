import { Page, Locator, expect } from "@playwright/test";

export class ProductList {
  readonly page: Page;
  readonly productList: Locator;
  readonly nameProduct: Locator;
  readonly descriptionProduct: Locator;
  readonly priceProduct: Locator;
  readonly quantityProduct: Locator;
  readonly removeProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator(".cart_item");
    this.nameProduct = page.locator(".inventory_item_name");
    this.descriptionProduct = page.locator(".inventory_item_desc");
    this.priceProduct = page.locator(".inventory_item_price");
    this.quantityProduct = page.locator(".cart_quantity");
    this.removeProductButton = page.locator(".cart_item button");
  }

  async assertProductInCart() {
    await expect(this.nameProduct).toBeVisible();
    await expect(this.descriptionProduct).toBeVisible();
    await expect(this.quantityProduct).toBeVisible();
    await expect(this.priceProduct).toBeVisible();
    await expect(this.removeProductButton).toBeVisible();
    await expect(this.removeProductButton).toHaveText("Remove");
  }

  async assertProductInCheckout() {
    await expect(this.nameProduct).toBeVisible();
    await expect(this.descriptionProduct).toBeVisible();
    await expect(this.quantityProduct).toBeVisible();
    await expect(this.priceProduct).toBeVisible();
    await expect(this.removeProductButton).not.toBeVisible();
  }

  async assertProductNotExist() {
    await expect(this.productList).not.toBeVisible();
  }

  async productRemoveButtonClick() {
    await this.removeProductButton.click();
  }
}
