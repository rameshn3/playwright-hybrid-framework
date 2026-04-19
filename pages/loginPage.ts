import {Locator,Page} from '@playwright/test';
import { getCredentials } from '../utils/auth';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
   
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private swaglabsLogo: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name'); //#idvalue or [attributenam='attributevalue']
       // this.usernameInput = page.getByPlaceholder('Username')
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
      //  this.loginButton = page.getByRole('button', { name: 'Login' });
        this.swaglabsLogo = page.locator('.login_logo'); //.classvalue or [attributenam='attributevalue']
      //  this.swaglabsLogo = page.getByText('Swag Labs');
       this.errorMessage = this.page.getByRole('heading', { level: 3 });
    }

    async loginAs(userType: string) {
        const credentials = getCredentials(userType);
        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.swaglabsLogo.isVisible();
    }

   getErrorMessage() {
    return this.errorMessage;
}

}