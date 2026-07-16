import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentials: Locator;
    readonly requiredMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");

        this.loginButton = page.getByRole("button", {
            name: "Login"
        });

        this.invalidCredentials = page.locator(
            "//p[text()='Invalid credentials']"
        );

        this.requiredMessage = page.locator(
            "//span[text()='Required']"
        );

    }

async navigate() {

    await this.page.goto("/", {
    waitUntil: "load",
    timeout: 200000
});

     await expect(this.loginButton).toBeVisible({
        timeout: 110000
    });

    console.log("Current URL:", this.page.url());

    await this.page.screenshot({
        path: "login-page.png",
        fullPage: true
    });

    await expect(this.loginButton).toBeVisible();
}

    async enterUsername(username: string) {

        await this.type(this.username, username);

    }

    async enterPassword(password: string) {

        await this.type(this.password, password);

    }

    async clickLogin() {

        await expect(this.loginButton).toBeVisible({
        timeout: 110000
         });

        await expect(this.loginButton).toBeEnabled({
            timeout: 110000
        });

        await this.loginButton.scrollIntoViewIfNeeded();

        await this.loginButton.click();

    }

    // Negative Login

    async login(username: string, password: string) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();

    }

    // Positive Login

    async loginAndWait(username: string, password: string) {

    await this.enterUsername(username);

    await this.enterPassword(password);

    await this.clickLogin();

    // Wait until Dashboard URL appears
    await this.page.waitForURL(/dashboard/, {
        timeout: 110000
    });

    // Wait until loading spinner disappears
    await this.page.waitForLoadState("networkidle");

    // Dashboard heading must be visible
    await expect(
        this.page.getByRole("heading", {
            name: "Dashboard"
        })
    ).toBeVisible({
        timeout: 110000
    });

}

    async verifySuccessfulLogin() {

        await expect(this.page).toHaveURL(/dashboard/);

    }

    async verifyInvalidCredentials() {

        await expect(this.invalidCredentials).toBeVisible();

    }

    async verifyRequiredMessage() {

        await expect(this.requiredMessage.first()).toBeVisible();

    }

}