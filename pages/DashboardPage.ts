import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {

    readonly dashboardHeading: Locator;
    readonly userDropdown: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {

        super(page);

        this.dashboardHeading = page.getByRole("heading", {
            name: "Dashboard"
        });

        this.userDropdown = page.locator(".oxd-userdropdown-name");

        this.logoutLink = page.getByRole("menuitem", {
            name: "Logout"
        });
    }

    async verifyDashboard() {

    await expect(this.page).toHaveURL(/dashboard/);

    await this.page.waitForLoadState("networkidle");

    await expect(this.dashboardHeading).toBeVisible({
        timeout: 60000
    });

}

    async logout() {

        await this.userDropdown.click();

        await this.logoutLink.click();

        await expect(this.page).toHaveURL(/auth\/login/);

    }
}