import { test } from "../../fixtures/baseFixture";
import { AdminWorkflow } from "../../workflows/AdminWorkflow";

test("Delete User", async ({ pimPage, adminPage }) => {

    const user = await AdminWorkflow.createAdminUser(
        pimPage,
        adminPage
    );

    await adminPage.searchUser(user.username);

    await adminPage.clickDeleteForUser(user.username);

    await adminPage.confirmDelete();

    await adminPage.verifyUserDeleted();

    await adminPage.searchUser(user.username);

    await adminPage.verifyNoRecordsFound();

});