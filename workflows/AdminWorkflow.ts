import { AdminPage } from "../pages/AdminPage";
import { PimPage } from "../pages/PimPage";
import { FakerUtils } from "../utils/FakerUtils";

export class AdminWorkflow {

    static async createAdminUser(
        pimPage: PimPage,
        adminPage: AdminPage
    ) {

        const user = FakerUtils.employee();

        // Create Employee
        await pimPage.createEmployee(
            user.firstName,
            user.middleName,
            user.lastName
        );

        // Open Admin
        await adminPage.openAdmin();

        // Add User
        await adminPage.clickAddUser();

        await adminPage.selectUserRole("Admin");

        await adminPage.enterEmployeeName(user.employeeName);

        await adminPage.selectStatus("Enabled");

        await adminPage.enterNewUsername(user.username);

        await adminPage.enterPassword(user.password);

        await adminPage.enterConfirmPassword(user.password);

        await adminPage.clickSave();

await adminPage.verifyUserSaved();

// Wait until we're back on the System Users page
await adminPage.waitForAdminPage();

// Search the newly created user
await adminPage.searchUser(user.username);

// Make sure the user exists before returning
await adminPage.verifyUserDisplayed(user.username);

return user;

    }

}