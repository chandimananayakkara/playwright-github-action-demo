# SauceDemo E-Commerce - Playwright Automation Framework

## Introduction

This repository contains a comprehensive, production-grade test automation framework for the Sauce Labs Demo E-Commerce site. Built with Playwright, TypeScript, and Node.js, this framework is designed to be robust, maintainable, and scalable.

The project demonstrates a deep understanding of modern QA engineering principles, including:

**__ The Page Object Model (POM) for code reusability and maintainability.
CI/CD integration using GitHub Actions for automated testing.
Professional, interactive reporting with Allure Framework.
Environment variable management for secure handling of sensitive data.
This framework covers the entire user journey, from logging in and browsing products to completing a purchase, ensuring end-to-end quality of the application. __**

### Live Allure Test Report

A live version of the latest test execution report is hosted on GitHub Pages. This provides immediate, transparent access to test results for all stakeholders.

View Live Allure Report

Project Structure

The framework follows a logical and organized folder structure, promoting separation of concerns and ease of navigation.

```

├── .github/
│   └── workflows/
│       └── playwright-tests.yml  # CI/CD pipeline for GitHub Actions
├── .env                          # Local environment variables (ignored by Git)
├── allure-report/                # Generated Allure HTML report (ignored by Git)
├── allure-results/               # Raw Allure test result data (ignored by Git)
├── node_modules/                 # Project dependencies (ignored by Git)
├── pages/                        # Page Object Model (POM) classes
│   ├── CartPage.ts
│   ├── CheckoutCompletePage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/                        # Test spec files
│   ├── checkout.spec.ts
│   ├── login.spec.ts
│   └── product-and-cart.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md

```

Core Technologies & Tools

| Technology | Purpose |
|------------|---------|
| Playwright | Core automation framework for end-to-end testing. |
| TypeScript | For writing type-safe, robust, and maintainable code. |
| Node.js |	The runtime environment for the project. |
| Page Object Model (POM) |	A design pattern to create a reusable object repository for UI elements. |
| GitHub Actions |	For Continuous Integration and Continuous Deployment (CI/CD). |
| Allure Framework |	To generate beautiful, detailed, and interactive test reports. |
| dotenv |	To manage environment variables and keep credentials secure. |

## Covered Test Scenarios

The test suite is structured to cover the most critical user flows, including both positive (happy path) and negative test cases.

1. Authentication (login.spec.ts)

 Successful Login: A valid user can log in.
 Invalid Password: Error message is shown for incorrect passwords.
 Locked Out User: A specific error is shown for locked-out accounts.
 Successful Logout: A logged-in user can successfully log out.

2. Product & Cart Management (product-and-cart.spec.ts)

 Add to Cart: A product can be added to the cart, and the cart badge updates.
 Remove from Cart: A product can be removed from the cart from both the inventory and cart pages.
 Product Sorting: Products can be sorted by price.
 Cart Verification: Multiple items added to the cart are correctly displayed on the cart page.

3. Checkout Flow (checkout.spec.ts)

 Full Happy Path: A user can complete the entire checkout process successfully.
 Input Validation: Error messages are displayed for missing first name, last name, and postal code.
 Cancel Checkout: A user can cancel the checkout process and return to the main inventory page.


## Getting Started

Follow these steps to set up and run the project on your local machine.

## **Prerequisites**

__Node.js (v18 or higher)__
__npm (comes with Node.js)__

1. Clone the Repository

```
Bash

git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
cd <YOUR_REPO_NAME>

```

2. Install Dependencies

This command will install all the necessary packages listed in package.json, including Playwright and its browsers.

```
Bash

npm install

```

This will also automatically run npx playwright install --with-deps to download the required browser binaries.

3. Set Up Environment Variables

Create a .env file in the root of the project and add the following credentials. This file is listed in .gitignore and will not be committed to the repository.

```
text

BASE_URL=https://www.saucedemo.com/
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
LOCKED_USERNAME=locked_out_user
USER_FIRSTNAME=<your first name>
USER_LASTNAME=<your last name>
USER_ZIPCODE=<your postal code>

```

4. Running the Tests

Execute the following command to run the entire Playwright test suite.

```

Bash

npx playwright test

```

5. Viewing Test Reports

Playwright's Built-in HTML Report
After running the tests, you can view the default HTML report generated by Playwright.

```

Bash

npx playwright show-report

```

## Allure Report (Recommended) ##
For a more detailed and interactive report, use the Allure Framework.

Generate Allure Report:

This command converts the allure-results into a viewable HTML report in the allure-report folder.

```

Bash

npm run allure:generate

```

Open Allure Report:

This command will open the generated report in your default web browser.

```
Bash

npm run allure:open

```

## CI/CD Pipeline with GitHub Actions ##

This project is configured with a CI/CD pipeline using GitHub Actions (.github/workflows/playwright-tests.yml). The pipeline is triggered on every push and pull_request to the main branch.

##__ The pipeline performs the following steps: __##

1. Checks out the latest code.
2. Sets up the Node.js environment.
3. Installs all project dependencies.
4. Runs the entire Playwright test suite.
5. Generates the Allure report from the test results.
6. Deploys the generated Allure report to GitHub Pages for live viewing.