import { test } from "../../fixtures/baseFixture";
import { FakerUtils } from "../../utils/FakerUtils";

test("Delete Admin User", async ({ adminPage }) => {

    const username = FakerUtils.randomUsername();

    // Create User
    await adminPage.clickAddUser();

    await adminPage.selectUserRole("Admin");

    await adminPage.enterEmployeeName("Thomas Kutty Benny");

    await adminPage.selectStatus("Enabled");

    await adminPage.enterNewUsername(username);

    await adminPage.enterPassword("Admin@123");

    await adminPage.enterConfirmPassword("Admin@123");

    await adminPage.clickSave();

    await adminPage.verifyUserSaved();

    // Search User
    await adminPage.openAdmin();

    await adminPage.searchUser(username);

    // Delete User
    await adminPage.clickDeleteForUser(username);

    await adminPage.confirmDelete();

    await adminPage.verifyUserDeleted();

});