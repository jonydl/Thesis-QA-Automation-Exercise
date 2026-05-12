# Thesis-QA-Automation-Exercise

This project is an exercise for the QA Automation role at Thesis SM. 
The project consists of automating specific user flows of the website https://automationexercise.com using Playwright and Typescript.

---

## QA - Test Plan
1. Read the exercise documentation to identify user journey flows.
2. Run a quick manual exploratory pass.
3. Setup a GitHub repository and clone it.
4. Create the project folder using VSCode.
5. Install the latest Playwright within the project folder.
6. Identify page locators IDs.
7. Create automation flows.
8. Run tests, identify bugs.
9. Upload to GitHub repository.

## QA - Project Objective:
### Part 1 — Framework Structure (30 mins)
Set up a basic Page Object Model structure. Create page objects for:
- HomePage — navigation
- ProductsPage — product listing and search

Your page objects should:
- Live in a `pages/` directory.
- Use a BasePage class that others extend, accepting and storing the Playwright Page instance.
- Expose clearly named methods rather than raw selectors.

### Part 2 — Write the Following Tests (45 mins)
Create your test files in a `tests/` directory. Each test should be independent and able to run in isolation.

1. **Test 1 — Product Search**
   - Navigate to the Products page.
   - Search for "Dress".
   - Assert that search results are displayed.
   - Assert that all visible product names contain the word "Dress" (case-insensitive).

2. **Test 2 — Add to Cart**
   - Browse to the product listing.
   - Add any two products to the cart.
   - Navigate to the Cart.
   - Assert that the cart contains two items.

3. **Test 3 — Contact Form Submission**
   - Navigate to the Contact Us page.
   - Fill in all fields (name, email, subject, message).
   - Submit the form.
   - Assert that the success message is displayed.

### Part 3 — Wrap Up (15 mins)
Write a short README.md that covers:
- How to install and run tests locally.
- Any decisions or trade-offs you made.
- Did you use AI to aid with any of this exercise? If so, where and why?
- Anything you'd improve or add given more time.

---

## Project Installation & Setup
### Prerequisites
- Node.js (v18 or higher)
- npm

### Install Dependencies
```bash
npm install
```

## Playwright Setup
### Installation
```bash
npm init playwright@latest
```

### Setup Verification
```
npx playwright test --project=chromium
```

## Running Tests / Test commands

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --ui` | Open test folder within Playwright UI |
| `npx playwright test tests/product-search.spec.ts` | Run a specific test file |
| `npx playwright test --project=chromium` | Run on Chrome only |
| `npx playwright test --project=firefox` | Run on Firefox only |
| `npx playwright test --project=webkit` | Run on Safari only |
| `npx playwright test --headed` | Run in headed mode (visible browser) |
| `npx playwright test --debug` | Run tests in debug mode |
| `npx playwright show-report` | View HTML test report |

## Project Structure

```
├── pages/
│   ├── BasePage.ts                # Base class with common functionality (navigation, waits)
│   ├── HomePage.ts                # Home page navigation methods.
│   ├── ProductPage.ts             # Product search and "add to cart" functionality.
│   ├── CartPage.ts                # Cart verification methods.
│   └── ContactPage.ts             # Contact form interactions.
└── tests/               
   ├── product-search.spec.ts      # Product search functionality.
   ├── add-to-cart.spec.ts         # Add to cart and verification.
   └── contact-form.spec.ts        # Contact form submission.
```

---

## AI Assistance
AI was used in this exercise for:
- **Code structure review** — Validating POM implementation best practices and autocompletion using VSCode Intelisense.
- **Selector optimization** — Improving locator reliability and resilience.
- **Error handling patterns** — Implementing proper wait strategies.
- **Documentation** — Organizing README sections, formatting, grammar and examples.

The core test logic, page objects, and automation strategy were developed independently.

---

## QA - Known Issues, Bugs & Limitations
**[Bug-001][High Priority] Product search for "Dress" returns unrelated items due to site categorization bug**
- **Impact:** Product search test assertion may fail on some runs due wrong locator IDs
- **Fix:** Locator IDs for some items should be reviewed to avoid wrong products from being listed

**[Bug-002][High Priority] Duplicate "Add to Cart" buttons with inconsistent locators blocks automation from validating the add to cart flow**
- **Impact:** Items have <Add to Cart> duplicated buttons leading to multiple misplaced locator IDs for the same item, this cause confusion when automating because the locator IDs are inconsistent
- **Fix:** Implement a consistent element IDs to all objects using getByLabel method for example

**[Bug-003][High] Cookie banner persistently blocks UI elements when the page loads and waits for an element to be visible**
- **Impact:** Whenever an element is found, the page reloads and the invisible cookies prompt blocks other page elements from being selected, this may block all automation flows as it is unable to select elements behind the layer
- **Workaround:** In order to implement automation in other areas, I have implemented a bypass functionality that accepts cookies before test execution. It is not ideal, however it's the only method to test the automation
- **Fix:** Review the webpage cookies prompt triggering system when the user enters the webpage once and store the cookies history in their browser correctly

**[Bug-004][Mid] Text locators have broken characters that may break automation when assigning locators using getByText**
- **Fix:** Update text ID locators removing especial charaters to make it consistent against other page elements

**[Bug-005][Mid] Inconsistent search locators within the ProductsPage may create flaky tests**
- **Fix:** Implement consistent locators types for all page elements

---

## Future Improvements
With more time, I would:

1. **Test data management** — Create fixtures/factories for test data instead of hardcoded values.
2. **API testing** — Combine API calls with UI tests for better coverage and speed.
3. **Better error handling** — Add custom test hooks for automatic screenshot on failure to include in the bug report and also helping with debugging.
4. **Cart persistence** — Test cart retention across sessions and validate Cart flows.
5. **CI/CD integration** — Set up GitHub Actions for automated test runs on commits.
6. **Bugs investigation** - Deeply investigate locator elements and list all failing IDs into the bug report.
