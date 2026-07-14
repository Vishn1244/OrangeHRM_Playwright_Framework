import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate
    async navigate(url: string = "/") {

    await this.page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000
    });

    await this.page.waitForLoadState("networkidle");

    await this.page.waitForSelector(
        'input[placeholder="Username"]',
        {
            state: "visible",
            timeout: 60000
        }
    );

}

    // Click
    async click(locator: Locator) {

    await expect(locator).toBeVisible({
        timeout: 30000
    });

    await expect(locator).toBeEnabled({
        timeout: 30000
    });

    await locator.scrollIntoViewIfNeeded();

    await locator.click({
        timeout: 30000,
        force: true
    });

}

    // Type
    async type(locator: Locator, value: string) {
    await expect(locator).toBeVisible({ timeout: 15000 });
    await expect(locator).toBeEditable({ timeout: 15000 });

    await locator.fill('');
    await locator.fill(value);
}

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    async refreshPage() {
        await this.page.reload();
    }

    async goBack() {
        await this.page.goBack();
    }

    async goForward() {
        await this.page.goForward();
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

}