import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    // Locators for cart items and empty cart message
    readonly cartTable = this.page.locator('.table.table-condensed');
    readonly cartItems = this.page.locator('table tbody tr');
    readonly emptyCartMessage = this.page.getByText('Cart is empty!');

    constructor(page: Page) {
        super(page);
    }

    // Navigate to the cart page when the method is called
    async goToCartPage(): Promise<void> {
        await this.page.goto('https://automationexercise.com/view_cart');
        await this.waitForPageLoad();
    }

    // Get the count of items in the cart
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    // Check if the cart is empty by verifying the presence of the empty cart message
    async isCartEmpty(): Promise<boolean> {
        return await this.emptyCartMessage.isVisible().catch(() => false);
    }
}