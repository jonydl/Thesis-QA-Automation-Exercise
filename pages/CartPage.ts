import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartItems = this.page.locator('table tbody tr');
    readonly emptyCartMessage = this.page.getByText('Cart is empty!');

    constructor(page: Page) {
        super(page);
    }

    // Open the cart page using the shared base URL.
    async open(): Promise<void> {
        await this.page.goto('/view_cart');
        await this.waitForPageLoad();
    }

    // Count the visible rows in the cart table.
    async getCartItemCount(): Promise<number> {
        return this.cartItems.count();
    }

    // Return whether the cart empty message is visible.
    async isCartEmpty(): Promise<boolean> {
        return this.emptyCartMessage.isVisible().catch(() => false);
    }
}
