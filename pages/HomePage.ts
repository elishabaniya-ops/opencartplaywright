import {Page,expect,Locator} from '@playwright/test';
export class HomePage{
    
    private readonly page: Page;
    //locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearchBox: Locator;
    private readonly btnSearch: Locator;

    //constructor
    constructor(page: Page){
        this.page=page;

        //initialize locators
        this.lnkMyAccount=page.locator('span:has-text("My Account")');
        this.lnkRegister=page.locator('a:has-text("Register")');
        this.linkLogin=page.locator('a:has-text("Login")');
        this.txtSearchBox=page.locator('input[placeholder="Search"]');
        this.btnSearch=page.locator('#search button[type="button"]');
    }

    //actions/methods
    //check if homepage exist
    async isHomePageExist(){
        let title:string =await this.page.title();
        if(title)
        {
            return true;
        }
        return false;
    }

    async clickMyAccount(){
        try{
        await this.lnkMyAccount.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'My Account': ${error}`);
            throw error;
        }
    }

    async clickRegister(){
        try{
        await this.lnkRegister.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'Register': ${error}`);
            throw error;
        }
    }

    async clickLogin(){
        try{
        await this.linkLogin.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'Login': ${error}`);
            throw error;
        }
    }

    async enterProductName(pName:string){
        try{
        await this.txtSearchBox.fill(pName);
        }catch(error){
            console.log(`Exception occured while entering product name in search box: ${error}`);
            throw error;
        }
    }

    async clickSearch(){
        try{
        await this.btnSearch.click();
        }catch(error){
            console.log(`Exception occured while clicking search button: ${error}`);
            throw error;
        }
    }

}