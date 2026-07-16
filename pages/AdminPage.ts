import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminPage extends BasePage {

    // ==========================
    // Left Menu
    // ==========================

    readonly adminMenu: Locator;

    // ==========================
    // Page Heading
    // ==========================

    readonly adminHeading: Locator;

    // ==========================
    // Search Section
    // ==========================

    readonly searchUsername: Locator;
    readonly searchUserRole: Locator;
    readonly searchEmployeeName: Locator;
    readonly searchStatus: Locator;

    readonly searchButton: Locator;
    readonly resetButton: Locator;
    readonly addButton: Locator;

    // ==========================
    // Add User Form
    // ==========================

    readonly formUserRole: Locator;
    readonly formEmployeeName: Locator;
    readonly formStatus: Locator;

    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly confirmPasswordTextbox: Locator;

    readonly saveButton: Locator;
    readonly cancelButton: Locator;

    // ==========================
    // Table
    // ==========================

    readonly tableRows: Locator;

    // ==========================
    // Edit / Delete
    // ==========================

    readonly firstEditButton: Locator;
    readonly firstDeleteButton: Locator;

    readonly confirmDeleteButton: Locator;

    // ==========================
    // Toast
    // ==========================

    readonly successToast: Locator;

    constructor(page: Page) {

        super(page);

        // ==========================
        // Left Menu
        // ==========================

        this.adminMenu = page.locator("//span[text()='Admin']");

        // ==========================
        // Heading
        // ==========================

        this.adminHeading = page.locator(".orangehrm-header-container");

        // ==========================
        // Search Area
        // ==========================

        this.searchUsername = page.locator(
            "//label[text()='Username']/../following-sibling::div/input"
        );

        this.searchUserRole = page.locator(
            "(//label[text()='User Role']/../following-sibling::div//div[contains(@class,'oxd-select-text')])[1]"
        );

        this.searchEmployeeName = page.locator(
            "//label[text()='Employee Name']/../following-sibling::div//input"
        );

        this.searchStatus = page.locator(
            "(//label[text()='Status']/../following-sibling::div//div[contains(@class,'oxd-select-text')])[1]"
        );

        // ==========================
        // Buttons
        // ==========================

        this.resetButton = page.getByRole("button", {
            name: "Reset"
        });

        this.addButton = page.locator("button").filter({
         hasText: "Add"
        });

        // ==========================
        // Add User Form
        // ==========================

        this.formUserRole = page.locator(
            "(//label[text()='User Role']/../following-sibling::div//div[contains(@class,'oxd-select-text')])[2]"
        );

        this.formEmployeeName = page.locator(
         "//input[@placeholder='Type for hints...']"
        );

        this.formStatus = page.locator(
            "(//label[text()='Status']/../following-sibling::div//div[contains(@class,'oxd-select-text')])[2]"
        );

        this.usernameTextbox = page.locator(
            "//label[text()='Username']/../following-sibling::div/input"
        );

        this.passwordTextbox = page.locator(
            "//label[text()='Password']/../following-sibling::div/input"
        );

        this.confirmPasswordTextbox = page.locator(
            "//label[text()='Confirm Password']/../following-sibling::div/input"
        );

        this.saveButton = page.getByRole("button", {
            name: "Save"
        });

        this.cancelButton = page.getByRole("button", {
            name: "Cancel"
        });

        this.searchButton = page.getByRole("button", {
        name: "Search"
        });

        // ==========================
        // Table
        // ==========================

        this.tableRows = page.locator(".oxd-table-card");

        // ==========================
        // Edit / Delete
        // ==========================

        this.firstEditButton = page.locator(
        "//button[.//i[contains(@class,'bi-pencil-fill')]]"
        ).first();

        this.firstDeleteButton = page.locator(
        "//button[.//i[contains(@class,'bi-trash')]]"
        ).first();

        this.confirmDeleteButton = page.getByRole("button", {
        name: /Yes, Delete/i
        });

        // ==========================
        // Success Toast
        // ==========================

        this.successToast =
        page.locator(".oxd-toast-container");
    }

// ======================================
// Navigate to Admin
// ======================================

   async openAdmin() {

    await this.adminMenu.click();

    await this.page.waitForURL(/admin/);

    await expect(
        this.page.locator("//h5[contains(.,'System Users')]")
    ).toBeVisible({
        timeout: 90000
    });

}


// 👇 Add this method immediately after openAdmin()

 async waitForAdminPage() {

    await expect(
        this.page.getByRole("heading", {
            name: "System Users"
        })
    ).toBeVisible({
        timeout: 90000
    });

}

// ======================================
// Verify Admin Page
// ======================================

async verifyAdminPage() {

    await expect(this.page)
        .toHaveURL(/admin/);

    await expect(
        this.page.locator(".orangehrm-header-container")
    ).toBeVisible();

}

// ======================================
// Search User
// ======================================

 async searchUser(username: string) {

    await this.searchUsername.clear();

    await this.searchUsername.fill(username);

    await this.searchButton.click();

    // Wait for search results to refresh
    await this.page.waitForLoadState("networkidle");

    await this.page.waitForTimeout(9000);

}

// ======================================
// Reset Search
// ======================================

async resetSearch() {

    await this.resetButton.click();

}

// ======================================
// Click Add Button
// ======================================

async clickAddUser() {

    const addButton = this.page.getByRole("button", { name: "Add" });

    await expect(addButton).toBeVisible({
        timeout: 80000
    });

    await addButton.click();

    // Wait until Add User page is actually open
    await expect(
        this.page.getByRole("heading", { name: "Add User" })
    ).toBeVisible({
        timeout: 80000
    });

}

// ======================================
// Select User Role
// ======================================

async selectUserRole(role: string) {

    await expect(this.formUserRole).toBeVisible({
        timeout: 80000
    });

    await this.formUserRole.click();

    await this.page.getByRole("option", {
        name: role,
        exact: true
    }).click();

}

// ======================================
// Enter Employee Name
// ======================================

    async enterEmployeeName(employee: string) {

    await this.formEmployeeName.fill(employee);

    await this.page.waitForTimeout(8000);

    const option = this.page
        .locator(".oxd-autocomplete-option").first();

    await expect(option).toBeVisible();

    await option.click();

}

// ======================================
// Select Status
// ======================================

async selectStatus(status: string) {

    await this.formStatus.scrollIntoViewIfNeeded();

    await this.formStatus.waitFor({
        state: "visible"
    });

    await this.formStatus.click();

    const option = this.page.getByRole("option", {
        name: status
    });

    await option.waitFor({
        state: "visible"
    });

    await option.click();

}

// ======================================
// Enter Username
// ======================================

async enterNewUsername(username: string) {

    await this.type(this.usernameTextbox, username);

}

 async updateUsername(username: string) {
    await this.usernameTextbox.clear();
    await this.usernameTextbox.fill(username);
}

// ======================================
// Enter Password
// ======================================

async enterPassword(password: string) {

    await this.type(this.passwordTextbox, password);

}


// ======================================
// Confirm Password
// ======================================

async enterConfirmPassword(password: string) {

    await this.type(this.confirmPasswordTextbox, password);

}

// ======================================
// Save User
// ======================================

 async clickSave() {

    await expect(this.saveButton).toBeEnabled();

    await Promise.all([
        this.page.waitForLoadState("networkidle"),
        this.saveButton.click()
    ]);

}


  async verifyUserSaved() {

    await this.waitForAdminPage();

}

// ======================================
// Edit User
// ======================================

async clickEditUser() {

    await this.firstEditButton.waitFor({
        state: "visible"
    });

    await this.firstEditButton.click();

    await expect(this.saveButton).toBeVisible();

}

async clickEditForUser(username: string) {

    const row = this.page
        .locator(".oxd-table-card")
        .filter({ hasText: username })
        .first();

    await expect(row).toBeVisible();

    const editButton = row.locator("button i.bi-pencil-fill").locator("..");

    await editButton.click();
}

 

async clickUpdate() {

    await expect(this.saveButton).toBeEnabled();

    await this.saveButton.click();

}

 async verifyUserUpdated() {

    const toast = this.page.locator(".oxd-toast");

    await expect(toast)
        .toContainText(/Successfully Updated|Success/i);

}


// ======================================
// Delete User
// ======================================

 async clickDeleteForUser(username: string) {

    const row = this.page
        .locator(".oxd-table-card")
        .filter({ hasText: username })
        .first();

    await expect(row).toBeVisible({
        timeout: 90000
    });

    const deleteButton = row.locator("button i.bi-trash").locator("..");

    await deleteButton.click();

}

async confirmDelete() {

    const yesButton = this.page.getByRole("button", {
        name: /Yes,\s*Delete/i
    });

    await expect(yesButton).toBeVisible();

    await yesButton.click();

}

async verifyUserDeleted() {

    const toast = this.page.locator(".oxd-toast");

    await expect(toast).toContainText(/Success|Deleted/i);

}

// ======================================
// Verify Search Result
// ======================================

 async verifyUserDisplayed(username: string) {

    const row = this.page
        .locator(".oxd-table-card")
        .filter({ hasText: username });

    await expect(row).toBeVisible();

}

// ======================================
// Verify Table
// ======================================

async verifyTableVisible() {

    await expect(this.tableRows.first()).toBeVisible();

}

async getRecordCount(): Promise<number> {

    return await this.tableRows.count();

}

async createAdminUser(user: {
    employeeName: string;
    username: string;
    password: string;
}) {

    await this.clickAddUser();

    await this.selectUserRole("Admin");

    await this.enterEmployeeName(user.employeeName);

    await this.selectStatus("Enabled");

    await this.enterNewUsername(user.username);

    await this.enterPassword(user.password);

    await this.enterConfirmPassword(user.password);

    await this.clickSave();

    await this.verifyUserSaved();

}

 async verifyNoRecordsFound() {

    await expect(
        this.page.locator("span").filter({
            hasText: "No Records Found"
        }).first()
    ).toBeVisible();

}

}