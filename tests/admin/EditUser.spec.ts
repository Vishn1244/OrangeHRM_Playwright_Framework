import { test } from "../../fixtures/baseFixture";
import { AdminWorkflow } from "../../workflows/AdminWorkflow";
import { FakerUtils } from "../../utils/FakerUtils";

test("Edit User", async ({ pimPage, adminPage }) => {

    const user = await AdminWorkflow.createAdminUser(
        pimPage,
        adminPage
    );

    await adminPage.searchUser(user.username);

    await adminPage.clickEditForUser(user.username);

    const updatedUser = FakerUtils.employee();

    await adminPage.updateUsername(updatedUser.username);

    await adminPage.clickUpdate();

    await adminPage.verifyUserUpdated();

});