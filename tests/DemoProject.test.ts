import { test , expect} from "@playwright/test"
import{ log } from "console"
import * as allure from "allure-js-commons"

test("Action on ELements - Text Box", async({page})=>{

    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('networkidle')

    await page.click("//h5[text() = 'Elements']")
    

   await page.click("//li[@id='item-0']/span[text()='Text Box']")
   await page.fill("#userName","Avinash YH")
   await page.fill("#userEmail","avinash@gmail.com")
   await page.fill("#currentAddress","Indira Nagar")
   await page.fill("#permanentAddress","Sanajay Nagar")
   await page.click("#submit")

  const name= await page.locator("#name").textContent()
  const email= await page.locator("#email").textContent()
  const currentAddress= await page.locator("//p[@id='currentAddress']").textContent()
  const permanentAddress= await page.locator("//p[@id='permanentAddress']").textContent()

  console.log(name)
  console.log(email)
  console.log(currentAddress)
  console.log(permanentAddress)

  expect(name).toBe("Name:Avinash YH")

})
test("Action on ELements - Check Box", async({page})=>{
    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('networkidle')

    await page.click("//h5[text() = 'Elements']")
    await page.click("//li[@id='item-1']/span[text()='Check Box']")
    await page.click("//button[@title='Expand all']")
    const checkBox= await page.locator("//span[text()='Home']")
    await checkBox.check()

    const isChecked = await checkBox.isChecked()
    expect(isChecked).toBe(true);

})

test("Action on ELements - Radio Button", async({page})=>{
    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('networkidle')

    await page.click("//h5[text() = 'Elements']")
    await page.click("//li[@id='item-2']/span[text()='Radio Button']")
    const yes= await page.locator("label[for='yesRadio']")
   const isChecked= await yes.click()

    expect(isChecked).toBe(true);
   // console.log(await page.locator("//span[text()='Yes']"))

    const impressive= await page.locator("lable[for='impressiveRadio']")
   // await impressive.click()

    const isSelected = await impressive.isChecked()
    expect(isSelected).toBe(false);
   // console.log(await page.locator("//span[text()='Impressive']"))

})

test("Web Tables",async({page})=>{

    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('networkidle')

    await page.click("//h5[text() = 'Elements']")
    await page.click("//li[@id='item-3']/span[text()='Web Tables']")
    await page.click("#addNewRecordButton")

    await page.waitForSelector('.modal-content', { state: 'visible' });
    await page.fill("#firstName", "Avinash")
    await page.fill("#lastName", "YH")
    await page.fill("#userEmail", "avinash@gmail.com")
    await page.fill("#age", "30")
    await page.fill("#salary", "0000")
    await page.fill("#department", "IT")
    await page.click("#submit")

    await page.waitForSelector('.modal-content', { state: 'detached' })

})
test("Download and Upload file", async ({page})=>{

    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('networkidle')

    await page.click("//h5[text() = 'Elements']")
    await page.click("//li[@id='item-7']/span[text()='Upload and Download']")
    await page.click("#downloadButton")

    const [download] =await Promise.all([
        page.waitForEvent("download"),
        page.click("#downloadButton")
     ]
    )
    const fileName = download.suggestedFilename()
    await download.saveAs(fileName)


   // await page.goto("https://blueimp.github.io/jQuery-File-Upload/")
    await page.setInputFiles("#uploadFile", "uploadFiles/1.jpeg")

    // const [uploadFiles]= await Promise.all([
    //     page.waitForEvent("filechooser"),
    //     page.click("#uploadFile")
        
    // ])
    // const isMultiple= uploadFiles.isMultiple()
    // console.log(isMultiple)
    
    // uploadFiles.setFiles(["uploadFiles/1.jpeg","uploadFiles/2.jpeg"])
    

})
test("Fill the Form Practice", async({page})=>{

    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('networkidle')

    await page.click("//h5[text() = 'Forms']")
    await page.click("//li[@id='item-0']/span[text()='Practice Form']")

    await page.fill("#firstName", "Avinash")
    await page.fill("#lastName", "YH")
    await page.fill("#userEmail", "avinash@gmail.com")
    await page.click("label[for='gender-radio-1']")
    await page.fill("#userNumber", "1234567890")

    //await page.waitForLoadState('networkidle')
    await page.click("#dateOfBirth")

   
    // await page.selectOption("//select[@class='react-datepicker__month-select']",{
        
    //     index:8
    //   })  
    //   await page.selectOption("//select[@class='react-datepicker__year-select']",{
    //     //label:"Name (A to Z)",
    //      value:"1988"
    //     //index:2,
    //   }) 

    //   await page.click("//div[text()='14']")


    const checkBox = await page.locator("label[for='hobbies-checkbox-3']")
    await checkBox.check()

    const isChecked = await checkBox.isChecked()
    expect(isChecked).toBe(true);

    await page.setInputFiles("#uploadPicture", "uploadFiles/1.jpeg")

    await page.fill("#currentAddress", "Haveri")

    await page.waitForTimeout(1000)
    await page.click("//div[@class=' css-1hwfws3']")

    await page.click("#submit")



    

})

test("ALerts," ,async({page})=>{

    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('networkidle')

    await page.click("//h5[text() = 'Alerts, Frame & Windows']")
    await page.click("//li[@id='item-1']/span[text()='Alerts']")

    page.on("dialog",async(alert)=>{
        const text= await alert.message()
        console.log(text)
        await alert.accept()
       
    })
    await page.click("#alertButton")
    await page.click("#timerAlertButton")
    await page.click("#confirmButton")
    await page.click("#promtButton")
    
})



    
