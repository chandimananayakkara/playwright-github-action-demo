import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import dotenv from 'dotenv'
dotenv.config()

const validUsername = process.env.VALID_USERNAME!;
const validPassword = process.env.VALID_PASSWORD!;

test.describe('Product and Cart Management', () => {

    let cartItem:Locator

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await expect(page).toHaveURL(/inventory.html/);
        cartItem = page.locator('[data-test="inventory-item"]')
    });

    test('TC01: Add a single item to the cart and verify cart badge', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        
        await expect(inventoryPage.shoppingCartBadge).toBeVisible();
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    });

    test('TC02: Sort products by Price (low to high)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        await inventoryPage.productSortContainer.selectOption('lohi');

        const firstItemPrice = await inventoryPage.inventoryItems.first().locator('.inventory_item_price').textContent();
        expect(firstItemPrice).toBe('$7.99');
    });

    test('TC03: Add and remove an item from inventory page', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

        await inventoryPage.removeProductFromCart('Sauce Labs Bike Light');
        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    });

    test('TC04: Add two items and verify them in the cart page', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
        await inventoryPage.shoppingCartLink.click();

        await expect(page).toHaveURL(/cart.html/);
        await expect(cartPage.cartItems.filter({has:cartPage.cartItem}));
        await expect(cartPage.cartItems.filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await expect(cartPage.cartItems.filter({ hasText: 'Sauce Labs Fleece Jacket' })).toBeVisible();
    });

    test('TC05: Remove an item from the cart page', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Onesie');
        await inventoryPage.shoppingCartLink.click();
        
        await expect(cartPage.cartItems).toHaveCount(1);
        
        await cartPage.removeProductFromCart('Sauce Labs Onesie');
        await expect(cartPage.cartItems.filter({hasText:'Sauce Labs Onesie'})).not.toBeVisible();
    });
});