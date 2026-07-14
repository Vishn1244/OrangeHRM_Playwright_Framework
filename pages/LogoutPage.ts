import { Page, Locator, expect } from '@playwright/test';

export class LogoutPage {

    readonly page: Page;
    readonly profileIcon: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.profileIcon = page.locator('.oxd-userdropdown-tab');
        this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    }

    async openUserMenu() {
        await this.profileIcon.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async logout() {
        await this.openUserMenu();
        await this.clickLogout();
    }

    async verifyLogout() {
        await expect(this.page).toHaveURL(/auth\/login/);
        await expect(
            this.page.getByRole('button', { name: 'Login' })
        ).toBeVisible();
    }
}