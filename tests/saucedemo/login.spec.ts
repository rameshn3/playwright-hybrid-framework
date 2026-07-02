import {test,expect} from '../../fixtures/appFixture';

test.describe('Login Tests', () => {

    test('should login with valid credentials', {
    tag: ['@smoke', '@validlogin'],
  },async ({ loginPage,productPage }) => {
    
        await loginPage.navigateTo(); // Navigate to the login pageFactory
        await loginPage.loginAs('STANDARD_USER');
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
        //logout from the application
        await productPage.logout();
    });

    test('should show error with locked out credentials',{
    tag: ['@regression', '@lockedout'],
  }, async ({ loginPage }) => {
        await loginPage.navigateTo();
       await loginPage.loginAs('LOCKED_OUT_USER');
       const errorMessage = await loginPage.getErrorMessage();
      await expect(errorMessage).toContainText('locked out');
    }); 

    test('should show error with invalid credentials', {
    tag: ['@sanity', '@invalidlogin'],
  },async ({ loginPage }) => {
         await loginPage.navigateTo();
        await loginPage.loginAs('INVALID_USER');
        const errorMessage = await loginPage.getErrorMessage();
      await expect(errorMessage).toContainText('Username and password do not match');
    });
});  