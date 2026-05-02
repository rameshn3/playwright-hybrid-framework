import {test,expect} from '../fixtures/fixture';
import {readTestData} from '../utils/dataReader';

//defineth type
type CheckoutData = {
    forEach(arg0: (data: any, index: any) => void): unknown;
    firstName: string;
    lastName: string;
    postalCode: string;
};

//read data using genric function
const checkoutData: CheckoutData = readTestData<CheckoutData[]>('./testdata/datadrivenData.json');


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

    checkoutData.forEach((data,index) => {
        test(`verify order completion flow with data set ${index + 1}-${data.firstName}${data.lastName} ${data.postalCode}`, async ({ checkoutPage }) => {
            await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.postalCode);
            await checkoutPage.clickContinueButton();
            await expect(checkoutPage.isOverviewPageDisplayed()).toBeTruthy();
            await checkoutPage.clickFinishButton();
            await expect(checkoutPage.isSuccessMessageDisplayed()).toBeTruthy(); 
            await checkoutPage.clickBackToProductsButton();
        });
    });

 
     test.afterEach(async ({ productPage }) => {
            await productPage.logout();
        });

});