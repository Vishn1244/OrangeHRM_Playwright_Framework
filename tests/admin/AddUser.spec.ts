import { test } from "../../fixtures/baseFixture";
import { AdminWorkflow } from "../../workflows/AdminWorkflow";

test("Add User", async ({ pimPage, adminPage }) => {

    await AdminWorkflow.createAdminUser(
        pimPage,
        adminPage
    );

});