import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected baseURL: string = 'https://automationexercise.com';

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to the home page using the shared base URL.
    async navigateToHomePage(): Promise<void> {
        await this.page.goto('/');
        await this.waitForPageLoad();
    }

    // Navigate to a relative path on the site.
    async goto(path: string): Promise<void> {
        await this.page.goto(path);
        await this.waitForPageLoad();
    }

    // Wait until the browser has loaded the page DOM content.
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Accept cookie consent only when the banner is visible.
    async acceptCookiesIfVisible(): Promise<void> {
        const overlay = this.page.locator('.fc-dialog-overlay');
        const consentButton = this.page.getByRole('button', { name: /Consent/i });

        if (await overlay.isVisible().catch(() => false)) {
            await consentButton.click().catch(() => {});
            await this.page.waitForTimeout(500);
        } else if (await consentButton.isVisible().catch(() => false)) {
            await consentButton.click().catch(() => {});
            await this.page.waitForTimeout(500);
        }
    }
}
