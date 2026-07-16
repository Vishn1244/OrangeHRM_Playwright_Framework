import { test } from "../../fixtures/baseFixture";
import { AdminWorkflow } from "../../workflows/AdminWorkflow";

test("Search User", async ({ pimPage, adminPage }) => {

    const user = await AdminWorkflow.createAdminUser(
        pimPage,
        adminPage
    );

    await adminPage.searchUser(user.username);

    await adminPage.verifyUserDisplayed(user.username);

});