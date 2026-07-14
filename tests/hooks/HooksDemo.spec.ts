import { test, expect } from "@playwright/test";

test.beforeAll(async () => {

    console.log("======== BEFORE ALL ========");

});

test.beforeEach(async ({ page }) => {

    console.log("======== BEFORE EACH ========");

});

test.afterEach(async ({ page }) => {

    console.log("======== AFTER EACH ========");

});

test.afterAll(async () => {

    console.log("======== AFTER ALL ========");

});

test("Test 1", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com");

    await expect(page).toHaveTitle(/OrangeHRM/);

});

test("Test 2", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com");

    await expect(page).toHaveTitle(/OrangeHRM/);

});