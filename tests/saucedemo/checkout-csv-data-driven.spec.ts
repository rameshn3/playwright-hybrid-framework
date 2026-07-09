import { test, expect } from '../../fixtures/appFixture';
import { readCSVData } from '../../utils/csvReader';

// Define the type
type CheckoutData = {
    firstName: string;
    lastName: string;
    zipCode: string;
};

// Read all records from CSV
const checkoutData: CheckoutData[] =
    readCSVData<CheckoutData>('./testdata/datadrivenCsvData.csv');

test.describe.skip('Checkout flow test - Data Driven CSV', () => {

    // Run all tests in this describe one after another
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ loginPage, productPage, cartPage, checkoutPage }) => {
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');

        await expect(await productPage.isProductPageLoaded()).toBeTruthy();

        await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');

        expect(await productPage.getCartItemCount()).toBeGreaterThan(0);

        await productPage.goToCart();

        expect(await cartPage.isCartPageLoaded()).toBeTruthy();

        await cartPage.clickCheckoutButton();

        expect(await checkoutPage.isCheckoutPageDisplayed()).toBeTruthy();
    });

    checkoutData.forEach((data, index) => {

        test(`Verify order completion flow - Dataset ${index + 1}`, async ({ checkoutPage }) => {

            console.log(`Running Dataset ${index + 1}`, data);

            await checkoutPage.fillCheckoutInformation(
                data.firstName,
                data.lastName,
                data.zipCode
            );

            await checkoutPage.clickContinueButton();

            expect(await checkoutPage.isOverviewPageDisplayed()).toBeTruthy();

            await checkoutPage.clickFinishButton();

            expect(await checkoutPage.isSuccessMessageDisplayed()).toBeTruthy();

            await checkoutPage.clickBackToProductsButton();
        });

    });

    test.afterEach(async ({ productPage }) => {
        await productPage.logout();
    });

});