import { test as base } from '@playwright/test';
import { PageFactory } from '../pages/pageFactory';

type PageFixture = {
  pageFactory: PageFactory;
};

export const test = base.extend<PageFixture>({
  pageFactory: async ({ page }, use) => {
    const pageFactory = new PageFactory(page);
    await use(pageFactory);
  },
});

export { expect } from '@playwright/test';