import { test } from "../../fixtures/baseFixture";
import { FakerUtils } from "../../utils/FakerUtils";

test("Add New User", async ({ adminPage }) => {

    const username = FakerUtils.randomUsername();

    await adminPage.openAdmin();

    await adminPage.clickAddUser();

    await adminPage.selectUserRole("Admin");

    await adminPage.enterEmployeeName("Thomas Kutty Benny");

    await adminPage.selectStatus("Enabled");

    await adminPage.enterNewUsername(username);

    await adminPage.enterPassword("Admin@123");

    await adminPage.enterConfirmPassword("Admin@123");

    await adminPage.clickSave();

    await adminPage.verifyUserSaved();

});