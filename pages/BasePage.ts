import { Page } from '@playwright/test';

export class BasePage {
    // Set protected page variable to be used in child classes
    protected page: Page;
    protected baseURL: string = "https://automationexercise.com/";

    // Constructor to initialize the page when the class is instantiated
    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to the home page when the class is instantiated
    async navigateToHomePage() {
        await this.page.goto(this.baseURL);
    }

    // Wait for page to load correctly
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}