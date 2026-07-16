import { test } from "@playwright/test";
import { logger } from "../utils/Logger";

test.beforeEach(async ({ page }) => {

    logger.info("Starting Test");

});

test.afterEach(async ({ page }, testInfo) => {

    logger.info(`Finished : ${testInfo.title}`);

});