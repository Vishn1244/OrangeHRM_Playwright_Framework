import { test as base, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AdminPage } from "../pages/AdminPage";
import { PimPage } from "../pages/PimPage";

type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminPage: AdminPage;
    pimPage: PimPage;
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await use(loginPage);
    },

    dashboardPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.loginAndWait(
            process.env.APP_USERNAME!,
            process.env.APP_PASSWORD!
        );

        const dashboardPage = new DashboardPage(page);

        await use(dashboardPage);
    },

    adminPage: async ({ dashboardPage, page }, use) => {

        const adminPage = new AdminPage(page);

        await use(adminPage);
    },

    pimPage: async ({ dashboardPage, page }, use) => {

        const pimPage = new PimPage(page);

        await use(pimPage);
    }

});

export { expect };