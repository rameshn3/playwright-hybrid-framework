import {test,expect} from '../fixtures/fixture';

test.describe('checkout page tests', () => {

    test.beforeEach(async ({ loginPage,productPage,cartPage,checkoutPage}) => {
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');
         // ensure we are on product page
    await expect(productPage.isProductPageLoaded).toBeTruthy();
    await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        await expect(cartCount).toBeGreaterThan(0);
          await productPage.goToCart();
          await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
            await cartPage.clickCheckoutButton();
        await expect(checkoutPage.isCheckoutPageDisplayed()).toBeTruthy();
    });

    test('verify order completion flow', async ({ checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.isOverviewPageDisplayed()).toBeTruthy();
        await checkoutPage.clickFinishButton();
        await expect(checkoutPage.isSuccessMessageDisplayed()).toBeTruthy(); 
        await checkoutPage.clickBackToProductsButton();
             
    });

    test('verify cancel button functionality on checkout page', async ({ cartPage,checkoutPage }) => {
        await checkoutPage.clickCancelButton();
          await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
    });

test('Verify cancel button in checkout overview page', async ({ checkoutPage,productPage }) => {
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.isOverviewPageDisplayed()).toBeTruthy();
        await checkoutPage.clickCancelButton();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
    }   
    );

     test.afterEach(async ({ productPage }) => {
            await productPage.logout();
        });

});