import { test } from "../../fixtures/baseFixture";

test("Verify Dashboard", async ({ dashboardPage }) => {

    await dashboardPage.verifyDashboard();

});