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

        this.adminMenu = page.getByRole("link", { name: "Admin" });

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

    await this.adminMenu.waitFor({
    state: "visible"
});

await this.adminMenu.scrollIntoViewIfNeeded();

await this.adminMenu.click();

    await this.page.waitForURL(/admin/);

    await expect(this.page.locator(".oxd-table-body"))
    .toBeVisible();

    // Firefox stabilization
    await this.page.waitForTimeout(1000);

    await expect(
        this.page.locator("//h5[contains(.,'System Users')]")
    ).toBeVisible({
        timeout: 30000
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

    await this.searchUsername.fill("");

    await this.searchUsername.fill(username);

    await this.searchButton.click();

    await this.page.waitForLoadState("networkidle");

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

    const addButton = this.page.locator(".orangehrm-header-container button");

    await expect(addButton).toBeVisible({
        timeout: 30000
    });

    await addButton.scrollIntoViewIfNeeded();

    await addButton.waitFor({
    state: "visible"
});

await addButton.scrollIntoViewIfNeeded();

await addButton.click();

}

// ======================================
// Select User Role
// ======================================

async selectUserRole(role: string) {

    await this.formUserRole.scrollIntoViewIfNeeded();

    await this.formUserRole.click({
        force: true
    });

    await this.page.getByRole("option", {
        name: role,
        exact: true
    }).click();

}

// ======================================
// Enter Employee Name
// ======================================

async enterEmployeeName(employee: string) {

    await this.formEmployeeName.click();

    await this.formEmployeeName.fill(employee);

    const option = this.page
        .locator(".oxd-autocomplete-option")
        .filter({ hasText: employee })
        .first();

    await expect(option).toBeVisible({
        timeout: 15000
    });

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

    await this.click(this.saveButton);

}

async verifyUserSaved() {

    const toast = this.page.locator(".oxd-toast");

    await expect(toast)
        .toBeVisible({
            timeout: 30000
        });

    await expect(toast)
        .toContainText(/Success/i);

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

async updateUsername(username: string) {

    await this.type(this.usernameTextbox, username);

}

async clickUpdate() {

    await this.saveButton.waitFor({
    state: "visible"
});

await this.saveButton.scrollIntoViewIfNeeded();

await this.saveButton.click();

}

async verifyUserUpdated() {

    await expect(this.successToast)
        .toContainText(/Successfully Updated|Success/i, {
            timeout: 30000
        });

}


// ======================================
// Delete User
// ======================================

async clickDeleteForUser(username: string) {

    await this.searchUser(username);

    // Wait for search results
    await this.page.waitForLoadState("networkidle");

    const row = this.page
        .locator(".oxd-table-card")
        .filter({ hasText: username })
        .first();

    await expect(row).toBeVisible({
        timeout: 30000
    });

    // Delete button in that row
    const deleteButton = row.locator("button").first();

    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

}

async confirmDelete() {

    const yesDeleteButton = this.page.getByRole("button", {
        name: /Yes,\s*Delete/i
    });

    await expect(yesDeleteButton).toBeVisible({
        timeout: 30000
    });

    await yesDeleteButton.click();

}

async verifyUserDeleted() {

    const toast = this.page.locator(".oxd-toast");

    await expect(toast).toBeVisible({
        timeout: 30000
    });

    await expect(toast).toContainText(/Deleted|Success/i);

}

// ======================================
// Verify Search Result
// ======================================

async verifyUserDisplayed(username: string) {

    await expect(
        this.page.locator(".oxd-table-body")
    ).toBeVisible({
        timeout: 30000
    });

    const row = this.page
        .locator(".oxd-table-card")
        .filter({
            hasText: username
        })
        .first();

    await expect(row).toBeVisible({
        timeout: 30000
    });

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
}