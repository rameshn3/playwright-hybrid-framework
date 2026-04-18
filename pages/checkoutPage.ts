import {Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
    private checkoutTitle: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private postalCodeInput: Locator;   
    private continueButton: Locator;
    private cancelButton: Locator;
    private finishButton: Locator;
    private successMessage: Locator;
    private backToProductsButton: Locator;

    constructor(page) {
        super(page);
        this.checkoutTitle = page.locator('.title');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.getByText('Continue');
        this.cancelButton = page.getByText('Cancel');
        this.finishButton = page.getByText('Finish');
        this.successMessage = page.locator('.complete-header');
        this.backToProductsButton = page.locator('#back-to-products');
    }

    async isCheckoutPageDisplayed(): Promise<boolean> {
        return await this.checkoutTitle.textContent() === 'Checkout: Your Information';
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
    
    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async isOverviewPageDisplayed(): Promise<boolean> {
        return await this.checkoutTitle.textContent() === 'Checkout: Overview';
    }

    async isSuccessMessageDisplayed(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    async clickBackToProductsButton() {
        await this.backToProductsButton.click();
    }
}