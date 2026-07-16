import { expect, Locator, Page } from "@playwright/test";

export class BasePage {

    constructor(protected page: Page) {}

    async click(locator: Locator) {
        await locator.waitFor({
            state: "visible"
        });

        await locator.scrollIntoViewIfNeeded();

        await locator.click();
    }

    async type(locator: Locator, value: string) {
        await locator.waitFor({
            state: "visible"
        });

        await locator.fill(value);
    }

    async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async waitForToast() {

        const toast = this.page.locator(".oxd-toast");

        await expect(toast).toBeVisible({
            timeout: 110000
        });

        await expect(toast).toContainText(/Success/i);
    }

    async waitForLoader() {

    const loader = this.page.locator(".oxd-loading-spinner").first();

    if (await loader.isVisible().catch(() => false)) {

        await loader.waitFor({
            state: "hidden",
            timeout: 110000
        });

    }

}

}