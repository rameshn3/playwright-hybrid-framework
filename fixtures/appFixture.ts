import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { HerokuAppPage } from '../pages/herokuAppPage';

type PageFixture = {
 loginPage: LoginPage;
 productPage: ProductPage;
 cartPage: CartPage;
 checkoutPage: CheckoutPage;
  herokuAppPage: HerokuAppPage;
};

export const test = base.extend<PageFixture>({
  loginPage: async({page}, use) => {
    await use(new LoginPage(page));
  },

  productPage: async ({ page }, use) => {
     
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  }, 
  herokuAppPage: async ({ page }, use) => {
    await use(new HerokuAppPage(page));
  }
});

export { expect } from '@playwright/test';