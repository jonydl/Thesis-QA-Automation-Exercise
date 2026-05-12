import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
    // Locators for search functionality
    readonly searchInputField = this.page.getByRole('textbox', { name: 'Search Product' });
    readonly searchButton = this.page.locator('#submit_search');

    // Locators for products
    readonly productName = this.page.locator('.productinfo.text-center p');
    readonly productContainer = this.page.locator('.productinfo.text-center');

    // Constructor to initialize the page when the class is instantiated
    constructor(page: Page) {
        super(page);
    }

    // Navigate to the products page when the method is called
    async gotoProductsPage(): Promise<void> {
        await this.page.goto('https://automationexercise.com/products');

        // Wait for the products page to load after accepting cookies
        await this.waitForPageLoad();
    }

    // Search for a product by name and wait for results to load
    async searchForProduct(productName: string): Promise<void> {
        // Wait for search input to be visible
        await this.searchInputField.waitFor({ state: 'visible', timeout: 10000 });
        
        // Fill the search input
        await this.searchInputField.fill(productName);
        
        // Wait for search button to be visible
        await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
        
        // Click the search button with force if needed (in case overlay exists)
        await this.searchButton.click();

        // Wait for results to load
        await this.waitForPageLoad();
    }

    // Check if search results are displayed
    async areSearchResultsDisplayed(): Promise<boolean> {
        const count = await this.productContainer.count();
        return count > 0;
    }

    // Get the names of all visible products in the search results
    async getVisibleProductNames(): Promise<string[]> {
        return await this.page
            .locator('.productinfo.text-center p')
            .allTextContents();
    }

    // Add multiple products to the cart by their index in the product list
    async addProductsToCartByIndex(indices: number[]): Promise<void> {
        for (const index of indices) {
            const hoverImage = this.page.getByRole('img', { name: 'ecommerce website products' }).nth(index);
            const addToCartButton = this.page.getByText('Add to cart').nth(index);

                await hoverImage.hover();
                await hoverImage.waitFor({ state: 'visible', timeout: 10000 });

                await addToCartButton.click();
                await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
        }
    }

    // Bypass the cookies bug that prevents UI elements from being selected
    async bypassCookiesBug(): Promise<void> {
        await this.page.locator('.fc-dialog-overlay');
        await this.page.getByRole('button', { name: 'Consent' }).click();
    }
}