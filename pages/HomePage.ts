import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    // Navigate through the header link to the Products page.
    async goToProductsPage(): Promise<void> {
        await this.page.getByRole('link', { name: /Products/i }).click();
        await this.waitForPageLoad();
    }

    // Navigate through the header link to the Cart page.
    async goToCartPage(): Promise<void> {
        await this.page.getByRole('link', { name: /Cart/i }).click();
        await this.waitForPageLoad();
    }

    // Navigate through the header link to the Contact Us page.
    async goToContactUsPage(): Promise<void> {
        await this.page.getByRole('link', { name: /Contact us/i }).click();
        await this.waitForPageLoad();
    }
}
