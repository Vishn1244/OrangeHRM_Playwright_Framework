import { test } from "../../fixtures/baseFixture";
import { FakerUtils } from "../../utils/FakerUtils";

test("Edit Existing User", async ({ adminPage }) => {

    const username = FakerUtils.randomUsername();
    const updatedUsername = username + "_Edit";

    // Create User
    await adminPage.clickAddUser();

    await adminPage.selectUserRole("Admin");

    await adminPage.enterEmployeeName("Peter Mac Anderson");

    await adminPage.selectStatus("Enabled");

    await adminPage.enterNewUsername(username);

    await adminPage.enterPassword("Admin@123");

    await adminPage.enterConfirmPassword("Admin@123");

    await adminPage.clickSave();

    await adminPage.verifyUserSaved();

    // Search User
    await adminPage.openAdmin();

    await adminPage.searchUser(username);

    // Edit User
    await adminPage.clickEditUser();

    await adminPage.updateUsername(updatedUsername);

    await adminPage.clickUpdate();

    await adminPage.verifyUserUpdated();

});