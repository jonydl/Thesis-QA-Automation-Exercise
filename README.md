# Thesis-QA-Automation-Exercise

This repository automates key user flows on https://automationexercise.com using Playwright and TypeScript.

## What changed
- Refactored page objects to centralize navigation and cookie handling.
- Improved selectors to reduce flakiness.
- Fixed dialog handling in the contact form flow.
- Added tsconfig.json and npm scripts for easier execution.

## Install
npm install
npx playwright install

## Run tests
npm test
npm run test:headed
npm run test:report

## Project structure
- pages/ - Page Object Model classes for reusable page behaviors.
- tests/ - Independent Playwright test suites.
- playwright.config.ts - Playwright settings and browser projects.
- tsconfig.json - TypeScript compiler options.

## Implemented tests
1. tests/product-search.spec.ts - Search for "Dress" and verify results.
2. tests/add-to-cart.spec.ts - Add two products to the cart and verify count.
3. tests/contact-form.spec.ts - Submit the Contact Us form and validate success.

## Notes
- Tests now use a shared BasePage utility for navigation and cookie consent.
- Contact form submission handles the browser dialog before clicking submit.
- Browser base URL is configured in playwright.config.ts for cleaner page navigation.
