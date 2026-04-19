import {test,expect} from '../fixtures/fixture';

test.describe('product page tests', () => {

    test.beforeAll(async ({ pageFactory }) => {
        const loginPage = pageFactory.createLoginPage();
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');
    });

    test('should display products and verfy product list', async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
        await expect(productPage.getPoductCount()).toBeGreaterThan(0);
         await expect(productPage.getPoductCount()).toBe(6);
    });

    test('Add products to cart and verify cart count', async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await productPage.addProductToCartByIndex(0);
        await productPage.addProductToCartByIndex(1);
        await expect(productPage.getCartItemCount()).toBe(2);
    });

    test('Add product by name and verify cart count', async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        await expect(productPage.getCartItemCount()).toBe(3);
    }); 

    test('Remove product by name and verify cart count', async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await productPage.removeProductFromCartByName('Sauce Labs Bolt T-Shirt');
        await expect(productPage.getCartItemCount()).toBe(2);
    });

    test('Add all products to cart and verify cart count', async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await productPage.addAllProductsToCart();
        await expect(productPage.getCartItemCount()).toBe(6);
    });

test('sort products by price low to high and verify sorting', async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await productPage.sortProductsBy('Price (low to high)');
        const prices = await productPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('Navigate to cart page', async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await productPage.goToCart();
        const cartPage = pageFactory.createCartPage();
        await expect(cartPage.isCartPageLoaded()).toBeTruthy();
    });

    test.afterAll(async ({ pageFactory }) => {
        const productPage = pageFactory.createProductPage();
        await productPage.logout();
    });
});
