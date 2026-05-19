import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    readonly nameInput = this.page.getByRole('textbox', { name: /Name/i });
    readonly emailInput = this.page.getByRole('textbox', { name: /Email/i });
    readonly subjectInput = this.page.getByRole('textbox', { name: /Subject/i });
    readonly messageInput = this.page.getByRole('textbox', { name: /Message/i });
    readonly submitButton = this.page.getByRole('button', { name: /Submit/i });
    readonly successMessage = this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');

    constructor(page: Page) {
        super(page);
    }

    // Navigate directly to the Contact Us page and accept cookies if they appear.
    async goToContactPage(): Promise<void> {
        await this.page.goto('/contact_us');
        await this.waitForPageLoad();
        await this.acceptCookiesIfVisible();
    }

    // Fill contact form fields with the provided values.
    async fillContactForm(name: string, email: string, subject: string, message: string): Promise<void> {
        await expect(this.nameInput).toBeVisible({ timeout: 10000 });
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    // Submit the contact form and handle the browser dialog in a stable manner.
    async submitForm(): Promise<void> {
        const [dialog] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.submitButton.click(),
        ]);

        expect(dialog.message()).toContain('Press OK to proceed!');
        await dialog.accept();
        await expect(this.successMessage).toBeVisible({ timeout: 10000 });
    }
}
