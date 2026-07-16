import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PimPage extends BasePage {

    readonly pimMenu: Locator;
    readonly addEmployeeBtn: Locator;

    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;

    readonly saveBtn: Locator;

    constructor(page: Page) {

        super(page);

        this.pimMenu = page.getByRole("link", { name: "PIM" });

        this.addEmployeeBtn = page.getByRole("link", {
            name: "Add Employee"
        });

        this.firstName = page.locator("input[name='firstName']");

        this.middleName = page.locator("input[name='middleName']");

        this.lastName = page.locator("input[name='lastName']");

        this.saveBtn = page.getByRole("button", {
            name: "Save"
        });
    }

    async createEmployee(first: string, middle: string, last: string) {

    await this.pimMenu.click();

    await this.addEmployeeBtn.click();

    await this.firstName.fill(first);

    await this.middleName.fill(middle);

    await this.lastName.fill(last);

    await this.saveBtn.click();

    await expect(this.page.locator(".oxd-toast"))
        .toContainText("Success");

    await this.page.waitForURL(/viewPersonalDetails/);
}

}