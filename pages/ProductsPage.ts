import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly searchInputField = this.page.getByRole('textbox', { name: /Search Product/i });
    readonly searchButton = this.page.locator('#submit_search');
    readonly productCards = this.page.locator('.productinfo.text-center');
    readonly productName = this.page.locator('.productinfo.text-center p');

    constructor(page: Page) {
        super(page);
    }

    // Navigate directly to the Products page and handle cookie consent.
    async gotoProductsPage(): Promise<void> {
        await this.page.goto('/products');
        await this.waitForPageLoad();
        await this.acceptCookiesIfVisible();
    }

    // Execute a search and wait for the page to render results.
    async searchForProduct(productName: string): Promise<void> {
        await expect(this.searchInputField).toBeVisible({ timeout: 10000 });
        await this.searchInputField.fill(productName);
        await expect(this.searchButton).toBeVisible({ timeout: 10000 });
        await this.searchButton.click();
        await this.waitForPageLoad();
    }

    // Return whether any result cards are visible.
    async areSearchResultsDisplayed(): Promise<boolean> {
        return (await this.productCards.count()) > 0;
    }

    // Get the names of all visible products.
    async getVisibleProductNames(): Promise<string[]> {
        return this.productName.allTextContents();
    }

    // Add products to the cart using stable card-level selectors.
    async addProductsToCartByIndex(indices: number[]): Promise<void> {
        for (const index of indices) {
            const productCard = this.productCards.nth(index);
            const addToCartButton = productCard.locator('text=Add to cart');

            await productCard.scrollIntoViewIfNeeded();
            await productCard.hover();
            await expect(addToCartButton).toBeVisible({ timeout: 10000 });
            await addToCartButton.click();
            await this.page.getByRole('button', { name: /Continue Shopping/i }).click();
        }
    }
}
