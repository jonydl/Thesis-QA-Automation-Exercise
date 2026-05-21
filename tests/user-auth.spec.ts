import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

test.describe('User Authentication', () => {
    
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    
    test('User can login', async ({ page }) => {
        return;
    });
})