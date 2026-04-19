import {Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
    private cartTitle: Locator;
    private cartItems: Locator      
    private continueShoppingButton: Locator;
    private checkoutButton: Locator;
    private removeButtons: Locator;
    private quantityInput: Locator;
    private itemPrice: Locator;

    constructor(page) {
        super(page);
        this.cartTitle = page.locator('.title'); // .classvalue or [attributenam='attributevalue']
        this.cartItems = page.locator('.cart_item');
        this.continueShoppingButton = page.getByText('Continue Shopping');
        this.checkoutButton = page.getByText('Checkout');
        this.removeButtons = page.getByRole('button', { name: 'Remove' });
        this.quantityInput = page.locator('.cart_quantity');
        this.itemPrice = page.locator('.inventory_item_price');
    }
//check product is in cart or not
async isProductInCart(productName:string){
    return this.page.locator("[data-test='inventory-item-name']",{
        hasText: productName
    }).isVisible();
}

//cart page is loaded by checking the title
async isCartPageLoaded(): Promise<boolean> {    
    const txt = await this.cartTitle.textContent();
    return txt?.trim() === 'Your Cart';
}

//click on continue shopping button
async clickContinueShoppingButton(){
    await this.continueShoppingButton.click();  
}

//click on checkout button
async clickCheckoutButton(){
    await this.checkoutButton.click();  
}

//remove product from cart
async removeProductFromCart(productName:string){
    const product = this.page.locator('.cart_item').filter({ hasText: productName });
    const removeButton = product.locator('button:has-text("Remove")');
    await removeButton.click();
}

//get product quantity in cart
async getProductQuantity(productName:string):Promise<number>{
    const product = this.page.locator('.cart_item').filter({ hasText: productName });
    const quantityText = await this.quantityInput.textContent();
    return parseInt((quantityText || '0').trim(), 10);
}

//get product price in cart
async getProductPrice(productName:string):Promise<number>{
    const product = this.page.locator('.cart_item').filter({ hasText: productName });
    const priceText = await this.itemPrice.textContent();
    return parseFloat((priceText || '0').replace('$', '').trim());
}
}