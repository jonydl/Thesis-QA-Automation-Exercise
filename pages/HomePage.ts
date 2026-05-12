import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    // Method to navigate to the products page when called
    async goToProductsPage() {
        await this.page.getByRole('link', { name: ' Products' }).click();
        await this.waitForPageLoad();
    }

    // Method to navigate to the cart page when called
    async goToCartPage() {
        await this.page.getByRole('link', { name: ' Cart' }).click();        
        await this.waitForPageLoad();    
    }

    // Method to navigate to contact us page when called
    async goToContactUsPage() {
        await this.page.getByRole('link', { name: ' Contact us' }).click();
        await this.waitForPageLoad();
    }

    // Bug workaround method to bypass the page cookies bug that prevents UI elements from being selected
    async bypassCookiesBug() {
        await this.page.locator('.fc-dialog-overlay');
        await this.page.getByRole('button', { name: 'Consent' }).click();
    }
}