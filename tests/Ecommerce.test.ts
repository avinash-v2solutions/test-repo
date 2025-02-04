import { test, expect} from "@playwright/test"
import { log } from "console"
import * as allure from "allure-js-commons"
import { link } from "fs"

test ("Sign up & Login", async({ page }) =>{


    await page.goto("https://www.demoblaze.com/")
    await page.click("#signin2")

    await page.fill("#sign-username", "Avinash123")
    await page.fill("#sign-password", "123@#$")

   // await page.click("//button[@onclick = 'register()']")


page.on("dialog",async(alert)=>{
        const text= alert.message()
        console.log(text)
        await alert.accept()
})
    await page.click("//button[@onclick = 'register()']")

})

test("Login", async({page})=>{

    await page.goto("https://www.demoblaze.com/")

    await page.click("#login2")
    await page.fill("#loginusername","Avinash123")
    await page.fill("#loginpassword","123@#$")

    await page.click("//button[@onclick = 'logIn()']")

    const logout= await page.locator("#logout2")
    expect(logout).toHaveText("Log out")
})

test.only("PLace an Order", async ({page})=>{
    await page.goto("https://www.demoblaze.com/")

    await page.click("#login2")
    await page.fill("#loginusername","Avinash123")
    await page.fill("#loginpassword","123@#$")
    await page.click("//button[@onclick = 'logIn()']")

    await page.click("//a[text()='Laptops']")
    await page.click(".page-link")

   // const product = await page.locator("//a[@href='prod.html?idp_=15']")

  const  prod = await page.getByRole('link', { name: 'MacBook Pro' })

    console.log(await prod.textContent())

    await prod.click()

    await page.click("//a[text()='Add to cart']")

    await page.click("#cartur")

    await page.click("//button[text()='Place Order']")

    await page.waitForSelector('//*[@id="orderModal"]/div/div/div[2]', { state: 'visible' });

    await page.fill("#name","Avinash")

    await page.fill("#country", "INDIA")

    await page.fill("#city", "Bangalore")

    await page.fill("#card", "1234567890")

    await page.fill("#month","January")

    await page.fill("#year","2025")

    await page.click("//button[text()='Purchase']")

    console.log(await page.locator("//h2[text()='Thank you for your purchase!']").textContent())

   // console.log(await page.locator("/html/body/div[9]/p/text()[1]").textContent())

    await page.click("//button[text()='OK']")

    //*[@id="orderModal"]/div/div/div[2]


})