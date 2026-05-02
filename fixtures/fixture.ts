import { test as base } from '@playwright/test';
import { PageFactory } from '../pages/pageFactory';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { HerokuAppPage } from '../pages/herokuAppPage';

type PageFixture = {
pageFactory: PageFactory;
 loginPage: LoginPage;
 productPage: ProductPage;
 cartPage: CartPage;
 checkoutPage: CheckoutPage;
  herokuAppPage: HerokuAppPage;
};

export const test = base.extend<PageFixture>({
 pageFactory: async ({ page }, use) => {
    const factory = new PageFactory(page);
    await use(factory);
  },

  loginPage: async ({ pageFactory }, use) => {
      
    await use(pageFactory.createLoginPage());
  },
  productPage: async ({ pageFactory }, use) => {
     
    await use(pageFactory.createProductPage());
  },
  cartPage: async ({ pageFactory }, use) => {
    
    await use(pageFactory.createCartPage());
  },
  checkoutPage: async ({ pageFactory }, use) => {
    await use(pageFactory.createCheckoutPage());
  }, 
  herokuAppPage: async ({ pageFactory }, use) => {
    await use(pageFactory.createHerokuAppPage());
  }
});



export { expect } from '@playwright/test';