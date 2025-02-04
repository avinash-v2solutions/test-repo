import { test , expect} from "@playwright/test"
import{ log } from "console"


test("Valid Login ", async({page})=>{

    await page.goto("https://www.saucedemo.com/")

    await page.fill("#user-name","standard_user")
    await page.fill("#password", "secret_sauce")
    await page.click("#login-button")

    const title= await page.title()
    expect(title).toBe("Swag Labs")
    console.log('The Title of the Home Page is : '+title)

    const url = await page.url()
    expect(url).toBe("https://www.saucedemo.com/inventory.html")
    console.log('The URL of the Home Page is : '+url)

    await page.click("//button[text()='Open Menu']")
    await page.click("'Logout'")

})


test('Invalid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const invalidCredentials = [
    { username: '', password: '' },
    { username: 'locked_out_user', password: '' },
    { username: '', password: 'secret_sauce' },
    { username: 'locked_out_user', password: 'secret_sauce' },
    { username: 'locked_out_user', password: 'secret' }
  ];

  const expectedErrorMessages = [
    'Epic sadface: Username is required',
    'Epic sadface: Password is required',
    'Epic sadface: Username is required',
    'Epic sadface: Sorry, this user has been locked out.',
    'Epic sadface: Username and password do not match any user in this service'
  ];

  // Iterate over all the invalid credentials and test each one
  for (let i = 0; i < invalidCredentials.length; i++) {
    const credentials = invalidCredentials[i];
    await page.fill('#user-name', credentials.username);
    await page.fill('#password', credentials.password);
    await page.click('#login-button');

    // Wait for the error message to appear
    await page.waitForSelector('.error-message-container');

    // Capture the actual error message
    const actualErrorMessage = await page.locator('.error-message-container').textContent();
    console.log('Actual Error Message:', actualErrorMessage?.trim())

    // Compare the actual error message with the expected one for this iteration
    expect(actualErrorMessage?.trim()).toBe(expectedErrorMessages[i])

    // Reload the page to reset the form
    await page.reload()
  }
})

test("Dropdown", async({page})=>{

    // await page.goto("https://www.saucedemo.com/")

    // await page.fill("#user-name","standard_user")
//     await page.fill("#password", "secret_sauce")
//     await page.click("#login-button")

//     await page.waitForTimeout(1000)
//     await page.selectOption(".product_sort_container",{
//    //label:"Name (A to Z)",
//     //value:"za",
//    // index:2
//       value:"hilo"
//     })

//     const selectedOption=await page.locator(".product_sort_container").inputValue()
//     expect (selectedOption).toBe('hilo')



    await page.goto("https://opensource-demo.orangehrmlive.com/")

    await page.fill("input[name='username']","Admin" )
    await page.fill("input[name='password']","admin123")
    await page.click("' Login '")

//     await page.waitForTimeout(5000)

//  await page.click("//span[@text()='My Info']")

// const url = await page.url()
//  console.log("The Admin Url is : "+ url)
//  expect( await url).toBe("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")

})
test("Selecting a List & Perform Actions",async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.waitForLoadState('networkidle');
    await page.fill("input[name='username']", 'Admin');
    await page.fill("input[name='password']", 'admin123');
    await page.locator("//div/button[@type='submit']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('li[data-v-6475d26d]:nth-child(1)  > a[data-v-6475d26d] span[data-v-7b563373]').click();
  
    const url = await page.url();
    console.log('The Admin Url is : ' + url);
    expect(await url).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

})


