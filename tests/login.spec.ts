import {test,expect} from '../fixtures/fixture';

test.describe('Login Tests', () => {

    test('should login with valid credentials', async ({ pageFactory }) => {

        const loginPage = pageFactory.createLoginPage();
        await loginPage.navigateTo(); // Navigate to the login pageFactory
        await loginPage.loginAs('STANDARD_USER');
        const productPage = pageFactory.createProductPage();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
        //logout from the application
        await productPage.logout();
    });

    test('should show error with locked out credentials', async ({ pageFactory }) => {
        const loginPage = pageFactory.createLoginPage();
         await loginPage.navigateTo();
       await loginPage.loginAs('LOCKED_OUT_USER');
      await expect(loginPage.getErrorMessage()).toContainText('locked out');
    }); 

    test('should show error with invalid credentials', async ({ pageFactory }) => {
        const loginPage = pageFactory.createLoginPage();
        await loginPage.navigateTo();
        await loginPage.loginAs('INVALID_USER');
        await expect(loginPage.getErrorMessage()).toContainText('Username and password do not match');
    });
});  