import { type Page, type Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}