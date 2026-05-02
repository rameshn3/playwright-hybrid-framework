import {test,expect} from '../fixtures/fixture';
import {readCSVData} from '../utils/csvReader';

//defineth type
type CheckoutData = {
    forEach(arg0: (data: any, index: any) => void): unknown;
    firstName: string;
    lastName: string;
    zipCode: string;
};

//read data using genric function
const checkoutData: CheckoutData = readCSVData<CheckoutData>('./testdata/datadrivenCsvData.csv');


test.describe('checkout flow test - reading CSV file single data', () => {
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
         test(`verify order completion flow with data set ${index + 1}-${data.firstName}${data.lastName} ${data.zipCode}`, async ({ checkoutPage }) => {
             await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.zipCode);
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