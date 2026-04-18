import { test as base } from '@playwright/test';
import {PageFactory} from '../pages/pageFactory';
import {loadEnv} from "../config/envLoader";

type PageFixture = {
    pageFactory: PageFactory;
};

export const test = base.extend<PageFixture>({
    pageFactory: async ({ page }, use) => {

     const env = process.env.dev|| 'test'; 
        loadEnv(String(env)); // Load environment variables before creating the PageFactory
        const pageFactory = new PageFactory(page);
        await use(pageFactory);
    },
});

