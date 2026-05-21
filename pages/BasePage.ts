import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected baseURL: string = 'https://automationexercise.com';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage(): Promise<void> {
        await this.page.goto(this.baseURL);
    }
}