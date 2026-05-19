import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Add to Cart Functionality', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        await homePage.navigateToHomePage();
        await homePage.acceptCookiesIfVisible();
        await homePage.goToProductsPage();
    });

    test('Add two products to cart and verify count', async () => {
        await productsPage.addProductsToCartByIndex([0, 1]);
        await homePage.goToCartPage();

        await expect(cartPage.cartItems).toHaveCount(2);
    });
});
