import { type Page, type Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly confirmationHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.confirmationHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
}