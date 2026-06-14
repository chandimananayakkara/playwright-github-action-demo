

import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator; 
    readonly cartItem:Locator
    readonly cartList:Locator

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]'); 
        this.cartItem = page.locator('[data-test="inventory-item"]')
        this.cartList = page.locator('[data-test="cart-list"]')
    }

    async removeProductFromCart(productName: string) {
        await this.cartItems.filter({ hasText: productName }).getByRole('button', { name: 'Remove' }).click();
    }


    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async haveItemsInCart(){
         return this.cartItem
    }

    async checkSelectItemsInCart(){

    }
}