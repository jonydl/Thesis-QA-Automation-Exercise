import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Add to Cart Functionality', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    // Before each test, initialize the page objects
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        
        await homePage.navigateToHomePage();
        //Bypass cookies bug
        await homePage.bypassCookiesBug();
        await productsPage.gotoProductsPage();
    });

    test('Add two products to cart and verify count', async ({ page }) => {
        // Add two products to the cart
        await productsPage.addProductsToCartByIndex([0, 1]);

        // Navigate to cart
        await homePage.goToCartPage();

        // Verify cart contains 2 items
        const itemCount = await cartPage.getCartItemCount();
        await expect(itemCount).toBe(2);
    });
});