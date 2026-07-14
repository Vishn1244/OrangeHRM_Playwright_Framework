import { test } from "../../fixtures/baseFixture";

test("Valid Login", async ({ dashboardPage }) => {

    await dashboardPage.verifyDashboard();

});