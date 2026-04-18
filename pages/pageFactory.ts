import {Page} from '@playwright/test';
import { LoginPage } from './loginPage';
import { ProductPage } from './productPage';
import { CartPage } from './cartPage';
import { CheckoutPage } from './checkoutPage';
import { BasePage } from './basePage';

export class PageFactory {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    createLoginPage(): LoginPage {
        return new LoginPage(this.page);
    }

    createProductPage(): ProductPage {
        return new ProductPage(this.page);
    }

    createCartPage(): CartPage {
        return new CartPage(this.page);
    }

    createCheckoutPage(): CheckoutPage {
        return new CheckoutPage(this.page);
    }

    createBasePage(): BasePage {
        return new BasePage(this.page);
    }
}