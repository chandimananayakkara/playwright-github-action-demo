import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv'
dotenv.config()

const validUsername = process.env.VALID_USERNAME!;
const validPassword = process.env.VALID_PASSWORD!;
const lockedUsername = process.env.LOCKED_USERNAME!;

test.describe('Login and Authentication', () => {

    test('TC01: Successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);

        await expect(inventoryPage.pageTitle).toBeVisible();
        await expect(inventoryPage.pageTitle).toHaveText('Products');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('TC02: Unsuccessful login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUsername, 'wrongpassword');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });

    test('TC03: Unsuccessful login with non-existent user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('nouser', 'nopass');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });

    test('TC04: Unsuccessful login with a locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(lockedUsername, validPassword);

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
    });
    
    test('TC05: Successful logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

       
        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await expect(page).toHaveURL(/inventory.html/);

     
        await inventoryPage.logout();
        await expect(page).toHaveURL(process.env.BASE_URL!);
        await expect(loginPage.loginButton).toBeVisible();
    });
});