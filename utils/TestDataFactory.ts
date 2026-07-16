import { FakerUtils } from "./FakerUtils";
import { PimPage } from "../pages/PimPage";
import { AdminPage } from "../pages/AdminPage";

export class TestDataFactory {

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

        // Open Admin Module
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

        return user;

    }

}