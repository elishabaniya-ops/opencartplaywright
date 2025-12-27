import { Page,expect,Locator } from "@playwright/test";

export class RegistrationPage{
    private readonly page: Page;

    //locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chckPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    //constructor
    constructor(page: Page){
        this.page=page;
        //initialize locators with css selectors

        this.txtFirstName=page.locator('#input-firstname');
        this.txtLastName=page.locator('#input-lastname');
        this.txtEmail=page.locator('#input-email');
        this.txtTelephone=page.locator('#input-telephone');
        this.txtPassword=page.locator('#input-password');
        this.txtConfirmPassword=page.locator('#input-confirm');
        this.chckPolicy=page.locator('input[name="agree"]');
        this.btnContinue=page.locator('input[value="Continue"]');
        this.msgConfirmation=page.locator('h1:has-text("Your Account Has Been Created!")');
    }   

    //actions/methods
    async setFirstName(fname:string): Promise<void>{
        await this.txtFirstName.fill(fname);
    }
    async setLastName(lname:string): Promise<void>{
        await this.txtLastName.fill(lname);
    }
    async setEmail(email:string): Promise<void>{
        await this.txtEmail.fill(email);
    }
    async setTelephone(tel:string): Promise<void>{
        await this.txtTelephone.fill(tel);
    }
    async setPassword(pwd:string): Promise<void>{
        await this.txtPassword.fill(pwd);
    }
    async setConfirmPassword(pwd:string): Promise<void>{
        await this.txtConfirmPassword.fill(pwd);
    }

    async setPrivacyPolicy(): Promise<void>{
        await this.chckPolicy.check();
    }

    async clickContinue(): Promise<void>{
        await this.btnContinue.click();
    }

    async getConfirmationMsg(): Promise<string>{
        return await this.msgConfirmation.textContent() ?? '';
    }

    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.telephone);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);
        await this.setPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();
    }

}