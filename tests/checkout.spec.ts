// tests/checkout.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

const validUsername = process.env.VALID_USERNAME!;
const validPassword = process.env.VALID_PASSWORD!;

test.describe('Checkout Flow', () => {

    // This hook runs before each test in this file.
    // It logs in and adds an item to the cart to ensure the cart is not empty.
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.shoppingCartLink.click();
        
        const cartPage = new CartPage(page);
        await cartPage.goToCheckout();

        // Verify we are on the checkout step one page
        await expect(page).toHaveURL(/checkout-step-one.html/);
    });

    test('TC01: Successful checkout (happy path)', async ({ page }) => {
        const checkoutStepOne = new CheckoutStepOnePage(page);
        const checkoutStepTwo = new CheckoutStepTwoPage(page);
        const checkoutComplete = new CheckoutCompletePage(page);

        await checkoutStepOne.fillInformation('John', 'Doe', '12345');
        await checkoutStepOne.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);
        await expect(checkoutStepTwo.pageTitle).toHaveText('Checkout: Overview');

        await checkoutStepTwo.finishCheckout();

        await expect(page).toHaveURL(/checkout-complete.html/);
        await expect(checkoutComplete.confirmationHeader).toHaveText('Thank you for your order!');
    });

    test('TC02: Should show an error when First Name is empty', async ({ page }) => {
        const checkoutStepOne = new CheckoutStepOnePage(page);
        
        await checkoutStepOne.fillInformation('', 'Doe', '12345');
        await checkoutStepOne.continueCheckout();

        await expect(checkoutStepOne.errorMessage).toBeVisible();
        await expect(checkoutStepOne.errorMessage).toHaveText('Error: First Name is required');
    });

    test('TC03: Should show an error when Last Name is empty', async ({ page }) => {
        const checkoutStepOne = new CheckoutStepOnePage(page);
        
        await checkoutStepOne.fillInformation('John', '', '12345');
        await checkoutStepOne.continueCheckout();

        await expect(checkoutStepOne.errorMessage).toBeVisible();
        await expect(checkoutStepOne.errorMessage).toHaveText('Error: Last Name is required');
    });

    test('TC04: Should show an error when Postal Code is empty', async ({ page }) => {
        const checkoutStepOne = new CheckoutStepOnePage(page);
        
        await checkoutStepOne.fillInformation('John', 'Doe', '');
        await checkoutStepOne.continueCheckout();

        await expect(checkoutStepOne.errorMessage).toBeVisible();
        await expect(checkoutStepOne.errorMessage).toHaveText('Error: Postal Code is required');
    });

    test('TC05: Should cancel the checkout from overview page and return to inventory', async ({ page }) => {
        const checkoutStepOne = new CheckoutStepOnePage(page);
        const checkoutStepTwo = new CheckoutStepTwoPage(page);

        await checkoutStepOne.fillInformation('John', 'Doe', '12345');
        await checkoutStepOne.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);
        
        await checkoutStepTwo.cancelButton.click();
        
        await expect(page).toHaveURL(/inventory.html/);
    });

});