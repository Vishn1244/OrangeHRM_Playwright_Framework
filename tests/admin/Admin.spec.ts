import { test } from "../../fixtures/baseFixture";

test("Verify Admin Page", async ({ adminPage }) => {

    await adminPage.openAdmin();

    await adminPage.verifyAdminPage();

});