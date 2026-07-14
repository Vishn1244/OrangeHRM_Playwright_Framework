import { test } from "../../fixtures/baseFixture";

test("Search Admin User", async ({ adminPage }) => {

    await adminPage.searchUser("Admin");

    await adminPage.verifyUserDisplayed("Admin");

});