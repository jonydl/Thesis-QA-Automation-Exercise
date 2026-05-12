import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';

test.describe('Submit Form', () => {
    let basePage: BasePage;
    let homePage: HomePage;
    let contactPage: ContactPage;
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        homePage = new HomePage(page);
        contactPage = new ContactPage(page);
        await basePage.navigateToHomePage();
    });

    test('Form submitted successfully', async ({ page }) => {
        await homePage.goToContactUsPage();
        await contactPage.fillContactForm('John Doe', 'john.doe@example.com', 'Test Subject', 'Test message 1234567890!');
        await contactPage.submitForm();

        await page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Press OK to proceed!');
            await dialog.accept();

        // Workaround to bypass the page cookies bug that prevents UI elements from being selected
            await page.locator('.fc-dialog-overlay').waitFor({ state: 'visible' });
            await page.getByRole('button', { name: 'Consent' }).click();
            //await expect(contactPage.formSubmissionSuccessMessageIsVisible()).resolves.toBe(true);
            await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
        });
    });
});