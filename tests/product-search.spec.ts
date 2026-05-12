import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { HomePage } from '../pages/HomePage';


test.describe('Search Results', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;


    // Before each test, initialize the page objects
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);

        // Navigate to home page once at the start
        await homePage.navigateToHomePage();
    });

    test('Filter products by "Dress" and verify results', { tag: ['@smoke'] }, async () => {
        const productName = 'Dress';

        // Navigate to Products Page
        await productsPage.gotoProductsPage();

        // Search for product
        await productsPage.searchForProduct(productName);

        // Results are displayed
        const resultsDisplayed = await productsPage.areSearchResultsDisplayed();
        expect(resultsDisplayed).toBeTruthy();

        // All visible product names contain the word "Dress" and its case-insensitive
        const visibleProducts = await productsPage.getVisibleProductNames();

        // Ensure that at least one product is visible a
        for (const product of visibleProducts) {
            expect(product.toLowerCase()).toContain(productName.toLowerCase());
        }
    });
});