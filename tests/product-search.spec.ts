import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { HomePage } from '../pages/HomePage';

test.describe('Search Results', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);

        await homePage.navigateToHomePage();
        await homePage.acceptCookiesIfVisible();
        await homePage.goToProductsPage();
    });

    test('Filter products by "Dress" and verify results', async () => {
        const productName = 'Dress';

        await productsPage.searchForProduct(productName);

        const resultsDisplayed = await productsPage.areSearchResultsDisplayed();
        expect(resultsDisplayed).toBeTruthy();

        const visibleProducts = await productsPage.getVisibleProductNames();
        expect(visibleProducts.length).toBeGreaterThan(0);

        for (const product of visibleProducts) {
            expect(product.toLowerCase()).toContain(productName.toLowerCase());
        }
    });
});
