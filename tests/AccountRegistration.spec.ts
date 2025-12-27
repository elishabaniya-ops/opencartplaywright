import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../Utils/randomDataGenerator';
import { Testconfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: Testconfig;

test.beforeEach(async({page})=>{
    config=new Testconfig();
    await page.goto(config.appURL);
    homePage=new HomePage(page);
    registrationPage=new RegistrationPage(page);
})

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    await page.close();
});

test('User registration test',async()=>{
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in registration details with random data
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password=RandomDataUtil.getRandomPassword();

    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);
    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //validate confirmation message
    const confrimationMsg = await registrationPage.getConfirmationMsg();
    expect(confrimationMsg).toContain("Your Account Has Been Created!");
})