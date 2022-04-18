import { test } from "@playwright/test";
import CheckoutPage from "../pages/checkoutPage";
import { ProductList } from "../pages/components/productList";
import { InventoryPage } from "../pages/inventoryPage";
import { ProductPage } from "../pages/productPage";
import { Header } from "../pages/components/header";
import { CartPage } from "../pages/cartPage";

test.use({
  storageState: "files/cookies.json",
});

test.describe("Products tests", () => {
  let inventoryPage: InventoryPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let productList: ProductList;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    productPage = new ProductPage(page);
    productList = new ProductList(page);
    header = new Header(page);

    await inventoryPage.open();
  });

  test("Buy product from product page", async () => {
    await inventoryPage.openProduct("Sauce Labs Bike Light");
    await productPage.assertProductPage();
    await productPage.addToCartClick();
    await header.assertCartCounter();
    await header.cartLinkClick();
    await cartPage.assertCart();
    await productList.assertProductInCart();
    await cartPage.checkoutButtonClick();
    await checkoutPage.assertCheckoutInformationPage();
    await checkoutPage.addUserInformation("Marilyn", "Manson", "000000");
    await checkoutPage.continueButtonClick();
    await checkoutPage.assertCheckoutOverview();
    await productList.assertProductInCheckout();
    await checkoutPage.finishButtonClick();
    await checkoutPage.assertCheckoutComplete();
  });

  test("Add product to cart from inventory page", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");
    await header.assertCartCounter();
    await header.cartLinkClick();
    await cartPage.assertCart();
    await productList.assertProductInCart();
  });

  test("Remove product from cart", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Onesie");
    await header.cartLinkClick();
    await productList.productRemoveButtonClick();
    await productList.assertProductNotExist();
    await header.assertCartCounterNotExist();
  });

  test("Remove product in cart from inventory page", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");
    await inventoryPage.removeProductClick("Sauce Labs Fleece Jacket");
    await header.assertCartCounterNotExist();
    await header.cartLinkClick();
    await productList.assertProductNotExist();
    await cartPage.assertCart();
  });
});
