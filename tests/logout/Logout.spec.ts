import { test } from "../../fixtures/baseFixture";

test("Valid Logout", async ({ dashboardPage }) => {

    await dashboardPage.logout();

});