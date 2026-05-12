import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    // Contact form fields and submit button
    readonly nameInput = this.page.getByRole('textbox', { name: 'Name' });
    readonly emailInput = this.page.getByRole('textbox', { name: 'Email', exact: true });
    readonly subjectInput = this.page.getByRole('textbox', { name: 'Subject' });
    readonly messageInput = this.page.getByRole('textbox', { name: 'Message' });
    readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // URL for the contact page
    readonly url = 'https://automationexercise.com/contact_us';

    constructor(page: Page) {
        super(page);
    }

    // Navigate to the contact page when the method is called
    async goToContactPage(): Promise<void> {
        await this.page.goto(this.url);

        // Workaround to bypass the page cookies bug that prevents UI elements from being selected
        await this.page.locator('.fc-dialog-overlay').waitFor({ state: 'visible' });
        await this.page.getByRole('button', { name: 'Consent' }).click();
    }

    // Fill the contact form with provided details
    async fillContactForm(name: string, email: string, subject: string, message: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    // Submit the contact form and handle the console dialog that appears after submission
    async submitForm(): Promise<void> {
        await this.submitButton.click();

        // Wait for the console dialog to appear and verify the message
        const dialog = await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Press OK to proceed!');
            await dialog.accept();
        });
    }

    async formSubmissionSuccessMessageIsVisible(): Promise<boolean> {
        return await this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.').isVisible();
    }
}