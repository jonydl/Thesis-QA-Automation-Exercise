import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';

test.describe('Submit Form', () => {
    let homePage: HomePage;
    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        contactPage = new ContactPage(page);

        await homePage.navigateToHomePage();
        await homePage.acceptCookiesIfVisible();
    });

    test('Form submitted successfully', async () => {
        await contactPage.goToContactPage();
        await contactPage.fillContactForm(
            'John Doe',
            'john.doe@example.com',
            'Test Subject',
            'Test message 1234567890!'
        );

        await contactPage.submitForm();
    });
});
